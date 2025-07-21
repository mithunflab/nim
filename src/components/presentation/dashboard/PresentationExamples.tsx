
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePresentationState } from "@/states/presentation-state";
import { useState } from "react";
import { type InfiniteData, useQuery } from "@tanstack/react-query";
import { type fetchPresentations } from "@/actions/presentation/fetchPresentations";

type Presentation = Awaited<ReturnType<typeof fetchPresentations>>;

// Import the templates from PresentationTemplates
const EXAMPLE_PROMPTS = [
  {
    id: "ai-future",
    icon: "⚡",
    title: "The Future of Artificial Intelligence in Engineering",
    slides: 12,
    lang: "en-US",
    style: "professional",
    color: { background: "rgba(168, 85, 247, 0.1)", color: "#A855F7" },
  },
  {
    id: "sustainable-materials",
    icon: "🌍",
    title: "Sustainable Materials for Construction Projects",
    slides: 15,
    lang: "en-US",
    style: "traditional",
    color: { background: "rgba(34, 197, 94, 0.1)", color: "#22C55E" },
  },
  {
    id: "project-management",
    icon: "🎯",
    title: "Best Practices for Project Management in Engineering",
    slides: 10,
    lang: "en-US",
    style: "default",
    color: { background: "rgba(6, 182, 212, 0.1)", color: "#06B6D4" },
  },
  {
    id: "robotics",
    icon: "🤖",
    title: "Advancements in Robotics and Automation",
    slides: 12,
    lang: "en-US",
    style: "professional",
    color: { background: "rgba(239, 68, 68, 0.1)", color: "#EF4444" },
  },
  {
    id: "renewable-energy",
    icon: "🌱",
    title: "Innovations in Renewable Energy Technology",
    slides: 15,
    lang: "en-US",
    style: "default",
    color: { background: "rgba(34, 197, 94, 0.1)", color: "#22C55E" },
  },
  {
    id: "cybersecurity",
    icon: "🔒",
    title: "Cybersecurity Challenges in Engineering Systems",
    slides: 10,
    lang: "en-US",
    style: "professional",
    color: { background: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" },
  },
  {
    id: "business-strategy",
    icon: "📊",
    title: "Quarterly Business Review and Strategy",
    slides: 15,
    lang: "en-US",
    style: "corporate",
    color: { background: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" },
  },
  {
    id: "startup-pitch",
    icon: "🚀",
    title: "Startup Pitch Deck for Investors",
    slides: 12,
    lang: "en-US",
    style: "modern",
    color: { background: "rgba(16, 185, 129, 0.1)", color: "#10B981" },
  },
  {
    id: "medical-research",
    icon: "🏥",
    title: "Medical Research Findings Presentation",
    slides: 18,
    lang: "en-US",
    style: "clinical",
    color: { background: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9" },
  },
  {
    id: "brand-strategy",
    icon: "🎨",
    title: "Brand Strategy and Marketing Plan",
    slides: 14,
    lang: "en-US",
    style: "creative",
    color: { background: "rgba(236, 72, 153, 0.1)", color: "#EC4899" },
  },
  {
    id: "financial-analysis",
    icon: "💰",
    title: "Investment Portfolio Analysis",
    slides: 16,
    lang: "en-US",
    style: "financial",
    color: { background: "rgba(5, 150, 105, 0.1)", color: "#059669" },
  },
  {
    id: "climate-research",
    icon: "🌡️",
    title: "Climate Change Research and Impact",
    slides: 20,
    lang: "en-US",
    style: "environmental",
    color: { background: "rgba(34, 197, 94, 0.1)", color: "#22C55E" },
  }
];

export function PresentationExamples() {
  const [examples, setExamples] = useState(EXAMPLE_PROMPTS.slice(0, 6));
  const { setNumSlides, setLanguage, setPageStyle, setPresentationInput } =
    usePresentationState();
  
  // Use useQuery to subscribe to the same data as RecentPresentations
  const { data: presentationsData } = useQuery({
    queryKey: ["presentations-all"],
    queryFn: () => {
      return { pages: [] as Presentation[] };
    },
    enabled: true,
  });

  // Hide examples if there are existing presentations
  if (presentationsData && Array.isArray(presentationsData) && presentationsData.length > 0) {
    return null;
  }

  const handleExampleClick = (example: (typeof EXAMPLE_PROMPTS)[0]) => {
    setPresentationInput(example.title);
    setNumSlides(example.slides);
    setLanguage(example.lang);
    setPageStyle(example.style);
  };

  const handleShuffle = () => {
    const shuffled = [...EXAMPLE_PROMPTS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setExamples(shuffled);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Try these examples
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShuffle}
          className="gap-2"
        >
          <Shuffle className="h-4 w-4" />
          Shuffle
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => handleExampleClick(example)}
            className="group flex items-center gap-3 rounded-lg border bg-card p-4 text-left transition-all hover:border-primary hover:bg-accent hover:shadow-sm"
          >
            <div
              className="rounded-lg p-2"
              style={{
                background: example.color.background,
                color: example.color.color,
              }}
            >
              <span className="text-lg">{example.icon}</span>
            </div>
            <span className="line-clamp-2 flex-1 text-sm font-medium text-card-foreground group-hover:text-accent-foreground">
              {example.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
