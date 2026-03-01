import { useState } from "react";

const AfriShipHero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const countries = ["🇳🇬 Nigeria", "🇬🇭 Ghana", "🇰🇪 Kenya", "🇿🇦 South Africa", "🇪🇹 Ethiopia", "🇨🇮 Côte d'Ivoire", "🇸🇳 Senegal"];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 hero-grid-bg" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="animate-fade-up inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium text-primary mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
          Built for African shippers, finally.
        </div>

        <h1 className="animate-fade-up-1 font-display font-extrabold text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.04em] mb-6">
          Ship Smarter{" "}
          <br className="hidden sm:block" />
          <em className="not-italic text-gradient">Across Africa</em>
        </h1>

        {/* Africa map SVG beside heading */}
        <p className="animate-fade-up-2 text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-8">
          One platform. Every major corridor. Real-time tracking, transparent pricing, and no hidden fees — for cross-border logistics that actually works.
        </p>

        <div className="animate-fade-up-3 inline-flex items-center gap-2.5 bg-accent/10 border border-accent/20 rounded-xl px-5 py-2.5 text-accent text-sm font-medium mb-8">
          <span className="font-display text-xl font-extrabold">🔥 87</span>
          spots remaining out of 100 founding shipper slots
        </div>

        <form onSubmit={handleSubmit} className="animate-fade-up-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 bg-secondary border border-border rounded-full px-5 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-display font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            Get Early Access
          </button>
        </form>

        <p className="animate-fade-up-5 text-xs text-muted-foreground mb-12">
          No credit card. No spam. Launch access for first 100 signups.
        </p>

        <div className="animate-fade-up-6 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground mr-1">Covering →</span>
          {countries.map((c) => (
            <span key={c} className="bg-secondary border border-border rounded-full px-3 py-1 text-xs text-muted-foreground">
              {c}
            </span>
          ))}
          <span className="bg-secondary border border-border rounded-full px-3 py-1 text-xs text-muted-foreground">
            +28 more
          </span>
        </div>
      </div>
    </section>
  );
};

export default AfriShipHero;
