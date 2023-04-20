import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { themes } from "devextreme/ui/themes";
import "devextreme/dist/css/dx.dark.css";
import DataGrid, {
  Column,
  Editing,
  Lookup,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  FilterRow,
} from "devextreme-react/data-grid";
import axios from "../../api/axios";

const UserBody = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [editingRowKey, setEditingRowKey] = useState("");
  const [editedRowData, setEditedRowData] = useState({
    id: "",
    username: "",
    password: "",
    email: "",
  });
  const dataGridRef = useRef(null);

  // const startEditing = (rowKey, rowData) => {
  //   // console.log("fordien");

  //   setEditingRowKey(rowKey);
  //   // console.log(data.id);
  //   console.log(editingRowKey);
  //   setEditedRowData({ ...rowData });
  // };

  // const cancelEditing = () => {
  //   setEditingRowKey(null);
  //   setEditedRowData({ id: "", username: "", password: "", email: "" });
  // };

  const onSaving = async (data) => {
    // get the Datagrid instance
    // console.log(data);
    // console.log(data["changes"][0].data.email);
    //console.log(data["changes"][0].data["email"]);
    let id = data["changes"][0].key;
    console.log(users);
    if (data["changes"][0]["type"] === "update") {
      const filteredResults = users.filter(
        (user) => user.id === data["changes"][0].key
      );
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        filteredResults[0][key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.put(
          "/api/users/" + id,
          filteredResults[0],
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        setUsers(
          users.map((user) => (user.id === id ? { ...response.data } : user))
        );
        console.log(users);
        //setUsers(users);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    } else if (data["changes"][0]["type"] === "remove") {
      try {
        const response = await axios.delete("/api/users/" + id, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setUsers(
          //users.map((user) => (user.id === id ? { ...response.data } : user))
          users.filter((user) => user.id !== id)
        );
        console.log(users);
        // setUsers(users);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    } else if (data["changes"][0]["type"] === "insert") {
      // const filteredResults = users.filter(
      //   (user) => user.id === data["changes"][0].key
      // );
      var user = {};
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        user[key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.post("/api/users/", user, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        // const userList = users.filter(
        //   (userData) => userData.username !== user.username
        // );
        setUsers(
          users.map((userData) =>
            userData.username === user["username"]
              ? { ...response.data }
              : userData
          )
        );
        // setUsers(userList);
        // setUsers([...userList, response.data]);
        console.log(users);
        //setUsers(users);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    }

    // console.log(filteredResults[0]);
    //console.log(data.changes[0].type);
    //console.log(data.changes[0].data);
  };

  // const saveEditing = () => {
  //   // get the Datagrid instance
  //   const dataGrid = dataGridRef.current.instance;

  //   // update the edited row data in the Datagrid
  //   dataGrid.updateRow(editingRowKey, editedRowData);

  //   // reset the editing state
  //   setEditingRowKey(null);
  //   setEditedRowData({ id: "", username: "", password: "", email: "" });
  // };
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/api/users", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        // const response = await axiosPrivate.get("/api/users", {
        //   signal: controller.signal,
        // });
        //console.log(response);
        // console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);
  const pageSizes = [10, 25, 50, 100];
  const columns = ["id", "username", "password", "email"];

  return (
    // <article>
    //   <h2>Users List</h2>
    //   {users?.length ? (
    //     <ul>
    //       {users.map((user, i) => (
    //         <li key={i}>{user?.username}</li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>No users to display</p>
    //   )}
    // </article>
    <div>
      <DataGrid
        columnAutoWidth={true}
        dataSource={users}
        keyExpr="id"
        //  ref={dataGridRef}
        onSaving={onSaving}
        // editing={{
        //   mode: "row",
        //   allowUpdating: true,
        //   allowDeleting: true,
        //   allowAdding: true,
        //   onEditingStart: (e) => {
        //     console.log("not forde");
        //     if (editingRowKey !== e.data.id) {
        //       e.cancel = true;
        //     }
        //   },
        // }}
      >
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
        <FilterRow visible={true} />
        {/* <Column dataField="id" caption="ID" allowEditing={true} /> */}
        <Column dataField="username" caption="Username" allowEditing={true} />
        <Column dataField="password" caption="Password" allowEditing={true} />
        <Column dataField="email" caption="Email" allowEditing={true} />
        {/* <Column
          caption="Actions"
          cellRender={(cellData) => {
            const data = cellData.data;
            const rowKey = data.id;
            const rowData = data;
            // console.log(rowKey);
            //  console.log("here");
            // console.log(rowData);
            if (editingRowKey === rowKey) {
              return (
                <>
                  <button onClick={saveEditing}>Save</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </>
              );
            } else {
              return (
                <button
                  style={{ fontSize: "20px" }}
                  onClick={() => startEditing(rowKey, rowData)}
                >
                  Edit
                </button>
              );
            }
          }}
        /> */}
      </DataGrid>

      {/* <DataGrid
        dataSource={users}
        keyExpr="id"
        defaultColumns={columns}
        showBorders={true}
      >
        <Paging enabled={true} />

        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
      </DataGrid> */}
      {/* <DataGrid
        dataSource={users}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />

        <Column dataField="id" dataType="string" />
        <Column dataField="username" dataType="string" />
        <Column dataField="password" dataType="string" />

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid> */}
    </div>
  );
};

export default UserBody;
