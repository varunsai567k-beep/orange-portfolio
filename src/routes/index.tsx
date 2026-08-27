import { createFileRoute } from "@tanstack/react-router";
import { Play, Instagram, ArrowRight, Gamepad2, Megaphone, X, MessageCircle, Sparkles, MessageSquare, Wand2, Send, Quote } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { useReveal } from "@/hooks/use-reveal";
import heroImg from "@/assets/hero-gaming.jpg";
import showreel from "@/assets/videos/showreel.mp4.asset.json";
import demoReel from "@/assets/videos/demo-reel.mp4.asset.json";
import projectMeme from "@/assets/videos/project-meme.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orange Edits — Video Editor for Gaming & Ads" },
      { name: "description", content: "Orange Edits — fast-paced gaming montages and scroll-stopping ads edited with precision and style." },
      { property: "og:title", content: "Orange Edits — Video Editor" },
      { property: "og:description", content: "Gaming • Ads" },
    ],
  }),
  component: Index,
});

type Category = {
  key: string;
  icon: typeof Gamepad2;
  title: string;
  desc: string;
  tagline: string;
  videos: { title: string; desc: string; video?: string; youtube?: string }[];
};

const categories: Category[] = [
  {
    key: "gaming",
    icon: Gamepad2,
    title: "Gaming Edits",
    desc: "Fast-paced montages, highlights, and viral clips with rhythm-locked cuts.",
    tagline: "Adrenaline-packed montages cut to the beat and built for the algorithm.",
    videos: [
      { title: "Latest Gaming Edit", desc: "Newest gaming showreel.", youtube: "dVpV_52rWm8" },
      { title: "Gaming Highlights", desc: "Recent gaming clips.", youtube: "KGoJlkDkkGk" },
    ],
  },
  {
    key: "ads",
    icon: Megaphone,
    title: "Advertisements",
    desc: "Conversion-focused ads built for the scroll — TikTok, Reels, YouTube.",
    tagline: "Scroll-stopping ad creative engineered for retention and conversion.",
    videos: [
      { title: "2D Animation Edit", desc: "Showcase of recent ad edits.", video: demoReel.url },
      { title: "Project Meme", desc: "Funny moments + meme edit.", video: projectMeme.url },
    ],
  },
];

type Rect = { top: number; left: number; width: number; height: number };

