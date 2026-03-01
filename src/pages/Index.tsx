import AfriShipNav from "@/components/AfriShipNav";
import AfriShipHero from "@/components/AfriShipHero";
import AfriShipFeatures from "@/components/AfriShipFeatures";
import AfriShipPricing from "@/components/AfriShipPricing";
import AfriShipWaitlist from "@/components/AfriShipWaitlist";
import AfriShipFooter from "@/components/AfriShipFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AfriShipNav />
      <AfriShipHero />
      <AfriShipFeatures />
      <AfriShipPricing />
      <AfriShipWaitlist />
      <AfriShipFooter />
    </div>
  );
};

export default Index;
