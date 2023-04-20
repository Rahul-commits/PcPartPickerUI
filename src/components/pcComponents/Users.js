import { useEffect, useState } from "react";
import RequireAuth from "../RequireAuth";
import Button from "react-bootstrap/Button";
import {
  Nav,
  Navbar,
  NavItem,
  Container,
  NavDropdown,
  NavLink,
} from "react-bootstrap";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import GridView from "../GridView";
import HomeView from "../HomeView";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Users from "./UserBody";
import Motherboards from "./MotherboardBody";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import TopNavBar from "./TopNavBar";
const User = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const signmeout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    await logout();
    navigate("/login");
  };

  return (
    <div className="User">
      {/* <GridView /> */}
      <TopNavBar name="user" />
      {/* <Users /> */}
      {/* <Routes>
        <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
          <Route path="/homeView" element={<HomeView />} />
          <Route path="/gridView" element={<GridView />} />
        </Route>
      </Routes> */}

      <Routes>
        {/* <Route path="/*" element={<Users />} />
        <Route path="/gridView/*" element={<Users />} />
        <Route path="/motherboard/*" element={<Motherboards />} /> */}
        {/* <Route path="/homeView" element={<HomeView />} />
        <Route path="/gridView" element={<GridView />} /> */}
        {/* <Route path="/homeView" element={<Users />} />
        <Route path="/gridView" element={<Users />} /> */}
      </Routes>
    </div>
  );
};

export default User;
