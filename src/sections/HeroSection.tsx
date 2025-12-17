import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";

export default function HeroSection() {
  const globeRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!globeRef.current) return;

    const svg = d3.select(globeRef.current);
    const width = 400;
    const height = 400;
    const radius = 180;

    svg.selectAll("*").remove();

    const globe = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create Earth circle
    globe.append("circle").attr("r", radius).attr("fill", "#00718f").attr("opacity", 0.3);

    // Add continents as simplified shapes
    const continents = [
      { x: -60, y: -40, size: 50, rotate: 15 },
      { x: 30, y: -50, size: 60, rotate: -20 },
      { x: -40, y: 40, size: 45, rotate: 30 },
      { x: 50, y: 50, size: 40, rotate: -15 },
    ];

    continents.forEach((cont) => {
      const landGroup = globe.append("g").attr("transform", `translate(${cont.x}, ${cont.y}) rotate(${cont.rotate})`);

      landGroup
        .append("ellipse")
        .attr("rx", cont.size)
        .attr("ry", cont.size * 0.6)
        .attr("fill", "#10b981")
        .attr("opacity", 0.8);
    });

    // Add animated pollution particles
    const particles = 15;
    for (let i = 0; i < particles; i++) {
      const angle = (i / particles) * Math.PI * 2;
      const distance = radius + 20 + Math.random() * 40;

      globe
        .append("circle")
        .attr("cx", Math.cos(angle) * distance)
        .attr("cy", Math.sin(angle) * distance)
        .attr("r", 3 + Math.random() * 3)
        .attr("fill", "#00718f")
        .attr("opacity", 0.6)
        .transition()
        .duration(2000 + Math.random() * 2000)
        .ease(d3.easeSinInOut)
        .attr("opacity", 0.2)
        .attr("r", 1)
        .transition()
        .duration(2000 + Math.random() * 2000)
        .attr("opacity", 0.6)
        .attr("r", 3 + Math.random() * 3)
        .on("end", function repeat() {
          d3.select(this)
            .transition()
            .duration(2000 + Math.random() * 2000)
            .ease(d3.easeSinInOut)
            .attr("opacity", 0.2)
            .attr("r", 1)
            .transition()
            .duration(2000 + Math.random() * 2000)
            .attr("opacity", 0.6)
            .attr("r", 3 + Math.random() * 3)
            .on("end", repeat);
        });
    }

    // Add clean air particles (positive)
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + Math.PI / 20;
      const distance = radius + 10 + Math.random() * 30;

      globe
        .append("circle")
        .attr("cx", Math.cos(angle) * distance)
        .attr("cy", Math.sin(angle) * distance)
        .attr("r", 2 + Math.random() * 2)
        .attr("fill", "#00718f")
        .attr("opacity", 0.5)
        .transition()
        .duration(3000 + Math.random() * 2000)
        .ease(d3.easeSinInOut)
        .attr("cy", Math.sin(angle) * distance - 60)
        .attr("opacity", 0)
        .on("end", function repeat() {
          d3.select(this)
            .attr("cy", Math.sin(angle) * distance)
            .attr("opacity", 0.7)
            .transition()
            .duration(3000 + Math.random() * 2000)
            .ease(d3.easeSinInOut)
            .attr("cy", Math.sin(angle) * distance - 60)
            .attr("opacity", 0)
            .on("end", repeat);
        });
    }
  }, [navigate]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-lg bg-white/20 text-white text-sm font-medium">Visualisasi Data Kualitas Udara UK</div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Udara Lebih Bersih,
              <br />
              Hidup Lebih Sehat
            </h1>

            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              Menjelajahi manfaat tersembunyi dari aksi iklim melalui peningkatan kualitas udara di berbagai wilayah UK. Temukan bagaimana pengurangan emisi menciptakan komunitas yang lebih sehat dan ekonomi yang lebih kuat.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <button onClick={() => navigate("/overview")} className="px-6 py-3 bg-white text-[#00718f] font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Jelajahi Data
              </button>
              <button onClick={() => navigate("/recommendations")} className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                Lihat Rekomendasi
              </button>
            </div>
          </motion.div>

          {/* Animated Globe */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }} className="flex justify-center">
            <div className="relative">
              <svg ref={globeRef} width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
