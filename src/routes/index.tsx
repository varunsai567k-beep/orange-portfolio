import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Instagram, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import gamingEdit3 from "@/assets/videos/gaming-edit-3.mp4.asset.json";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orange Edits — Video Editor for YouTubers" },
      { name: "description", content: "YouTube video editing for creators who want better retention and a consistent upload schedule." },
      { property: "og:title", content: "Orange Edits — Video Editor for YouTubers" },
      { property: "og:description", content: "YouTube video editing for creators who want better retention and a consistent upload schedule." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://orange-portfolio.lovable.app/" }],
  }),
  component: Index,
});

const work = [
  {
    type: "Long-form",
    title: "Gaming Highlights",
    description: "Structured the story, tightened pacing, and layered sound design to sustain attention.",
    youtube: "KGoJlkDkkGk",
  },
  {
    type: "Long-form",
    title: "Latest Gaming Edit",
    description: "Built a clear narrative flow with rhythmic cuts, motion graphics, and custom SFX.",
    youtube: "dVpV_52rWm8",
  },
  {
    type: "Short-form",
    title: "Gaming Reel",
    description: "Condensed the strongest moments into a fast, energetic edit with a sharp opening hook.",
    video: gamingEdit3.url,
  },
];

const process = [
  { title: "Discovery", text: "We align on your channel, audience, references, and goals." },
  { title: "First draft", text: "I shape the story, pacing, sound, and visuals into a complete first cut." },
  { title: "Revisions", text: "Two rounds are included to polish the edit around your feedback." },
  { title: "Delivery", text: "You receive the finished video, ready to upload in your chosen format." },
];

const faqs = [
  ["What is your turnaround time?", "Turnaround depends on the length and complexity of the video. I confirm a clear delivery date before the project starts."],
  ["How many revisions are included?", "Two rounds of revisions are included with every project."],
  ["What files do you need?", "Send your raw footage, audio, brand assets, references, and any notes or script you have."],
  ["How does payment work?", "Payment is available through Wise and PayPal. The exact schedule is agreed before work begins."],
  ["How do we get started?", "Book a free call or send your channel link and project details through the contact form below."],
];

