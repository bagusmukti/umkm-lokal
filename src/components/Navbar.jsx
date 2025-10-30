import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <Link 
          to="/" 
          className="text-2xl font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Lokal<span className="font-light text-gray-800">Direktori</span>
        </Link>
        {/* Di sini kalian bisa menambahkan menu lain jika perlu */}
      </div>
    </nav>
  );
}

export default Navbar;