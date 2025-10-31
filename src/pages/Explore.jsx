import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useSearchParams } from "react-router-dom";

export default function Explore() {
  const [umkm, setUmkm] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    fetchUMKM();
  }, []);

  async function fetchUMKM() {
    setLoading(true);
    const { data, error } = await supabase.from("umkm").select("*");
    if (error) console.error(error);
    else setUmkm(data);
    setLoading(false);
  }

  useEffect(() => {
    // Jika ada parameter 'category' di URL
    if (categoryFilter) {
      // Periksa apakah nilai dari URL ada di daftar kategori yang valid
      if (categories.includes(categoryFilter)) {
        // Atur state filter untuk mencerminkan filter URL
        setFilter(categoryFilter); 
      } else {
        // Jika ada filter tapi tidak valid, kembalikan ke "Semua"
        setFilter("Semua"); 
      }
    } else {
      // Jika tidak ada parameter 'category' di URL, pastikan filter juga "Semua"
      setFilter("Semua");
    }
  }, [categoryFilter]);

  const filteredUMKM = umkm.filter((item) => {
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

  const categories = [
    "Semua",
    "Makanan",
    "Minuman",
    "Jasa",
    "Kelontong",
    "Fashion",
  ];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-[#0B1D51] text-xl">
        Memuat data UMKM...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-[#0B1D51]">Jelajahi UMKM</h1>

    {categoryFilter && (
      <Link
          to="/explore"
          className="mb-4 inline-block px-4 py-2 bg-[#8CCDEB] rounded-lg text-[#0B1D51] font-medium hover:bg-[#FFE3A9] transition">
            ← Tampilkan Semua UMKM
          </Link>
    )}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-lg shadow-md sticky top-18">
        <input
          type="text"
          placeholder="Cari nama UMKM..."
          className="w-full md:w-3/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#725CAD]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#725CAD] w-full md:w-1/4"
          value={filter}
          onChange={(e) => {
              setFilter(e.target.value);
              if (categoryFilter) {
                  searchParams.delete('category');
              }
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredUMKM.length > 0 ? (
          filteredUMKM.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-xl text-[#725CAD]">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-500 mt-1">{item.location}</p>

              <Link
                to={`/detail/${item.id}`}
                className="inline-block mt-3 px-4 py-2 bg-[#8CCDEB] rounded-lg text-[#0B1D51] font-medium hover:bg-[#FFE3A9] transition"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))
      ) : (<p className="text-center col-span-full text-gray-600">Tidak ada UMKM yang cocok dengan kriteria pencarian.</p>
        )}
      </div>
    </div>
  );
}
