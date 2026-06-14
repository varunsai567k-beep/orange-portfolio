import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import thumb from "@/assets/work-gaming.jpg";

export const Route = createFileRoute("/work/gaming")({
  head: () => ({
    meta: [
      { title: "Gaming Edits — Orange Edits" },
      { name: "description", content: "Fast-paced gaming montages, highlight reels, and viral clips edited by Orange Edits." },
      { property: "og:title", content: "Gaming Edits — Orange Edits" },
      { property: "og:description", content: "Montages, highlights, viral gaming clips." },
    ],
  }),
  component: GamingPage,
});

const videos = [
  { title: "Valorant Ace Montage", desc: "60-second highlight reel with sync cuts.", thumb, duration: "1:02" },
  { title: "Apex Legends Frags", desc: "Multi-team takedowns with beat drops.", thumb, duration: "2:14" },
  { title: "Fortnite Funny Moments", desc: "Comedic timing edit with SFX layering.", thumb, duration: "3:48" },
  { title: "CS2 Pro Highlights", desc: "Tournament recap with cinematic intro.", thumb, duration: "4:21" },
  { title: "Warzone Squad Wipe", desc: "Slow-mo dramatic plays edit.", thumb, duration: "1:55" },
  { title: "League of Legends Pentakill", desc: "Hype montage with anime-style FX.", thumb, duration: "2:33" },
];

function GamingPage() {
  return (
    <CategoryPage
      category="Gaming Edits"
      title="Gaming."
      description="Adrenaline-packed montages, frag highlights, and viral moments — cut to the beat and built for the algorithm."
      videos={videos}
    />
  );
}
