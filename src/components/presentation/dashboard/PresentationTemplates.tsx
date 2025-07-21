import { Zap, Sparkles, Search, Filter, Grid3X3, List, Star, Clock, Users, BookOpen, Presentation, TrendingUp, Building, Lightbulb, Target, Rocket, Globe, Heart, Shield, Leaf, Code, Palette, Music, Camera, Gamepad2, Utensils, Plane, Car, Home, Briefcase, Stethoscope, GraduationCap, Landmark, Wrench, Microscope, Atom, Cpu, Database, Network, Smartphone, Headphones, Coffee, ShoppingCart, CreditCard, BarChart, PieChart, LineChart, Calendar, Mail, MessageSquare, Video, Phone, Map, Navigation, Compass, Mountain, Sun, Moon, Star as StarIcon, Cloud, Zap as ZapIcon, Flower, TreePine, Fish, Bird, Cat, Dog, Rabbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePresentationState } from "@/states/presentation-state";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TEMPLATE_CATEGORIES = [
  "Business",
  "Education",
  "Technology",
  "Marketing",
  "Healthcare",
  "Finance",
  "Science",
  "Creative",
  "Travel",
  "Lifestyle"
];

const PRESENTATION_TEMPLATES = [
  // Business Templates
  {
    id: "business-1",
    title: "Quarterly Business Review",
    description: "Professional quarterly performance analysis",
    category: "Business",
    icon: <TrendingUp className="h-5 w-5" />,
    slides: 15,
    style: "professional",
    color: "#3B82F6",
    tags: ["quarterly", "performance", "review"],
    difficulty: "Intermediate",
    estimatedTime: "45 min"
  },
  {
    id: "business-2",
    title: "Startup Pitch Deck",
    description: "Compelling investor presentation template",
    category: "Business",
    icon: <Rocket className="h-5 w-5" />,
    slides: 12,
    style: "modern",
    color: "#10B981",
    tags: ["startup", "pitch", "investors"],
    difficulty: "Advanced",
    estimatedTime: "30 min"
  },
  {
    id: "business-3",
    title: "Company Annual Report",
    description: "Comprehensive yearly business summary",
    category: "Business",
    icon: <Building className="h-5 w-5" />,
    slides: 20,
    style: "corporate",
    color: "#6366F1",
    tags: ["annual", "report", "corporate"],
    difficulty: "Advanced",
    estimatedTime: "60 min"
  },
  {
    id: "business-4",
    title: "Product Launch Strategy",
    description: "Strategic product introduction plan",
    category: "Business",
    icon: <Target className="h-5 w-5" />,
    slides: 18,
    style: "dynamic",
    color: "#F59E0B",
    tags: ["product", "launch", "strategy"],
    difficulty: "Intermediate",
    estimatedTime: "50 min"
  },
  {
    id: "business-5",
    title: "Team Building Workshop",
    description: "Interactive team development session",
    category: "Business",
    icon: <Users className="h-5 w-5" />,
    slides: 10,
    style: "interactive",
    color: "#EC4899",
    tags: ["team", "workshop", "development"],
    difficulty: "Beginner",
    estimatedTime: "35 min"
  },

  // Education Templates
  {
    id: "education-1",
    title: "Scientific Research Presentation",
    description: "Academic research findings template",
    category: "Education",
    icon: <Microscope className="h-5 w-5" />,
    slides: 16,
    style: "academic",
    color: "#8B5CF6",
    tags: ["research", "academic", "science"],
    difficulty: "Advanced",
    estimatedTime: "55 min"
  },
  {
    id: "education-2",
    title: "Student Thesis Defense",
    description: "Graduate thesis presentation format",
    category: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
    slides: 22,
    style: "formal",
    color: "#0EA5E9",
    tags: ["thesis", "defense", "graduate"],
    difficulty: "Advanced",
    estimatedTime: "70 min"
  },
  {
    id: "education-3",
    title: "Online Course Introduction",
    description: "Engaging course welcome presentation",
    category: "Education",
    icon: <BookOpen className="h-5 w-5" />,
    slides: 8,
    style: "friendly",
    color: "#22C55E",
    tags: ["course", "introduction", "online"],
    difficulty: "Beginner",
    estimatedTime: "25 min"
  },
  {
    id: "education-4",
    title: "Conference Workshop",
    description: "Interactive conference session template",
    category: "Education",
    icon: <Presentation className="h-5 w-5" />,
    slides: 14,
    style: "interactive",
    color: "#F97316",
    tags: ["conference", "workshop", "interactive"],
    difficulty: "Intermediate",
    estimatedTime: "40 min"
  },
  {
    id: "education-5",
    title: "Laboratory Safety Training",
    description: "Essential lab safety protocols",
    category: "Education",
    icon: <Shield className="h-5 w-5" />,
    slides: 12,
    style: "safety",
    color: "#EF4444",
    tags: ["safety", "training", "laboratory"],
    difficulty: "Beginner",
    estimatedTime: "30 min"
  },

  // Technology Templates
  {
    id: "tech-1",
    title: "Software Architecture Overview",
    description: "Technical system design presentation",
    category: "Technology",
    icon: <Code className="h-5 w-5" />,
    slides: 18,
    style: "technical",
    color: "#1F2937",
    tags: ["architecture", "software", "design"],
    difficulty: "Advanced",
    estimatedTime: "50 min"
  },
  {
    id: "tech-2",
    title: "AI & Machine Learning Trends",
    description: "Latest developments in AI technology",
    category: "Technology",
    icon: <Cpu className="h-5 w-5" />,
    slides: 16,
    style: "futuristic",
    color: "#7C3AED",
    tags: ["AI", "machine learning", "trends"],
    difficulty: "Intermediate",
    estimatedTime: "45 min"
  },
  {
    id: "tech-3",
    title: "Cybersecurity Best Practices",
    description: "Essential security measures guide",
    category: "Technology",
    icon: <Shield className="h-5 w-5" />,
    slides: 14,
    style: "security",
    color: "#DC2626",
    tags: ["security", "cybersecurity", "best practices"],
    difficulty: "Intermediate",
    estimatedTime: "40 min"
  },
  {
    id: "tech-4",
    title: "Database Management Systems",
    description: "Comprehensive database overview",
    category: "Technology",
    icon: <Database className="h-5 w-5" />,
    slides: 20,
    style: "technical",
    color: "#059669",
    tags: ["database", "management", "systems"],
    difficulty: "Advanced",
    estimatedTime: "55 min"
  },
  {
    id: "tech-5",
    title: "Mobile App Development",
    description: "Modern mobile development strategies",
    category: "Technology",
    icon: <Smartphone className="h-5 w-5" />,
    slides: 15,
    style: "modern",
    color: "#3B82F6",
    tags: ["mobile", "development", "apps"],
    difficulty: "Intermediate",
    estimatedTime: "42 min"
  },

  // Marketing Templates
  {
    id: "marketing-1",
    title: "Brand Strategy Presentation",
    description: "Comprehensive brand development plan",
    category: "Marketing",
    icon: <Palette className="h-5 w-5" />,
    slides: 16,
    style: "creative",
    color: "#EC4899",
    tags: ["brand", "strategy", "marketing"],
    difficulty: "Intermediate",
    estimatedTime: "45 min"
  },
  {
    id: "marketing-2",
    title: "Social Media Campaign",
    description: "Engaging social media strategy",
    category: "Marketing",
    icon: <MessageSquare className="h-5 w-5" />,
    slides: 12,
    style: "social",
    color: "#8B5CF6",
    tags: ["social media", "campaign", "engagement"],
    difficulty: "Beginner",
    estimatedTime: "35 min"
  },
  {
    id: "marketing-3",
    title: "Market Research Analysis",
    description: "Data-driven market insights",
    category: "Marketing",
    icon: <BarChart className="h-5 w-5" />,
    slides: 18,
    style: "analytical",
    color: "#0EA5E9",
    tags: ["market research", "analysis", "data"],
    difficulty: "Advanced",
    estimatedTime: "50 min"
  },
  {
    id: "marketing-4",
    title: "E-commerce Strategy",
    description: "Online retail growth strategies",
    category: "Marketing",
    icon: <ShoppingCart className="h-5 w-5" />,
    slides: 14,
    style: "commercial",
    color: "#F59E0B",
    tags: ["e-commerce", "retail", "strategy"],
    difficulty: "Intermediate",
    estimatedTime: "40 min"
  },
  {
    id: "marketing-5",
    title: "Content Marketing Plan",
    description: "Effective content strategy framework",
    category: "Marketing",
    icon: <Lightbulb className="h-5 w-5" />,
    slides: 13,
    style: "creative",
    color: "#22C55E",
    tags: ["content", "marketing", "strategy"],
    difficulty: "Beginner",
    estimatedTime: "38 min"
  },

  // Healthcare Templates
  {
    id: "healthcare-1",
    title: "Medical Case Study",
    description: "Clinical case presentation format",
    category: "Healthcare",
    icon: <Stethoscope className="h-5 w-5" />,
    slides: 15,
    style: "clinical",
    color: "#0EA5E9",
    tags: ["medical", "case study", "clinical"],
    difficulty: "Advanced",
    estimatedTime: "48 min"
  },
  {
    id: "healthcare-2",
    title: "Patient Education Materials",
    description: "Clear health information for patients",
    category: "Healthcare",
    icon: <Heart className="h-5 w-5" />,
    slides: 10,
    style: "educational",
    color: "#EF4444",
    tags: ["patient", "education", "health"],
    difficulty: "Beginner",
    estimatedTime: "30 min"
  },
  {
    id: "healthcare-3",
    title: "Medical Research Findings",
    description: "Research presentation for medical professionals",
    category: "Healthcare",
    icon: <Microscope className="h-5 w-5" />,
    slides: 20,
    style: "research",
    color: "#7C3AED",
    tags: ["research", "medical", "findings"],
    difficulty: "Advanced",
    estimatedTime: "60 min"
  },
  {
    id: "healthcare-4",
    title: "Healthcare Innovation",
    description: "New medical technology presentations",
    category: "Healthcare",
    icon: <Zap className="h-5 w-5" />,
    slides: 16,
    style: "innovative",
    color: "#F59E0B",
    tags: ["innovation", "technology", "healthcare"],
    difficulty: "Intermediate",
    estimatedTime: "45 min"
  },
  {
    id: "healthcare-5",
    title: "Public Health Campaign",
    description: "Community health awareness presentation",
    category: "Healthcare",
    icon: <Users className="h-5 w-5" />,
    slides: 12,
    style: "public",
    color: "#22C55E",
    tags: ["public health", "campaign", "awareness"],
    difficulty: "Beginner",
    estimatedTime: "35 min"
  },

  // Finance Templates
  {
    id: "finance-1",
    title: "Investment Portfolio Review",
    description: "Comprehensive portfolio analysis",
    category: "Finance",
    icon: <PieChart className="h-5 w-5" />,
    slides: 18,
    style: "financial",
    color: "#059669",
    tags: ["investment", "portfolio", "analysis"],
    difficulty: "Advanced",
    estimatedTime: "50 min"
  },
  {
    id: "finance-2",
    title: "Budget Planning Workshop",
    description: "Financial planning and budgeting guide",
    category: "Finance",
    icon: <CreditCard className="h-5 w-5" />,
    slides: 14,
    style: "planning",
    color: "#3B82F6",
    tags: ["budget", "planning", "finance"],
    difficulty: "Intermediate",
    estimatedTime: "42 min"
  },
  {
    id: "finance-3",
    title: "Market Analysis Report",
    description: "Financial market trends and insights",
    category: "Finance",
    icon: <LineChart className="h-5 w-5" />,
    slides: 16,
    style: "analytical",
    color: "#0EA5E9",
    tags: ["market", "analysis", "trends"],
    difficulty: "Advanced",
    estimatedTime: "47 min"
  },
  {
    id: "finance-4",
    title: "Personal Finance Education",
    description: "Financial literacy for individuals",
    category: "Finance",
    icon: <Briefcase className="h-5 w-5" />,
    slides: 12,
    style: "educational",
    color: "#F59E0B",
    tags: ["personal finance", "education", "literacy"],
    difficulty: "Beginner",
    estimatedTime: "36 min"
  },
  {
    id: "finance-5",
    title: "Cryptocurrency Overview",
    description: "Digital currency fundamentals",
    category: "Finance",
    icon: <Globe className="h-5 w-5" />,
    slides: 15,
    style: "modern",
    color: "#8B5CF6",
    tags: ["cryptocurrency", "digital", "currency"],
    difficulty: "Intermediate",
    estimatedTime: "43 min"
  },

  // Science Templates
  {
    id: "science-1",
    title: "Climate Change Research",
    description: "Environmental science presentation",
    category: "Science",
    icon: <Leaf className="h-5 w-5" />,
    slides: 20,
    style: "environmental",
    color: "#22C55E",
    tags: ["climate", "environment", "research"],
    difficulty: "Advanced",
    estimatedTime: "58 min"
  },
  {
    id: "science-2",
    title: "Space Exploration Update",
    description: "Latest developments in space science",
    category: "Science",
    icon: <Rocket className="h-5 w-5" />,
    slides: 17,
    style: "space",
    color: "#1F2937",
    tags: ["space", "exploration", "astronomy"],
    difficulty: "Intermediate",
    estimatedTime: "48 min"
  },
  {
    id: "science-3",
    title: "Quantum Physics Introduction",
    description: "Fundamental quantum mechanics concepts",
    category: "Science",
    icon: <Atom className="h-5 w-5" />,
    slides: 22,
    style: "academic",
    color: "#7C3AED",
    tags: ["quantum", "physics", "mechanics"],
    difficulty: "Advanced",
    estimatedTime: "65 min"
  },
  {
    id: "science-4",
    title: "Biology Lab Results",
    description: "Scientific experiment findings",
    category: "Science",
    icon: <Microscope className="h-5 w-5" />,
    slides: 14,
    style: "laboratory",
    color: "#0EA5E9",
    tags: ["biology", "laboratory", "results"],
    difficulty: "Intermediate",
    estimatedTime: "41 min"
  },
  {
    id: "science-5",
    title: "Marine Biology Survey",
    description: "Ocean life research presentation",
    category: "Science",
    icon: <Fish className="h-5 w-5" />,
    slides: 16,
    style: "marine",
    color: "#06B6D4",
    tags: ["marine", "biology", "ocean"],
    difficulty: "Intermediate",
    estimatedTime: "46 min"
  },

  // Creative Templates
  {
    id: "creative-1",
    title: "Art Portfolio Showcase",
    description: "Creative work presentation template",
    category: "Creative",
    icon: <Palette className="h-5 w-5" />,
    slides: 12,
    style: "artistic",
    color: "#EC4899",
    tags: ["art", "portfolio", "showcase"],
    difficulty: "Beginner",
    estimatedTime: "32 min"
  },
  {
    id: "creative-2",
    title: "Music Production Overview",
    description: "Audio production process presentation",
    category: "Creative",
    icon: <Music className="h-5 w-5" />,
    slides: 14,
    style: "musical",
    color: "#8B5CF6",
    tags: ["music", "production", "audio"],
    difficulty: "Intermediate",
    estimatedTime: "39 min"
  },
  {
    id: "creative-3",
    title: "Photography Workshop",
    description: "Digital photography techniques guide",
    category: "Creative",
    icon: <Camera className="h-5 w-5" />,
    slides: 15,
    style: "visual",
    color: "#F59E0B",
    tags: ["photography", "workshop", "techniques"],
    difficulty: "Beginner",
    estimatedTime: "40 min"
  },
  {
    id: "creative-4",
    title: "Game Design Concepts",
    description: "Interactive game development ideas",
    category: "Creative",
    icon: <Gamepad2 className="h-5 w-5" />,
    slides: 18,
    style: "gaming",
    color: "#22C55E",
    tags: ["game", "design", "development"],
    difficulty: "Intermediate",
    estimatedTime: "52 min"
  },
  {
    id: "creative-5",
    title: "Creative Writing Workshop",
    description: "Storytelling and writing techniques",
    category: "Creative",
    icon: <BookOpen className="h-5 w-5" />,
    slides: 11,
    style: "literary",
    color: "#0EA5E9",
    tags: ["writing", "storytelling", "workshop"],
    difficulty: "Beginner",
    estimatedTime: "33 min"
  },

  // Travel Templates
  {
    id: "travel-1",
    title: "Travel Destination Guide",
    description: "Comprehensive travel planning presentation",
    category: "Travel",
    icon: <Plane className="h-5 w-5" />,
    slides: 16,
    style: "travel",
    color: "#0EA5E9",
    tags: ["travel", "destination", "guide"],
    difficulty: "Beginner",
    estimatedTime: "44 min"
  },
  {
    id: "travel-2",
    title: "Cultural Heritage Tour",
    description: "Historical and cultural exploration",
    category: "Travel",
    icon: <Landmark className="h-5 w-5" />,
    slides: 14,
    style: "cultural",
    color: "#F59E0B",
    tags: ["culture", "heritage", "history"],
    difficulty: "Beginner",
    estimatedTime: "38 min"
  },
  {
    id: "travel-3",
    title: "Adventure Sports Overview",
    description: "Extreme sports and activities guide",
    category: "Travel",
    icon: <Mountain className="h-5 w-5" />,
    slides: 13,
    style: "adventure",
    color: "#22C55E",
    tags: ["adventure", "sports", "activities"],
    difficulty: "Intermediate",
    estimatedTime: "36 min"
  },
  {
    id: "travel-4",
    title: "Sustainable Tourism",
    description: "Eco-friendly travel practices",
    category: "Travel",
    icon: <Leaf className="h-5 w-5" />,
    slides: 12,
    style: "sustainable",
    color: "#059669",
    tags: ["sustainable", "eco-friendly", "tourism"],
    difficulty: "Beginner",
    estimatedTime: "34 min"
  },
  {
    id: "travel-5",
    title: "Road Trip Planning",
    description: "Ultimate road trip preparation guide",
    category: "Travel",
    icon: <Car className="h-5 w-5" />,
    slides: 10,
    style: "journey",
    color: "#EF4444",
    tags: ["road trip", "planning", "journey"],
    difficulty: "Beginner",
    estimatedTime: "28 min"
  },

  // Lifestyle Templates
  {
    id: "lifestyle-1",
    title: "Home Organization Tips",
    description: "Practical home management strategies",
    category: "Lifestyle",
    icon: <Home className="h-5 w-5" />,
    slides: 12,
    style: "practical",
    color: "#F59E0B",
    tags: ["home", "organization", "lifestyle"],
    difficulty: "Beginner",
    estimatedTime: "32 min"
  },
  {
    id: "lifestyle-2",
    title: "Healthy Cooking Workshop",
    description: "Nutritious meal preparation guide",
    category: "Lifestyle",
    icon: <Utensils className="h-5 w-5" />,
    slides: 14,
    style: "culinary",
    color: "#22C55E",
    tags: ["cooking", "healthy", "nutrition"],
    difficulty: "Beginner",
    estimatedTime: "37 min"
  },
  {
    id: "lifestyle-3",
    title: "Mindfulness and Meditation",
    description: "Mental wellness and relaxation techniques",
    category: "Lifestyle",
    icon: <Heart className="h-5 w-5" />,
    slides: 10,
    style: "wellness",
    color: "#EC4899",
    tags: ["mindfulness", "meditation", "wellness"],
    difficulty: "Beginner",
    estimatedTime: "30 min"
  },
  {
    id: "lifestyle-4",
    title: "Personal Productivity System",
    description: "Time management and efficiency tips",
    category: "Lifestyle",
    icon: <Clock className="h-5 w-5" />,
    slides: 15,
    style: "productivity",
    color: "#3B82F6",
    tags: ["productivity", "time management", "efficiency"],
    difficulty: "Intermediate",
    estimatedTime: "42 min"
  },
  {
    id: "lifestyle-5",
    title: "Digital Detox Guide",
    description: "Healthy technology usage strategies",
    category: "Lifestyle",
    icon: <Smartphone className="h-5 w-5" />,
    slides: 11,
    style: "digital wellness",
    color: "#8B5CF6",
    tags: ["digital detox", "technology", "wellness"],
    difficulty: "Beginner",
    estimatedTime: "31 min"
  }
];

