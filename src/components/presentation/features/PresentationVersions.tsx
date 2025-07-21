
import { useState } from "react";
import { History, Eye, Download, Restore, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Version {
  id: string;
  version: string;
  createdAt: Date;
  createdBy: {
    name: string;
    avatar: string;
    initials: string;
  };
  changes: string;
  isCurrent: boolean;
  size: string;
}

interface PresentationVersionsProps {
  presentationId: string;
}

export function PresentationVersions({ presentationId }: PresentationVersionsProps) {
  const [versions, setVersions] = useState<Version[]>([
    {
      id: "v1.3",
      version: "1.3",
      createdAt: new Date("2024-01-15T16:30:00"),
      createdBy: {
        name: "You",
        avatar: "",
        initials: "YO"
      },
      changes: "Updated financial projections and added Q4 data",
      isCurrent: true,
      size: "2.4 MB"
    },
    {
      id: "v1.2",
      version: "1.2",
      createdAt: new Date("2024-01-15T14:20:00"),
      createdBy: {
        name: "Sarah Johnson",
        avatar: "",
        initials: "SJ"
      },
      changes: "Fixed typography and improved slide transitions",
      isCurrent: false,
      size: "2.3 MB"
    },
    {
      id: "v1.1",
      version: "1.1",
      createdAt: new Date("2024-01-15T10:45:00"),
      createdBy: {
        name: "Mike Chen",
        avatar: "",
        initials: "MC"
      },
      changes: "Added market analysis section and updated charts",
      isCurrent: false,
      size: "2.1 MB"
    },
    {
      id: "v1.0",
      version: "1.0",
      createdAt: new Date("2024-01-14T18:00:00"),
      createdBy: {
        name: "You",
        avatar: "",
        initials: "YO"
      },
      changes: "Initial presentation created",
      isCurrent: false,
      size: "1.8 MB"
    }
  ]);

  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

  const handleRestore = (version: Version) => {
    setSelectedVersion(version);
    setRestoreDialogOpen(true);
  };

  const confirmRestore = () => {
    if (!selectedVersion) return;

    setVersions(versions.map(v => ({
      ...v,
      isCurrent: v.id === selectedVersion.id
    })));

    toast.success(`Restored to version ${selectedVersion.version}`);
    setRestoreDialogOpen(false);
    setSelectedVersion(null);
  };

  const handleDuplicate = (version: Version) => {
    const newVersion: Version = {
      id: `v${parseFloat(version.version) + 0.1}`,
      version: `${parseFloat(version.version) + 0.1}`,
      createdAt: new Date(),
      createdBy: {
        name: "You",
        avatar: "",
        initials: "YO"
      },
      changes: `Duplicated from version ${version.version}`,
      isCurrent: false,
      size: version.size
    };

    setVersions([newVersion, ...versions]);
    toast.success(`Created duplicate version ${newVersion.version}`);
  };

  const handleDownload = (version: Version) => {
    toast.success(`Downloading version ${version.version}`);
    // In a real app, this would trigger a download
  };

  const handleDelete = (version: Version) => {
    if (version.isCurrent) {
      toast.error("Cannot delete the current version");
      return;
    }

    setVersions(versions.filter(v => v.id !== version.id));
    toast.success(`Deleted version ${version.version}`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Version History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {versions.map((version) => (
              <div key={version.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={version.createdBy.avatar} />
                    <AvatarFallback>{version.createdBy.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Version {version.version}</span>
                      {version.isCurrent && (
                        <Badge variant="default" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {version.changes}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(version.createdAt)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        by {version.createdBy.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {version.size}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(version)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDuplicate(version)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  {!version.isCurrent && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRestore(version)}
                      >
                        <Restore className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(version)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore Version</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to restore to version {selectedVersion?.version}? 
              This will make it the current version of your presentation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRestore}>Restore</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
