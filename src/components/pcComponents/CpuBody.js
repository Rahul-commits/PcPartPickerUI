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
const CpuBody = () => {
  const { setAuth } = useContext(AuthContext);
  const logout = useLogout();
  const { auth } = useAuth();
  const [cpuSocketTypes, setCpuSocketTypes] = useState();
  const [memoryTypes, setMemoryTypes] = useState();
  const [cpus, setCpus] = useState();
  const [cpuManufacturers, setcpuManufacturers] = useState();
  const [eccComp, seteccComp] = useState();
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
    for (const elem of cpus) {
      if (elem.id === id) {
        id = elem.modelNumber;
        break;
      }
    }
    console.log(cpus);
    if (data["changes"][0]["type"] === "update") {
      const filteredResults = cpus.filter((cpu) => cpu.modelNumber === id);
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        filteredResults[0][key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.put(
          "/api/cpus/" + id,
          filteredResults[0],
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        setCpus(
          cpus.map((cpuData) =>
            cpuData["modelNumber"] === response.data.modelNumber
              ? { ...response.data }
              : cpuData
          )
        );
        console.log(cpus);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "remove") {
      try {
        const response = await axios.delete("/api/cpus/" + id, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setCpus(cpus.filter((cpu) => cpu.modelNumber !== id));
        console.log(cpus);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "insert") {
      var cpu = {};
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        cpu[key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.post("/api/cpus/", cpu, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        setCpus(
          cpus.map((cpuData) =>
            cpuData["modelNumber"] === response.data.modelNumber
              ? { ...response.data }
              : cpuData
          )
        );
        console.log(cpus);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCpus = async () => {
      try {
        const response = await axios.get("/api/cpus", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setCpus(response.data);
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
    getCpus();
    getCpuManufacturers();
    getCPUSocketTypes();
    getMemoryTypes();
    seteccComp([{ eccValue: true }, { eccValue: false }]);

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);
  // const pageSizes = [10, 25, 50, 100];
  //const columns = ["id", "username", "password", "email"];
  function setCellValue1(rowData, value) {
    rowData.eccCompatibility = value.eccValue;
  }
  function setCellValue(rowData, value) {
    rowData.manufacturerName = value.manufacturerName;
  }
  function setCellValue2(rowData, value) {
    rowData.socket = value.socket;
  }
  function setCellValue3(rowData, value) {
    rowData.ramGeneration = value.ramGeneration;
  }
  function onInitNewRow(e) {
    e.data.ChildData = [];
  }
  const pageSizes = [10, 25, 50, 100];
  //const columns = ["id", "username", "password", "email"];
  function onEditorPreparing(e) {
    if (
      e.parentType === "dataRow" &&
      (e.dataField === "eccCompatibility" ||
        e.dataField === "manufacturerName" ||
        e.dataField === "ramGeneration" ||
        e.dataField === "socket")
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
        dataSource={cpus}
        keyExpr="id"
        allowColumnResizing={true}
        //  ref={dataGridRef}
        onSaving={onSaving}
      >
        <Paging defaultPageSize={10} defaultPageIndex={0} />
        {/* <Pager showPageSizeSelector={true} showNavigationButtons={true} /> */}
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
        <Column dataField="numberOfCores" caption="Cores" allowEditing={true} />
        <Column dataField="tdp" caption="TDP" allowEditing={true} />
        <Column dataField="frequency" caption="Frequency" allowEditing={true} />

        <Column
          dataField="socket"
          caption="CPU socket"
          allowEditing={true}
          setCellValue={setCellValue2}
        >
          <Lookup
            dataSource={cpuSocketTypes}
            displayExpr="socket"
            valueExpr="socket"
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
        <Column
          dataField="eccCompatibility"
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
        <Column
          dataField="architecture"
          caption="Architecture"
          allowEditing={true}
        />

        <Column dataField="wattage" caption="Wattage" allowEditing={true} />
        <Column dataField="clock" caption="Clock" allowEditing={true} />
        <Column dataField="rating" caption="Rating" allowEditing={true} />
        <Column dataField="price" caption="Price" allowEditing={true} />

        {}
      </DataGrid>

      {}
      {}
    </div>
  );
};

export default CpuBody;
