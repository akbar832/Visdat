import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "../sections/HeroSection";

export default function HomePage() {
  const features = [
    {
      title: "Manfaat Kesehatan",
      desc: "Analisis dampak kesehatan",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      link: "/health-benefits",
    },
    {
      title: "Peringkat UK",
      desc: "Bandingkan wilayah",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      link: "/rankings",
    },
    {
      title: "Peta Interaktif",
      desc: "Jelajahi geografis",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
      link: "/map",
    },
    {
      title: "Analisis Data",
      desc: "Wawasan mendalam",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      link: "/analysis",
    },
  ];

  return (
    <div>
      <HeroSection />

      {/* Quick Navigation Cards */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Jelajahi Data</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Navigasi melalui berbagai aspek manfaat ganda aksi iklim</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <Link key={feature.title} to={feature.link} className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-[#00718f] hover:shadow-lg transition-all">
              <div className="text-[#00718f] mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{feature.desc}</p>
              <div className="flex items-center gap-2 text-[#00718f] text-sm font-medium">
                <span>Lihat detail</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00718f]/10 rounded-lg mb-4">
                <svg className="w-7 h-7 text-[#00718f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">70%+</h3>
              <p className="text-gray-600">manfaat terkait kesehatan</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00718f]/10 rounded-lg mb-4">
                <svg className="w-7 h-7 text-[#00718f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">15+</h3>
              <p className="text-gray-600">Otoritas Lokal UK dianalisis</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00718f]/10 rounded-lg mb-4">
                <svg className="w-7 h-7 text-[#00718f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">5 Juta+</h3>
              <p className="text-gray-600">Orang terdampak di berbagai wilayah</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
