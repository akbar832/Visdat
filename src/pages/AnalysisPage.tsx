import DistributionSection from "../sections/DistributionSection";
import DamagePathwaySection from "../sections/DamagePathwaySection";

export default function AnalysisPage() {
  return (
    <div className="min-h-screen py-8">
      <DistributionSection />
      <div className="py-8"></div>
      <DamagePathwaySection />
    </div>
  );
}
