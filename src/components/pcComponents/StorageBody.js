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
} from "devextreme-react/data-grid";
import axios from "../../api/axios";

const StorageBody = () => {
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

  const onSaving = async (data) => {
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
        setUsers(users.filter((user) => user.id !== id));
        console.log(users);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "insert") {
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
        setUsers(
          users.map((userData) =>
            userData.username === user["username"]
              ? { ...response.data }
              : userData
          )
        );

        console.log(users);
      } catch (err) {
        console.error(err);
      }
    }
  };

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
    <div>
      <DataGrid dataSource={users} keyExpr="id" onSaving={onSaving}>
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
        {/* <Column dataField="id" caption="ID" allowEditing={true} /> */}
        <Column dataField="username" caption="Username" allowEditing={true} />
        <Column dataField="password" caption="Password" allowEditing={true} />
        <Column dataField="email" caption="Email" allowEditing={true} />
      </DataGrid>
    </div>
  );
};

export default StorageBody;
