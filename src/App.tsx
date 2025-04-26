import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/molecules/Navbar";
import GraphOverview from "./components/pages/GraphOverview";

const App = () => {
  return (
    <div className="grid-container">
      <div className="grid-item-navbar">
        <Navbar />
      </div>
      <div className="grid-item-chart">
        <Routes>
          <Route path="/" element={<GraphOverview />} />
          <Route path="/1" element={<></>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
