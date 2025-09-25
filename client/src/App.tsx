import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/Utility/Loading/Loading";

// Lazy imports
const Home = lazy(() => import("./pages/Home/Home"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const RoomPage = lazy(() => import("./pages/RoomPage/RoomPage"));
const PageNotFound = lazy(() => import("./components/Utility/PageNotFound/PageNotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<RoomPage />} />
          {/* <Route path="/RoomPage" element={<RoomPage />} /> */}
          <Route path="/Room" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
