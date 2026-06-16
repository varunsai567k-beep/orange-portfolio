import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import short from "@/assets/videos/short.mp4.asset.json";

export const Route = createFileRoute("/work/reels")({
  head: () => ({
    meta: [
      { title: "Reels — Orange Edits" },
      { name: "description", content: "Instagram Reels and short-form edits by Orange Edits." },
      { property: "og:title", content: "Reels — Orange Edits" },
      { property: "og:description", content: "Reels built for the algorithm." },
    ],
  }),
  component: ReelsPage,
});

const videos = [
  { title: "Short", desc: "Short-form vertical edit.", video: short.url },
];

function ReelsPage() {
  return (
    <CategoryPage
      category="Reels"
      title="Reels."
      description="Vertical short-form content engineered for Instagram Reels — fast hooks, smooth transitions, and scroll-stopping moments."
      videos={videos}
    />
  );
}
