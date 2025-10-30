import React, { useState, useEffect } from 'react';
import umkmData from '../data/umkm.json'; 
import UMKMCard from '../components/UMKMCard';
// BARU: Import Navbar dan Footer
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- Helper (Tidak berubah) ---
const allCategories = ["Semua", ...new Set(umkmData.map(item => item.kategori))];
const allTags = [...new Set(umkmData.flatMap(item => item.tags))];


function Home() {
  
  // --- States (Tidak berubah) ---
  const [originalList, setOriginalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeTags, setActiveTags] = useState([]);

  
  // --- Load Data & Title (Update) ---
  useEffect(() => {
    // BARU: Set judul halaman
    document.title = 'Direktori UMKM Lokal - Halaman Utama';

    setOriginalList(umkmData);
    setFilteredList(umkmData);
  }, []); // Hanya berjalan sekali


  // --- Logika Filter (Tidak berubah) ---
  useEffect(() => {
    let list = [...originalList];

    if (searchQuery.length > 0) {
      list = list.filter(item => 
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeCategory !== "Semua") {
      list = list.filter(item => 
        item.kategori === activeCategory
      );
    }
    if (activeTags.length > 0) {
      list = list.filter(item => 
        activeTags.every(tag => item.tags.includes(tag))
      );
    }
    setFilteredList(list);
  }, [searchQuery, activeCategory, activeTags, originalList]);


  // --- Event Handlers (Tidak berubah) ---
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryClick = (kategori) => setActiveCategory(kategori);
  const handleTagToggle = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };


  // --- JSX (Update) ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* BARU: Gunakan komponen Navbar */}
      <Navbar />
      
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Temukan UMKM Lokal Favoritmu
        </h1>
        <p className="text-lg text-gray-600 text-center mt-2">
          Jelajahi dan dukung bisnis lokal di sekitarmu.
        </p>
      </header>

      {/* --- Area Kontrol (Update di sticky) --- */}
      <div className="container mx-auto px-4 mb-8 sticky top-[65px] z-10"> {/* Disesuaikan agar di bawah navbar */}
        
        {/* Search Bar (Tidak berubah) */}
        <div className="mb-4 p-4 bg-white rounded-lg shadow-lg">
          <input 
            type="text" 
            placeholder="Cari nama UMKM..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Filter Kategori (Update di hover) */}
        <div className="mb-4 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Kategori</h3>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((kategori) => (
              <button 
                key={kategori}
                onClick={() => handleCategoryClick(kategori)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeCategory === kategori 
                    ? 'bg-emerald-700 text-white shadow-md' 
                    // BARU: Tambah hover state
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  }
                `}
              >
                {kategori}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Tag Situasional (Update di hover) */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Situasional</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button 
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeTags.includes(tag) 
                    ? 'bg-amber-500 text-white shadow-md' 
                    // BARU: Tambah hover state
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* --- Grid Daftar UMKM --- */}
      <main className="container mx-auto px-4 pb-12">
        <p className="text-gray-500 mb-4">
          Menampilkan {filteredList.length} dari {originalList.length} UMKM.
        </p>

        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((umkm) => (
              <UMKMCard key={umkm.id} umkm={umkm} />
            ))}
          </div>
        ) : (
          // Pesan 'Tidak Ditemukan'
          <div className="text-center text-gray-500 mt-16 col-span-full">
            <h3 className="text-2xl font-semibold mb-2">Oops!</h3>
            <p>Tidak ada UMKM yang cocok dengan filter pencarianmu.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua");
                setActiveTags([]);
              }}
              className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </main>
      
      {/* BARU: Gunakan komponen Footer */}
      <Footer />
    </div>
  );
}

export default Home;