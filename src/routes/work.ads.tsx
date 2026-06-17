import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import demoReel from "@/assets/videos/demo-reel.mp4.asset.json";
import projectMeme from "@/assets/videos/project-meme.mp4.asset.json";

export const Route = createFileRoute("/work/ads")({
  head: () => ({
    meta: [
      { title: "Advertisements — Orange Edits" },
      { name: "description", content: "Conversion-focused ads for TikTok, Reels, and YouTube edited by Orange Edits." },
      { property: "og:title", content: "Advertisements — Orange Edits" },
      { property: "og:description", content: "Ads built for the scroll." },
    ],
  }),
  component: AdsPage,
});

const videos = [
  { title: "Demo Reel", desc: "Showcase of recent ad edits.", video: demoReel.url },
  { title: "Project Meme", desc: "Funny moments + meme edit.", video: projectMeme.url },
];

function AdsPage() {
  return (
    <CategoryPage
      category="Advertisements"
      title="Ads."
      description="Scroll-stopping ad creative engineered for retention, click-through, and conversion across every social platform."
      videos={videos}
    />
  );
}
