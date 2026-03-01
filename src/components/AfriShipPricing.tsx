import { useState, useEffect, useRef } from "react";

type Tab = "rates" | "features";

const shippingRates = [
  { route: "Lagos → Accra", detail: "1 kg, documents", dhl: "$38.50", fedex: "$41.00", ups: "$36.80", afri: "$19.90", save: "−48%" },
  { route: "Nairobi → Johannesburg", detail: "5 kg, parcel", dhl: "$112.00", fedex: "$119.50", ups: "$108.00", afri: "$67.00", save: "−38%" },
  { route: "Abidjan → Dakar", detail: "2 kg, commercial", dhl: "$54.20", fedex: "$58.00", ups: "$51.40", afri: "$29.50", save: "−43%" },
  { route: "Addis → Cairo", detail: "10 kg, freight", dhl: "$198.00", fedex: "$215.00", ups: "$192.50", afri: "$124.00", save: "−37%" },
  { route: "Lagos → Douala", detail: "3 kg, parcel", dhl: "$76.00", fedex: "$82.50", ups: "$74.00", afri: "$41.00", save: "−45%" },
  { route: "Accra → Johannesburg", detail: "7 kg, commercial", dhl: "$154.00", fedex: "$162.00", ups: "$149.00", afri: "$95.00", save: "−38%" },
];

const featureComparison = [
  { feature: "Intra-Africa coverage", others: "△ Limited", afri: "✓ 35+ countries" },
  { feature: "Transparent upfront pricing", others: "✗ Hidden fees", afri: "✓ Always clear" },
  { feature: "WhatsApp tracking alerts", others: "✗", afri: "✓" },
  { feature: "Multi-carrier comparison", others: "✗ Single carrier", afri: "✓" },
  { feature: "Customs documentation", others: "△ Manual", afri: "✓ Automated" },
  { feature: "Local payment methods", others: "✗", afri: "✓ M-Pesa, Flutterwave" },
  { feature: "Dedicated Africa support", others: "△ Generic", afri: "✓ Africa-first team" },
  { feature: "Bulk shipment discounts", others: "△ Negotiated only", afri: "✓ Automatic" },
];

const AfriShipPricing = () => {
  const [tab, setTab] = useState<Tab>("rates");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} className="py-24 px-6 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">Pricing Comparison</p>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.03em] leading-tight mb-3">
            See How Much You Save
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Top courier rates vs Shippers Africa — for the routes African businesses actually ship.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-secondary border border-border rounded-full p-1 w-fit mx-auto mb-10">
          <button
            onClick={() => setTab("rates")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              tab === "rates" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Shipping Rates
          </button>
          <button
            onClick={() => setTab("features")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              tab === "features" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Feature Comparison
          </button>
        </div>

        {/* Rates Table */}
        {tab === "rates" && (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-5 py-3.5 font-display text-xs font-bold tracking-wider uppercase text-muted-foreground">Route</th>
                  <th className="text-left px-5 py-3.5 font-display text-xs font-bold tracking-wider uppercase text-muted-foreground">DHL Express</th>
                  <th className="text-left px-5 py-3.5 font-display text-xs font-bold tracking-wider uppercase text-muted-foreground">FedEx Intl</th>
                  <th className="text-left px-5 py-3.5 font-display text-xs font-bold tracking-wider uppercase text-muted-foreground">UPS</th>
                   <th className="text-left px-5 py-3.5 font-display text-xs font-bold tracking-wider uppercase text-primary bg-primary/5">⚡ Shippers Africa</th>
                </tr>
              </thead>
              <tbody>
                {shippingRates.map((r) => (
                  <tr key={r.route} className="border-t border-border hover:bg-foreground/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground">{r.route}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{r.detail}</div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{r.dhl}</td>
                    <td className="px-5 py-4 text-muted-foreground">{r.fedex}</td>
                    <td className="px-5 py-4 text-muted-foreground">{r.ups}</td>
                    <td className="px-5 py-4 bg-primary/[0.03] font-semibold text-primary">
                      {r.afri}{" "}
                      <span className="inline-block bg-primary/15 text-primary text-[0.7rem] font-bold px-2 py-0.5 rounded-full ml-1">
                        {r.save}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Feature Table */}
        {tab === "features" && (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-5 py-3.5 font-display text-xs font-bold tracking-wider uppercase text-muted-foreground">Feature</th>
                  <th className="text-left px-5 py-3.5 font-display text-xs font-bold tracking-wider uppercase text-muted-foreground">DHL / FedEx / UPS</th>
                  <th className="text-left px-5 py-3.5 font-display text-xs font-bold tracking-wider uppercase text-primary bg-primary/5">⚡ Shippers Africa</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((f) => (
                  <tr key={f.feature} className="border-t border-border hover:bg-foreground/[0.02] transition-colors">
                    <td className="px-5 py-4 font-medium">{f.feature}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {f.others.startsWith("✗") ? (
                        <span className="text-destructive">{f.others}</span>
                      ) : f.others.startsWith("△") ? (
                        <span className="text-accent">{f.others}</span>
                      ) : (
                        f.others
                      )}
                    </td>
                    <td className="px-5 py-4 bg-primary/[0.03] font-semibold text-primary">{f.afri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-5">
          * Rates are estimated averages. Actual savings vary by route, weight, and carrier. Prices as of Feb 2026.
        </p>
      </div>
    </section>
  );
};

export default AfriShipPricing;
