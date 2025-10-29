import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Pages" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
