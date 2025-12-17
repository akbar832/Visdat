import { motion } from "framer-motion";
import AnimatedBarChart from "../components/AnimatedBarChart";
import { damagePathways, airQualityData } from "../data/sampleData";

export default function DamagePathwaySection() {
  // Aggregate damage pathway data
  const pathwayTotals = damagePathways
    .map((pathway) => {
      const total = airQualityData.reduce((sum, la) => {
        return sum + (la.damagePathways[pathway.id] || 0);
      }, 0);

      return {
        label: pathway.name,
        value: Math.round(total),
        color: pathway.healthImpact === "high" ? "#00718f" : pathway.healthImpact === "medium" ? "#00718f" : "#00718f",
      };
    })
    .sort((a, b) => b.value - a.value);

  return (
    <section className="section-container bg-gradient-to-br from-white via-gray-50 to-primary-50/30 min-h-screen flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">Dampak pada Kesehatan</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">Polusi udara mempengaruhi kesehatan melalui berbagai jalur (damage pathways). Semakin tinggi nilai, semakin besar dampaknya terhadap penyakit tersebut.</p>
      </motion.div>

      <AnimatedBarChart data={pathwayTotals} title="Dampak Kesehatan berdasarkan Jalur Dampak" subtitle="Tingkat keparahan dampak kesehatan pada berbagai jalur dampak" height={450} />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8">
        <div className="bg-white rounded-2xl p-8 border border-primary-200 shadow-sm">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-primary-700 mb-2">Jalur Kesehatan Kritis</h4>
              <p className="text-gray-600 text-lg leading-relaxed">Memahami jalur ini sangat penting untuk intervensi kesehatan publik yang tertarget</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                <h5 className="font-bold text-gray-800">Dampak Tinggi</h5>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Penyakit Pernapasan</li>
                <li>• Penyakit Kardiovaskular</li>
                <li>• Asma</li>
                <li>• Kematian Prematur</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                <h5 className="font-bold text-gray-800">Dampak Sedang</h5>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bronkitis Kronis</li>
                <li>• Rawat Inap Rumah Sakit</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-primary-400"></div>
                <h5 className="font-bold text-gray-800">Dampak Rendah</h5>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hari Kerja Hilang</li>
                <li>• Produktivitas Menurun</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 bg-primary-600 rounded-2xl p-8 text-white shadow-lg"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">💡</div>
          <div>
            <h4 className="text-2xl font-bold mb-3">Mengapa Ini Penting</h4>
            <p className="text-lg text-primary-50 leading-relaxed">
              Dengan memahami jalur kesehatan mana yang paling terpengaruh polusi udara, pembuat kebijakan dapat memprioritaskan intervensi yang memberikan manfaat kesehatan terbesar. Mengurangi emisi di area berdampak tinggi dapat mencegah
              ribuan kematian prematur dan secara signifikan mengurangi beban layanan kesehatan.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
