import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

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
  { title: "Latest Gaming Edit", desc: "Newest gaming showreel.", youtube: "dVpV_52rWm8" },
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
