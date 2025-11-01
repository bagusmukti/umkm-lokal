import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const umkmData = {
  name: "Warung Kopi Kampus",
  tagline: "Tempat Nongkrong Favorit Mahasiswa",
  category: "Food & Beverage",
  owner: "Pak Budi Santoso",
  address: "Jl. Pendidikan No. 123, Dekat Kampus",
  description: "Warung kopi dengan suasana nyaman dan harga mahasiswa. Menyajikan berbagai varian kopi nusantara dan cemilan lokal.",
  story: "Berawal dari hobi menyeduh kopi dan keinginan membantu mahasiswa mendapatkan tempat nongkrong berkualitas dengan harga terjangkau, Pak Budi memulai Warung Kopi Kampus di tahun 2020. Meski awalnya terdampak pandemi, konsep takeaway dan delivery membantu usaha ini bertahan dan kini menjadi spot favorit mahasiswa untuk belajar dan berdiskusi.",
  quote: "Kesuksesan bukan tentang seberapa besar usaha kita, tapi seberapa besar manfaat yang bisa kita berikan untuk komunitas sekitar.",
  images: [
    "/images/warung-1.jpg",
    "/images/warung-2.jpg",
    "/images/warung-3.jpg",
    "/images/warung-4.jpg"
  ],
  mainImage: "/images/warung-main.jpg",
  contact: {
    whatsapp: "+6281234567890",
    instagram: "@warungkopikampus"
  },
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!..." // Replace with actual map embed URL
};

const UMKMHighlight = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image click for lightbox
  const openLightbox = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="container mx-auto px-4 py-8 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          UMKM of The Week 🌟
        </h1>
        <p className="text-xl text-gray-600">
          Kenali inspirasi di balik usaha lokal pilihan minggu ini!
        </p>
      </header>

      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px] w-full mb-12">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src={umkmData.mainImage}
          alt={umkmData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white px-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {umkmData.name}
            </h2>
            <p className="text-xl md:text-2xl">{umkmData.tagline}</p>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="container mx-auto px-4 max-w-4xl">
        {/* Profile Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12 transform hover:scale-[1.01] transition-transform">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Profil UMKM</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="text-gray-600">Nama Usaha</dt>
                  <dd className="font-semibold">{umkmData.name}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Kategori</dt>
                  <dd className="font-semibold">{umkmData.category}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Pemilik</dt>
                  <dd className="font-semibold">{umkmData.owner}</dd>
                </div>
              </dl>
            </div>
            <div>
              <dt className="text-gray-600">Alamat</dt>
              <dd className="font-semibold mb-4">{umkmData.address}</dd>
              <dt className="text-gray-600">Deskripsi</dt>
              <dd className="font-semibold">{umkmData.description}</dd>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Cerita UMKM</h3>
          <p className="text-gray-700 leading-relaxed">{umkmData.story}</p>
        </section>

        {/* Gallery Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Galeri Foto</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {umkmData.images.map((image, index) => (
              <div
                key={index}
                className="cursor-pointer transform hover:scale-105 transition-transform"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image}
                  alt={`${umkmData.name} - Foto ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Location & Contact Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Lokasi & Kontak
          </h3>
          <div className="mb-6 rounded-lg overflow-hidden">
            <iframe
              src={umkmData.mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi UMKM"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${umkmData.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              <span>Hubungi via WhatsApp</span>
            </a>
            <a
              href={`https://instagram.com/${umkmData.contact.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              <span>Kunjungi Instagram</span>
            </a>
          </div>
        </section>

        {/* Quote Section */}
        <section className="mb-12 px-4">
          <blockquote className="text-center text-xl md:text-2xl italic text-gray-700">
            "{umkmData.quote}"
          </blockquote>
        </section>

        {/* Navigation Buttons */}
        <section className="flex flex-wrap justify-between gap-4 mb-12">
          <Link
            to="/directory"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            ← Kembali ke Direktori
          </Link>
          <Link
            to="/umkm"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lihat UMKM Lainnya
          </Link>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UMKMHighlight;