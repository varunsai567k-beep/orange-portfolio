import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import thumb from "@/assets/work-ad.jpg";
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
  { title: "Skincare Brand — TikTok Ad", desc: "Hook-first vertical edit, 3.2% CTR.", thumb, duration: "0:28" },
  { title: "App Install Spot", desc: "Native UGC-style with bold typography.", thumb, duration: "0:15" },
  { title: "Product Launch Reel", desc: "Premium cinematic spot for hardware launch.", thumb, duration: "0:45" },
  { title: "DTC Apparel Ad", desc: "Lookbook-meets-conversion with split-screen FX.", thumb, duration: "0:22" },
  { title: "SaaS Explainer", desc: "Motion graphics + screencast hybrid.", thumb, duration: "1:10" },
  { title: "Beverage Hero Spot", desc: "High-speed product hero with sound design.", thumb, duration: "0:30" },
  { title: "Demo Reel", desc: "Showcase of recent gaming edits.", video: demoReel.url },
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
