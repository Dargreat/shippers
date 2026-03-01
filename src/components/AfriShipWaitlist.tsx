import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const TOTAL_SPOTS = 100;
const INITIAL_TAKEN = 13;

const AfriShipWaitlist = () => {
  const [submitted, setSubmitted] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(TOTAL_SPOTS - INITIAL_TAKEN);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", country: "", volume: "" });
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await (supabase.from as any)("waitlist_submissions").insert({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        company: form.company || null,
        country: form.country || null,
        volume: form.volume || null,
      });
      if (error) throw error;
      setSpotsLeft((p) => Math.max(0, p - 1));
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const pctTaken = ((TOTAL_SPOTS - spotsLeft) / TOTAL_SPOTS) * 100;

  const perks = [
    "All platform features — free at launch",
    "Founding member badge & priority support",
    "Lock in the lowest rate, forever",
    "Direct input into product roadmap",
    "No credit card required — ever",
  ];

  return (
    <section id="waitlist" ref={ref} className="py-24 px-6 bg-card border-t border-border">
      <div className="max-w-xl mx-auto text-center">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">Founding 100 Program</p>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.03em] leading-tight mb-3">
            Claim Your Spot.
            <br />
            <span className="text-muted-foreground">Ship Better, First.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            The first 100 shippers on Shippers Africa get lifetime founding member perks, priority onboarding, and every feature — free — at launch.
          </p>
        </div>

        <div className={`mt-10 bg-background border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="absolute top-0 left-0 right-0 h-[3px] gradient-bar" />

          {!submitted ? (
            <>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="font-display text-5xl font-extrabold text-primary leading-none">{spotsLeft}</span>
                <span className="text-xs text-muted-foreground text-left leading-snug">
                  spots left<br />out of {TOTAL_SPOTS}
                </span>
              </div>

              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
                <div className="h-full gradient-bar rounded-full transition-all duration-1000" style={{ width: `${pctTaken}%` }} />
              </div>
              <p className="text-xs text-muted-foreground text-right mb-8">
                {TOTAL_SPOTS - spotsLeft} / {TOTAL_SPOTS} taken
              </p>

              <form onSubmit={handleSubmit} className="text-left space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">First Name</label>
                    <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Last Name</label>
                    <input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Work Email</label>
                  <input type="email" required placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company / Business Name</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Primary Country</label>
                    <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                      <option value="">Select country</option>
                      {["Nigeria", "Ghana", "Kenya", "South Africa", "Ethiopia", "Côte d'Ivoire", "Senegal", "Tanzania", "Uganda", "Cameroon", "Egypt", "Other"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Monthly Shipments</label>
                    <select value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                      <option value="">Volume</option>
                      <option value="1-10">1–10 / month</option>
                      <option value="10-50">10–50 / month</option>
                      <option value="50-200">50–200 / month</option>
                      <option value="200+">200+ / month</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-display font-extrabold text-base py-3.5 rounded-full hover:opacity-90 transition-all hover:scale-[1.01] hover:glow-shadow active:scale-[0.99] mt-2 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "🚀 Join the Founding 100 — Free"}
                </button>
              </form>

              <div className="mt-7 pt-7 border-t border-border space-y-2.5">
                {perks.map((p) => (
                  <div key={p} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="text-primary text-xs">✓</span>
                    {p}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display font-extrabold text-2xl mb-2">You're on the list!</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-6">
                Welcome to the Shippers Africa Founding 100. We'll send your early access details as soon as we launch. Keep an eye on your inbox.
              </p>
              <div className="flex gap-3 justify-center">
                <a href="#" className="px-5 py-2 rounded-full border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors">
                  𝕏 Share on X
                </a>
                <a href="#" className="px-5 py-2 rounded-full border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors">
                  💬 Share on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AfriShipWaitlist;
