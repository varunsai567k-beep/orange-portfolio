import { Link } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";

export interface VideoItem {
  title: string;
  desc: string;
  thumb?: string;
  video?: string;
  duration?: string;
}


export function CategoryPage({
  category,
  title,
  description,
  videos,
}: {
  category: string;
  title: string;
  description: string;
  videos: VideoItem[];
}) {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="size-2.5 rounded-full bg-gradient-primary shadow-glow" />
            Orange<span className="text-gradient">Edits</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="size-4" /> Back home
          </Link>
        </nav>
      </header>

      <section className="pt-36 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">{category}</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
            <span className="text-gradient">{title}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{description}</p>
        </div>
      </section>

      <section className="pb-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v) => (
            <article key={v.title} className="group relative overflow-hidden rounded-2xl border border-border bg-surface aspect-video md:aspect-[4/5] cursor-pointer hover:border-primary/50 hover:shadow-card transition-all">
              <img src={v.thumb} alt={v.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                <div className="size-16 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
                  <Play className="size-7 fill-primary-foreground text-primary-foreground" />
                </div>
              </div>
              {v.duration && (
                <span className="absolute top-4 right-4 rounded-full bg-background/70 backdrop-blur px-2.5 py-1 text-xs font-medium">
                  {v.duration}
                </span>
              )}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <h3 className="font-display text-xl font-bold">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/50 py-10 px-6 text-center text-sm text-muted-foreground">
        © 2026 Orange Edits. Cut with care.
      </footer>
    </div>
  );
}
