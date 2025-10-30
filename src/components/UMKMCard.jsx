import React from 'react';
import { Link } from 'react-router-dom';

// Props yang diterima adalah { umkm }
function UMKMCard({ umkm }) {
  // Ambil data dari prop umkm
  const { id, nama, kategori, tags, galeriFoto } = umkm;

  return (
    // Membungkus kartu dengan Link agar bisa diklik
    <Link 
      to={`/detail/${id}`} 
      className="block bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Gambar Utama */}
      <img 
        src={galeriFoto[0]} // Ambil foto pertama dari galeri sebagai thumbnail
        alt={`Foto ${nama}`}
        className="w-full h-48 object-cover" 
      />
      
      {/* Konten Teks di Bawah Gambar */}
      <div className="p-4">
        {/* Kategori */}
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
          {kategori}
        </p>
        
        {/* Nama UMKM */}
        <h3 className="text-lg font-bold text-gray-800 mt-1 truncate">
          {nama}
        </h3>
        
        {/* Tag Situasional */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default UMKMCard;