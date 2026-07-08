import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import demo from "@/assets/videos/demo.mp4.asset.json";
import minecraft from "@/assets/videos/demo-minecraft-reel.mp4.asset.json";

import showreel3 from "@/assets/videos/showreel3.mp4.asset.json";
import lostShowreel from "@/assets/videos/lost-showreel.mp4.asset.json";

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
  { title: "Demo", desc: "Action-packed gameplay edit.", video: demo.url },
  { title: "Minecraft Demo Reel", desc: "Cinematic Minecraft moments.", video: minecraft.url },
  
  { title: "Showreel 3", desc: "Kryptix showreel.", video: showreel3.url },
  { title: "Lost Showreel", desc: "Cinematic gaming edit.", video: lostShowreel.url },
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
