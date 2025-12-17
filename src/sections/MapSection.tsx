import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import ChoroplethMap from "../components/ChoroplethMap";
import { airQualityData } from "../data/sampleData";

export default function MapSection() {
  const [selectedNation, setSelectedNation] = useState<string>("Semua");
  const [selectedCity, setSelectedCity] = useState<string>("Semua");

  // Get unique nations
  const nations = ["Semua", ...Array.from(new Set(airQualityData.map((d) => d.nation)))];

  // Get cities based on selected nation
  const cities = useMemo(() => {
    const filtered = selectedNation === "Semua" ? airQualityData : airQualityData.filter((d) => d.nation === selectedNation);
    return ["Semua", ...Array.from(new Set(filtered.map((d) => d.localAuthorityName))).sort()];
  }, [selectedNation]);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let filtered = airQualityData;

    if (selectedNation !== "Semua") {
      filtered = filtered.filter((d) => d.nation === selectedNation);
    }

    if (selectedCity !== "Semua") {
      filtered = filtered.filter((d) => d.localAuthorityName === selectedCity);
    }

    return filtered;
  }, [selectedNation, selectedCity]);

  // Reset city filter when nation changes
  const handleNationChange = (nation: string) => {
    setSelectedNation(nation);
    setSelectedCity("Semua");
  };

  return (
    <section className="section-container bg-gradient-to-br from-gray-50 via-primary-50/40 to-sky-50 min-h-screen flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">Distribusi Geografis Kualitas Udara</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Wilayah dengan lingkaran lebih besar dan warna lebih gelap memiliki dampak signifikan terhadap kesehatan masyarakat.</p>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8"
      >
        <h3 className="text-lg font-semibold text-primary-700 mb-4">Filter Wilayah</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Nation Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Negara/Region</label>
            <select
              value={selectedNation}
              onChange={(e) => handleNationChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-blue-400"
            >
              {nations.map((nation) => (
                <option key={nation} value={nation}>
                  {nation}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Otoritas Lokal/Kota</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm hover:border-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedNation !== "Semua" && cities.length <= 1}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Info */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">Menampilkan:</span>
          <span className="text-primary-700 font-semibold">{filteredData.length} wilayah</span>
          {selectedNation !== "Semua" && <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-xs font-medium shadow-sm">{selectedNation}</span>}
          {selectedCity !== "Semua" && <span className="ml-2 px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-xs font-medium shadow-sm">{selectedCity}</span>}
        </div>
      </motion.div>

      <ChoroplethMap
        data={filteredData}
        title={selectedCity !== "Semua" ? `Peta Geospasial: ${selectedCity}` : "Peta Geospasial Kualitas Udara UK"}
        subtitle="Wilayah dengan warna lebih gelap memiliki manfaat kualitas udara lebih tinggi. Klik wilayah untuk detail."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h4 className="text-2xl font-bold text-primary-700 mb-6">Wawasan Geografis</h4>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 mr-3 shadow-sm"></div>
              <h5 className="font-semibold text-gray-800">Konsentrasi Urban</h5>
            </div>
            <p className="text-gray-600 leading-relaxed">Kota besar seperti Birmingham, Manchester, dan Leeds menunjukkan manfaat absolut tertinggi karena populasi besar yang terpengaruh peningkatan kualitas udara.</p>
          </div>
          <div>
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mr-3 shadow-sm"></div>
              <h5 className="font-semibold text-gray-800">Variasi Regional</h5>
            </div>
            <p className="text-gray-600 leading-relaxed">Skotlandia dan Wales menunjukkan pola berbeda dibanding Inggris, mencerminkan aktivitas industri dan kepadatan populasi yang bervariasi.</p>
          </div>
          <div>
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 mr-3 shadow-sm"></div>
              <h5 className="font-semibold text-gray-800">Pesisir vs Pedalaman</h5>
            </div>
            <p className="text-gray-600 leading-relaxed">Wilayah pesisir sering mendapat manfaat dari sirkulasi udara alami, sementara area industri pedalaman menghadapi tantangan polusi lebih besar.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
