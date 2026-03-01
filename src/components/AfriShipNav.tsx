import { useState, useEffect } from "react";

const AfriShipNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="font-display font-extrabold text-xl tracking-tight flex flex-col leading-none">
        <span className="text-primary">Shippers</span>
        <span className="text-foreground text-xs font-semibold tracking-[0.15em] uppercase">Africa</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <button onClick={() => scrollTo("features")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Features
        </button>
        <button onClick={() => scrollTo("pricing")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </button>
        <button
          onClick={() => scrollTo("waitlist")}
          className="bg-primary text-primary-foreground font-display font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-all hover:scale-[1.03] active:scale-[0.98]"
        >
          Join Waitlist →
        </button>
      </div>

      <button
        onClick={() => scrollTo("waitlist")}
        className="md:hidden bg-primary text-primary-foreground font-display font-bold text-sm px-4 py-2 rounded-full"
      >
        Join →
      </button>
    </nav>
  );
};

export default AfriShipNav;
