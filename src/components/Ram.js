import { useEffect, useState } from "react";
import RequireAuth from "./RequireAuth";
import {
  Nav,
  Navbar,
  NavItem,
  Container,
  NavDropdown,
  NavLink,
} from "react-bootstrap";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import GridView from "./GridView";
import HomeView from "./HomeView";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Users from "./Users";
import useAuth from "../hooks/useAuth";
const Ram = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/login");
  };

  return (
    <div className="Ram">
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand style={{ color: "white" }} as={Link} to="/homeView">
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {console.log(auth.roles[0])}
              {auth.roles[0] === "ROLE_USER" ? (
                <Nav.Link style={{ color: "white" }} as={Link} to="/homeView">
                  Home
                </Nav.Link>
              ) : (
                ""
              )}
              {/* <Nav.Link style={{ color: "white" }} as={Link} to="/homeView">
                Home
              </Nav.Link> */}
              <Nav.Link style={{ color: "white" }} as={Link} to="/gridView">
                Grid
              </Nav.Link>
              {/* <NavDropdown
                style={{ color: "white" }}
                title="Dropdown"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link
                className=" btn navbar-btn btn-danger"
                style={{ color: "white" }}
                onClick={logout}
              >
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <GridView /> */}

      {/* <Routes>
        <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
          <Route path="/homeView" element={<HomeView />} />
          <Route path="/gridView" element={<GridView />} />
        </Route>
      </Routes> */}
      {/* <Users /> */}
      <Routes>
        <Route path="/" element={<Users />} />
        {/* <Route path="/homeView" element={<HomeView />} />
        <Route path="/gridView" element={<GridView />} /> */}
        <Route path="/homeView" element={<Users />} />
        <Route path="/gridView" element={<Users />} />
      </Routes>
    </div>
  );
};

export default Ram;
