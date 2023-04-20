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
import { Popup } from "devextreme-react";

const PCConfigBody = () => {
  const { setAuth } = useContext(AuthContext);
  const logout = useLogout();
  const { auth } = useAuth();
  const [popUpVis, setPopUpVis] = useState();
  const [pcConfigs, setPcConfigs] = useState();
  const [ramConfigs, setRamConfigs] = useState();
  const [mbConfigs, setMbConfigs] = useState();
  const [cpuConfigs, setCpuConfigs] = useState();
  const [graphicsCardsConfigs, setGraphicsCardsConfigs] = useState();
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
    console.log(pcConfigs);
    if (data["changes"][0]["type"] === "update") {
      const filteredResults = pcConfigs.filter(
        (pcConfig) => pcConfig.id === data["changes"][0].key
      );
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        filteredResults[0][key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.put(
          "/api/pcConfigs/" + id,
          filteredResults[0],
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        for (const elem of pcConfigs) {
          if (elem.id === data["changes"][0].data["id"]) {
            elem.id = response.data.newPCConfigId;
          }
        }
        console.log(pcConfigs);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "remove") {
      try {
        const response = await axios.delete("/api/pcConfigs/" + id, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setPcConfigs(pcConfigs.filter((pcConfig) => pcConfig.id !== id));
        console.log(pcConfigs);
      } catch (err) {
        console.error(err);
      }
    } else if (data["changes"][0]["type"] === "insert") {
      var pcConfig = {};
      let myObject = Object.keys(data["changes"][0].data);
      myObject.forEach(function (key, index) {
        pcConfig[key] = data["changes"][0].data[key];
      });

      try {
        const response = await axios.post(
          "/api/pcConfigs/" + auth.user,
          pcConfig,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );

        // setPcConfigs(
        //   pcConfigs.map((pcConfigData) =>
        //     pcConfigData.productName === pcConfig["productName"]
        //       ? { ...response.data }
        //       : pcConfigData
        //   )
        // );
        if (!response.data.isCorrectConfig) {
          setPcConfigs(
            pcConfigs.filter(
              (pcConfigData) =>
                pcConfigData.id !== data["changes"][0].data["id"]
            )
          );
          setPopUpVis(true);
        } else {
          for (const elem of pcConfigs) {
            if (elem.id === data["changes"][0].data["id"]) {
              elem.id = response.data.newPCConfigId;
            }
          }
        }
        console.log(pcConfigs);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setPopUpVis(false);
    const getPcConfigs = async () => {
      try {
        const response = await axios.get("/api/pcConfigs/" + auth.user, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });

        isMounted && setPcConfigs(response.data.pcConfigurationList);
        isMounted && setCpuConfigs(response.data.cpus);
        isMounted && setMbConfigs(response.data.motherboards);
        isMounted && setRamConfigs(response.data.rams);
        isMounted && setGraphicsCardsConfigs(response.data.graphicsCards);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPcConfigs();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);
  const pageSizes = [10, 25, 50, 100];
  //const columns = ["id", "username", "password", "email"];
  function setCellValue(rowData, value) {
    rowData.cpu = value.modelName;
  }
  function setCellValue1(rowData, value) {
    rowData.ram = value.modelName;
  }
  function setCellValue2(rowData, value) {
    rowData.motherboard = value.productName;
  }
  function setCellValue3(rowData, value) {
    rowData.graphicsCard = value.modelName;
  }
  function handlePopupHidden() {
    setPopUpVis(false);
  }
  function renderPopup() {
    return (
      <div className="popup-property-details">
        <p>Configuration is incorrect</p>
        {/* <br /> */}
        <p>Please Try again</p>
      </div>
    );
  }
  function onEditorPreparing(e) {
    if (
      (e.parentType === "dataRow" && e.dataField === "cpu") ||
      e.dataField === "ram" ||
      e.dataField === "motherboard" ||
      e.dataField === "graphicsCard"
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
        dataSource={pcConfigs}
        allowColumnResizing={true}
        keyExpr="id"
        //  ref={dataGridRef}
        onSaving={onSaving}
      >
        <Editing
          mode="row"
          allowUpdating={auth.roles[0] === "ROLE_USER" ? true : false}
          allowDeleting={auth.roles[0] === "ROLE_USER" ? true : false}
          allowAdding={auth.roles[0] === "ROLE_USER" ? true : false}
        />
        <FilterRow visible={true} />

        {/* <Column dataField="id" caption="ID" allowEditing={true} /> */}
        <Column
          dataField="cpu"
          caption="CPU"
          allowEditing={true}
          setCellValue={setCellValue}
        >
          <Lookup
            dataSource={cpuConfigs}
            displayExpr="modelName"
            valueExpr="modelName"
          />
        </Column>
        <Column
          dataField="ram"
          caption="Ram"
          allowEditing={true}
          setCellValue={setCellValue1}
        >
          <Lookup
            dataSource={ramConfigs}
            displayExpr="modelName"
            valueExpr="modelName"
          />
        </Column>

        <Column
          dataField="motherboard"
          caption="Motherboard"
          allowEditing={true}
          setCellValue={setCellValue2}
        >
          <Lookup
            dataSource={mbConfigs}
            displayExpr="productName"
            valueExpr="productName"
          />
        </Column>
        <Column
          dataField="graphicsCard"
          caption="Graphics"
          allowEditing={true}
          setCellValue={setCellValue3}
        >
          <Lookup
            dataSource={graphicsCardsConfigs}
            displayExpr="modelName"
            valueExpr="modelName"
          />
        </Column>
        {}
      </DataGrid>

      {}
      {}
      <Popup
        width={660}
        height={540}
        showTitle={true}
        title={"Error"}
        dragEnabled={false}
        hideOnOutsideClick={true}
        visible={popUpVis}
        onHiding={handlePopupHidden}
        contentRender={renderPopup}
        width={200}
        height={150}
      />
    </div>
  );
};

export default PCConfigBody;
