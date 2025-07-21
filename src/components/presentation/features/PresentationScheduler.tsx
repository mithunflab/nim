
import { useState } from "react";
import { Calendar, Clock, Bell, Users, Video, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type EventType = "in-person" | "online" | "hybrid";

interface PresentationEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number;
  location: string;
  type: EventType;
  attendees: string[];
  reminderTime: number;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
}

interface PresentationSchedulerProps {
  presentationId: string;
}

export function PresentationScheduler({ presentationId }: PresentationSchedulerProps) {
  const [events, setEvents] = useState<PresentationEvent[]>([
    {
      id: "1",
      title: "Board Meeting Presentation",
      description: "Quarterly review and future strategy discussion",
      date: new Date("2024-01-20T14:00:00"),
      duration: 90,
      location: "Conference Room A",
      type: "in-person",
      attendees: ["sarah@company.com", "mike@company.com", "alex@company.com"],
      reminderTime: 30,
      status: "scheduled"
    },
    {
      id: "2",
      title: "Client Presentation",
      description: "Product demo and proposal review",
      date: new Date("2024-01-22T10:00:00"),
      duration: 60,
      location: "https://meet.google.com/abc-def-ghi",
      type: "online",
      attendees: ["client@example.com", "team@company.com"],
      reminderTime: 15,
      status: "scheduled"
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<PresentationEvent | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: 60,
    location: "",
    type: "in-person" as EventType,
    attendees: "",
    reminderTime: 15
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    const eventDate = new Date(`${formData.date}T${formData.time}`);
    const attendeesList = formData.attendees.split(',').map(email => email.trim()).filter(Boolean);

    const newEvent: PresentationEvent = {
      id: editingEvent?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: eventDate,
      duration: formData.duration,
      location: formData.location,
      type: formData.type,
      attendees: attendeesList,
      reminderTime: formData.reminderTime,
      status: "scheduled"
    };

    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? newEvent : e));
      toast.success("Event updated successfully");
    } else {
      setEvents([...events, newEvent]);
      toast.success("Event scheduled successfully");
    }

    resetForm();
    setDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: 60,
      location: "",
      type: "in-person",
      attendees: "",
      reminderTime: 15
    });
    setEditingEvent(null);
  };

  const handleEdit = (event: PresentationEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.toISOString().split('T')[0],
      time: event.date.toTimeString().slice(0, 5),
      duration: event.duration,
      location: event.location,
      type: event.type,
      attendees: event.attendees.join(', '),
      reminderTime: event.reminderTime
    });
    setDialogOpen(true);
  };

  const handleDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
    toast.success("Event cancelled");
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

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: "default",
      ongoing: "secondary",
      completed: "outline",
      cancelled: "destructive"
    };
    return <Badge variant={variants[status as keyof typeof variants] as any}>{status}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "online":
        return <Video className="h-4 w-4" />;
      case "hybrid":
        return <Users className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduled Presentations
              </CardTitle>
              <CardDescription>
                Manage and schedule your presentation events
              </CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingEvent ? "Edit Event" : "Schedule New Event"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter event title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Event description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                        min="15"
                        max="480"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reminder">Reminder (minutes before)</Label>
                      <Select value={formData.reminderTime.toString()} onValueChange={(value) => setFormData({...formData, reminderTime: parseInt(value)})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="1440">1 day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type">Event Type</Label>
                    <Select value={formData.type} onValueChange={(value: EventType) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location / Meeting Link</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Room name or meeting URL"
                    />
                  </div>

                  <div>
                    <Label htmlFor="attendees">Attendees (comma-separated emails)</Label>
                    <Textarea
                      id="attendees"
                      value={formData.attendees}
                      onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                      placeholder="email1@example.com, email2@example.com"
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                      {editingEvent ? "Update Event" : "Schedule Event"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      {getStatusBadge(event.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(event.type)}
                        {event.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees.length} attendees
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="font-medium">Location:</span> {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(event)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