export function PresentationTemplates() {
  const { showTemplates, setShowTemplates, setPresentationInput, setNumSlides, setLanguage, setPageStyle } = usePresentationState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof PRESENTATION_TEMPLATES[0] | null>(null);

  const filteredTemplates = PRESENTATION_TEMPLATES.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "category":
        return a.category.localeCompare(b.category);
      case "difficulty":
        return a.difficulty.localeCompare(b.difficulty);
      case "time":
        return parseInt(a.estimatedTime) - parseInt(b.estimatedTime);
      default:
        return 0;
    }
  });

  const handleTemplateSelect = (template: typeof PRESENTATION_TEMPLATES[0]) => {
    setPresentationInput(template.title);
    setNumSlides(template.slides);
    setLanguage("en-US");
    setPageStyle(template.style);
    setShowTemplates(false);
  };

  const handleTemplatePreview = (template: typeof PRESENTATION_TEMPLATES[0]) => {
    setSelectedTemplate(template);
  };

  return (
    <>
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <DialogTitle className="text-2xl font-bold">Presentation Templates</DialogTitle>
            </div>
          </DialogHeader>

          <div className="flex flex-col h-full">
            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-4 p-4 border-b">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="All">All Categories</option>
                  {TEMPLATE_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                  <option value="difficulty">Sort by Difficulty</option>
                  <option value="time">Sort by Time</option>
                </select>
              </div>
            </div>

            {/* Templates Display */}
            <div className="flex-1 overflow-auto p-4">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `${template.color}20`, color: template.color }}
                            >
                              {template.icon}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {template.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTemplatePreview(template)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {template.estimatedTime}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Presentation className="h-3 w-3" />
                            {template.slides} slides
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {template.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          onClick={() => handleTemplateSelect(template)}
                          className="w-full"
                          size="sm"
                        >
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `${template.color}20`, color: template.color }}
                            >
                              {template.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold">{template.title}</h3>
                              <p className="text-sm text-muted-foreground">{template.description}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {template.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {template.slides} slides • {template.estimatedTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTemplatePreview(template)}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleTemplateSelect(template)}
                              size="sm"
                            >
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${selectedTemplate.color}20`, color: selectedTemplate.color }}
                >
                  {selectedTemplate.icon}
                </div>
                {selectedTemplate.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedTemplate.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Category:</strong> {selectedTemplate.category}</p>
                    <p><strong>Slides:</strong> {selectedTemplate.slides}</p>
                    <p><strong>Difficulty:</strong> {selectedTemplate.difficulty}</p>
                    <p><strong>Estimated Time:</strong> {selectedTemplate.estimatedTime}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedTemplate.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Close
                </Button>
                <Button onClick={() => {
                  handleTemplateSelect(selectedTemplate);
                  setSelectedTemplate(null);
                }}>
                  Use This Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
