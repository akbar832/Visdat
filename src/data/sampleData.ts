// Sample data for UK Air Quality and Climate Action Co-Benefits
// Based on the competition theme: Communicate the Co-Benefits of Climate Action

import type { AirQualityData, LocalAuthority, DamagePathway } from "../types";

export const damagePathways: DamagePathway[] = [
  { id: "respiratory", name: "Respiratory Disease", description: "Impact on breathing and lung health", healthImpact: "high" },
  { id: "cardiovascular", name: "Cardiovascular Disease", description: "Impact on heart and blood vessels", healthImpact: "high" },
  { id: "asthma", name: "Asthma", description: "Chronic respiratory condition", healthImpact: "high" },
  { id: "bronchitis", name: "Chronic Bronchitis", description: "Long-term inflammation of airways", healthImpact: "medium" },
  { id: "mortality", name: "Premature Mortality", description: "Early death due to pollution", healthImpact: "high" },
  { id: "hospital", name: "Hospital Admissions", description: "Emergency healthcare visits", healthImpact: "medium" },
  { id: "workdays", name: "Lost Work Days", description: "Productivity loss due to illness", healthImpact: "low" },
];

export const localAuthorities: LocalAuthority[] = [
  { id: "birmingham", name: "Birmingham", nation: "England", population: 1141816, latitude: 52.4862, longitude: -1.8904 },
  { id: "leeds", name: "Leeds", nation: "England", population: 793139, latitude: 53.8008, longitude: -1.5491 },
  { id: "glasgow", name: "Glasgow City", nation: "Scotland", population: 633120, latitude: 55.8642, longitude: -4.2518 },
  { id: "sheffield", name: "Sheffield", nation: "England", population: 584028, latitude: 53.3811, longitude: -1.4701 },
  { id: "manchester", name: "Manchester", nation: "England", population: 547627, latitude: 53.4808, longitude: -2.2426 },
  { id: "bradford", name: "Bradford", nation: "England", population: 539776, latitude: 53.796, longitude: -1.7594 },
  { id: "edinburgh", name: "Edinburgh", nation: "Scotland", population: 524930, latitude: 55.9533, longitude: -3.1883 },
  { id: "liverpool", name: "Liverpool", nation: "England", population: 498042, latitude: 53.4084, longitude: -2.9916 },
  { id: "cardiff", name: "Cardiff", nation: "Wales", population: 366903, latitude: 51.4816, longitude: -3.1791 },
  { id: "belfast", name: "Belfast", nation: "Northern Ireland", population: 345418, latitude: 54.5973, longitude: -5.9301 },
  { id: "cornwall", name: "Cornwall", nation: "England", population: 568210, latitude: 50.266, longitude: -5.0527 },
  { id: "durham", name: "County Durham", nation: "England", population: 530094, latitude: 54.7761, longitude: -1.5733 },
  { id: "portsmouth", name: "Portsmouth", nation: "England", population: 238137, latitude: 50.8198, longitude: -1.088 },
  { id: "nottingham", name: "Nottingham", nation: "England", population: 331069, latitude: 52.9548, longitude: -1.1581 },
  { id: "newcastle", name: "Newcastle upon Tyne", nation: "England", population: 302820, latitude: 54.9783, longitude: -1.6178 },
];

// Generate realistic air quality data for UK Local Authorities
export const airQualityData: AirQualityData[] = localAuthorities.map((la) => {
  // Larger cities typically have worse air quality but higher total benefits due to population
  const populationFactor = la.population / 1000000;
  const urbanFactor = ["birmingham", "manchester", "glasgow", "leeds", "liverpool"].includes(la.id) ? 1.5 : 1.0;

  const baseAirQuality = Math.random() * 400 + 100;
  const airQualityScore = baseAirQuality * urbanFactor * populationFactor;

  // Health benefits are typically higher (70-80% of total benefits)
  const healthBenefit = airQualityScore * (0.7 + Math.random() * 0.15);
  const nonHealthBenefit = airQualityScore - healthBenefit;

  // Generate damage pathway distributions
  const damagePathwayValues: { [key: string]: number } = {};
  damagePathways.forEach((pathway) => {
    const weight = pathway.healthImpact === "high" ? 0.3 : pathway.healthImpact === "medium" ? 0.2 : 0.1;
    damagePathwayValues[pathway.id] = healthBenefit * (weight + Math.random() * 0.1);
  });

  return {
    localAuthorityId: la.id,
    localAuthorityName: la.name,
    nation: la.nation,
    population: la.population,
    airQualityScore: Math.round(airQualityScore),
    healthBenefit: Math.round(healthBenefit),
    nonHealthBenefit: Math.round(nonHealthBenefit),
    totalBenefit: Math.round(airQualityScore),
    damagePathways: damagePathwayValues,
    latitude: la.latitude,
    longitude: la.longitude,
  };
});

// Sort by total benefit for rankings
export const rankedAirQualityData = [...airQualityData].sort((a, b) => b.totalBenefit - a.totalBenefit);

// Aggregate by nation
export const nationAggregates = airQualityData.reduce((acc, curr) => {
  if (!acc[curr.nation]) {
    acc[curr.nation] = {
      nation: curr.nation,
      totalBenefit: 0,
      healthBenefit: 0,
      nonHealthBenefit: 0,
      population: 0,
      authorities: 0,
    };
  }
  acc[curr.nation].totalBenefit += curr.totalBenefit;
  acc[curr.nation].healthBenefit += curr.healthBenefit;
  acc[curr.nation].nonHealthBenefit += curr.nonHealthBenefit;
  acc[curr.nation].population += curr.population;
  acc[curr.nation].authorities += 1;
  return acc;
}, {} as Record<string, any>);

// Export for easy access
export const nationData = Object.values(nationAggregates);
