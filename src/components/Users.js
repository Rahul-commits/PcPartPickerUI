import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { themes } from "devextreme/ui/themes";
import "devextreme/dist/css/dx.dark.css";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import axios from "../api/axios";
const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

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
        console.log(response.data);
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
        dataSource={users}
        keyExpr="ID"
        defaultColumns={columns}
        showBorders={true}
      />
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

export default Users;
