import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import umkmData from '../data/umkm.json';

// Komponen galeri kecil
function PhotoGallery({ photos, umkmName }) {
  if (!photos || photos.length === 0) {
    return <p className="text-gray-500">Tidak ada foto galeri.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {photos.map((photoUrl, index) => (
        <a key={index} href={photoUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={photoUrl}
            alt={`Galeri ${umkmName} ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg shadow-md transition-all duration-300 hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
}

function DetailUMKM() {
  const { id } = useParams();
  console.log('ID from params:', id);
  console.log('Available UMKM data:', umkmData);
  const umkm = umkmData.find((item) => item.id == id);
  console.log('Found UMKM:', umkm);

  if (!umkm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">UMKM tidak ditemukan</h1>
          <Link to="/" className="text-emerald-600 hover:text-emerald-700">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // Polish: Ubah judul tab browser
  useEffect(() => {
    if (umkm) {
      document.title = `${umkm.nama} - LokalSpot`;
    }
    // Cleanup function untuk reset title saat keluar dari halaman
    return () => {
      document.title = 'LokalSpot - Direktori UMKM';
    };
  }, [umkm]);

  // Handle jika UMKM tidak ditemukan
  if (!umkm) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Oops! (404)</h1>
        <p className="text-lg text-gray-600 mt-2">UMKM yang Anda cari tidak ditemukan.</p>
        <Link 
          to="/" 
          className="mt-6 inline-block px-6 py-3 bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-800 transition-all"
        >
          Kembali ke Halaman Utama
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Header Halaman (Foto & Nama) */}
      <header className="relative">
        <img 
          src={umkm.galeriFoto[0]}
          alt={`Cover ${umkm.nama}`}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 break-words">
            {umkm.nama}
          </h1>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri (Info & Galeri) */}
        <div className="lg:col-span-2">
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detail</h2>
            {/* Tag & Kategori */}
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full">
                {umkm.kategori}
              </span>
              {umkm.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Deskripsi */}
            <p className="text-gray-600 leading-relaxed">
              {umkm.deskripsi}
            </p>
          </div>

          {/* Galeri Foto */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Galeri Foto</h2>
            <PhotoGallery photos={umkm.galeriFoto} umkmName={umkm.nama} />
          </div>
        </div>

        {/* Kolom Kanan (Lokasi & Alamat) - Sticky */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-[73px]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Lokasi & Alamat</h2>
            
            <p className="text-gray-600 mb-4">
              {umkm.alamat}
            </p>

            {/* Embed Peta */}
            <div className="w-full h-64 rounded-lg overflow-hidden border">
              <div 
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: umkm.mapEmbedUrl }} 
              />
            </div>
          </div>
        </aside>

      </main>
    </>
  );
}

export default DetailUMKM;