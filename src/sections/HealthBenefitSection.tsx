import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedBarChart from "../components/AnimatedBarChart";
import { airQualityData } from "../data/sampleData";

export default function HealthBenefitSection() {
  const [selectedNation, setSelectedNation] = useState<string>("Semua");

  // Get unique nations
  const nations = ["Semua", ...Array.from(new Set(airQualityData.map((d) => d.nation)))];

  // Filter data based on selection
  const filteredData = selectedNation === "Semua" ? airQualityData : airQualityData.filter((d) => d.nation === selectedNation);

  // Sort and take top 10
  const topAuthorities = [...filteredData]
    .sort((a, b) => b.healthBenefit - a.healthBenefit)
    .slice(0, 10)
    .map((d) => ({
      label: d.localAuthorityName,
      value: d.healthBenefit,
      color: "#00718f",
    }));

  return (
    <section className="section-container bg-gradient-to-b from-white via-gray-50 to-primary-50/30 min-h-screen flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">Manfaat Kesehatan per Local Authority</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Beberapa region sudah menikmati udara lebih bersih, sementara region lain masih memiliki skor rendah.</p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center gap-3 mb-8 flex-wrap">
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
        data={topAuthorities}
        title={`10 Otoritas Lokal Teratas ${selectedNation !== "Semua" ? `di ${selectedNation}` : "di Seluruh UK"}`}
        subtitle="Wilayah dengan manfaat kesehatan tertinggi dari kualitas udara"
        height={500}
        horizontal={true}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h4 className="font-bold text-primary-700 text-2xl mb-6">Wawasan Utama</h4>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
            <p className="leading-relaxed">
              <strong>Birmingham</strong> memiliki manfaat kesehatan tertinggi karena populasi besar dan upaya pengurangan emisi yang signifikan.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
            <p className="leading-relaxed">
              <strong>Leeds dan Glasgow</strong> juga menunjukkan peningkatan kualitas udara yang berdampak pada penurunan penyakit pernapasan.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
