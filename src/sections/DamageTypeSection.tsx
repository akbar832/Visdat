import { motion } from "framer-motion";
import AnimatedBarChart from "../components/AnimatedBarChart";
import { nationData } from "../data/sampleData";

export default function DamageTypeSection() {
  // Prepare data for damage type comparison
  const damageTypeData = nationData.map((nation) => ({
    label: nation.nation,
    value: nation.healthBenefit,
    color: "#00718f",
    category: "Health",
  }));

  // Combined comparison data
  const comparisonData = [
    { label: "Health Benefits", value: nationData.reduce((sum, n) => sum + n.healthBenefit, 0), color: "#00718f" },
    { label: "Non-Health Benefits", value: nationData.reduce((sum, n) => sum + n.nonHealthBenefit, 0), color: "#005a70" },
  ];

  return (
    <section className="section-container bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">Air Quality and Health Connection</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Polusi udara berdampak langsung pada kesehatan masyarakat. Data ini menunjukkan skor co-benefit kualitas udara per region di UK — semakin tinggi, semakin besar manfaatnya bagi kesehatan.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <AnimatedBarChart data={comparisonData} title="Total Manfaat: Kesehatan vs Non-Kesehatan" subtitle="Kontribusi manfaat kesehatan vs non-kesehatan secara keseluruhan" height={350} />

        <AnimatedBarChart data={damageTypeData} title="Manfaat Kesehatan per Negara" subtitle="Manfaat kesehatan dari kualitas udara per negara" height={350} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="group">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-50 mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
              <div className="text-3xl font-bold text-primary">{Math.round((nationData.reduce((sum, n) => sum + n.healthBenefit, 0) / nationData.reduce((sum, n) => sum + n.totalBenefit, 0)) * 100)}%</div>
            </div>
            <p className="text-gray-700 font-medium">Total manfaat terkait kesehatan</p>
          </div>
          <div className="group">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-50 mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
              <div className="text-3xl font-bold text-primary-600">{nationData.reduce((sum, n) => sum + n.authorities, 0)}</div>
            </div>
            <p className="text-gray-700 font-medium">Otoritas Lokal dianalisis</p>
          </div>
          <div className="group">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-50 mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
              <div className="text-3xl font-bold text-primary-600">{(nationData.reduce((sum, n) => sum + n.population, 0) / 1000000).toFixed(1)}M</div>
            </div>
            <p className="text-gray-700 font-medium">Orang terdampak di seluruh UK</p>
          </div>
        </div>
      </div>
    </section>
  );
}
