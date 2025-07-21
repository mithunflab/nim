
import { useState } from "react";
import { Download, FileText, Image, Video, Globe, Printer, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ExportOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  formats: string[];
  features: string[];
  premium?: boolean;
}

interface PresentationExportProps {
  presentationId: string;
}

export function PresentationExport({ presentationId }: PresentationExportProps) {
  const [selectedExport, setSelectedExport] = useState<string>("pdf");
  const [exportFormat, setExportFormat] = useState<string>("standard");
  const [includeNotes, setIncludeNotes] = useState(false);
  const [includeComments, setIncludeComments] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const exportOptions: ExportOption[] = [
    {
      id: "pdf",
      name: "PDF Document",
      description: "High-quality PDF for printing and sharing",
      icon: <FileText className="h-5 w-5" />,
      formats: ["standard", "handouts", "notes"],
      features: ["Vector graphics", "Searchable text", "Print-ready"]
    },
    {
      id: "powerpoint",
      name: "PowerPoint",
      description: "Editable PPTX format",
      icon: <FileText className="h-5 w-5" />,
      formats: ["pptx"],
      features: ["Fully editable", "Animation preserved", "Cross-platform"]
    },
    {
      id: "images",
      name: "Image Files",
      description: "Individual slide images",
      icon: <Image className="h-5 w-5" />,
      formats: ["png", "jpg", "svg"],
      features: ["High resolution", "Transparent backgrounds", "Web-ready"]
    },
    {
      id: "video",
      name: "Video Export",
      description: "Animated presentation video",
      icon: <Video className="h-5 w-5" />,
      formats: ["mp4", "mov", "webm"],
      features: ["Smooth transitions", "Voice narration", "Custom timing"],
      premium: true
    },
    {
      id: "web",
      name: "Web Page",
      description: "Interactive HTML presentation",
      icon: <Globe className="h-5 w-5" />,
      formats: ["html", "responsive"],
      features: ["Interactive elements", "Mobile-friendly", "Offline viewing"]
    },
    {
      id: "print",
      name: "Print Layout",
      description: "Optimized for printing",
      icon: <Printer className="h-5 w-5" />,
      formats: ["pdf", "handouts"],
      features: ["Print margins", "Page breaks", "Grayscale option"]
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExporting(false);
          toast.success("Export completed successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const selectedOption = exportOptions.find(option => option.id === selectedExport);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Presentation
        </CardTitle>
        <CardDescription>
          Choose your preferred export format and settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportOptions.map((option) => (
            <div
              key={option.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedExport === option.id 
                  ? "border-primary bg-primary/5" 
                  : "border-muted hover:border-primary/50"
              }`}
              onClick={() => setSelectedExport(option.id)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{option.name}</h3>
                    {option.premium && (
                      <Badge variant="secondary" className="text-xs">Pro</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {option.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {option.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Format Selection */}
        {selectedOption && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectedOption.formats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notes"
                    checked={includeNotes}
                    onCheckedChange={(checked) => setIncludeNotes(checked === true)}
                  />
                  <Label htmlFor="notes" className="text-sm">
                    Speaker notes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="comments"
                    checked={includeComments}
                    onCheckedChange={(checked) => setIncludeComments(checked === true)}
                  />
                  <Label htmlFor="comments" className="text-sm">
                    Comments and feedback
                  </Label>
                </div>
              </div>
            </div>

            {/* Export Progress */}
            {isExporting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Exporting...</span>
                  <span className="text-sm text-muted-foreground">{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="w-full" />
              </div>
            )}

            {/* Export Button */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Advanced Settings
              </Button>
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                {isExporting ? "Exporting..." : "Export"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
