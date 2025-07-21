
import { useState } from "react";
import { 
  BarChart3, 
  MessageCircle, 
  History, 
  Users, 
  Download, 
  Calendar, 
  Bot, 
  StickyNote, 
  HelpCircle,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  PresentationAnalytics,
  PresentationComments,
  PresentationVersions,
  PresentationCollaboration,
  PresentationExport,
  PresentationScheduler,
  PresentationAI,
  PresentationNotes,
  PresentationQuiz
} from './index';

interface FeatureHubProps {
  presentationId: string;
}

export function FeatureHub({ presentationId }: FeatureHubProps) {
  const [activeTab, setActiveTab] = useState("analytics");

  const features = [
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart3 className="h-4 w-4" />,
      description: "View presentation performance metrics",
      component: <PresentationAnalytics presentationId={presentationId} />
    },
    {
      id: "comments",
      name: "Comments",
      icon: <MessageCircle className="h-4 w-4" />,
      description: "Manage feedback and discussions",
      component: <PresentationComments presentationId={presentationId} />
    },
    {
      id: "versions",
      name: "Versions",
      icon: <History className="h-4 w-4" />,
      description: "Track changes and restore previous versions",
      component: <PresentationVersions presentationId={presentationId} />
    },
    {
      id: "collaboration",
      name: "Collaboration",
      icon: <Users className="h-4 w-4" />,
      description: "Manage team access and permissions",
      component: <PresentationCollaboration presentationId={presentationId} />
    },
    {
      id: "export",
      name: "Export",
      icon: <Download className="h-4 w-4" />,
      description: "Export in multiple formats",
      component: <PresentationExport presentationId={presentationId} />
    },
    {
      id: "scheduler",
      name: "Scheduler",
      icon: <Calendar className="h-4 w-4" />,
      description: "Schedule presentation events",
      component: <PresentationScheduler presentationId={presentationId} />
    },
    {
      id: "ai",
      name: "AI Assistant",
      icon: <Bot className="h-4 w-4" />,
      description: "Get AI-powered suggestions",
      component: <PresentationAI presentationId={presentationId} />,
      badge: "New"
    },
    {
      id: "notes",
      name: "Notes",
      icon: <StickyNote className="h-4 w-4" />,
      description: "Manage speaker notes and ideas",
      component: <PresentationNotes presentationId={presentationId} />
    },
    {
      id: "quiz",
      name: "Interactive Quiz",
      icon: <HelpCircle className="h-4 w-4" />,
      description: "Create engaging quizzes",
      component: <PresentationQuiz presentationId={presentationId} />,
      badge: "Pro"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Feature Hub</h2>
          <p className="text-muted-foreground">
            Enhance your presentation with powerful features
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
          {features.map((feature) => (
            <TabsTrigger
              key={feature.id}
              value={feature.id}
              className="flex items-center gap-2 relative"
            >
              {feature.icon}
              <span className="hidden sm:inline">{feature.name}</span>
              {feature.badge && (
                <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">
                  {feature.badge}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {features.map((feature) => (
          <TabsContent key={feature.id} value={feature.id} className="space-y-4">
            {feature.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
