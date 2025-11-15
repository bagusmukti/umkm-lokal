import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import UMKMHighlight from "./pages/UMKMHighlight";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B1D51] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white hover:text-[#725CAD] transition-colors duration-300">
            UMKM Lokal
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-white font-medium">
            <li>
              <Link 
                to="/" 
                className="hover:text-[#725CAD] transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/explore" 
                className="hover:text-[#725CAD] transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Explore UMKM
              </Link>
            </li>
            <li>
              <Link
                to="/highlight"
                className="hover:text-[#725CAD] transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                UMKM of The Week
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-[#725CAD] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-64 opacity-100 visible pb-4' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0B1D51]/95 backdrop-blur-sm rounded-lg border-t border-white/10">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-white hover:text-[#725CAD] hover:bg-white/10 block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:translate-x-2"
            >
              🏠 Home
            </Link>
            <Link
              to="/explore"
              onClick={closeMenu}
              className="text-white hover:text-[#725CAD] hover:bg-white/10 block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:translate-x-2"
            >
              🔍 Explore UMKM
            </Link>
            <Link
              to="/highlight"
              onClick={closeMenu}
              className="text-white hover:text-[#725CAD] hover:bg-white/10 block px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:translate-x-2"
            >
              ⭐ UMKM of The Week
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <ScrollToTop />
        <Navbar />

        <div className="mt-16 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/highlight" element={<UMKMHighlight />} />
          </Routes>
        </div>

        {/* FOOTER */}
        <footer className="mt-auto bg-[#0B1D51] text-white text-center py-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Tim Berotak Agile. Dibuat untuk
            Web in Action.
          </p>
        </footer>
      </Router>
    </div>
  );
}
