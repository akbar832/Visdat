import { motion } from "framer-motion";

interface Recommendation {
  icon: string;
  title: string;
  description: string;
  action: string;
}

const recommendations: Recommendation[] = [
  {
    icon: "🚇",
    title: "Zona Emisi Rendah",
    description: "Kurangi NOx",
    action: "Implementasi zona emisi rendah di area urban untuk mengurangi emisi nitrogen oksida",
  },
  {
    icon: "🚌",
    title: "Transportasi Publik",
    description: "Kurangi polusi mobil pribadi",
    action: "Perluas jaringan transportasi publik untuk mengurangi emisi kendaraan pribadi",
  },
  {
    icon: "🌳",
    title: "Penanaman Pohon Kota",
    description: "Filter alami udara",
    action: "Tanam hutan urban dan tingkatkan ruang hijau untuk filtrasi udara alami",
  },
];

export default function RecommendationsSection() {
  return (
    <section className="section-container bg-gradient-to-br from-gray-50 via-primary-50/30 to-primary-50/20 min-h-screen flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">Rekomendasi Kebijakan</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Kebijakan ini memastikan manfaat udara bersih, berdampak langsung pada kualitas hidup dan kesehatan masyarakat.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl">{rec.icon}</div>
            <h3 className="text-xl font-bold text-primary-700 mb-3">{rec.title}</h3>
            <p className="text-primary-600 font-semibold mb-4">{rec.description}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{rec.action}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary-600 via-primary to-primary-600 rounded-2xl p-12 text-white text-center shadow-xl"
      >
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Udara yang lebih bersih berarti hidup yang lebih sehat</h3>
          <p className="text-xl mb-6 text-primary-100">Aksi iklim dimulai dari udara yang kita hirup.</p>
          <p className="text-lg text-primary-50 leading-relaxed">Setiap tindakan untuk mengurangi polusi udara memberikan manfaat ganda: melindungi planet dan meningkatkan kesehatan masyarakat. Mulailah dengan komitmen nyata hari ini.</p>
        </div>
      </motion.div>
    </section>
  );
}
