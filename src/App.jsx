import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DetailUMKM from "./pages/DetailUMKM";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/detail/:id" element={<DetailUMKM />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
