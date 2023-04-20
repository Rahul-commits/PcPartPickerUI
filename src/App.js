import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
//import Editor from './components/Editor';
//import Admin from './components/Admin';
//import Missing from './components/Missing';
import Unauthorized from "./components/Unauthorized";
//import Lounge from './components/Lounge';
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Ram from "./components/pcComponents/Ram";
import GridView from "./components/GridView";
import HomeView from "./components/HomeView";
import Testing from "./components/Testing";
import PersistLogin from "./components/PersistLogin";
import Motherboard from "./components/pcComponents/Motherboard";
import GraphicsCard from "./components/pcComponents/GraphicsCard";
import PowerSupply from "./components/pcComponents/PowerSupply";
import Cpu from "./components/pcComponents/Cpu";
import StorageDevice from "./components/pcComponents/StorageDevice";
import Users from "./components/pcComponents/Users";
import PCConfig from "./components/pcComponents/PCConfig";
const ROLES = {
  User: "ROLE_USER",
  Admin: "ROLE_ADMIN",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        console.log("passed ones");
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          console.log("passed one");
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
          >
            <Route path="/" element={<Cpu />}>
              {/* <Route path="homeView" element={<HomeView />} />
              <Route path="gridView" element={<GridView />} /> */}
            </Route>
            <Route path="/cpuView/*" element={<Cpu />} />
            <Route path="/ramView/*" element={<Ram />} />
            <Route path="/motherboardView/*" element={<Motherboard />} />
            <Route path="/graphicsCardView/*" element={<GraphicsCard />} />
            <Route path="/powerSupplyView/*" element={<PowerSupply />} />
            <Route path="/storageView/*" element={<StorageDevice />} />
            <Route path="/userView/*" element={<Users />} />
            <Route path="/pcConfigView/*" element={<PCConfig />} />

            {/* <Route path="/admin" element={<Ram />}>
            <Route path="/admin/homeView" element={<HomeView />} />
            <Route path="/admin/gridView" element={<GridView />} />
          </Route> */}
          </Route>
        </Route>
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Ram />}>
            <Route path="/homeView" element={<HomeView />} />
            <Route path="/gridView" element={<GridView />} />
          </Route>
        </Route> */}
        {/*
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
        >
          <Route path="lounge" element={<Lounge />} />
        </Route> */}
        {/* catch all */}
        {/* <Route path="*" element={<Missing />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
