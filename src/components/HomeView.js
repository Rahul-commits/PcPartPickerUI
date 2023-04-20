// // const HomeView = () => {
// //   return (
// //     <div>
// //       <h1>Hello world</h1>
// //     </div>
// //   );
// // };
// // export default HomeView;
// import { TableFixedColumns } from "@devexpress/dx-react-grid-bootstrap4";
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
// import address from "../address";

// const HomeView = () => {
//   return (
//     <div>
//       <Grid
//         rows={address}
//         columns={[
//           { name: "CustomerId", title: "CustomerId" },

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
// export default HomeView;
