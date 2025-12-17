import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { GeoJsonObject } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { AirQualityData } from "../types";

interface ChoroplethMapProps {
  data: AirQualityData[];
  title: string;
  subtitle?: string;
}

// Component to fit map bounds to filtered data
function FitBounds({ data }: { data: AirQualityData[] }) {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      // Create bounds from data coordinates
      const bounds = L.latLngBounds(data.filter((d) => d.latitude && d.longitude).map((d) => [d.latitude!, d.longitude!] as [number, number]));

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
      }
    }
  }, [data, map]);

  return null;
}

export default function ChoroplethMap({ data, title, subtitle }: ChoroplethMapProps) {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const geoJsonRef = useRef<L.GeoJSON>(null);

  // UK center coordinates
  const center: [number, number] = [54.5, -3.5];
  const zoom = 6;

  // Load GeoJSON file
  useEffect(() => {
    console.log("Loading GeoJSON... (File size: ~273MB, this may take a while)");
    const startTime = Date.now();

    fetch("/small_areas_british_grid.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load map data");
        }
        console.log("GeoJSON downloaded, parsing...");
        return response.json();
      })
      .then((json) => {
        const loadTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`GeoJSON loaded successfully in ${loadTime}s`);
        console.log("Features count:", json.features?.length || 0);
        setGeoData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading GeoJSON:", err);
        setError("File terlalu besar (273MB). Silakan simplify di Mapshaper dengan: simplify 5% keep-shapes");
        setLoading(false);
      });
  }, []);

  // Get value range for color scaling
  const maxValue = Math.max(...data.map((d) => d.totalBenefit));
  const minValue = Math.min(...data.map((d) => d.totalBenefit));

  // Color scale function based on benefit value
  const getColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);

    // Color gradient from light to dark primary color
    if (normalized > 0.9) return "#003d4d"; // Very dark teal
    if (normalized > 0.75) return "#00556b"; // Dark teal
    if (normalized > 0.6) return "#00718f"; // Primary color
    if (normalized > 0.45) return "#1a8aa3"; // Medium teal
    if (normalized > 0.3) return "#33a6bf"; // Light teal
    if (normalized > 0.15) return "#66bccf"; // Lighter teal
    return "#99d3df"; // Very light teal
  };

  // Helper function to get center of polygon
  const getPolygonCenter = (coordinates: any): [number, number] => {
    if (!coordinates || !coordinates[0]) return [0, 0];
    const coords = coordinates[0];
    const latSum = coords.reduce((sum: number, c: any) => sum + c[1], 0);
    const lonSum = coords.reduce((sum: number, c: any) => sum + c[0], 0);
    return [latSum / coords.length, lonSum / coords.length];
  };

  // Helper function to calculate distance between two points
  const distance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    return Math.sqrt(dLat * dLat + dLon * dLon);
  };

  // Find nearest authority for each polygon based on coordinates
  const getNearestAuthority = (feature: any) => {
    if (!feature.geometry || !feature.geometry.coordinates) return null;

    const [lat, lon] = getPolygonCenter(feature.geometry.coordinates);

    let nearest = data[0];
    let minDist = Infinity;

    data.forEach((d) => {
      if (d.latitude && d.longitude) {
        const dist = distance(lat, lon, d.latitude, d.longitude);
        if (dist < minDist) {
          minDist = dist;
          nearest = d;
        }
      }
    });

    // Only return if within reasonable distance (about 50km in degrees)
    return minDist < 0.5 ? nearest : null;
  };

  // Show all GeoJSON features (no filtering)
  const filteredGeoData = geoData;

  // Style function for each feature
  const style = (feature: any) => {
    const authority = getNearestAuthority(feature);
    const value = authority?.totalBenefit || minValue;

    return {
      fillColor: authority ? getColor(value) : "#e5e7eb",
      weight: 0.3,
      opacity: 1,
      color: "white",
      fillOpacity: authority ? 0.7 : 0.3,
    };
  };

  // Hover effects
  const onEachFeature = (feature: any, layer: any) => {
    const smallArea = feature.properties.small_area;
    const authority = getNearestAuthority(feature);

    layer.on({
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: "#333",
          fillOpacity: 0.9,
        });
        layer.bringToFront();
      },
      mouseout: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 0.5,
          color: "white",
          fillOpacity: 0.7,
        });
      },
    });

    // Popup
    if (authority) {
      layer.bindPopup(`
        <div style="font-family: system-ui; padding: 8px;">
          <h4 style="margin: 0 0 8px 0; color: #00718f; font-weight: bold;">${authority.localAuthorityName}</h4>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Negara:</strong> ${authority.nation}</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Populasi:</strong> ${authority.population.toLocaleString()}</p>
          <hr style="margin: 8px 0; border: none; border-top: 1px solid #ddd;" />
          <p style="margin: 4px 0; font-size: 13px;"><strong>Total Manfaat:</strong> <span style="color: #00718f; font-weight: bold;">${authority.totalBenefit.toLocaleString()}</span></p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Manfaat Kesehatan:</strong> ${authority.healthBenefit.toLocaleString()}</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Manfaat Non-Kesehatan:</strong> ${authority.nonHealthBenefit.toLocaleString()}</p>
        </div>
      `);
    } else {
      layer.bindPopup(`
        <div style="font-family: system-ui; padding: 8px;">
          <p style="margin: 0; font-size: 13px; color: #666;">Area: ${smallArea || "Unknown"}</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #999;">Data tidak tersedia</p>
        </div>
      `);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary-700 mb-2">{title}</h3>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>

      <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-300 shadow-sm relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat peta geospasial...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center text-primary-700">
              <p className="font-semibold mb-2">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && filteredGeoData && (
          <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true} zoomControl={true}>
            <TileLayer attribution='&copy; <a href="https://carto.com/">CARTO</a>' url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" subdomains="abcd" maxZoom={20} />
            <GeoJSON ref={geoJsonRef} data={filteredGeoData} style={style} onEachFeature={onEachFeature} />
            <FitBounds data={data} />
          </MapContainer>
        )}
      </div>

      {/* Legend */}
      {/* Legend and Info */}
      <div className="mt-6 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Skala Manfaat Kualitas Udara</h4>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#99d3df" }}></div>
              <span className="text-xs text-gray-600">Rendah</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#66bccf" }}></div>
              <span className="text-xs text-gray-600">Cukup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#33a6bf" }}></div>
              <span className="text-xs text-gray-600">Sedang</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#00718f" }}></div>
              <span className="text-xs text-gray-600">Tinggi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#00556b" }}></div>
              <span className="text-xs text-gray-600">Sangat Tinggi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#003d4d" }}></div>
              <span className="text-xs text-gray-600">Ekstrim</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Warna lebih gelap menunjukkan manfaat kualitas udara yang lebih tinggi. Klik wilayah untuk detail informasi.</p>
        </div>
      </div>

      {/* Info */}
      {!loading && filteredGeoData && (
        <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-xs text-primary-700">
            <strong>💡 Info:</strong> Menampilkan {(filteredGeoData as any).features?.length.toLocaleString() || 0} wilayah geospasial UK. Warna ditentukan berdasarkan data {data.length} otoritas lokal terdekat.
          </p>
        </div>
      )}
    </motion.div>
  );
}
