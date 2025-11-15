  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { supabase } from "../lib/supabase";

  const formatRupiah = (number) => {
    if (typeof number !== 'number') return 'N/A';
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [umkm, setUmkm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState("");

    const openModal = (imageUrl) => {
      setModalImageUrl(imageUrl);
      setIsModalOpen(true);
    }

    const closeModal = () => {
      setIsModalOpen(false);
      setModalImageUrl("");
    };

    useEffect(() => {
      fetchUMKMDetail();
    }, [id]);

    async function fetchUMKMDetail() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from("umkm")
          .select(`
            *,
            menu (
              nama_menu,
              harga,
              deskripsi,
              kategori_menu,
              gambar_menu
            )
          `)
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error("UMKM tidak ditemukan.");
        
        setUmkm(data);
        if (data.name) {
          document.title = `${data.name} - Detail UMKM`;
        }

      } catch (err) {
        console.error("Error fetching UMKM details:", err);
        setError(err.message || "Gagal memuat detail UMKM.");
      } finally {
        setLoading(false);
      }
    }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Memuat detail UMKM...</p>
        </div>
      </div>
    );
  }

  if (error || !umkm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-2xl shadow-2xl p-12 max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{error || "UMKM Tidak Ditemukan 😥"}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">Pastikan ID UMKM benar atau data ada di Supabase.</p>
          <button
            onClick={() => navigate("/explore")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Daftar
          </button>
        </div>
      </div>
    );
  }    const groupedMenu = umkm.menu
      ? umkm.menu.reduce((acc, currentItem) => {
          const category = currentItem.kategori_menu || "Lain-lain";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(currentItem);
          return acc;
        }, {})
      : {};
      
    const menuCategories = Object.keys(groupedMenu);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-8 p-8 md:p-12">
            {/* Image */}
            <div className="lg:w-1/2">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={umkm.image || umkm.main_image || "https://via.placeholder.com/600x400?text=No+Image"}
                  alt={umkm.name}
                  className="w-full h-72 md:h-96 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
                  onClick={() => openModal(umkm.image)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6l4-2-4-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {umkm.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-500 font-medium">Kategori:</span>
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold">
                    {umkm.category}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              {umkm.description && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <p className="text-gray-700 leading-relaxed italic text-lg">
                    {umkm.description}
                  </p>
                </div>
              )}

              {/* Location Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Informasi Lokasi</h3>
                </div>
                <p className="text-gray-700 leading-relaxed pl-13">
                  <span className="font-medium">Alamat:</span> {umkm.location}
                </p>

                {umkm.mapslink && (
                  <a
                    href={umkm.mapslink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Lihat di Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Menu Section */}
          {umkm.menu && umkm.menu.length > 0 && (
            <div className="border-t border-gray-200/50">
              <div className="p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">
                    Daftar Menu 🍽️
                  </h3>
                </div>

                {menuCategories.map((category) => (
                  <div key={category} className="mb-10 last:mb-0">
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 border-b-2 border-orange-200 pb-2">
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {groupedMenu[category].map((menuItem, index) => (
                        <div
                          key={index}
                          className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
                        >
                          <div className="flex items-center gap-6">
                            {menuItem.gambar_menu && (
                              <div className="flex-shrink-0 relative overflow-hidden rounded-xl">
                                <img
                                  src={menuItem.gambar_menu}
                                  alt={menuItem.nama_menu}
                                  className="w-20 h-20 md:w-24 md:h-24 object-cover cursor-pointer transform group-hover:scale-110 transition-transform duration-300"
                                  onClick={() => openModal(menuItem.gambar_menu)}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            )}

                            <div className="flex-grow min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                <h5 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                  {menuItem.nama_menu}
                                </h5>
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex-shrink-0">
                                  {formatRupiah(menuItem.harga)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-2">
                                {menuItem.deskripsi}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Lightbox Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={closeModal} 
          >
            <div
              className="relative max-w-screen max-h-screen p-5 animate-fade-in" 
              onClick={(e) => e.stopPropagation()} 
            >
              <button
                onClick={closeModal}
                className="absolute -top-2 -right-2 text-white text-2xl font-bold p-3 z-50 bg-black/70 rounded-full hover:bg-black/90 leading-none transition-all duration-300 transform hover:scale-110"
                aria-label="Tutup"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={modalImageUrl}
                alt="Gambar Diperbesar"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}