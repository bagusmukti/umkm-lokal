import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useSearchParams } from "react-router-dom";

export default function Explore() {
  const [umkm, setUmkm] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [activeTags, setActiveTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const categories = ["Makanan", "Minuman", "Jasa", "Kelontong", "Fashion"];

  useEffect(() => {
    document.title = "Direktori UMKM Lokal - Jelajahi";
    fetchUMKM();
  }, []);

  async function fetchUMKM() {
    setLoading(true);
    const { data, error } = await supabase.from("umkm").select("*");
    if (error) console.error(error);
    else {
      const fetchedUmkm = data || [];
      setUmkm(fetchedUmkm);

      const uniqueTags = new Set();
      fetchedUmkm.forEach((item) => {
        const tagsString = item.tags || "";
        const tagsArray =
          typeof tagsString === "string"
            ? tagsString
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t)
            : Array.isArray(tagsString)
            ? tagsString
            : [];

        tagsArray.forEach((tag) => uniqueTags.add(tag));
      });
      setAllTags(Array.from(uniqueTags));
    }
    setLoading(false);
  }

  useEffect(() => {
    setActiveTags([]);
    setSearch("");

    if (categoryFilter) {
      if (categories.includes(categoryFilter)) {
        setActiveCategories([categoryFilter]);
      } else {
        setActiveCategories([]);
      }
    } else {
      setActiveCategories([]);
    }
  }, [categoryFilter]);

  const handleCategoryToggle = (category) => {
    if (category === "Semua") {
      setActiveCategories([]);
    } else if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter((c) => c !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }

    if (categoryFilter) {
      setSearchParams({}, { replace: true });
    }
    setActiveTags([]);
  };

  const handleTagToggle = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const filteredUMKM = umkm.filter((item) => {
    const name = (item.name || item.nama || "").toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase());

    const itemCategories = (item.category || item.kategori || "")
      .split(",")
      .map((cat) => cat.trim());

    const matchesFilter =
      activeCategories.length === 0 ||
      activeCategories.some((activeCat) => itemCategories.includes(activeCat));

    const itemTags =
      (typeof item.tags === "string"
        ? item.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t)
        : Array.isArray(item.tags)
        ? item.tags
        : []) || [];

    const matchesTags =
      activeTags.length === 0 ||
      activeTags.every((tag) => itemTags.includes(tag));

    return matchesSearch && matchesFilter && matchesTags;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-[#0B1D51]">Memuat data UMKM...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#0B1D51] text-center">
          Jelajahi UMKM
        </h1>
        <p className="text-lg text-gray-600 text-center mt-2">
          Temukan UMKM yang sesuai dengan kebutuhanmu
        </p>
      </div>

      <div className="container mx-auto px-4 mb-8 sticky top-[65px] z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Tombol Reset (Jika ada filter dari URL Home) */}
          {categoryFilter && (
            <button
              onClick={() => setSearchParams({}, { replace: true })}
              className="inline-block px-4 py-2 bg-[#8CCDEB] rounded-lg text-[#0B1D51] font-medium hover:bg-[#FFE3A9] transition"
            >
              ← Reset Filter Awal
            </button>
          )}

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Cari nama UMKM..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#725CAD]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* FILTER KATEGORI (MULTI-SELECT BUTTONS) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              Kategori (Pilih lebih dari satu)
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* Tombol "Semua" - untuk mereset multi-select */}
              <button
                onClick={() => handleCategoryToggle("Semua")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
                  ${
                    activeCategories.length === 0
                      ? "bg-[#725CAD] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                Semua
              </button>

              {/* Tombol Kategori Lain */}
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
                    ${
                      activeCategories.includes(category)
                        ? "bg-[#725CAD] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FILTER TAGS (BUTTONS) */}
          {allTags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                Situasional (Tags)
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${
                          activeTags.includes(tag)
                            ? "bg-[#FFE3A9] text-[#0B1D51] shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="container mx-auto px-4 pb-12">
        <p className="text-gray-500 mb-4">
          Menampilkan {filteredUMKM.length} dari {umkm.length} UMKM
        </p>

        {/* HASIL FILTERING */}
        {filteredUMKM.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUMKM.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name || item.nama}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-xl text-[#725CAD] mb-2">
                    {item.name || item.nama}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    {item.category || item.kategori}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {item.location || item.lokasi}
                  </p>

                  {/* Tampilkan Tags di Card */}
                  {(item.tags?.length > 0 ||
                    (typeof item.tags === "string" && item.tags)) && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(typeof item.tags === "string"
                        ? item.tags.split(",")
                        : item.tags
                      )
                        .filter((t) => t.trim())
                        .map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-xs bg-[#FFE3A9] text-[#0B1D51] rounded-full font-medium"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                    </div>
                  )}

                  {typeof item.rating === "number" && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-amber-500">★</span>
                      <span className="font-medium">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                  <Link
                    to={`/detail/${item.id}`}
                    className="inline-block px-4 py-2 bg-[#8CCDEB] rounded-lg text-[#0B1D51] font-medium hover:bg-[#FFE3A9] transition"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-16 col-span-full">
            <h3 className="text-2xl font-semibold mb-2">Oops!</h3>
            <p>Tidak ada UMKM yang cocok dengan kriteria pencarianmu.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategories([]);
                setActiveTags([]);
              }}
              className="mt-4 px-4 py-2 bg-[#725CAD] text-white rounded-lg font-semibold hover:bg-[#8CCDEB] transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
