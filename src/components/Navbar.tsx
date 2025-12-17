import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Beranda" },
  { path: "/overview", label: "Ringkasan" },
  { path: "/health-benefits", label: "Manfaat Kesehatan" },
  { path: "/rankings", label: "Peringkat" },
  { path: "/map", label: "Peta" },
  { path: "/analysis", label: "Analisis" },
  { path: "/recommendations", label: "Rekomendasi" },
];

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-200" : "bg-primary-800/90 backdrop-blur-sm"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link to="/" className="group">
              <span className={`font-display font-semibold text-lg tracking-tight transition-colors ${scrolled ? "text-primary-700" : "text-white"} group-hover:opacity-80`}>Aksi Iklim</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path} className="relative group">
                    <span className={`text-sm font-medium transition-colors ${isActive ? (scrolled ? "text-primary-600" : "text-white") : scrolled ? "text-gray-600 hover:text-primary-600" : "text-white/70 hover:text-white"}`}>
                      {link.label}
                    </span>
                    {isActive && <motion.div layoutId="navbar-indicator" className={`absolute -bottom-5 left-0 right-0 h-0.5 ${scrolled ? "bg-primary-600" : "bg-white"}`} transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden bg-primary-700/95 backdrop-blur-xl border-t border-primary-600/30"
            >
              <div className="px-6 py-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
