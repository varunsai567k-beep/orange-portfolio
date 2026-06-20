import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Instagram, ArrowRight, Gamepad2, Megaphone, Phone, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-gaming.jpg";
import workGaming from "@/assets/work-gaming.jpg";
import workAd from "@/assets/work-ad.jpg";
import showreel from "@/assets/videos/showreel.mp4.asset.json";

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

const services = [
  { icon: Gamepad2, title: "Gaming Edits", desc: "Fast-paced montages, highlights, and viral clips with rhythm-locked cuts.", to: "/work/gaming" as const },
  { icon: Megaphone, title: "Advertisements", desc: "Conversion-focused ads built for the scroll — TikTok, Reels, YouTube.", to: "/work/ads" as const },
];

const work = [
  { img: workGaming, title: "Gaming Edit", tag: "Montage", to: "/work/gaming" as const },
  { img: workAd, title: "Advertisement Edit", tag: "Commercial", to: "/work/ads" as const },
];

function Index() {
  const [showVideo, setShowVideo] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="size-2.5 rounded-full bg-gradient-primary shadow-glow" />
            Orange<span className="text-gradient">Edits</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#work" className="hover:text-foreground transition">Work</a>
            <a href="#services" className="hover:text-foreground transition">Services</a>
            <a href="#about" className="hover:text-foreground transition">About</a>
          </div>
          <button onClick={() => setShowHireModal(true)} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition shadow-glow">
            Hire me <ArrowRight className="size-4" />
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" width={1280} height={800} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground mb-8">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Available for new projects — June 2026
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter">
              Edits that hit <br />
              <span className="text-gradient">harder.</span> Stay longer.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl">
              I'm a video editor crafting fast-paced gaming montages and scroll-stopping ads. Stories cut with precision — and a little fire.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-medium shadow-glow hover:opacity-90 transition">
                Start a project
              </a>
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-4 py-3 font-medium hover:bg-surface transition"
              >
                <Play className="size-4 fill-primary" /> Showreel
              </button>
            </div>
            <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 text-sm text-muted-foreground">
              <div><span className="text-foreground font-display text-2xl font-bold">10</span> <br />Projects delivered</div>
              <div><span className="text-foreground font-display text-2xl font-bold">20k</span> <br />Views generated</div>
              <div><span className="text-foreground font-display text-2xl font-bold">24h</span> <br />Avg turnaround</div>
            </div>
          </div>
          {showVideo && (
            <div className="relative lg:w-[380px] xl:w-[480px]">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-3 -right-3 z-10 p-1.5 rounded-full border border-border bg-surface/80 backdrop-blur hover:bg-surface transition"
                aria-label="Close showreel"
              >
                <X className="size-4" />
              </button>
              <video
                src={showreel.url}
                controls
                autoPlay
                className="w-full rounded-2xl border border-border shadow-card"
              />
            </div>
          )}
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
      <section id="services" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">What I do</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
                Edits built for <span className="text-gradient">attention</span>.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">From the first frame to the final export — I handle pacing, color, sound, and the little details that keep eyes glued.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Link key={s.title} to={s.to} className="group relative rounded-2xl border border-border bg-surface p-6 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-card block">
                <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground mb-5 shadow-glow">
                  <s.icon className="size-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 flex items-center gap-2">{s.title} <ArrowRight className="size-4 transition group-hover:translate-x-1" /></h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Contact */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-4xl mx-auto relative rounded-3xl border border-border bg-surface overflow-hidden p-10 md:p-16 text-center shadow-card">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-96 bg-gradient-primary opacity-30 blur-[100px] rounded-full pointer-events-none" />
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4 relative">Work with me</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight relative">
            Let's make something <br /><span className="text-gradient">unforgettable</span>.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto relative">
            Got a project in mind? Drop me a line and I'll get back within 24 hours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 relative">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="https://discord.gg/peuquP4ug" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-medium shadow-glow hover:opacity-90 transition">
                Join my Discord <ArrowRight className="size-4" />
              </a>
              <a href="tel:7075254541" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:bg-background/40 transition">
                <Phone className="size-4" /> 707-525-4541
              </a>
              <a href="https://instagram.com/Orange_playez" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:bg-background/40 transition">
                <Instagram className="size-4" /> @Orange_playez
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-10 px-6 text-center text-sm text-muted-foreground">
        © 2026 Orange Edits. Cut with care.
      </footer>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