function Index() {
  const [showHireModal, setShowHireModal] = useState(false);
  const [active, setActive] = useState<Category | null>(null);
  const [origin, setOrigin] = useState<Rect | null>(null);
  const [phase, setPhase] = useState<"opening" | "open" | "closing">("opening");
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const heroRef = useRef<HTMLElement>(null);
  const showreelButtonRef = useRef<HTMLButtonElement>(null);
  const [showreelActive, setShowreelActive] = useState(false);
  const [showreelOrigin, setShowreelOrigin] = useState<Rect | null>(null);
  const [showreelDest, setShowreelDest] = useState<Rect | null>(null);
  const [showreelPhase, setShowreelPhase] = useState<"opening" | "open" | "closing">("opening");

  const openCategory = (cat: Category) => {
    const el = cardRefs.current[cat.key];
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (showreelActive) {
      setShowreelActive(false);
      setShowreelOrigin(null);
      setShowreelDest(null);
    }
    setOrigin({ top: r.top, left: r.left, width: r.width, height: r.height });
    setActive(cat);
    setPhase("opening");
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
  };

  const closeCategory = () => {
    setPhase("closing");
  };

  const openShowreel = () => {
    if (active) {
      setActive(null);
      setOrigin(null);
    }
    const btn = showreelButtonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isXl = vw >= 1280;
    const isLg = vw >= 1024;
    const width = isXl ? 480 : isLg ? 380 : Math.min(vw * 0.9, 560);
    const height = (width * 9) / 16;
    const heroRect = heroRef.current?.getBoundingClientRect();
    const containerWidth = Math.min(vw, 1280);
    const destLeft = isLg ? (vw + containerWidth) / 2 - (isXl ? 504 : 404) : (vw - width) / 2;
    const destTop = isLg && heroRect ? heroRect.top + (heroRect.height - height) / 2 : (vh - height) / 2;
    setShowreelOrigin({ top: r.top, left: r.left, width: r.width, height: r.height });
    setShowreelDest({ top: destTop, left: destLeft, width, height });
    setShowreelActive(true);
    setShowreelPhase("opening");
    requestAnimationFrame(() => requestAnimationFrame(() => setShowreelPhase("open")));
  };

  const closeShowreel = () => {
    setShowreelPhase("closing");
  };

  useEffect(() => {
    if (phase === "closing") {
      const t = setTimeout(() => {
        setActive(null);
        setOrigin(null);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

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
    if (active || showreelActive) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [active, showreelActive]);

  const panelStyle: React.CSSProperties =
    !origin
      ? {}
      : phase === "open"
      ? { top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 }
      : {
          top: origin.top,
          left: origin.left,
          width: origin.width,
          height: origin.height,
          borderRadius: "1rem",
        };

  const showreelPanelStyle: React.CSSProperties =
    !showreelOrigin
      ? {}
      : showreelPhase === "open" && showreelDest
      ? {
          top: showreelDest.top,
          left: showreelDest.left,
          width: showreelDest.width,
          height: showreelDest.height,
          borderRadius: "1rem",
        }
      : {
          top: showreelOrigin.top,
          left: showreelOrigin.left,
          width: showreelOrigin.width,
          height: showreelOrigin.height,
          borderRadius: "1rem",
        };

  const servicesReveal = useReveal<HTMLDivElement>();
  const contactReveal = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen">
      <CustomCursor />
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="size-2.5 rounded-full bg-gradient-primary shadow-glow" />
            Orange<span className="text-gradient">Edits</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-primary transition-colors">Work</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <button onClick={() => setShowHireModal(true)} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition shadow-glow btn-hover-pop">
            Hire me <ArrowRight className="size-4" />
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-36 pb-32 md:pt-40 md:pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Gaming setup with neon lighting — Orange Edits portfolio hero" width={1280} height={800} className="w-full h-full object-cover opacity-30" />
          {/* bottom-to-top dark gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/20" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground mb-8 anim-fade-up" style={{ animationDelay: "60ms" }}>
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Available for new projects — July 2026
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter anim-fade-up" style={{ animationDelay: "160ms" }}>
              Edits that hit <br />
              <span className="text-gradient">harder.</span> Stay longer.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl anim-fade-up" style={{ animationDelay: "300ms" }}>
              I'm a video editor crafting fast-paced gaming montages and scroll-stopping ads. Stories cut with precision — and a little fire.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3 anim-fade-up" style={{ animationDelay: "440ms" }}>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-medium shadow-glow hover:opacity-90 transition btn-hover-pop">
                Start a project <ArrowRight className="size-4" />
              </a>
              <button
                ref={showreelButtonRef}
                onClick={openShowreel}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-5 py-3 font-medium hover:bg-surface hover:border-primary/60 transition btn-hover-pop"
              >
                <Play className="size-4 fill-primary text-primary" /> Showreel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-border/50 bg-surface/30 backdrop-blur py-5 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[scroll_30s_linear_infinite] text-muted-foreground font-display text-xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              {["Gaming", "Advertisements", "Sound Design", "Motion Graphics"].map((t) => (
                <span key={t} className="flex items-center gap-12">
                  {t} <span className="text-primary">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="py-32 md:py-40 px-6">
        <div
          ref={servicesReveal.ref}
          className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${
            servicesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="text-primary">✦</span> What I do
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
                Edits built for <span className="text-gradient">attention</span>.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">Tap a category to pull out the reels — pacing, color, sound, and the little details that keep eyes glued.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((s) => {
              const previewVideo = s.videos[0]?.video;
              return (
                <button
                  key={s.key}
                  ref={(el) => { cardRefs.current[s.key] = el; }}
                  onClick={() => openCategory(s)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 text-left transition-all duration-300 ease-out hover:scale-[1.02] hover:border-primary/70 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
                  style={{ visibility: active?.key === s.key ? "hidden" : "visible" }}
                  onMouseEnter={(e) => {
                    const v = e.currentTarget.querySelector("video");
                    if (v) v.play().catch(() => {});
                  }}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget.querySelector("video");
                    if (v) { v.pause(); v.currentTime = 0; }
                  }}
                >
                  {previewVideo && (
                    <>
                      <video
                        src={previewVideo}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/40 opacity-100 group-hover:opacity-90 transition-opacity duration-500" />
                    </>
                  )}
                  <div className="relative">
                    <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground mb-5 shadow-glow transition-transform duration-300 group-hover:scale-110">
                      <s.icon className="size-6" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 flex items-center gap-2">
                      {s.title}
                      <ArrowRight className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <AboutSection />

      {/* Process */}
      <ProcessSection />

      {/* Testimonials */}
      <TestimonialsSection />


      {/* Contact */}
      <section id="contact" className="py-32 md:py-40 px-6">
        <div
          ref={contactReveal.ref}
          className={`max-w-4xl mx-auto relative rounded-3xl border border-border bg-surface overflow-hidden p-10 md:p-16 text-center shadow-card transition-all duration-700 ease-out ${
            contactReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-96 bg-gradient-primary opacity-30 blur-[100px] rounded-full pointer-events-none" />
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 relative flex items-center justify-center gap-2">
            <span className="text-primary">✦</span> Work with me <span className="text-primary">✦</span>
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight relative">
            Let's make something <br /><span className="text-gradient">unforgettable</span>.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto relative">
            Got a project in mind? Drop me a line and I'll get back within 24 hours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 relative">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="https://discord.gg/peuquP4ug" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-medium shadow-glow hover:opacity-90 transition btn-hover-pop">
                Join my Discord <ArrowRight className="size-4" />
              </a>
              <a href="https://instagram.com/Orange_playez" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:border-primary/60 hover:text-primary hover:bg-background/40 transition btn-hover-pop">
                <Instagram className="size-4" /> @Orange_playez
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Expand Overlay */}
      {active && origin && (
        <div className="fixed inset-0 z-[55]">
          <div
            className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-500 ${
              phase === "open" ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeCategory}
          />
          <div
            className="absolute overflow-hidden border border-border bg-surface shadow-card"
            style={{
              ...panelStyle,
              transition: "top 500ms cubic-bezier(0.65, 0, 0.35, 1), left 500ms cubic-bezier(0.65, 0, 0.35, 1), width 500ms cubic-bezier(0.65, 0, 0.35, 1), height 500ms cubic-bezier(0.65, 0, 0.35, 1), border-radius 500ms ease",
            }}
          >
            <div
              className={`h-full overflow-y-auto transition-opacity duration-300 ${
                phase === "open" ? "opacity-100 delay-200" : "opacity-0"
              }`}
            >
              <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
                <div className="flex items-start justify-between gap-6 mb-12">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow">
                        <active.icon className="size-5" />
                      </div>
                      <p className="text-primary font-medium text-sm tracking-widest uppercase">{active.title}</p>
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                      <span className="text-gradient">{active.title.split(" ")[0]}.</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-xl">{active.tagline}</p>
                  </div>
                  <button
                    onClick={closeCategory}
                    className="p-2 rounded-full border border-border bg-surface/80 hover:bg-surface transition btn-hover-pop"
                    aria-label="Close"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {active.videos.map((v) => (
                    <div key={v.title} className="rounded-2xl border border-border bg-surface-elevated/40 overflow-hidden">
                      {v.youtube ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${v.youtube}?modestbranding=1`}
                          title={v.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full aspect-video bg-black"
                        />
                      ) : (
                        <video src={v.video} controls className="w-full aspect-video object-cover bg-black" />
                      )}
                      <div className="p-4">
                        <h3 className="font-display font-semibold">{v.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Showreel Expand Overlay */}
      {showreelActive && showreelOrigin && (
        <div className="fixed inset-0 z-[56]">
          <div className="absolute inset-0" onClick={closeShowreel} />
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
              <video
                src={showreel.url}
                controls
                autoPlay
                className="w-full h-full rounded-xl bg-black object-contain"
              />
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
                  <p className="text-xs text-muted-foreground">+91 70752 54541</p>
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
      `}</style>
    </div>
  );
}

function AboutSection() {
  const r = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="py-32 md:py-40 px-6 border-t border-border/50">
      <div
        ref={r.ref}
        className={`max-w-7xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12 items-center transition-all duration-700 ease-out ${
          r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div>
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="text-primary">✦</span> About
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Editor obsessed with <span className="text-gradient">pacing</span>.
          </h2>
        </div>
        <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
          <p>
            I'm Orange — a freelance video editor working with creators and brands on high-retention short-form content. Four years cutting gaming montages taught me one thing: every frame either earns attention or loses it.
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
    { icon: MessageSquare, title: "Discovery", desc: "We hop on a quick call or DM to align on goals, tone, references, and delivery window." },
    { icon: Wand2, title: "First draft", desc: "You get a rough cut within 3–5 days — pacing, structure, sound, and color already dialed in." },
    { icon: Sparkles, title: "Revisions", desc: "Two rounds of revisions included. Timestamped notes keep everything precise and fast." },
    { icon: Send, title: "Delivery", desc: "Final export in the platform ratios you need — plus source files if the package includes them." },
  ];
  return (
    <section id="process" className="py-32 md:py-40 px-6 border-t border-border/50 bg-surface/20">
      <div
        ref={r.ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${
          r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="text-primary">✦</span> Process
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
              How it <span className="text-gradient">works</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">A tight, transparent workflow — from first message to final export — with no guesswork.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-surface p-6 hover:border-primary/60 transition-colors">
              <div className="text-primary/70 font-display text-sm mb-4">0{i + 1}</div>
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

function TestimonialsSection() {
  const r = useReveal<HTMLDivElement>();
  const quotes = [
    {
      quote: "Orange gets pacing in a way most editors don't. My montages started actually landing after we worked together.",
      name: "Kryptix",
      role: "Gaming creator",
    },
    {
      quote: "Turnaround is stupid fast and the edits hit. First draft usually needs almost no changes.",
      name: "Lost",
      role: "FPS content creator",
    },
    {
      quote: "Reliable, communicative, and the ad creative he sent us performed better than what our in-house team was cutting.",
      name: "Legend Media",
      role: "Short-form ad agency",
    },
  ];
  return (
    <section id="testimonials" className="py-32 md:py-40 px-6 border-t border-border/50">
      <div
        ref={r.ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${
          r.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-16">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="text-primary">✦</span> Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
            What clients <span className="text-gradient">say</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <figure key={q.name} className="relative rounded-2xl border border-border bg-surface p-7 flex flex-col">
              <Quote className="size-6 text-primary/70 mb-4" />
              <blockquote className="text-foreground/90 leading-relaxed flex-1">"{q.quote}"</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border/60">
                <div className="font-display font-semibold">{q.name}</div>
                <div className="text-xs text-muted-foreground">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

