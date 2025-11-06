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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-xl text-[#0B1D51]">Memuat detail UMKM...</p>
        </div>
      );
    }

    if (error || !umkm) {
      return (
        <div className="min-h-screen bg-[#FFE3A9] text-[#0B1D51] p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">{error || "UMKM Tidak Ditemukan 😥"}</h2>
          <p className="text-gray-700 mb-6">Pastikan ID UMKM benar atau data ada di Supabase.</p>
          <button
            onClick={() => navigate("/explore")}
            className="mt-4 px-6 py-2 bg-[#0B1D51] text-white rounded-md hover:bg-[#725CAD] transition"
          >
            Kembali ke Daftar
          </button>
        </div>
      );
    }

    const groupedMenu = umkm.menu
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
      <div className="min-h-screen bg-[#FFE3A9] text-[#0B1D51] font-sans px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-[#0B1D51]/10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-[#0B1D51] hover:text-[#725CAD] font-medium transition"
          >
            ← Kembali
          </button>

          <div className="flex flex-col md:flex-row gap-8 shadow-md p-5 rounded-lg">
            <img
              src={umkm.image || umkm.main_image || "https://via.placeholder.com/600x400?text=No+Image"}
              alt={umkm.name}
              className="w-full md:w-1/2 h-72 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
              onClick={() => openModal(umkm.image)}
            />

            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-1 text-[#725CAD]">{umkm.name}</h1>
              <p className="text-2l text-gray-600 mb-5">
                Kategori:{" "}
                <span className="font-semibold text-[#0B1D51]">
                  {umkm.category}
                </span>
              </p>
              
              {/* Deskripsi Singkat */}
              {umkm.description && (
                <p className="text-md text-gray-700 mb-5 italic">
                  {umkm.description}
                </p>
              )}

              <h3 className="text-xl font-semibold mb-1 border-b pb-2">
                Informasi Lokasi
              </h3>
              <p className="text-2l mb-4">Alamat: {umkm.location}</p>

              {umkm.mapslink && (
                <a
                  href={umkm.mapslink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full inline-block text-center px-6 py-3 bg-[#8CCDEB] text-black font-semibold rounded-md hover:bg-[#FFE3A9] transition"
                >
                  Lihat di Google Maps
                </a>
              )}
            </div>
          </div>

          {/* Daftar Menu */}
          {umkm.menu && umkm.menu.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#0B1D51]/10 shadow-md p-5 pb-1 rounded-lg">
              <h3 className="text-3xl font-bold mb-6 text-center text-[#0B1D51]">
                Daftar Menu 🍽️
              </h3>

              {menuCategories.map((category) => (
                <div key={category} className="mb-8">
                  <h4 className="text-2xl font-bold text-[#725CAD] mb-4 border-b-2 border-[#725CAD]/50 pb-1">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    {groupedMenu[category].map((menuItem, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center gap-5 hover:scale-105 transition"
                      >
                        {menuItem.gambar_menu && (
                          <img
                            src={menuItem.gambar_menu}
                            alt={menuItem.nama_menu}
                            className="w-20 h-20 object-cover rounded-md flex-shrink-0 cursor-pointer hover:scale-110 transition"
                            onClick={() => openModal(menuItem.gambar_menu)}
                          />
                        )}

                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row justify-between items-start">
                            <p className="text-lg font-semibold text-[#0B1D51]">
                              {menuItem.nama_menu}
                            </p>
                            <p className="text-xl font-bold text-[#0B1D51] sm:ml-4 flex-shrink-0 mt-1 sm:mt-0">
                              {formatRupiah(menuItem.harga)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 italic mt-1">
                            {menuItem.deskripsi}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
        {/* Lightbox Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4"
            onClick={closeModal} 
          >
            <div
              className="relative max-w-screen max-h-screen p-5" 
              onClick={(e) => e.stopPropagation()} 
            >
              <button
                onClick={closeModal}
                className="absolute top-7 right-7 text-white text-4xl font-bold p-2 z-50 bg-black/50 rounded-full hover:bg-black leading-none transition"
                aria-label="Tutup"
              >
                ×
              </button>
              <img
                src={modalImageUrl}
                alt="Gambar Diperbesar"
                className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    );
  }