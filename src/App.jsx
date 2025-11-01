import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import About from "./pages/About";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <ScrollToTop />
        <nav className="fixed top-0 w-full z-50 bg-[#0B1D51] shadow-md py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">UMKM Lokal</h1>
          <ul className="flex gap-6 text-white font-medium">
            <li>
              <Link to={`/`} className="hover:text-[#725CAD] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to={`/explore`} className="hover:text-[#725CAD] transition">
                Explore UMKM
              </Link>
            </li>
            <li>
              <Link to={`/about`} className="hover:text-[#725CAD] transition">
                About
              </Link>
            </li>
            <li className="hover:text-[#725CAD] cursor-pointer transition">
              Contact
            </li>
          </ul>
        </nav>

<div className="mt-16 pb-12 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </div>

        {/* FOOTER */}
        <footer className="mt-auto bg-[#0B1D51] text-white text-center py-4">
          <p>© 2025 UMKM Lokal. Berotak Agile.</p>
        </footer>
      </Router>
    </div>
  );
}
