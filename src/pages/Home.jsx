import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const [recommended, setRecommended] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Direktori UMKM Lokal - Beranda";
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      const { data: recData, error: recError } = await supabase
        .from("umkm")
        .select("*")
        .order("rating", { ascending: false })
        .limit(6);

      if (recError) throw recError;
      setRecommended(recData || []);

      const { data: catData, error: catError } = await supabase
        .from("umkm")
        .select("category");

      if (catError) throw catError;

      const count = {};
      (catData || []).forEach((r) => {
        if (!r?.category) return;
        r.category
          .split(",")
          .map((c) => c.trim())
          .forEach((c) => {
            if (!c) return;
            count[c] = (count[c] || 0) + 1;
          });
      });

      const sorted = Object.entries(count)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([k]) => k);

      setPopularCategories(sorted);
      setLoading(false);
    } catch (err) {
      console.error("Home fetch error", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Memuat rekomendasi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-[#725CAD] to-[#8CCDEB] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-center mb-4">
            Dukung UMKM Lokal
          </h1>
          <p className="text-xl text-center mb-8">
            Temukan UMKM terbaik dan dukung bisnis lokal di sekitarmu.
          </p>
          <div className="flex justify-center">
            <Link
              to="/explore"
              className="bg-white text-[#725CAD] px-8 py-3 rounded-full font-semibold hover:bg-[#FFE3A9] transition-colors"
            >
              Jelajahi Sekarang
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#0B1D51] mb-6">
            Kategori Populer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {popularCategories.map((cat) => (
              <Link
                key={cat}
                to={`/explore?category=${encodeURIComponent(cat)}`}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center"
              >
                <h3 className="text-lg font-semibold text-[#725CAD]">{cat}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#0B1D51]">
              UMKM Rekomendasi
            </h2>
            <Link
              to="/explore"
              className="text-[#725CAD] font-semibold hover:text-[#8CCDEB] transition-colors"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-xl text-[#725CAD] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{item.category}</p>
                  <p className="text-sm text-gray-500 mb-3">{item.location}</p>
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
        </section>
      </main>
    </div>
  );
}

export default Home;
