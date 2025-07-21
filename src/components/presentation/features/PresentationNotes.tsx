
import { useState } from "react";
import { StickyNote, Plus, Edit, Trash2, Pin, Search, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Note {
  id: string;
  title: string;
  content: string;
  slideNumber?: number;
  category: "speaker" | "research" | "reminder" | "idea";
  color: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PresentationNotesProps {
  presentationId: string;
}

export function PresentationNotes({ presentationId }: PresentationNotesProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Opening hook",
      content: "Start with the statistic about 70% increase in remote work. Remember to pause after delivering this number for impact.",
      slideNumber: 1,
      category: "speaker",
      color: "bg-yellow-100 border-yellow-300",
      isPinned: true,
      createdAt: new Date("2024-01-15T10:00:00"),
      updatedAt: new Date("2024-01-15T10:00:00")
    },
    {
      id: "2",
      title: "Q4 Data Sources",
      content: "Data from McKinsey Global Institute report 2023, Forbes remote work survey, and internal company metrics. Double-check the latest numbers before presentation.",
      slideNumber: 5,
      category: "research",
      color: "bg-blue-100 border-blue-300",
      isPinned: false,
      createdAt: new Date("2024-01-15T11:30:00"),
      updatedAt: new Date("2024-01-15T14:20:00")
    },
    {
      id: "3",
      title: "Demo reminder",
      content: "Make sure to test the software demo on the actual presentation setup. Have backup screenshots ready.",
      slideNumber: 8,
      category: "reminder",
      color: "bg-red-100 border-red-300",
      isPinned: true,
      createdAt: new Date("2024-01-15T16:45:00"),
      updatedAt: new Date("2024-01-15T16:45:00")
    },
    {
      id: "4",
      title: "Future feature idea",
      content: "Consider adding a slide about AI integration possibilities. This came up in the last team meeting and could be interesting for the audience.",
      category: "idea",
      color: "bg-green-100 border-green-300",
      isPinned: false,
      createdAt: new Date("2024-01-16T09:15:00"),
      updatedAt: new Date("2024-01-16T09:15:00")
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    slideNumber: "",
    category: "speaker" as const,
    color: "bg-yellow-100 border-yellow-300"
  });

  const categoryColors = {
    speaker: "bg-yellow-100 border-yellow-300",
    research: "bg-blue-100 border-blue-300",
    reminder: "bg-red-100 border-red-300",
    idea: "bg-green-100 border-green-300"
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || note.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    switch (sortBy) {
      case "created":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "updated":
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "slide":
        return (a.slideNumber || 999) - (b.slideNumber || 999);
      default:
        return 0;
    }
  });

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    const now = new Date();
    const newNote: Note = {
      id: editingNote?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      slideNumber: formData.slideNumber ? parseInt(formData.slideNumber) : undefined,
      category: formData.category,
      color: formData.color,
      isPinned: editingNote?.isPinned || false,
      createdAt: editingNote?.createdAt || now,
      updatedAt: now
    };

    if (editingNote) {
      setNotes(notes.map(n => n.id === editingNote.id ? newNote : n));
    } else {
      setNotes([...notes, newNote]);
    }

    resetForm();
    setDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      slideNumber: "",
      category: "speaker",
      color: "bg-yellow-100 border-yellow-300"
    });
    setEditingNote(null);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      slideNumber: note.slideNumber?.toString() || "",
      category: note.category,
      color: note.color
    });
    setDialogOpen(true);
  };

  const handleDelete = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
  };

  const handlePin = (noteId: string) => {
    setNotes(notes.map(n => n.id === noteId ? { ...n, isPinned: !n.isPinned } : n));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <StickyNote className="h-5 w-5" />
                Presentation Notes
              </CardTitle>
              <CardDescription>
                Keep track of speaker notes, research, and ideas
              </CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingNote ? "Edit Note" : "Add New Note"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Note title"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Content</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      placeholder="Note content"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Slide Number</label>
                      <Input
                        type="number"
                        value={formData.slideNumber}
                        onChange={(e) => setFormData({...formData, slideNumber: e.target.value})}
                        placeholder="Optional"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select value={formData.category} onValueChange={(value: "speaker" | "research" | "reminder" | "idea") => {
                        setFormData({
                          ...formData, 
                          category: value,
                          color: categoryColors[value]
                        });
                      }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="speaker">Speaker Notes</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="reminder">Reminder</SelectItem>
                          <SelectItem value="idea">Idea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                      {editingNote ? "Update Note" : "Add Note"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="speaker">Speaker</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="idea">Idea</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="slide">Slide</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedNotes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-lg border-2 ${note.color} relative`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{note.title}</h3>
                    {note.isPinned && (
                      <Pin className="h-3 w-3 text-gray-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePin(note.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Pin className={`h-3 w-3 ${note.isPinned ? 'text-primary' : 'text-gray-400'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(note)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(note.id)}
                      className="h-6 w-6 p-0 text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                  {note.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {note.category}
                    </Badge>
                    {note.slideNumber && (
                      <Badge variant="outline" className="text-xs">
                        Slide {note.slideNumber}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(note.updatedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
