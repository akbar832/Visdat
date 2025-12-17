import { motion } from "framer-motion";
import AnimatedAreaChart from "../components/AnimatedAreaChart";
import { rankedAirQualityData } from "../data/sampleData";

export default function DistributionSection() {
  // Prepare data for area chart - sorted from highest to lowest
  const distributionData = rankedAirQualityData.map((la) => ({
    label: la.localAuthorityName,
    value: la.healthBenefit,
  }));

  return (
    <section className="section-container bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">Distribusi Manfaat Kesehatan</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Semakin tinggi kualitas udara, semakin besar manfaat bagi kesehatan masyarakat. Grafik ini menunjukkan trend hubungan antara skor Air Quality dan kesehatan.</p>
      </motion.div>

      <AnimatedAreaChart
        data={distributionData}
        title="Distribusi Manfaat Kesehatan: Dari Tertinggi ke Terendah"
        subtitle="Area chart menampilkan distribusi manfaat kesehatan dari wilayah tertinggi ke terendah"
        height={500}
        color="#00718f"
      />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-primary-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-3">Tren Positif</h4>
              <p className="text-white/90 leading-relaxed">
                Wilayah dengan kualitas udara lebih baik secara konsisten menunjukkan hasil kesehatan publik yang meningkat, termasuk penurunan penyakit pernapasan dan tingkat rawat inap lebih rendah.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">💰</div>
            <div>
              <h4 className="text-2xl font-bold mb-3">Dampak Ekonomi</h4>
              <p className="text-primary-50 leading-relaxed">Kualitas udara lebih baik diterjemahkan ke manfaat ekonomi: lebih sedikit hari sakit, biaya kesehatan berkurang, dan produktivitas pekerja meningkat di berbagai wilayah.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
