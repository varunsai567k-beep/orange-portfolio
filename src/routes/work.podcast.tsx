import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import vid1 from "@/assets/videos/vid1.mp4.asset.json";
import demoReel from "@/assets/videos/demo-reel.mp4.asset.json";

export const Route = createFileRoute("/work/podcast")({
  head: () => ({
    meta: [
      { title: "Podcast — Orange Edits" },
      { name: "description", content: "Podcast editing by Orange Edits." },
      { property: "og:title", content: "Podcast — Orange Edits" },
      { property: "og:description", content: "Podcast edits." },
    ],
  }),
  component: PodcastPage,
});

const videos = [
  { title: "Vid 1", desc: "Quick-cut gaming highlight.", video: vid1.url },
  { title: "Demo Reel", desc: "Showcase of recent gaming edits.", video: demoReel.url },
];

function PodcastPage() {
  return (
    <CategoryPage
      category="Podcast"
      title="Podcast."
      description="Clean cuts, polished audio, and engaging visuals for podcast episodes that keep listeners hooked."
      videos={videos}
    />
  );
}
