import heroImg from "../assets/Newjeans4.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFE3A9] text-[#0B1D51]">
      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-16 bg-[#725CAD] text-white">
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">
            Temukan UMKM Lokal di Sekitarmu
          </h2>
          <p className="text-lg mb-6">
            Dukung produk lokal dan bantu perekonomian masyarakat sekitar dengan
            mengetahui UMKM yang ada di daerahmu.
          </p>
          <Link to="/explore"
          className="px-6 py-3 bg-[#0B1D51] text-white font-semibold rounded-md hover:bg-[#8CCDEB] transition">
            Mulai Jelajahi
          </Link>
        </div>
        <img
          src={heroImg}
          alt="Ilustrasi UMKM"
          className="w-72 md:w-96 rounded-lg shadow-lg"
        />
      </section>

      {/* CATEGORY SECTION */}
      <section className="px-6 py-10">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Kategori UMKM
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {["Makanan", "Minuman", "Kelontong", "Jasa"].map((category) => (
            <Link
              key={category}
              to={`/explore?category=${category}`}
              className="p-6 bg-white shadow rounded-lg hover:scale-105 transition cursor-pointer font-medium text-lg border border-[#0B1D51]/10"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED UMKM */}
      <section className="bg-[#8CCDEB] px-6 py-14">
        <h3 className="text-2xl font-semibold text-center mb-10">
          UMKM Unggulan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition border border-[#0B1D51]/10"
            >
              <img
                src={heroImg}
                alt="Produk"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">Nama UMKM {item}</h4>
              <p className="text-sm mb-4">
                Deskripsi singkat mengenai produk atau usaha UMKM ini.
              </p>
              <button className="px-4 py-2 bg-[#0B1D51] text-white rounded-md hover:bg-[#725CAD] transition">
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
