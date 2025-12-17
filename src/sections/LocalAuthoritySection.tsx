import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedBarChart from "../components/AnimatedBarChart";
import { airQualityData, rankedAirQualityData } from "../data/sampleData";

export default function LocalAuthoritySection() {
  const [selectedNation, setSelectedNation] = useState<string>("All");

  const nations = ["Semua", "England", "Scotland", "Wales", "Northern Ireland"];

  // Filter data based on selected nation
  const filteredData =
    selectedNation === "Semua"
      ? rankedAirQualityData.slice(0, 10)
      : airQualityData
          .filter((d) => d.nation === selectedNation)
          .sort((a, b) => b.healthBenefit - a.healthBenefit)
          .slice(0, 10);

  const chartData = filteredData.map((la) => ({
    label: la.localAuthorityName,
    value: la.healthBenefit,
    color: "#00718f",
  }));

  return (
    <section className="section-container bg-gradient-to-br from-white via-gray-50 to-sky-50/30">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">Manfaat Kesehatan per Local Authority</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Beberapa region sudah menikmati udara lebih bersih, sementara region lain masih memiliki skor rendah.</p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="flex flex-wrap justify-center gap-3 mb-8">
        {nations.map((nation) => {
          const getButtonColor = (nationName: string) => {
            if (nationName === "Semua") return "bg-gradient-to-r from-primary-600 to-primary-700";
            if (nationName === "England") return "bg-gradient-to-r from-blue-600 to-blue-700";
            if (nationName === "Scotland") return "bg-gradient-to-r from-indigo-600 to-indigo-700";
            if (nationName === "Wales") return "bg-gradient-to-r from-emerald-600 to-emerald-700";
            return "bg-gradient-to-r from-amber-600 to-amber-700";
          };
          return (
            <button
              key={nation}
              onClick={() => setSelectedNation(nation)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedNation === nation ? `${getButtonColor(nation)} text-white shadow-lg scale-105` : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {nation}
            </button>
          );
        })}
      </motion.div>

      <AnimatedBarChart
        data={chartData}
        title={`${filteredData.length} Otoritas Lokal Teratas berdasarkan Manfaat Kesehatan${selectedNation !== "Semua" ? ` - ${selectedNation}` : ""}`}
        subtitle="Mengidentifikasi wilayah dengan manfaat kesehatan tertinggi dari kualitas udara"
        height={500}
        horizontal={true}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-lg"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">💡</div>
          <div>
            <h4 className="text-2xl font-bold mb-3">Wawasan Utama</h4>
            <p className="text-lg text-white/90 leading-relaxed">
              Udara bersih memberikan manfaat nyata bagi kesehatan masyarakat. Grafik ini menunjukkan tren hubungan antara skor kualitas udara dan kesehatan. Wilayah dengan skor tinggi cenderung memiliki populasi lebih sehat, dengan lebih
              sedikit kasus penyakit pernapasan.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
