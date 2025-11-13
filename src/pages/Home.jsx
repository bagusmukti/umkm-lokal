import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  React.useEffect(() => {
    document.title = "UMKM Lokal - Beranda";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">

      <header className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-[#0B1D51] leading-tight mb-6">
            Dukung Bisnis Lokal, Temukan Cerita Setiap UMKM
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Direktori UMKM lokal yang mudah digunakan untuk menemukan makanan,
            minuman, fashion, dan layanan di sekitarmu — semua dalam satu
            tempat.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/explore"
              className="px-8 py-3 bg-[#725CAD] text-white rounded-full text-lg font-semibold shadow hover:bg-[#5b46a2] transition"
            >
              Jelajahi UMKM
            </Link>
            <a
              href="#about"
              className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </header>

      <section id="about" className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#725CAD] mb-2">
              Temukan Cepat
            </h3>
            <p className="text-gray-600">
              Cari UMKM berdasarkan nama, kategori, atau lokasi. Mudah dipakai
              di perangkat apa pun.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#725CAD] mb-2">
              Dukung Komunitas
            </h3>
            <p className="text-gray-600">
              Setiap kunjungan dan pembelian membantu pengusaha lokal bertumbuh
              — temukan yang sesuai dengan nilai dan kebutuhanmu.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#725CAD] mb-2">
              Mudah Dibagikan
            </h3>
            <p className="text-gray-600">
              Bagikan profil UMKM favoritmu dengan teman dan keluarga untuk
              membantu menjangkau audiens lebih luas.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h3 className="text-2xl font-bold text-[#0B1D51] mb-4">
            Siap untuk mulai mendukung UMKM lokal?
          </h3>
          <p className="text-gray-600 mb-6">
            Klik tombol di bawah untuk melihat daftar lengkap UMKM dan filter
            untuk menemukan yang paling relevan.
          </p>
          <Link
            to="/explore"
            className="inline-block px-8 py-3 bg-[#8CCDEB] text-[#0B1D51] rounded-full font-semibold hover:bg-[#7bc1ea] transition"
          >
            Jelajahi Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
