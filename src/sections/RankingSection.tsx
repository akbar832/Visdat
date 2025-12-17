import { motion } from "framer-motion";
import AnimatedBarChart from "../components/AnimatedBarChart";
import { rankedAirQualityData } from "../data/sampleData";

export default function RankingSection() {
  const rankingData = rankedAirQualityData.map((la) => ({
    label: la.localAuthorityName,
    value: la.totalBenefit,
    color: "#00718f",
  }));

  return (
    <section className="section-container bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">Distribusi Air Quality</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Warna yang lebih gelap menandakan manfaat kualitas udara lebih besar, sementara warna lebih terang menunjukkan skor yang perlu perhatian serius.</p>
      </motion.div>

      <AnimatedBarChart data={rankingData} title="Peringkat Kualitas Udara: Seluruh Otoritas Lokal UK" subtitle="Menunjukkan ketimpangan distribusi manfaat kualitas udara antar wilayah" height={600} horizontal={true} />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-primary-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-2xl font-bold mb-4">Analisis Distribusi</h4>
          <p className="text-lg mb-6 text-primary-100">Data menunjukkan ketimpangan signifikan dalam manfaat kualitas udara di seluruh wilayah UK.</p>
          <ul className="space-y-3 text-primary-50">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>20% teratas otoritas menyumbang lebih dari 50% total manfaat</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Area urban menunjukkan manfaat lebih tinggi karena kepadatan populasi</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Area rural sering memiliki kualitas udara lebih baik namun dampak total lebih rendah</span>
            </li>
          </ul>
        </div>

        <div className="bg-primary-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <h4 className="text-2xl font-bold mb-4">Area yang Perlu Perhatian</h4>
          <p className="text-lg mb-6 text-white/90">Otoritas dengan peringkat lebih rendah memerlukan intervensi terfokus untuk meningkatkan kualitas udara.</p>
          <ul className="space-y-3 text-white/90">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Area industri menghadapi tantangan polusi yang persisten</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Zona lalu lintas tinggi membutuhkan kebijakan pengurangan emisi segera</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Infrastruktur kesehatan publik harus diperkuat di area rentan</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