function Index() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="text-lg font-black uppercase tracking-normal text-foreground">
            Orange<span className="text-primary">.</span>Edits
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold md:flex">
            {[["Work", "#work"], ["Process", "#process"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([label, href]) => (
              <a key={label} href={href} className="transition-colors hover:text-primary">{label}</a>
            ))}
          </div>
          <Button asChild className="h-10 rounded-none px-5 font-bold">
            <a href="#contact">Book a free call</a>
          </Button>
        </nav>
      </header>

      <section id="top" className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.72fr] lg:py-28">
        <div>
          <p className="hero-enter mb-7 text-sm font-bold uppercase text-primary">YouTube video editor</p>
          <h1 className="hero-enter hero-enter-delay-1 max-w-4xl text-5xl font-black leading-[0.98] sm:text-7xl lg:text-8xl">
            Video editing that keeps viewers watching<span className="text-primary">.</span>
          </h1>
        </div>
        <div className="hero-enter hero-enter-delay-2 self-end lg:pb-3">
          <p className="max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
            I edit YouTube videos for creators who want better retention and a consistent upload schedule.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-13 rounded-none px-7 text-base font-bold">
              <a href="#contact">Book a free call <ArrowUpRight /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-13 rounded-none px-7 text-base font-bold shadow-none">
              <a href="#work">See my work <ArrowDown /></a>
            </Button>
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-border bg-secondary py-24 sm:py-32">
        <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading number="01" title="Selected work" description="Long-form first, followed by short-form edits." />
          <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2">
            {work.map((item, index) => (
              <article key={item.title} className={`reveal-child work-card ${index === 0 ? "stagger-1" : index === 1 ? "stagger-2 md:mt-20" : "stagger-3 md:col-span-2 md:w-[calc(50%-0.75rem)]"}`}>
                <div className="video-frame aspect-video overflow-hidden bg-foreground">
                  {item.youtube ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${item.youtube}?modestbranding=1&rel=0`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : (
                    <video src={item.video} controls preload="metadata" playsInline className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="mt-5 border-t border-foreground pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <span className="text-xs font-bold uppercase text-primary">{item.type}</span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border py-24 sm:py-32">
        <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading number="02" title="Client words" />
          <figure className="mt-14 max-w-4xl border-l-4 border-primary py-3 pl-6 sm:pl-10">
            <blockquote className="text-3xl font-bold leading-tight sm:text-5xl">“[paste dktino's exact words]”</blockquote>
            <figcaption className="mt-7 text-sm font-semibold text-muted-foreground">— dktino, YouTube creator (3k subscribers)</figcaption>
          </figure>
        </Reveal>
      </section>

      <section id="process" className="border-t border-border bg-foreground py-24 text-background sm:py-32">
        <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-sm font-bold uppercase text-primary">03 / Process</p>
              <h2 className="mt-4 text-4xl font-black sm:text-6xl">A clear path from brief to upload.</h2>
            </div>
            <ol className="border-t border-background/20">
              {process.map((step, index) => (
                <li key={step.title} className={`reveal-child process-step stagger-${index + 1} grid gap-4 border-b border-background/20 py-7 sm:grid-cols-[4rem_0.6fr_1fr] sm:items-start`}>
                  <span className="font-bold text-primary">0{index + 1}</span>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="leading-7 text-background/65">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-12 border-t border-background/20 pt-7 text-lg font-semibold">Pricing is custom to each project. Message me for a quote.</p>
        </Reveal>
      </section>

      <section id="faq" className="border-t border-border py-24 sm:py-32">
        <Reveal className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="text-sm font-bold uppercase text-primary">04 / FAQ</p>
            <h2 className="mt-4 text-4xl font-black sm:text-6xl">Before we start.</h2>
          </div>
          <div className="border-t border-border">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group border-b border-border py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-bold">
                  {question}<span className="text-2xl font-normal text-primary group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="faq-answer"><p className="max-w-2xl pt-4 leading-7 text-muted-foreground">{answer}</p></div>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="contact" className="border-t border-border bg-secondary py-24 sm:py-32">
        <Reveal className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase text-primary">05 / Contact</p>
            <h2 className="mt-4 text-4xl font-black sm:text-6xl">Tell me about your next video.</h2>
            <div className="mt-10 space-y-4 text-sm font-semibold">
              <a href="mailto:varunsai567k@gmail.com" className="flex items-center gap-3 hover:text-primary"><Mail /> varunsai567k@gmail.com</a>
              <a href="https://discord.com/users/1129413522430885888" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary"><MessageCircle /> Discord</a>
              <a href="https://instagram.com/Orange_playez" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary"><Instagram /> @Orange_playez</a>
            </div>
          </div>
          <form action="mailto:varunsai567k@gmail.com" method="post" encType="text/plain" className="space-y-5">
            <label className="block text-sm font-bold">Name<Input name="name" required className="mt-2 h-12 rounded-none bg-background" /></label>
            <label className="block text-sm font-bold">Channel link<Input name="channel" type="url" required placeholder="https://youtube.com/@yourchannel" className="mt-2 h-12 rounded-none bg-background" /></label>
            <label className="block text-sm font-bold">Message<Textarea name="message" required rows={6} className="mt-2 min-h-40 rounded-none bg-background" /></label>
            <Button type="submit" size="lg" className="h-13 w-full rounded-none text-base font-bold sm:w-auto">Send inquiry <Send /></Button>
          </form>
        </Reveal>
      </section>

      <footer className="border-t border-border px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-black uppercase">Orange<span className="text-primary">.</span>Edits</p>
          <a href="https://wa.me/917075254541" target="_blank" rel="noreferrer" className="font-semibold hover:text-primary">WhatsApp — +91 70752 54541</a>
          <p className="text-muted-foreground">© 2026 Orange Edits</p>
        </div>
      </footer>
    </main>
  );
}

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.02, rootMargin: "0px 0px -40px 0px" });
  return <div ref={ref} className={`section-reveal ${visible ? "is-visible" : ""} ${className ?? ""}`}>{children}</div>;
}

function SectionHeading({ number, title, description }: { number: string; title: string; description?: string }) {
  return (
    <div className="grid gap-5 border-t border-foreground pt-5 sm:grid-cols-[6rem_1fr_auto] sm:items-end">
      <p className="text-sm font-bold text-primary">{number}</p>
      <h2 className="text-4xl font-black sm:text-6xl">{title}</h2>
      {description && <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-right">{description}</p>}
    </div>
  );
}
