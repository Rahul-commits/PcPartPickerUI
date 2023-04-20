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
import StorageBody from "./StorageBody";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import GridView from "../GridView";
import HomeView from "../HomeView";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Users from "./UserBody";
import MotherboardBody from "./MotherboardBody";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import CpuBody from "./CpuBody";
import RamBody from "./RamBody";
import GraphicsBody from "./GraphicsBody";
import PowerSupplyBody from "./PowerSupplyBody";
import UserBody from "./UserBody";
import PCConfigBody from "./PCConfigBody";

const TopNavBar = (props) => {
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
    <div className="Ram">
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand style={{ color: "white" }} as={Link} to="/homeView">
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* {console.log(auth.roles[0])} */}
              {auth.roles[0] === "ROLE_USER" ? (
                <Nav.Link
                  style={{ color: "white" }}
                  as={Link}
                  to="/pcConfigView"
                >
                  <Button
                    style={{ fontSize: "18px" }}
                    variant="outline-success"
                  >
                    CONFIGURATIONS
                  </Button>
                </Nav.Link>
              ) : (
                ""
              )}
              {/* <Nav.Link style={{ color: "white" }} as={Link} to="/homeView">
                Home
              </Nav.Link> */}
              {auth.roles[0] === "ROLE_ADMIN" ||
              auth.roles[0] === "ROLE_USER" ? (
                <Nav.Link style={{ color: "white" }} as={Link} to="/cpuView">
                  <Button
                    style={{ fontSize: "18px" }}
                    variant="outline-success"
                  >
                    CPU
                  </Button>
                </Nav.Link>
              ) : (
                ""
              )}
              {auth.roles[0] === "ROLE_ADMIN" ||
              auth.roles[0] === "ROLE_USER" ? (
                <Nav.Link style={{ color: "white" }} as={Link} to="/ramView">
                  <Button
                    style={{ fontSize: "18px" }}
                    variant="outline-success"
                  >
                    RAM
                  </Button>
                </Nav.Link>
              ) : (
                ""
              )}
              {auth.roles[0] === "ROLE_ADMIN" ||
              auth.roles[0] === "ROLE_USER" ? (
                <Nav.Link
                  style={{ color: "white" }}
                  as={Link}
                  to="/motherboardView"
                >
                  <Button
                    style={{ fontSize: "18px" }}
                    variant="outline-success"
                  >
                    MOTHERBOARD
                  </Button>
                </Nav.Link>
              ) : (
                ""
              )}
              {auth.roles[0] === "ROLE_ADMIN" ||
              auth.roles[0] === "ROLE_USER" ? (
                <Nav.Link
                  style={{ color: "white" }}
                  as={Link}
                  to="/graphicsCardView"
                >
                  <Button
                    style={{ fontSize: "18px" }}
                    variant="outline-success"
                  >
                    GRAPHICS CARD
                  </Button>
                </Nav.Link>
              ) : (
                ""
              )}
              {/* {auth.roles[0] === "ROLE_ADMIN" ||
              auth.roles[0] === "ROLE_USER" ? (
                <Nav.Link
                  style={{ color: "white" }}
                  as={Link}
                  to="/powerSupplyView"
                >
                  <Button
                    style={{ fontSize: "18px" }}
                    variant="outline-success"
                  >
                    POWER SUPPLY
                  </Button>
                </Nav.Link>
              ) : (
                ""
              )} */}
              {/* {auth.roles[0] === "ROLE_ADMIN" ||
              auth.roles[0] === "ROLE_USER" ? (
                <Nav.Link
                  style={{ color: "white" }}
                  as={Link}
                  to="/storageView"
                >
                  <Button
                    style={{ fontSize: "18px" }}
                    variant="outline-success"
                  >
                    STORAGE DEVICE
                  </Button>
                </Nav.Link>
              ) : (
                ""
              )} */}
              {auth.roles[0] === "ROLE_ADMIN" ? (
                <Nav.Link style={{ color: "white" }} as={Link} to="/userView">
                  <Button
                    style={{ fontSize: "18px" }}
                    variant="outline-success"
                  >
                    USERS
                  </Button>
                </Nav.Link>
              ) : (
                ""
              )}
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
              <Button
                style={{ fontSize: "18px" }}
                variant="outline-success"
                onClick={logout}
              >
                Sign Out
              </Button>
              {/* <Nav.Link
                className=" btn navbar-btn btn-danger"
                style={{ color: "white" }}
                onClick={logout}
              >
                Sign Out
              </Nav.Link> */}
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
      {/* {(() => {
        if (props.name === "ram") {
          <RamBody />;
        } else if (props.name === "cpu") {
          <CpuBody />;
        } else if (props.name === "motherboard") {
          <MotherboardBody />;
        } else if (props.name === "graphics") {
          <GraphicsBody />;
        } else if (props.name === "powerSupply") {
          <PowerSupplyBody />;
        } else if (props.name === "storage") {
          <StorageBody />;
        } else if (props.name === "user") {
          <UserBody />;
        }
      })()} */}
      {props.name === "pcconfig" ? (
        <PCConfigBody />
      ) : props.name === "ram" ? (
        <RamBody />
      ) : props.name === "cpu" ? (
        <CpuBody />
      ) : props.name === "motherboard" ? (
        <MotherboardBody />
      ) : props.name === "graphics" ? (
        <GraphicsBody />
      ) : props.name === "powerSupply" ? (
        <PowerSupplyBody />
      ) : props.name === "storage" ? (
        <StorageBody />
      ) : (
        <UserBody />
      )}
      {/* <Users /> */}
      <Routes>
        {/* <Route path="/" element={<Users />} />
        <Route path="/motherboard" element={<Motherboards />} /> */}
        {/* <Route path="/homeView" element={<HomeView />} />
        <Route path="/gridView" element={<GridView />} /> */}
        {/* <Route path="/homeView" element={<Users />} />
        <Route path="/gridView" element={<Users />} /> */}
      </Routes>
    </div>
  );
};

export default TopNavBar;
