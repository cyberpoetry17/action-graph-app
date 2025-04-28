import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/molecules/Navbar";
import GraphPage from "./components/pages/GraphPage";
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
            <Route path="/" element={<GraphPage />} />
          </Routes>
        </div>
      </FormProvider>
    </div>
  );
};

export default App;
