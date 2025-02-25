import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import HomePage from "./pages/Listing";
// import MapPage from "./pages/MapPage";
import { Toaster } from "react-hot-toast";
import Mapping from "./pages/Mapping";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user" element={<HomePage />} />
        <Route path="/user/map" element={<Mapping />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
