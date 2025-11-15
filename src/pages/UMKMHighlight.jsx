import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import localUMKMs from '../data/umkm.json';

// Loading component
const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-[400px] md:h-[500px] bg-gradient-to-r from-gray-200 to-gray-300 mb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
    </div>
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-4">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 w-3/4 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
        </div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 w-1/2 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
        </div>
        <div className="space-y-4 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Error component
const Error = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
    <div className="text-center px-6 py-12 bg-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 max-w-md mx-4">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Ada masalah</h2>
      {message && (
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">{message}</p>
      )}
      <Link
        to="/explore"
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
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

  // Helper function to extract Google Maps embed URL from iframe string
  const extractMapUrl = (mapEmbedHtml) => {
    if (!mapEmbedHtml) return null;
    
    // If it's already a URL, return it
    if (mapEmbedHtml.startsWith('https://')) {
      return mapEmbedHtml;
    }
    
    // Extract URL from iframe HTML string
    const match = mapEmbedHtml.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  };

  const fetchHighlightedUMKM = async () => {
    try {
      // First, get the active highlight
      const { data: highlightData, error: highlightError } = await supabase
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
          )
        `)
        .eq('is_active', true)
        .single();

      if (highlightError) throw highlightError;
      if (!highlightData?.umkm) throw new Error('UMKM tidak ditemukan dalam highlights');

      // Then get the menu for this UMKM
      const { data: menuData, error: menuError } = await supabase
        .from('menu')
        .select('*')
        .eq('umkm_id', highlightData.umkm_id);

      // Don't throw error if no menu found, just use empty array
      const menu = menuError ? [] : (menuData || []);

      // Format the data to match component expectations
      setUmkmData({
        id: highlightData.umkm.id,
        name: highlightData.umkm.name,
        category: highlightData.umkm.category,
        description: highlightData.umkm.description || '', // Note: description not in schema, might need to add
        owner: highlightData.umkm.owner || '', // Note: owner not in schema, might need to add
        story: highlightData.featured_story || '',
        quote: highlightData.featured_quote || '',
        menu: menu,
        mainImage: highlightData.umkm.image || '',
        images: [], // Note: individual images not in schema, could add gallery table later
        tagline: '', // Note: tagline not in schema, could add to umkm table
        address: highlightData.umkm.location || '',
        mapUrl: extractMapUrl(highlightData.umkm.mapslink) || '',
        contact: {} // Note: contact info not in schema, could add to umkm table
      });
    } catch (err) {
      console.error('Error fetching highlighted UMKM:', err?.message || err);
      // Fallback: use local JSON data so the page still displays
      try {
        const local = Array.isArray(localUMKMs) && localUMKMs.length > 0 ? localUMKMs[0] : null;
        if (local) {
          setUmkmData({
            name: local.nama || local.name || 'UMKM Lokal',
            category: local.kategori || local.category || '',
            description: local.deskripsi || local.description || '',
            owner: local.owner || null,
            story: local.deskripsi || '',
            quote: null,
            menu: local.menu || [],
            mainImage: (local.galeriFoto && local.galeriFoto[0]) || local.image || '',
            images: local.galeriFoto || local.images || [],
            tagline: (local.tags && local.tags.join(', ')) || local.tagline || '',
            address: local.alamat || local.address || '',
            mapUrl: extractMapUrl(local.mapEmbedUrl || local.map_url) || '',
            contact: local.contact || {}
          });
          setError(null);
        } else {
          setError(err.message || 'Terjadi kesalahan saat memuat data');
        }
      } catch (fallbackErr) {
        console.error('Fallback error:', fallbackErr);
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <header className="container mx-auto px-4 py-12 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-pulse">
            UMKM of The Week ⭐
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Kenali inspirasi di balik usaha lokal pilihan minggu ini!
          </p>
          <div className="mt-6 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
      </header>

      {/* Banner Section */}
      <div className="relative h-[500px] md:h-[600px] w-full mb-16 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 z-10 transition-all duration-500 group-hover:from-black/60 group-hover:via-black/30" />
        <img
          src={umkmData.mainImage}
          alt={umkmData.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white px-6">
          <div className="transform transition-all duration-500 group-hover:scale-105">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
              {umkmData.name}
            </h2>
            {umkmData.tagline && (
              <p className="text-xl md:text-3xl lg:text-4xl font-light drop-shadow-lg opacity-90">
                {umkmData.tagline}
              </p>
            )}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-2000"></div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-6xl">
        {/* Profile Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-12 transform hover:scale-[1.02] transition-all duration-300 border border-white/20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-2 4h2M7 7h2v6H7z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">Profil UMKM</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group">
                <dt className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Nama Usaha</dt>
                <dd className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{umkmData.name}</dd>
              </div>
              <div className="group">
                <dt className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Kategori</dt>
                <dd className="font-semibold text-lg">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium">
                    {umkmData.category || 'Tidak tersedia'}
                  </span>
                </dd>
              </div>
              {umkmData.owner && (
                <div className="group">
                  <dt className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Pemilik</dt>
                  <dd className="font-semibold text-lg text-gray-700 group-hover:text-blue-600 transition-colors duration-300">{umkmData.owner}</dd>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="group">
                <dt className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Alamat</dt>
                <dd className="font-semibold text-lg text-gray-700 leading-relaxed group-hover:text-blue-600 transition-colors duration-300">
                  {umkmData.address || 'Tidak tersedia'}
                </dd>
              </div>
              {umkmData.description && (
                <div className="group">
                  <dt className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Deskripsi</dt>
                  <dd className="font-semibold text-lg text-gray-700 leading-relaxed">{umkmData.description}</dd>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-12 transform hover:scale-[1.02] transition-all duration-300 border border-white/20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">Cerita UMKM</h3>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg font-medium bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              {umkmData.story}
            </p>
          </div>
        </section>

        {/* Menu Section */}
        {umkmData.menu?.length > 0 && (
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-12 transform hover:scale-[1.02] transition-all duration-300 border border-white/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Menu Favorit</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {umkmData.menu.map((item, index) => (
                <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                  <div className="flex gap-6 items-start">
                    {item.gambar_menu && (
                      <div className="flex-shrink-0 relative overflow-hidden rounded-xl">
                        <img
                          src={item.gambar_menu}
                          alt={item.nama_menu}
                          className="w-24 h-24 md:w-32 md:h-32 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {item.nama_menu}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {item.deskripsi}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-blue-600 font-bold text-lg">
                          Rp {parseInt(item.harga || 0).toLocaleString('id-ID')}
                        </p>
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs rounded-full font-medium w-fit">
                          {item.kategori_menu}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-12 transform hover:scale-[1.02] transition-all duration-300 border border-white/20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">Lokasi & Kontak</h3>
          </div>
          
          {umkmData.mapUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300">
              <iframe
                src={umkmData.mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi UMKM"
                className="w-full"
              />
            </div>
          )}
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Alamat</p>
                <p className="font-semibold text-gray-800 text-lg leading-relaxed">
                  {umkmData.address || 'Tidak tersedia'}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 italic">
                Untuk informasi kontak lebih lanjut, silakan kunjungi lokasi langsung.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        {umkmData.quote && (
          <section className="mb-16 px-4">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="relative">
                <svg className="absolute top-0 left-0 w-8 h-8 text-white/30 transform -translate-x-2 -translate-y-2" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                </svg>
                <blockquote className="text-2xl md:text-3xl italic text-white font-light leading-relaxed relative z-10">
                  "{umkmData.quote}"
                </blockquote>
                <svg className="absolute bottom-0 right-0 w-8 h-8 text-white/30 transform translate-x-2 translate-y-2 rotate-180" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                </svg>
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between gap-6 mb-16">
          <Link
            to="/explore"
            className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium rounded-xl hover:from-gray-800 hover:to-gray-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Direktori
          </Link>
          <Link
            to="/explore"
            className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Lihat UMKM Lainnya
            <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
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
