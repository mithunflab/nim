
import { useState } from "react";
import { Bot, Wand2, Lightbulb, CheckCircle, AlertCircle, Sparkles, MessageSquare, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AISuggestion {
  id: string;
  type: "content" | "design" | "structure" | "accessibility";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  slideNumber?: number;
  suggestion: string;
  implemented: boolean;
}

interface PresentationAIProps {
  presentationId: string;
}

export function PresentationAI({ presentationId }: PresentationAIProps) {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([
    {
      id: "1",
      type: "content",
      title: "Improve slide 3 readability",
      description: "Text density is too high for audience comprehension",
      impact: "high",
      slideNumber: 3,
      suggestion: "Break down the bullet points into multiple slides or use visual elements to support the text.",
      implemented: false
    },
    {
      id: "2",
      type: "design",
      title: "Enhance visual hierarchy",
      description: "Headers could be more prominent",
      impact: "medium",
      slideNumber: 5,
      suggestion: "Increase font size for headers and use consistent color schemes for better visual hierarchy.",
      implemented: false
    },
    {
      id: "3",
      type: "structure",
      title: "Add transition slide",
      description: "Abrupt topic change between slides 7 and 8",
      impact: "medium",
      slideNumber: 7,
      suggestion: "Add a transition slide or section divider to better connect the topics.",
      implemented: true
    },
    {
      id: "4",
      type: "accessibility",
      title: "Color contrast issue",
      description: "Low contrast text may be hard to read",
      impact: "high",
      slideNumber: 9,
      suggestion: "Use darker text colors or lighter backgrounds to improve readability for all users.",
      implemented: false
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      type: "ai" as const,
      content: "Hello! I'm your AI presentation assistant. I can help you improve your slides, suggest content, and optimize your presentation for better engagement. What would you like to work on?",
      timestamp: new Date()
    }
  ]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleImplementSuggestion = (suggestionId: string) => {
    setSuggestions(suggestions.map(s => 
      s.id === suggestionId ? { ...s, implemented: true } : s
    ));
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: "ai" as const,
        content: "I understand you'd like help with that. Let me analyze your presentation and provide specific suggestions based on your request.",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: "destructive",
      medium: "default",
      low: "secondary"
    };
    return <Badge variant={colors[impact as keyof typeof colors] as any}>{impact} impact</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "content":
        return <MessageSquare className="h-4 w-4" />;
      case "design":
        return <Sparkles className="h-4 w-4" />;
      case "structure":
        return <Search className="h-4 w-4" />;
      case "accessibility":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const implementedCount = suggestions.filter(s => s.implemented).length;
  const completionRate = Math.round((implementedCount / suggestions.length) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions to improve your presentation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Completion:</span>
                  <span className="text-sm">{implementedCount}/{suggestions.length}</span>
                </div>
                <Progress value={completionRate} className="w-32" />
              </div>
              <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                <Wand2 className="h-4 w-4 mr-2" />
                {isAnalyzing ? "Analyzing..." : "Re-analyze"}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Analyzing presentation...</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} />
              </div>
            )}

            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={`p-4 border rounded-lg ${
                    suggestion.implemented ? "bg-green-50 border-green-200" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(suggestion.type)}
                        <h3 className="font-semibold">{suggestion.title}</h3>
                        {getImpactBadge(suggestion.impact)}
                        {suggestion.slideNumber && (
                          <Badge variant="outline" className="text-xs">
                            Slide {suggestion.slideNumber}
                          </Badge>
                        )}
                        {suggestion.implemented && (
                          <Badge variant="default" className="text-xs bg-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Implemented
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {suggestion.description}
                      </p>
                      <p className="text-sm">
                        <strong>Suggestion:</strong> {suggestion.suggestion}
                      </p>
                    </div>
                    {!suggestion.implemented && (
                      <Button
                        size="sm"
                        onClick={() => handleImplementSuggestion(suggestion.id)}
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask me anything about your presentation..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="min-h-[60px]"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit();
                  }
                }}
              />
              <Button onClick={handleChatSubmit} disabled={!chatInput.trim()}>
                Send
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Readability Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">85/100</div>
                  <p className="text-xs text-muted-foreground">Good readability</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Engagement Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">78/100</div>
                  <p className="text-xs text-muted-foreground">Above average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Accessibility Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">72/100</div>
                  <p className="text-xs text-muted-foreground">Needs improvement</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Content Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Word count</span>
                    <span>1,247 words</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Reading time</span>
                    <span>8-10 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Slides with text overload</span>
                    <span className="text-orange-600">3 slides</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Visual elements</span>
                    <span className="text-green-600">12 charts, 8 images</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Presentation Flow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Logical flow</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transition quality</span>
                    <span className="text-blue-600">Good</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Missing transitions</span>
                    <span className="text-orange-600">2 locations</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Conclusion strength</span>
                    <span className="text-green-600">Strong</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
