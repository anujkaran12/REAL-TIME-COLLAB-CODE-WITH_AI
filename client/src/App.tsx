import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

import Dashboard from "./pages/Dashboard/Dashboard";
import RoomPage from "./pages/RoomPage/RoomPage";
import PageNotFound from "./components/Utility/PageNotFound/PageNotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<RoomPage />} />
        {/* <Route path="/RoomPage" element={<RoomPage />} /> */}
        <Route path="/Room" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;
