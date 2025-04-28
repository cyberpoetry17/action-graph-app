import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/molecules/Navbar";
import GraphOverview from "./components/pages/GraphOverview";
import { FormProvider } from "./store";

const App = () => {
  return (
    <div className="grid-container">
      <FormProvider>
        <div className="grid-item-navbar">
          <Navbar />
        </div>
        <div className="grid-item-chart">
          <Routes>
            <Route path="/" element={<GraphOverview />} />
          </Routes>
        </div>
      </FormProvider>
    </div>
  );
};

export default App;
