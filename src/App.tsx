import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import HealthBenefitsPage from "./pages/HealthBenefitsPage";
import RankingsPage from "./pages/RankingsPage";
import MapPage from "./pages/MapPage";
import AnalysisPage from "./pages/AnalysisPage";
import RecommendationsPage from "./pages/RecommendationsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-earth-light flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/health-benefits" element={<HealthBenefitsPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-primary-800 text-white py-12 mt-auto">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-display font-bold text-xl mb-4">Aksi Iklim</h3>
                <p className="text-primary-100 text-sm">Memvisualisasikan manfaat tersembunyi dari aksi iklim melalui peningkatan kualitas udara di wilayah UK.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Tautan Cepat</h4>
                <ul className="space-y-2 text-sm text-primary-100">
                  <li>
                    <a href="/overview" className="hover:text-white transition-colors">
                      Ringkasan
                    </a>
                  </li>
                  <li>
                    <a href="/health-benefits" className="hover:text-white transition-colors">
                      Manfaat Kesehatan
                    </a>
                  </li>
                  <li>
                    <a href="/rankings" className="hover:text-white transition-colors">
                      Peringkat
                    </a>
                  </li>
                  <li>
                    <a href="/map" className="hover:text-white transition-colors">
                      Peta Interaktif
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-primary-700 pt-6 text-center">
              <p className="text-sm text-primary-200">© 2025 - Visualisasi Data Mahasiswa Telkom University | Sumber Data: UK Air Quality & Health Impact Assessment</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
