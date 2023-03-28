import GridView from "./GridView";
import HomeView from "./HomeView";
import { Route, Routes } from "react-router-dom";
import Ram from "./Ram";

const Testing = () => {
  return (
    <div>
      <Ram />
      <div className="content-container">
        {/* <Routes>
          <Route path="/homeView" element={<HomeView />} />
          <Route path="/gridView" element={<GridView />} />
        </Routes> */}
      </div>
    </div>
  );
};
export default Testing;
