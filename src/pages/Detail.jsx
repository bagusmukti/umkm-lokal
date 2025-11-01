import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import penyetan from "../assets/penyetan.jpg";

const dummyUMKM = [
  {
    id: 1,
    name: "Kedai Kopi Kenangan Kita",
    category: "Minuman",
    location: "Keputih",
    image: "https://via.placeholder.com/300x200",
    mapslink: "https://maps.app.goo.gl/hLdzWH64pfvSvg2d9",
    menu: [
      {
        nama_menu: "Kopi Kenangan",
        harga: 18000,
        deskripsi: "Espresso dengan susu dan gula aren",
        kategori_menu: "Kopi",
        gambar_menu: "https://via.placeholder.com/100x100",
      },
      {
        nama_menu: "Es Teh Manis",
        harga: 5000,
        deskripsi: "Teh segar",
        kategori_menu: "Non Kopi",
        gambar_menu: "https://via.placeholder.com/100x100",
      },
    ],
  },
  {
    id: 2,
    name: "Sambal Bu Ana",
    category: "Makanan",
    location: "Keputih",
    image: "https://via.placeholder.com/300x200",
    mapslink: "",
    menu: [
      {
        nama_menu: "Nasi Ayam Bakar",
        harga: 22000,
        deskripsi: "Ayam bakar bumbu rujak",
        kategori_menu: "Utama",
        gambar_menu: "https://via.placeholder.com/100x100",
      },
      {
        nama_menu: "Tempe Penyet Sambal",
        harga: 10000,
        deskripsi: "Tempe goreng dengan sambal pedas",
        kategori_menu: "Tambahan",
        gambar_menu: "https://via.placeholder.com/100x100",
      },
    ],
  },
  {
    id: 3,
    name: "Toko Ibu",
    category: "Kelontong",
    location: "Keputih",
    image: "https://via.placeholder.com/300x200",
    mapslink: "https://maps.app.goo.gl/qnYh7Sqa71hbJnqUA",
    menu: [],
  },
  {
    id: 4,
    name: "Captain Barbershop",
    category: "Jasa",
    location: "Mulyosari",
    image: "https://via.placeholder.com/300x200",
    mapslink: "https://maps.app.goo.gl/vtTPvBNL2PVMtbtQ6",
    menu: [],
  },
  {
    id: 5,
    name: "Warung Penyetan IBU YONO",
    category: "Makanan",
    location: "Jl. Gebang Lor No.100, Gebang Putih",
    image: penyetan,
    mapslink: "",
    menu: [
      {
        nama_menu: "Nasi Ayam Penyet",
        harga: 13000,
        deskripsi: "Nasi, ayam, sayur, terong, tahu, tempe, dan sambal",
        kategori_menu: "Penyetan",
        gambar_menu: penyetan,
      },
      {
        nama_menu: "Nasi Telur",
        harga: 12000,
        deskripsi: "Nasi, telur dadar, sayur, terong, tahu, tempe, dan sambal",
        kategori_menu: "Penyetan",
        gambar_menu: "https://via.placeholder.com/100x100",
      },
      {
        nama_menu: "Ayam Penyet (Tanpa Nasi)",
        harga: 10000,
        deskripsi: "Ayam, sayur, terong, tahu, tempe, dan sambal",
        kategori_menu: "Penyetan",
        gambar_menu: "https://via.placeholder.com/100x100",
      },
      {
        nama_menu: "Es Jeruk",
        harga: 5000,
        deskripsi: "Jeruk peras dingin",
        kategori_menu: "Minuman",
        gambar_menu: "https://via.placeholder.com/100x100",
      },
    ],
  },
  {
    id: 6,
    name: "Warung Penyetan Anda",
    category: "Makanan",
    location: "Gg. Puskesmas No.8, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
    mapslink: "",
    menu: [],
  },
  {
    id: 7,
    name: "Warung Sederhana Gresik",
    category: "Makanan, Minuman",
    location: "Jl. Gebang Putih, No.90, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
    mapslink: "",
    menu: [],
  },
  {
    id: 8,
    name: "Warung Hanna 89",
    category: "Makanan, Minuman",
    location: "Jl. Gebang Lor No.89, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
    mapslink: "https://maps.app.goo.gl/NoTSMegY51DeqLGh6",
    menu: [],
  },
  {
    id: 9,
    name: "Keke Juice",
    category: "Minuman",
    location: "Jl. Gebang Lor No.9, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
    mapslink: "https://maps.app.goo.gl/orLx9zVc7bZ3mSBr8",
    menu: [],
  },
  {
    id: 10,
    name: "QONTAK BARBERSHOP",
    category: "Jasa",
    location: "Jl. Gebang Lor No.42, Gebang Putih",
    image: "https://via.placeholder.com/300x200",
    mapslink: "https://maps.app.goo.gl/u63qpEEoQQaYNz4K7",
    menu: [],
  },
  {
    id: 11,
    name: "Barra Barber Shop",
    category: "Jasa",
    location: "Gebang Putih",
    image: "https://via.placeholder.com/300x200",
    mapslink: "https://maps.app.goo.gl/yysNQfpGDR1DgKrd9",
    menu: [],
  },
  {
    id: 12,
    name: "Warung Kane",
    category: "Makanan",
    location: "Keputih",
    image: "https://via.placeholder.com/300x200",
    menu: [],
  },
];

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalImageUrl, setModalImageUrl] = React.useState("");

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl("");
  };

  const umkm = dummyUMKM.find((item) => item.id === Number(id));

  if (!umkm) {
    return (
      <div className="min-h-screen bg-[#FFE3A9] text-[#0B1D51] p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">UMKM Tidak Ditemukan 😥</h2>
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
            src={umkm.image}
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

            <h3 className="text-xl font-semibold mb-1 border-b pb-2">
              Informasi Lokasi
            </h3>
            <p className="text-2l mb-4">Alamat: {umkm.location}</p>

            <a
              href={umkm.mapslink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full inline-block text-center px-6 py-3 bg-[#8CCDEB] text-black font-semibold rounded-md hover:bg-[#FFE3A9] transition"
            >
              Lihat di Google Maps
            </a>
          </div>
        </div>

        {umkm.menu && umkm.menu.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[#0B1D51]/10 shadow-md p-5 rounded-lg">
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
                      className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center gap-5 hover:scale-105 transition cursor-pointer"
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
                        <div className="flex flex-col sm:flex-row justify-between sm:justify-between items-start">
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
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4"
          onClick={closeModal} // Klik area luar untuk menutup
        >
          <div
            // Gunakan lebar dan tinggi maksimal layar (max-w-screen & max-h-screen)
            className="relative max-w-screen max-h-screen p-5" 
            onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat mengklik gambar
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
              // Pastikan gambar menggunakan 95% tinggi viewport dan lebar penuh
              className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );

}
