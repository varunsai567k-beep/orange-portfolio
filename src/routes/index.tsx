import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Mail, Instagram, Youtube, Twitter, ArrowRight, Film, Gamepad2, Megaphone } from "lucide-react";
import heroImg from "@/assets/hero-gaming.jpg";
import workGaming from "@/assets/work-gaming.jpg";
import workCinematic from "@/assets/work-cinematic.jpg";
import workAd from "@/assets/work-ad.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orange Edits — Video Editor for Gaming, Cinematic & Ads" },
      { name: "description", content: "Orange Edits — fast-paced gaming montages, cinematic reels, and scroll-stopping ads edited with precision and style." },
      { property: "og:title", content: "Orange Edits — Video Editor" },
      { property: "og:description", content: "Gaming • Cinematic • Ads" },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Gamepad2, title: "Gaming Edits", desc: "Fast-paced montages, highlights, and viral clips with rhythm-locked cuts.", to: "/work/gaming" as const },
  { icon: Film, title: "Cinematic Reels", desc: "Story-driven color grading, sound design, and motion for films and brands.", to: "/work/cinematic" as const },
  { icon: Megaphone, title: "Advertisements", desc: "Conversion-focused ads built for the scroll — TikTok, Reels, YouTube.", to: "/work/ads" as const },
];

const work = [
  { img: workGaming, title: "Gaming Edit", tag: "Montage", to: "/work/gaming" as const },
  { img: workCinematic, title: "Cinematic Reel", tag: "Short Film", to: "/work/cinematic" as const },
  { img: workAd, title: "Advertisement Edit", tag: "Commercial", to: "/work/ads" as const },
];

function Index() {
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
          <a href="https://discord.gg/peuquP4ug" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition shadow-glow">
            Hire me <ArrowRight className="size-4" />
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" width={1280} height={800} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground mb-8">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Available for new projects — June 2026
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter">
            Edits that hit <br />
            <span className="text-gradient">harder.</span> Stay longer.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl">
            I'm a video editor crafting fast-paced gaming montages, cinematic reels, and scroll-stopping ads. Stories cut with precision — and a little fire.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-medium shadow-glow hover:opacity-90 transition">
              <Play className="size-4 fill-current" /> View Showreel
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:bg-surface transition">
              Start a project
            </a>
          </div>
          <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 text-sm text-muted-foreground">
            <div><span className="text-foreground font-display text-2xl font-bold">10</span> <br />Projects delivered</div>
            <div><span className="text-foreground font-display text-2xl font-bold">20k</span> <br />Views generated</div>
            <div><span className="text-foreground font-display text-2xl font-bold">24h</span> <br />Avg turnaround</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-border/50 bg-surface/30 backdrop-blur py-5 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[scroll_30s_linear_infinite] text-muted-foreground font-display text-xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              {["Gaming", "Cinematic", "Advertisements", "Sound Design", "Motion Graphics"].map((t) => (
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
          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.title} className="group relative rounded-2xl border border-border bg-surface p-6 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground mb-5 shadow-glow">
                  <s.icon className="size-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-28 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">Selected work</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Recent <span className="text-gradient">cuts</span>.</h2>
            </div>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-2">
              See full portfolio <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {work.map((w, i) => (
              <Link
                key={w.title}
                to={w.to}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-surface aspect-[4/5] block ${i === 0 ? "lg:row-span-2 lg:aspect-[4/5.2]" : ""}`}
              >
                <img src={w.img} alt={w.title} loading="lazy" width={960} height={640} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                  <div className="size-16 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
                    <Play className="size-7 fill-primary-foreground text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <span className="text-xs uppercase tracking-widest text-primary font-medium">{w.tag}</span>
                  <h3 className="font-display text-2xl font-bold mt-1 flex items-center gap-2">
                    {w.title} <ArrowRight className="size-5 transition group-hover:translate-x-1" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="aspect-square rounded-3xl bg-gradient-primary p-1 shadow-glow">
              <div className="size-full rounded-[22px] bg-surface grid place-items-center">
                <span className="font-display text-8xl font-bold text-gradient">O.</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">About</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Video editor with a feel for <span className="text-gradient">rhythm</span>.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              I cut content that lives between cinematic and chaotic — gaming reels with adrenaline, ads that convert, films that breathe.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Five years in, working with creators, esports teams, and brands worldwide. Every project gets full attention to pacing, sound, and color.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Premiere Pro", "After Effects", "DaVinci Resolve", "Cinema 4D"].map((t) => (
                <span key={t} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground">{t}</span>
              ))}
            </div>
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 relative">
            <a href="mailto:hello@orangeedits.com" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-6 py-3 font-medium shadow-glow hover:opacity-90 transition">
              <Mail className="size-4" /> hello@orangeedits.com
            </a>
            <div className="flex items-center gap-2">
              {[Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="size-11 grid place-items-center rounded-full border border-border hover:border-primary/50 hover:text-primary transition">
                  <Icon className="size-4" />
                </a>
              ))}
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
