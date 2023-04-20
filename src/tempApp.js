// import "bootstrap/dist/css/bootstrap.min.css";
// import "devextreme/dist/css/dx.light.css";
// //import { themes } from "devextreme/ui/themes";
// import DataGrid from "devextreme-react/data-grid";
// import { useEffect, useState } from "react";
// import { Nav, Navbar, NavItem, Container, NavDropdown } from "react-bootstrap";
// import {
//   PagingState,
//   IntegratedPaging,
//   SortingState,
//   IntegratedSorting,
// } from "@devexpress/dx-react-grid";
// import {
//   Grid,
//   Table,
//   TableHeaderRow,
//   PagingPanel,
// } from "@devexpress/dx-react-grid-bootstrap4";
// import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
// import customers from "./customers";

// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// import { LinkContainer } from "react-router-bootstrap";

// const HomeView = () => {
//   return (
//     <div>
//       <h1>Hello world</h1>;
//     </div>
//   );
// };

// const GridView = () => {
//   return (
//     <div>
//       <Grid
//         rows={customers}
//         columns={[
//           { name: "CustomerId", title: "CustomerId" },
//           { name: "companyName", title: "Company" },
//           { name: "country", title: "Country" },
//         ]}
//       >
//         <PagingState defaultCurrentPage={0} pageSize={5} />
//         <SortingState
//           defaultSorting={[{ columnName: "country", direction: "asc" }]}
//         />

//         <IntegratedPaging />
//         <IntegratedSorting />
//         <Table />
//         <TableHeaderRow allowSorting showSortingControls />
//         <PagingPanel />
//       </Grid>
//     </div>
//   );
// };

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navbar bg="dark">
//           <Container>
//             <Navbar.Brand style={{ color: "white" }} href="/">
//               React-Bootstrap
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="me-auto">
//                 <Nav.Link style={{ color: "white" }} href="/">
//                   Home
//                 </Nav.Link>
//                 <Nav.Link style={{ color: "white" }} href="/grid">
//                   Grid
//                 </Nav.Link>

//                 <NavDropdown
//                   style={{ color: "white" }}
//                   title="Dropdown"
//                   id="basic-nav-dropdown"
//                 >
//                   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.2">
//                     Another action
//                   </NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.3">
//                     Something
//                   </NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item href="#action/3.4">
//                     Separated link
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>

//         <Routes>
//           <Route path="/" element={<HomeView />} />
//           <Route path="/grid" element={<GridView />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
