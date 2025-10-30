import aboutImg from "../assets/Newjeans4.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFE3A9] text-[#0B1D51] font-sans">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 bg-[#725CAD] text-white">
        <div className="max-w-xl mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Tentang UMKM Lokal</h1>
          <p className="text-lg leading-relaxed">
            Platform yang hadir untuk memperkenalkan, mendukung, dan memajukan UMKM yang ada di sekitar kita.
            Kami percaya bahwa produk lokal memiliki potensi besar untuk bersaing dan tumbuh lebih luas.
          </p>
        </div>
        <div>
          <img src={aboutImg} alt="About" className="w-72 md:w-96 rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Visi & Misi Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          <div className="bg-white p-6 rounded-lg shadow border border-[#0B1D51]/10">
            <h3 className="text-2xl font-semibold mb-3">Visi</h3>
            <p className="text-lg leading-relaxed">
              Menciptakan ekosistem digital yang membantu UMKM berkembang dan dikenal lebih luas oleh masyarakat.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-[#0B1D51]/10">
            <h3 className="text-2xl font-semibold mb-3">Misi</h3>
            <ul className="list-disc pl-5 space-y-2 text-lg leading-relaxed">
              <li>Menyediakan informasi UMKM lokal secara mudah diakses.</li>
              <li>Memperkuat pemasaran dan branding UMKM melalui platform digital.</li>
              <li>Mendukung pertumbuhan ekonomi kreatif masyarakat.</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
