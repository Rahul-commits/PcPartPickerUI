import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { themes } from "devextreme/ui/themes";
import "devextreme/dist/css/dx.dark.css";

import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";
import DataGrid, {
  Column,
  Editing,
  Lookup,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  FilterRow,
} from "devextreme-react/data-grid";
import axios from "../../api/axios";

const GraphicsBody = () => {
  const { setAuth } = useContext(AuthContext);
  const logout = useLogout();
  const { auth } = useAuth();
  const [pciExpressSlotTypes, setPciExpressSlotTypes] = useState();
  const [gpuManufacturers, setgpuManufacturers] = useState();
  const [graphics, setGraphics] = useState();
  const [eccComp, seteccComp] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [editingRowKey, setEditingRowKey] = useState("");
  const [editedRowData, setEditedRowData] = useState({
    modelNumber: "",
    modelName: "",
    manufacturerName: "",
    generation: "",
    process: "",
    wattage: "",
    tdp: "",
    tfs: "",
    clockSpeed: "",
    rating: "",
    price: "",
  });
  const dataGridRef = useRef(null);

  const onSaving = async (data) => {
    let id = data["changes"][0].key;
    for (const elem of graphics) {
      if (elem.id === id) {
        id = elem.modelNumber;
        break;
      }
    }
    console.log(graphics);
    if (data["changes"][0]["type"] === "update") {
      const filteredResults = graphics.filter(
        (graphic) => graphic.modelNumber === id
      );
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        filteredResults[0][key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.put(
          "/api/graphics/" + id,
          filteredResults[0],
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        // setGraphics(
        //   graphics.map((graphic) =>
        //     graphic.modelNumber === id ? { ...response.data } : graphic
        //   )
        // );
        setGraphics(
          graphics.map((graphicsData) =>
            response.data.modelNumber === graphicsData["modelNumber"]
              ? { ...response.data }
              : graphicsData
          )
        );
        console.log(graphics);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "remove") {
      try {
        const response = await axios.delete("/api/graphics/" + id, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setGraphics(graphics.filter((graphic) => graphic.modelNumber !== id));
        console.log(graphics);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "insert") {
      var graphic = {};
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        graphic[key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.post("/api/graphics/", graphic, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        // for (const elem of graphics) {
        //   if (elem.modelNumber === graphic["modelNumber"]) {
        //     elem.id = response.data.id;
        //     // elem.modelNumber = response.data.modelNumber;
        //     //     //  elem.modelNumber = response.modelNumber;
        //     //     break;
        //   }
        // }
        //setGraphics(graphics);
        setGraphics(
          graphics.map((graphicsData) =>
            response.data.modelNumber === graphicsData["modelNumber"]
              ? { ...response.data }
              : graphicsData
          )
        );
        console.log(graphics);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getGraphics = async () => {
      try {
        const response = await axios.get("/api/graphics", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setGraphics(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getpciExpressSlotTypes = async () => {
      try {
        const response = await axios.get("/api/pciexpressslottypes", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setPciExpressSlotTypes(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getGpuManufacturers = async () => {
      try {
        const response = await axios.get("/api/gpumanufacturers", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setgpuManufacturers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getGraphics();
    getpciExpressSlotTypes();
    getGpuManufacturers();
    seteccComp([true, false]);
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);
  function setCellValue(rowData, value) {
    rowData.generation = value.generation;
  }
  function setCellValue1(rowData, value) {
    rowData.manufacturerName = value.manufacturerName;
  }
  function onInitNewRow(e) {
    e.data.ChildData = [];
  }
  const pageSizes = [10, 25, 50, 100];
  //const columns = ["id", "username", "password", "email"];
  function onEditorPreparing(e) {
    if (
      e.parentType === "dataRow" &&
      (e.dataField === "generation" || e.dataField === "manufacturerName")
    ) {
      e.editorOptions.onValueChanged = function (ev) {
        let selectedItem = ev.component.option("selectedItem");
        e.setValue(selectedItem);
      };
    }
  }
  return (
    <div>
      <DataGrid
        onEditorPreparing={onEditorPreparing}
        columnAutoWidth={true}
        dataSource={graphics}
        keyExpr="id"
        //  ref={dataGridRef}
        onSaving={onSaving}
        onInitNewRow={onInitNewRow}
      >
        <Paging defaultPageSize={10} defaultPageIndex={0} />
        <Editing
          mode="row"
          allowUpdating={auth.roles[0] === "ROLE_ADMIN" ? true : false}
          allowDeleting={auth.roles[0] === "ROLE_ADMIN" ? true : false}
          allowAdding={auth.roles[0] === "ROLE_ADMIN" ? true : false}
        />
        <FilterRow visible={true} />
        {/* <Column dataField="id" caption="ID" allowEditing={true} /> */}
        <Column
          dataField="modelNumber"
          caption="Model Number"
          allowEditing={true}
        />
        <Column
          dataField="modelName"
          caption="Model Name"
          allowEditing={true}
        />
        <Column
          dataField="manufacturerName"
          caption="Manufacturer"
          allowEditing={true}
          setCellValue={setCellValue1}
        >
          <Lookup
            dataSource={gpuManufacturers}
            displayExpr="manufacturerName"
            valueExpr="manufacturerName"
          />
        </Column>
        <Column
          dataField="generation"
          caption="PCI Express slot"
          allowEditing={true}
          setCellValue={setCellValue}
        >
          <Lookup
            dataSource={pciExpressSlotTypes}
            displayExpr="generation"
            valueExpr="generation"
          />
        </Column>
        <Column dataField="process" caption="Process" allowEditing={true} />
        <Column dataField="wattage" caption="Wattage" allowEditing={true} />
        <Column dataField="tdp" caption="TDP" allowEditing={true} />
        <Column dataField="tfs" caption="TFS" allowEditing={true} />
        <Column
          dataField="clockSpeed"
          caption="Clock speed"
          allowEditing={true}
        />

        <Column dataField="rating" caption="Rating" allowEditing={true} />
        <Column dataField="price" caption="Price" allowEditing={true} />

        {}
      </DataGrid>

      {}
      {}
    </div>
  );
};

export default GraphicsBody;
