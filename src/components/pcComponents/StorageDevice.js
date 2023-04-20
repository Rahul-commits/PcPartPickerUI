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
const StorageDevice = () => {
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
    <div className="storage">
      <TopNavBar name="storage" />
      <Routes></Routes>
    </div>
  );
};

export default StorageDevice;
