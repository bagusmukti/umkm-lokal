import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Loading component
const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-[400px] md:h-[500px] bg-gray-300 mb-12" />
    <div className="max-w-4xl mx-auto">
      <div className="h-8 bg-gray-300 w-3/4 mb-4" />
      <div className="h-4 bg-gray-300 w-1/2 mb-12" />
      <div className="space-y-4">
        <div className="h-24 bg-gray-300 rounded-lg" />
        <div className="h-24 bg-gray-300 rounded-lg" />
        <div className="h-24 bg-gray-300 rounded-lg" />
      </div>
    </div>
  </div>
);

// Error component
const Error = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Oops! Ada masalah</h2>
      <Link
        to="/explore"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Kembali ke Explore
      </Link>
    </div>
  </div>
);

const UMKMHighlight = () => {
  const [umkmData, setUmkmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchHighlightedUMKM();
  }, []);

  const fetchHighlightedUMKM = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('umkm_highlights')
        .select(`
          *,
          umkm:umkm_id (
            id,
            name,
            category,
            location,
            image,
            mapslink
          ),
          menu:umkm_id (
            nama_menu,
            harga,
            deskripsi,
            kategori_menu,
            gambar_menu
          )
        `)
        .eq('is_active', true)
        .single();

      if (fetchError) throw fetchError;
      if (!data?.umkm) throw new Error('UMKM tidak ditemukan');

      // Format the data to include highlighted UMKM details and its menu
      setUmkmData({
        ...data.umkm,
        story: data.featured_story,
        quote: data.featured_quote,
        menu: data.menu || [],
        mainImage: data.umkm.image,
        address: data.umkm.location,
        mapUrl: data.umkm.mapslink
      });
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  if (loading) return <Skeleton />;
  if (error) return <Error message={error} />;
  if (!umkmData) return <Error message="Data UMKM tidak ditemukan" />;

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
          src={umkmData.main_image}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl">
        {/* Profile Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
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

        {/* Menu Section */}
        {umkmData.menu?.length > 0 && (
          <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Menu Favorit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {umkmData.menu.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  {item.gambar_menu && (
                    <img
                      src={item.gambar_menu}
                      alt={item.nama_menu}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{item.nama_menu}</h4>
                    <p className="text-gray-600 text-sm mb-1">{item.deskripsi}</p>
                    <p className="text-blue-600 font-semibold">
                      Rp {item.harga.toLocaleString('id-ID')}
                    </p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-sm rounded mt-1">
                      {item.kategori_menu}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {umkmData.images?.length > 0 && (
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
        )}

        {/* Contact Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Lokasi & Kontak
          </h3>
          {umkmData.map_url && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <iframe
                src={umkmData.map_url}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi UMKM"
              />
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            {umkmData.contact?.whatsapp && (
              <a
                href={`https://wa.me/${umkmData.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Hubungi via WhatsApp
              </a>
            )}
            {umkmData.contact?.instagram && (
              <a
                href={`https://instagram.com/${umkmData.contact.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Kunjungi Instagram
              </a>
            )}
          </div>
        </section>

        {/* Quote Section */}
        {umkmData.quote && (
          <section className="mb-12 px-4">
            <blockquote className="text-center text-xl md:text-2xl italic text-gray-700">
              "{umkmData.quote}"
            </blockquote>
          </section>
        )}

        {/* Navigation */}
        <section className="flex flex-wrap justify-between gap-4 mb-12">
          <Link
            to="/explore"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            ← Kembali ke Direktori
          </Link>
          <Link
            to="/explore"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lihat UMKM Lainnya
          </Link>
        </section>
      </main>

      {/* Lightbox */}
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
