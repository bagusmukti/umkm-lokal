import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function Explore() {
  const [umkm, setUmkm] = useState([]);

  useEffect(() => {
    fetchUMKM();
  }, []);

  async function fetchUMKM() {
    const { data, error } = await supabase.from("umkm").select("*");
    if (error) console.error(error);
    else setUmkm(data);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-[#0B1D51]">Jelajahi UMKM</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {umkm.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-xl text-[#725CAD]">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-500 mt-1">{item.location}</p>

              <Link
                to={`/detail/${item.id}`}
                className="inline-block mt-3 px-4 py-2 bg-[#8CCDEB] rounded-lg text-[#0B1D51] font-medium hover:bg-[#FFE3A9] transition"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
