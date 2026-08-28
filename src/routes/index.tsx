import { createFileRoute } from "@tanstack/react-router";
import { Play, Instagram, ArrowRight, X, MessageCircle, Sparkles, MessageSquare, Wand2, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { useReveal } from "@/hooks/use-reveal";
import heroImg from "@/assets/hero-gaming.jpg";
import showreel from "@/assets/videos/showreel.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orange Edits — Gaming Video Editor & Montage Specialist" },
      { name: "description", content: "Orange Edits — fast-paced gaming montages, highlights and viral clips cut with rhythm-locked precision. Available for new projects." },
      { property: "og:title", content: "Orange Edits — Gaming Video Editor" },
      { property: "og:description", content: "Fast-paced gaming montages, highlights and viral clips." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const works = [
  { title: "Latest Gaming Edit", desc: "Newest gaming showreel — rhythm-locked cuts and custom SFX.", youtube: "dVpV_52rWm8" },
  { title: "Gaming Highlights", desc: "Recent highlight reel built for retention.", youtube: "KGoJlkDkkGk" },
];

type Rect = { top: number; left: number; width: number; height: number };

function Index() {
  const [showHireModal, setShowHireModal] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const showreelButtonRef = useRef<HTMLButtonElement>(null);
  const [showreelActive, setShowreelActive] = useState(false);
  const [showreelOrigin, setShowreelOrigin] = useState<Rect | null>(null);
  const [showreelDest, setShowreelDest] = useState<Rect | null>(null);
  const [showreelPhase, setShowreelPhase] = useState<"opening" | "open" | "closing">("opening");

  const openShowreel = () => {
    const btn = showreelButtonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const width = Math.min(vw * 0.9, 880);
    const height = (width * 9) / 16;
    setShowreelOrigin({ top: r.top, left: r.left, width: r.width, height: r.height });
    setShowreelDest({ top: (vh - height) / 2, left: (vw - width) / 2, width, height });
    setShowreelActive(true);
    setShowreelPhase("opening");
    requestAnimationFrame(() => requestAnimationFrame(() => setShowreelPhase("open")));
  };

  const closeShowreel = () => setShowreelPhase("closing");

  useEffect(() => {
    if (showreelPhase === "closing") {
      const t = setTimeout(() => {
        setShowreelActive(false);
        setShowreelOrigin(null);
        setShowreelDest(null);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [showreelPhase]);

  useEffect(() => {
    if (showreelActive) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showreelActive]);

  const showreelPanelStyle: React.CSSProperties = !showreelOrigin
    ? {}
    : showreelPhase === "open" && showreelDest
    ? { top: showreelDest.top, left: showreelDest.left, width: showreelDest.width, height: showreelDest.height, borderRadius: "1rem" }
    : { top: showreelOrigin.top, left: showreelOrigin.left, width: showreelOrigin.width, height: showreelOrigin.height, borderRadius: "1rem" };

  const workReveal = useReveal<HTMLDivElement>();
  const contactReveal = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen">
      <CustomCursor />
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="size-2.5 rounded-full bg-gradient-primary shadow-glow" />
            Orange<span className="text-gradient">Edits</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#work" className="nav-link hover:text-primary transition-colors">Work</a>
            <a href="#about" className="nav-link hover:text-primary transition-colors">About</a>
            <a href="#process" className="nav-link hover:text-primary transition-colors">Process</a>
            <a href="#contact" className="nav-link hover:text-primary transition-colors">Contact</a>
          </div>
          <button onClick={() => setShowHireModal(true)} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-glow">
            Hire me <ArrowRight className="size-4" />
          </button>

        </nav>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img src={heroImg} alt="Gaming setup with neon lighting — Orange Edits portfolio hero" width={1280} height={800} className="ken-burns w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground mb-8 anim-fade-up" style={{ animationDelay: "60ms" }}>
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Available for new projects — July 2026
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter anim-fade-up" style={{ animationDelay: "160ms" }}>
            Gaming edits that hit <span className="text-gradient">harder.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto anim-fade-up" style={{ animationDelay: "300ms" }}>
            I cut fast-paced montages, highlights and viral clips — rhythm-locked, sound-designed, and built to keep people watching.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 anim-fade-up" style={{ animationDelay: "440ms" }}>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-glow">
              Start a project <ArrowRight className="size-4" />
            </a>
            <button
              ref={showreelButtonRef}
              onClick={openShowreel}
              className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-transparent text-foreground px-6 py-3 font-medium transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10 hover:border-primary"
            >
              <Play className="size-4 fill-primary text-primary" /> Watch showreel
            </button>
          </div>
        </div>
      </section>


      {/* Marquee */}
      <div className="border-b border-border/50 bg-surface/20 backdrop-blur py-4 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[scroll_30s_linear_infinite] text-muted-foreground font-display text-lg w-max">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              {["Gaming Montages", "Highlights", "Sound Design", "Motion Graphics"].map((t) => (
                <span key={t} className="flex items-center gap-12">
                  {t} <span className="text-primary">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>


      {/* Work */}
      <section id="work" className="py-24 md:py-28 px-6">
        <div
          ref={workReveal.ref}
          className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${
            workReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Selected work</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Recent <span className="text-gradient">gaming edits</span>.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Hit play — every cut, sound and transition is made by hand, no templates.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {works.map((w, i) => (
              <div
                key={w.title}
                className={`group rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-500 ease-out hover:border-primary/70 hover:shadow-card hover:-translate-y-1 ${
                  workReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${w.youtube}?modestbranding=1&rel=0`}
                    title={w.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video bg-black transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg transition-colors group-hover:text-primary">{w.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* About */}
      <AboutSection />

      {/* Process */}
      <ProcessSection />

      {/* Contact */}
      <section id="contact" className="py-24 md:py-28 px-6">
        <div
          ref={contactReveal.ref}
          className={`max-w-3xl mx-auto relative rounded-3xl border border-border bg-surface overflow-hidden p-10 md:p-14 text-center shadow-card transition-all duration-700 ease-out ${
            contactReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-96 bg-gradient-primary opacity-25 blur-[100px] rounded-full pointer-events-none" />
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 relative">Work with me</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight relative">
            Let's make something <span className="text-gradient">unforgettable</span>.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-lg mx-auto relative">
            Got a project in mind? Drop me a line and I'll get back within 24 hours.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 relative">
            <a href="https://discord.gg/peuquP4ug" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-medium shadow-glow hover:opacity-90 transition btn-hover-pop">
              Join my Discord <ArrowRight className="size-4" />
            </a>
            <a href="https://instagram.com/Orange_playez" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:border-primary/60 hover:text-primary hover:bg-background/40 transition btn-hover-pop">
              <Instagram className="size-4" /> @Orange_playez
            </a>
          </div>
        </div>
      </section>

      {/* Showreel Expand Overlay */}
      {showreelActive && showreelOrigin && (
        <div className="fixed inset-0 z-[56]">
          <div
            className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-500 ${
              showreelPhase === "open" ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeShowreel}
          />
          <div
            className="absolute overflow-hidden border border-border bg-surface shadow-card"
            style={{
              ...showreelPanelStyle,
              transition: "top 500ms cubic-bezier(0.65, 0, 0.35, 1), left 500ms cubic-bezier(0.65, 0, 0.35, 1), width 500ms cubic-bezier(0.65, 0, 0.35, 1), height 500ms cubic-bezier(0.65, 0, 0.35, 1), border-radius 500ms ease",
            }}
          >
            <div className={`h-full w-full p-3 flex flex-col transition-opacity duration-300 ${showreelPhase === "open" ? "opacity-100" : "opacity-0"}`}>
              <button
                onClick={closeShowreel}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full border border-border bg-surface/80 hover:bg-surface transition btn-hover-pop"
                aria-label="Close showreel"
              >
                <X className="size-4" />
              </button>
              <video src={showreel.url} controls autoPlay className="w-full h-full rounded-xl bg-black object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* Hire Me Modal */}
      {showHireModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6" onClick={() => setShowHireModal(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm rounded-3xl border border-border bg-surface p-8 shadow-card" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowHireModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-border bg-surface/80 hover:bg-surface transition btn-hover-pop"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <h3 className="font-display text-2xl font-bold text-center mb-2">Let's connect</h3>
            <p className="text-sm text-muted-foreground text-center mb-8">Pick the way you want to reach me.</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/orange_playez"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowHireModal(false)}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated/50 px-5 py-4 hover:border-primary/50 transition-all btn-hover-pop"
              >
                <div className="size-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow shrink-0">
                  <Instagram className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Instagram</p>
                  <p className="text-xs text-muted-foreground">@orange_playez</p>
                </div>
              </a>
              <a
                href="https://wa.me/917075254541"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowHireModal(false)}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated/50 px-5 py-4 hover:border-primary/50 transition-all btn-hover-pop"
              >
                <div className="size-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow shrink-0">
                  <MessageCircle className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Message me</p>
                </div>
              </a>
              <a
                href="https://discord.com/users/1129413522430885888"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowHireModal(false)}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated/50 px-5 py-4 hover:border-primary/50 transition-all btn-hover-pop"
              >
                <div className="size-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow shrink-0">
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Discord</p>
                  <p className="text-xs text-muted-foreground">DM me directly</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-border/50 py-10 px-6 text-center text-sm text-muted-foreground">
        © 2026 Orange Edits. Cut with care.
      </footer>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes anim-fade-up {
          from { opacity: 0; transform: translate3d(0, 24px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .anim-fade-up {
          opacity: 0;
          animation: anim-fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes ken-burns {
          0% { transform: scale(1) translate3d(0, 0, 0); }
          100% { transform: scale(1.15) translate3d(0, -1.5%, 0); }
        }
        .ken-burns {
          animation: ken-burns 28s ease-in-out infinite alternate;
          will-change: transform;
        }
        .nav-link { position: relative; }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -4px;
          height: 2px; width: 100%;
          background: var(--primary);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover::after { transform: scaleX(1); transform-origin: left; }
        @media (prefers-reduced-motion: reduce) {
          .ken-burns { animation: none; }
        }
      `}</style>

    </div>
  );
}

function AboutSection() {
  const r = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="py-24 md:py-28 px-6 border-t border-border/50">
      <div
        ref={r.ref}
        className={`max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12 items-center transition-all duration-700 ease-out ${
          r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div>
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">About</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Editor obsessed with <span className="text-gradient">pacing</span>.
          </h2>
        </div>
        <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
          <p>
            I'm Orange — a freelance video editor working with gaming creators on high-retention content. Four years cutting montages taught me one thing: every frame either earns attention or loses it.
          </p>
          <p>
            I work primarily in <span className="text-foreground font-medium">Adobe Premiere Pro</span> and <span className="text-foreground font-medium">After Effects</span>, with sound design in Audition. Every edit gets rhythm-locked cuts, custom SFX layering, color, and motion — no templates.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Premiere Pro", "After Effects", "DaVinci Resolve", "Audition", "Photoshop"].map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-border bg-surface/60 text-foreground/80">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const r = useReveal<HTMLDivElement>();
  const steps = [
    { icon: MessageSquare, title: "Discovery", desc: "A quick call or DM to align on goals, tone, references, and delivery window." },
    { icon: Wand2, title: "First draft", desc: "A rough cut within 3–5 days — pacing, structure, sound, and color already dialed in." },
    { icon: Sparkles, title: "Revisions", desc: "Two rounds included. Timestamped notes keep everything precise and fast." },
    { icon: Send, title: "Delivery", desc: "Final export in the ratios you need — plus source files if your package includes them." },
  ];
  return (
    <section id="process" className="py-24 md:py-28 px-6 border-t border-border/50 bg-surface/20">
      <div
        ref={r.ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${
          r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Process</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            How it <span className="text-gradient">works</span>.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Four simple steps from first message to final export — no guesswork.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`relative rounded-2xl border border-border bg-surface p-6 hover:border-primary/60 hover:-translate-y-1 hover:shadow-card transition-all duration-700 ease-out ${
                r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 130}ms` }}
            >
              <div className="inline-flex items-center justify-center size-8 rounded-full border border-primary/40 text-primary font-display text-xs font-bold mb-4">
                0{i + 1}
              </div>
              <div className="size-11 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground mb-4 shadow-glow">
                <s.icon className="size-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
