
import { BarChart3, TrendingUp, Users, Clock, Eye, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnalyticsData {
  views: number;
  shares: number;
  downloads: number;
  avgTimeSpent: string;
  completionRate: number;
  audience: {
    countries: { name: string; count: number }[];
    devices: { name: string; count: number }[];
  };
}

interface PresentationAnalyticsProps {
  presentationId: string;
}

export function PresentationAnalytics({ presentationId }: PresentationAnalyticsProps) {
  // Mock data - in real app, this would come from API
  const analytics: AnalyticsData = {
    views: 1247,
    shares: 89,
    downloads: 156,
    avgTimeSpent: "8m 32s",
    completionRate: 78,
    audience: {
      countries: [
        { name: "United States", count: 412 },
        { name: "United Kingdom", count: 298 },
        { name: "Canada", count: 187 },
        { name: "Australia", count: 134 },
        { name: "Germany", count: 89 }
      ],
      devices: [
        { name: "Desktop", count: 789 },
        { name: "Mobile", count: 312 },
        { name: "Tablet", count: 146 }
      ]
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.shares}</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.downloads}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgTimeSpent}</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Audience by Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.audience.countries.map((country) => (
                <div key={country.name} className="flex items-center justify-between">
                  <span className="text-sm">{country.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{country.count}</Badge>
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(country.count / analytics.views) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Device Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.audience.devices.map((device) => (
                <div key={device.name} className="flex items-center justify-between">
                  <span className="text-sm">{device.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{device.count}</Badge>
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(device.count / analytics.views) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Completion Rate
          </CardTitle>
          <CardDescription>
            Percentage of viewers who completed the presentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold">{analytics.completionRate}%</div>
            <div className="flex-1 bg-muted rounded-full h-4">
              <div 
                className="bg-primary h-4 rounded-full"
                style={{ width: `${analytics.completionRate}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
