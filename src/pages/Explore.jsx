import { useState } from "react";

const dummyUMKM = [
  {
    id: 1,
    name: "Kedai Kopi Kenangan Kita",
    category: "Minuman",
    location: "Keputih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Sambal Bu Ana",
    category: "Makanan",
    location: "Keputih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "Toko Ibu",
    category: "Kelontong",
    location: "Keputih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    name: "Captain Barbershop",
    category: "Jasa",
    location: "Mulyosari",
    image: "https://via.placeholder.com/300x200",
  },
];

export default function UMKMList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");

  const filteredUMKM = dummyUMKM.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "Semua" || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* NAVBAR */}
      <nav className="w-full bg-[#0B1D51] shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">UMKM Lokal</h1>
        <ul className="flex gap-6 text-white font-medium">
          <li>
            <a href="/" className="hover:text-[#725CAD] transition">
              Home
            </a>
          </li>
          <li>
            <a href="/umkm" className="hover:text-[#725CAD] transition">
              Explore UMKM
            </a>
          </li>
          <li className="hover:text-[#725CAD] cursor-pointer transition">
            About
          </li>
          <li className="hover:text-[#725CAD] cursor-pointer transition">
            Contact
          </li>
        </ul>
      </nav>
      <div className="min-h-screen bg-[#FFE3A9] text-[#0B1D51] font-sans px-6 py-6">
        <h2 className="text-3xl font-bold text-center mb-8">Daftar UMKM</h2>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Cari UMKM..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#725CAD]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#725CAD]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>Semua</option>
            <option>Makanan</option>
            <option>Minuman</option>
            <option>Fashion</option>
            <option>Kerajinan</option>
          </select>
        </div>

        {/* UMKM Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUMKM.map((umkm) => (
            <div
              key={umkm.id}
              className="bg-white border border-[#0B1D51]/10 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={umkm.image}
                alt={umkm.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{umkm.name}</h3>
                <p className="text-sm text-gray-700">
                  {umkm.category} • {umkm.location}
                </p>

                <button className="mt-4 w-full px-4 py-2 bg-[#0B1D51] text-white rounded-md hover:bg-[#725CAD] transition">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUMKM.length === 0 && (
          <p className="text-center text-lg mt-10">UMKM tidak ditemukan 😥</p>
        )}
      </div>
      {/* FOOTER */}
      <footer className="mt-auto bg-[#0B1D51] text-white text-center py-4">
        <p>© 2025 UMKM Lokal. Berotak Agile.</p>
      </footer>
    </div>
  );
}
