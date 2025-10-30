import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import About from "./pages/About";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <nav className="w-full bg-[#0B1D51] shadow-md py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">UMKM Lokal</h1>
          <ul className="flex gap-6 text-white font-medium">
            <li>
              <a href="/" className="hover:text-[#725CAD] transition">
                Home
              </a>
            </li>
            <li>
              <a href="/explore" className="hover:text-[#725CAD] transition">
                Explore UMKM
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#725CAD] transition">
                About
              </a>
            </li>
            <li className="hover:text-[#725CAD] cursor-pointer transition">
              Contact
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* FOOTER */}
        <footer className="mt-auto bg-[#0B1D51] text-white text-center py-4">
          <p>© 2025 UMKM Lokal. Berotak Agile.</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}
