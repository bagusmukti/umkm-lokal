import { useState } from "react";
import { Link } from "react-router-dom";

const dummyUMKM = [
  {
    id: 1,
    name: "Teh Poci Keputih",
    category: "Minuman",
    location: "Keputih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Ketoprak Jakarta 66",
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
  {
    id: 5,
    name: "Warung Penyetan IBU YONO",
    category: "Makanan",
    location: "Jl. Gebang Lor No.100, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 6,
    name: "Warung Penyetan Anda",
    category: "Makanan",
    location: "Gg. Puskesmas No.8, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 7,
    name: "Warung Sederhana Gresik",
    category: "Makanan, Minuman",
    location: "Jl. Gebang Putih, No.90, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 8,
    name: "Warung Hanna 89",
    category: "Makanan, Minuman",
    location: "Jl. Gebang Lor No.89, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 9,
    name: "Keke Juice",
    category: "Minuman",
    location: "Jl. Gebang Lor No.9, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 10,
    name: "QONTAK BARBERSHOP",
    category: "Jasa",
    location: "Jl. Gebang Lor No.42, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 11,
    name: "Barra Barber Shop",
    category: "Jasa",
    location: "Gebang Putih",
    image: "https://via.placeholder.com/300x200",
  },
    {
    id: 12,
    name: "Warung Kane",
    category: "Makanan",
    location: "Keputih",
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
    const matchesFilter =
      filter === "Semua" ||
      item.category
        .split(",")
        .map((cat) => cat.trim())
        .includes(filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="min-h-screen bg-[#FFE3A9] text-[#0B1D51] font-sans px-6 py-6">
        <h2 className="text-3xl font-bold text-center mb-8">Daftar UMKM</h2>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Cari UMKM..."
            className="w-full md:w-3/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#725CAD]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="w-full md:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#725CAD]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>Semua</option>
            <option>Makanan</option>
            <option>Minuman</option>
            <option>Fashion</option>
            <option>Kerajinan</option>
            <option>Jasa</option>
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

                <Link
                  to={`/detail/${umkm.id}`}
                  className="mt-4 w-full block text-center px-4 py-2 bg-[#0B1D51] text-white rounded-md hover:bg-[#725CAD] transition"
                >
                  Lihat Detail
                </Link>
                {/* <button className="mt-4 w-full px-4 py-2 bg-[#0B1D51] text-white rounded-md hover:bg-[#725CAD] transition">
                  Lihat Detail
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {filteredUMKM.length === 0 && (
          <p className="text-center text-lg mt-10">UMKM tidak ditemukan 😥</p>
        )}
      </div>
    </div>
  );
}
