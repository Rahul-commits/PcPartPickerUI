import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { themes } from "devextreme/ui/themes";
import "devextreme/dist/css/dx.dark.css";
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
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";

const MotherboardBody = () => {
  const { setAuth } = useContext(AuthContext);
  const logout = useLogout();
  const { auth } = useAuth();
  const [eccComp, seteccComp] = useState();
  const [motherboards, setMotherboards] = useState();
  const [cpuSocketTypes, setCpuSocketTypes] = useState();
  const [memoryTypes, setMemoryTypes] = useState();
  const [dimmSlotTypes, setDimmSlotTypes] = useState();
  const [pciExpressSlotTypes, setPciExpressSlotTypes] = useState();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [editingRowKey, setEditingRowKey] = useState("");
  const [editedRowData, setEditedRowData] = useState({
    modelNumber: "",
    productName: "",
    eccCompatibility: "",
    wattage: "",
  });
  const dataGridRef = useRef(null);

  const onSaving = async (data) => {
    let id = data["changes"][0].key;
    for (const elem of motherboards) {
      if (elem.id === id) {
        id = elem.modelNumber;
        break;
      }
    }
    console.log(motherboards);
    if (data["changes"][0]["type"] === "update") {
      const filteredResults = motherboards.filter(
        (motherboard) => motherboard.modelNumber === id
      );
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        filteredResults[0][key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.put(
          "/api/motherboards/" + id,
          filteredResults[0],
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        setMotherboards(
          motherboards.map((motherboardData) =>
            response.data.modelNumber === motherboardData["modelNumber"]
              ? { ...response.data }
              : motherboardData
          )
        );
        console.log(motherboards);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "remove") {
      try {
        const response = await axios.delete("/api/motherboards/" + id, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setMotherboards(
          motherboards.filter((motherboard) => motherboard.modelNumber !== id)
        );
        console.log(motherboards);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "insert") {
      var motherboard = {};
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        motherboard[key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.post("/api/motherboards/", motherboard, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        // for (const elem of motherboards) {
        //   if (elem.modelNumber === motherboard["modelNumber"]) {
        //     elem.id = response.data.id;
        //     elem.modelNumber = response.data.modelNumber;
        //     //  elem.modelNumber = response.modelNumber;
        //     break;
        //   }
        // }
        // setMotherboards(motherboards);
        //   console.log(...response.data);
        console.log(response.data);
        // setMotherboards(
        //   motherboards.map((motherboardData) =>
        //     motherboardData.modelNumber === motherboard["modelNumber"]
        //       ? { ...response.data }
        //       : motherboardData
        //   )
        // );
        setMotherboards(
          motherboards.map((motherboardData) =>
            response.data.modelNumber === motherboardData["modelNumber"]
              ? { ...response.data }
              : motherboardData
          )
        );
        console.log(motherboards);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMotherboards = async () => {
      try {
        const response = await axios.get("/api/motherboards", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setMotherboards(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getCPUSocketTypes = async () => {
      try {
        const response = await axios.get("/api/cpusockets", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setCpuSocketTypes(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getMemoryTypes = async () => {
      try {
        const response = await axios.get("/api/memorytypes", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setMemoryTypes(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getDimslotTypes = async () => {
      try {
        const response = await axios.get("/api/dimslots", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setDimmSlotTypes(response.data);
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
    getMotherboards();
    getCPUSocketTypes();
    getMemoryTypes();
    getDimslotTypes();
    getpciExpressSlotTypes();
    seteccComp([{ eccValue: true }, { eccValue: false }]);
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);
  function setCellValue1(rowData, value) {
    rowData.memoryTypeId = value.memoryTypeId;
  }
  function setCellValue(rowData, value) {
    rowData.dimmSlotTypeId = value.slotTypeId;
  }
  function setCellValue2(rowData, value) {
    rowData.pciGeneration = value.generation;
  }
  function setCellValue4(rowData, value) {
    rowData.eccCompatibility = value.eccValue;
  }
  const pageSizes = [10, 25, 50, 100];
  //const columns = ["id", "username", "password", "email"];
  function onEditorPreparing(e) {
    if (
      (e.parentType === "dataRow" && e.dataField === "memoryTypeId") ||
      e.dataField === "dimmSlotTypeId" ||
      e.dataField === "pciGeneration" ||
      e.dataField === "eccCompatibility"
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
        dataSource={motherboards}
        keyExpr="id"
        //  ref={dataGridRef}
        onSaving={onSaving}
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
        <Column dataField="productName" caption="Name" allowEditing={true} />
        <Column
          dataField="eccCompatibility"
          caption="Ecc Compatibility"
          allowEditing={true}
          setCellValue={setCellValue4}
        >
          <Lookup
            dataSource={eccComp}
            displayExpr="eccValue"
            valueExpr="eccValue"
          />
        </Column>
        <Column dataField="wattage" caption="Wattage" allowEditing={true} />
        <Column
          dataField="dimmSlotTypeId"
          caption="Dimm Slot Type Id"
          allowEditing={true}
          setCellValue={setCellValue}
        >
          <Lookup
            dataSource={dimmSlotTypes}
            displayExpr="slotTypeId"
            valueExpr="slotTypeId"
          />
        </Column>
        <Column
          dataField="memoryTypeId"
          caption="Memory Type Id"
          allowEditing={true}
          setCellValue={setCellValue1}
        >
          <Lookup
            dataSource={memoryTypes}
            displayExpr="memoryTypeId"
            valueExpr="memoryTypeId"
          />
        </Column>
        <Column dataField="rating" caption="Rating" allowEditing={true} />
        <Column dataField="price" caption="Price" allowEditing={true} />
        <Column dataField="quantity" caption="Quantity" allowEditing={true} />
        <Column
          dataField="pciGeneration"
          caption="Generation"
          allowEditing={true}
          setCellValue={setCellValue2}
        >
          <Lookup
            dataSource={pciExpressSlotTypes}
            displayExpr="generation"
            valueExpr="generation"
          />
        </Column>
        {}
      </DataGrid>

      {}
      {}
    </div>
  );
};

export default MotherboardBody;
