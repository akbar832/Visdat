// Core data types for the Climate Action visualization

export interface LocalAuthority {
  id: string;
  name: string;
  nation: "England" | "Wales" | "Scotland" | "Northern Ireland";
  population: number;
  latitude: number;
  longitude: number;
}

export interface DamagePathway {
  id: string;
  name: string;
  description: string;
  healthImpact: "high" | "medium" | "low";
}

export interface DamageType {
  id: string;
  name: "health" | "non-health";
  description: string;
}

export interface AirQualityData {
  localAuthorityId: string;
  localAuthorityName: string;
  nation: string;
  population: number;
  airQualityScore: number;
  healthBenefit: number;
  nonHealthBenefit: number;
  totalBenefit: number;
  damagePathways: {
    [key: string]: number;
  };
  latitude?: number;
  longitude?: number;
}

export interface ChartData {
  label: string;
  value: number;
  category?: string;
  color?: string;
}

export interface MapFeature {
  type: "Feature";
  properties: {
    name: string;
    value: number;
    category: string;
  };
  geometry: {
    type: "Point" | "Polygon";
    coordinates: number[] | number[][][] | number[][][][];
  };
}

export interface ScrollSection {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}
