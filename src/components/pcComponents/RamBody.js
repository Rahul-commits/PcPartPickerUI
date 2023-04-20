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

const RamBody = () => {
  const { setAuth } = useContext(AuthContext);
  const logout = useLogout();
  const { auth } = useAuth();
  const [eccComp, seteccComp] = useState();
  const [cpuSocketTypes, setCpuSocketTypes] = useState();
  const [memoryTypes, setMemoryTypes] = useState();
  const [dimmSlotTypes, setDimmSlotTypes] = useState();
  const [cpuManufacturers, setcpuManufacturers] = useState();

  const [rams, setRams] = useState();
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
    for (const elem of rams) {
      if (elem.id === id) {
        id = elem.modelNumber;
        break;
      }
    }
    console.log(rams);
    if (data["changes"][0]["type"] === "update") {
      const filteredResults = rams.filter((ram) => ram.modelNumber === id);
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        filteredResults[0][key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.put(
          "/api/rams/" + id,
          filteredResults[0],
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        setRams(
          rams.map((ramData) =>
            response.data.modelNumber === ramData["modelNumber"]
              ? { ...response.data }
              : ramData
          )
        );
        console.log(rams);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "remove") {
      try {
        const response = await axios.delete("/api/rams/" + id, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setRams(rams.filter((ram) => ram.modelNumber !== id));
        console.log(rams);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "insert") {
      var ram = {};
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        ram[key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.post("/api/rams/", ram, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        setRams(
          rams.map((ramData) =>
            response.data.modelNumber === ramData["modelNumber"]
              ? { ...response.data }
              : ramData
          )
        );

        console.log(rams);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getRams = async () => {
      try {
        const response = await axios.get("/api/rams", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setRams(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    const getCpuManufacturers = async () => {
      try {
        const response = await axios.get("/api/cpumanufacturers", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setcpuManufacturers(response.data);
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
    getRams();
    getMemoryTypes();
    getDimslotTypes();
    getCpuManufacturers();
    seteccComp([{ eccValue: true }, { eccValue: false }]);
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);
  function setCellValue1(rowData, value) {
    rowData.ecc = value.eccValue;
  }
  function setCellValue(rowData, value) {
    rowData.manufacturerName = value.manufacturerName;
  }
  function setCellValue2(rowData, value) {
    rowData.slotName = value.slotName;
  }
  function setCellValue3(rowData, value) {
    rowData.ramGeneration = value.ramGeneration;
  }
  const pageSizes = [10, 25, 50, 100];
  //const columns = ["id", "username", "password", "email"];
  function onEditorPreparing(e) {
    if (
      (e.parentType === "dataRow" && e.dataField === "ramGeneration") ||
      e.dataField === "ecc" ||
      e.dataField === "manufacturerName" ||
      e.dataField === "slotName"
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
        dataSource={rams}
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
        <Column
          dataField="modelName"
          caption="Model Name"
          allowEditing={true}
        />
        <Column
          dataField="numberOfDims"
          caption="Number of dims"
          allowEditing={true}
        />
        <Column
          dataField="manufacturerName"
          caption="Compatible Cpu"
          allowEditing={true}
          setCellValue={setCellValue}
        >
          <Lookup
            dataSource={cpuManufacturers}
            displayExpr="manufacturerName"
            valueExpr="manufacturerName"
          />
        </Column>
        <Column dataField="frequency" caption="Frequency" allowEditing={true} />
        <Column
          dataField="ecc"
          caption="Ecc Compatibility"
          allowEditing={true}
          setCellValue={setCellValue1}
        >
          <Lookup
            dataSource={eccComp}
            displayExpr="eccValue"
            valueExpr="eccValue"
          />
        </Column>
        <Column dataField="wattage" caption="Wattage" allowEditing={true} />
        <Column
          dataField="slotName"
          caption="Dimm Slot Type Id"
          allowEditing={true}
          setCellValue={setCellValue2}
        >
          <Lookup
            dataSource={dimmSlotTypes}
            displayExpr="slotName"
            valueExpr="slotName"
          />
        </Column>
        <Column
          dataField="ramGeneration"
          caption="Memory Type Id"
          allowEditing={true}
          setCellValue={setCellValue3}
        >
          <Lookup
            dataSource={memoryTypes}
            displayExpr="ramGeneration"
            valueExpr="ramGeneration"
          />
        </Column>
        <Column dataField="rating" caption="Rating" allowEditing={true} />
        <Column dataField="price" caption="Price" allowEditing={true} />

        {}
      </DataGrid>

      {}
      {}
    </div>
  );
};

export default RamBody;
