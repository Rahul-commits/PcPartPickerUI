import { themes } from "devextreme/ui/themes";
import { useState, useEffect } from "react";
import Users from "./Users";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
//import customers from "../customers";
import {
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import address from "../address";
const GridView = () => {
  const pageSizes = [10, 25, 50, 100];
  // // const [sorting, setSorting] = useState({
  // //   columnName: "City",
  // //   direction: "asc",
  // // });
  // // useEffect(() => {
  // //   setSorting(sorting);
  // // }, [sorting]);
  // return (
  //   <div>
  //     <Grid
  //       rows={Users}
  //       columns={[
  //         { name: "id", title: "id" },
  //         { name: "username", title: "username" },
  //         { name: "password", title: "password" },
  //         { name: "email", title: "email" },
  //       ]}
  //     >
  //       {/* <PagingState defaultCurrentPage={0} pageSize={5} /> */}
  //       {/* <SortingState sorting={this.sorting} /> */}

  //       {/* <IntegratedPaging />
  //       <IntegratedSorting /> */}
  //       <Table />
  //       <TableHeaderRow allowSorting showSortingControls />
  //       <PagingPanel />
  //     </Grid>
  return (
    <div>
      <DataGrid
        dataSource={Users}
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
      </DataGrid>
    </div>
  );
};
export default GridView;
