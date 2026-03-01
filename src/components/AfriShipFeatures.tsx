import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "📦", title: "Multi-Carrier Booking", desc: "Compare and book across DHL, FedEx, local carriers, and pan-African networks in one click." },
  { icon: "📍", title: "Real-Time Tracking", desc: "Live shipment visibility across borders. Share tracking links with your customers instantly." },
  { icon: "🛃", title: "Customs Clearance", desc: "Built-in HS code lookup, documentation, and duty estimation. No more customs surprises." },
  { icon: "💸", title: "Transparent Pricing", desc: "No hidden fees, no surcharge surprises. Know exactly what you pay before you book." },
  { icon: "🔔", title: "Smart Alerts", desc: "Get notified via SMS or WhatsApp on any delay, customs hold, or delivery update." },
  { icon: "📊", title: "Shipping Analytics", desc: "Understand your shipping spend, carrier performance, and route efficiency at a glance." },
];

const AfriShipFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="py-24 px-6 max-w-5xl mx-auto">
      <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">Why Shippers Africa</p>
        <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.03em] leading-tight mb-3">
          Everything you need.
          <br />
          <span className="text-muted-foreground">Nothing you don't.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`group bg-card border border-border rounded-2xl p-7 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl mb-4">
              {f.icon}
            </div>
            <h3 className="font-display font-bold text-base mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AfriShipFeatures;
