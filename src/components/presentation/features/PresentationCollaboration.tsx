
import { useState } from "react";
import { Users, UserPlus, Crown, Shield, Eye, Edit, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: "owner" | "editor" | "viewer";
  status: "active" | "pending" | "offline";
  lastSeen: Date;
}

interface PresentationCollaborationProps {
  presentationId: string;
}

export function PresentationCollaboration({ presentationId }: PresentationCollaborationProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "You",
      email: "you@example.com",
      avatar: "",
      initials: "YO",
      role: "owner",
      status: "active",
      lastSeen: new Date()
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "",
      initials: "SJ",
      role: "editor",
      status: "active",
      lastSeen: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike@example.com",
      avatar: "",
      initials: "MC",
      role: "viewer",
      status: "offline",
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      email: "alex@example.com",
      avatar: "",
      initials: "AR",
      role: "editor",
      status: "pending",
      lastSeen: new Date()
    }
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"editor" | "viewer">("viewer");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const handleInvite = () => {
    if (!inviteEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      avatar: "",
      initials: inviteEmail.substring(0, 2).toUpperCase(),
      role: inviteRole,
      status: "pending",
      lastSeen: new Date()
    };

    setCollaborators([...collaborators, newCollaborator]);
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setInviteDialogOpen(false);
  };

  const handleRoleChange = (collaboratorId: string, newRole: "editor" | "viewer") => {
    setCollaborators(collaborators.map(c => 
      c.id === collaboratorId ? { ...c, role: newRole } : c
    ));
    toast.success("Role updated successfully");
  };

  const handleRemoveCollaborator = (collaboratorId: string) => {
    setCollaborators(collaborators.filter(c => c.id !== collaboratorId));
    toast.success("Collaborator removed");
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4" />;
      case "editor":
        return <Edit className="h-4 w-4" />;
      case "viewer":
        return <Eye className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="text-xs">Active</Badge>;
      case "pending":
        return <Badge variant="secondary" className="text-xs">Pending</Badge>;
      case "offline":
        return <Badge variant="outline" className="text-xs">Offline</Badge>;
      default:
        return null;
    }
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Collaborators ({collaborators.length})
            </CardTitle>
            <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Collaborator</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Role</label>
                    <Select value={inviteRole} onValueChange={(value: "editor" | "viewer") => setInviteRole(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer - Can view only</SelectItem>
                        <SelectItem value="editor">Editor - Can edit and comment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleInvite}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Invitation
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={collaborator.avatar} />
                    <AvatarFallback>{collaborator.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{collaborator.name}</span>
                      {getStatusBadge(collaborator.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {collaborator.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last seen: {formatLastSeen(collaborator.lastSeen)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {getRoleIcon(collaborator.role)}
                    <span className="text-sm capitalize">{collaborator.role}</span>
                  </div>
                  {collaborator.role !== "owner" && (
                    <div className="flex items-center gap-1">
                      <Select
                        value={collaborator.role}
                        onValueChange={(value: "editor" | "viewer") => handleRoleChange(collaborator.id, value)}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCollaborator(collaborator.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
