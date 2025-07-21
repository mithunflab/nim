import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, Plus, Edit3, Trash2 } from 'lucide-react';
import { usePresentationState } from '@/states/presentation-state';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface OutlineListProps {
  presentationId: string;
}

export default function OutlineList({ presentationId }: OutlineListProps) {
  const navigate = useNavigate();
  const [localOutline, setLocalOutline] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    outline,
    setOutline,
    presentationInput,
    setSlides,
    currentPresentationTitle,
    setCurrentPresentation
  } = usePresentationState();

  useEffect(() => {
    // Initialize with some sample outline items
    if (outline.length === 0) {
      const sampleOutline = [
        'Introduction',
        'Problem Statement', 
        'Proposed Solution',
        'Benefits & Impact',
        'Implementation Plan',
        'Conclusion & Next Steps'
      ];
      setOutline(sampleOutline);
      setLocalOutline(sampleOutline);
    } else {
      setLocalOutline(outline);
    }
  }, [outline, setOutline]);

  const handleAddOutlineItem = () => {
    const newItem = `New Topic ${localOutline.length + 1}`;
    const updatedOutline = [...localOutline, newItem];
    setLocalOutline(updatedOutline);
    setOutline(updatedOutline);
  };

  const handleEditOutlineItem = (index: number, newText: string) => {
    const updatedOutline = [...localOutline];
    updatedOutline[index] = newText;
    setLocalOutline(updatedOutline);
    setOutline(updatedOutline);
  };

  const handleRemoveOutlineItem = (index: number) => {
    const updatedOutline = localOutline.filter((_, i) => i !== index);
    setLocalOutline(updatedOutline);
    setOutline(updatedOutline);
  };

  const handleGenerateSlides = async () => {
    if (localOutline.length === 0) {
      toast.error('Please add some outline items first');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate slide generation based on outline
      const generatedSlides = localOutline.map((topic, index) => ({
        id: `slide_${index + 1}`,
        content: [
          {
            type: 'h1',
            children: [{ text: topic }]
          },
          {
            type: 'p',
            children: [{ text: `Content for ${topic}. Click to edit and add your specific information.` }]
          },
          {
            type: 'ul',
            children: [
              {
                type: 'li',
                children: [{ text: 'Key point 1' }]
              },
              {
                type: 'li', 
                children: [{ text: 'Key point 2' }]
              },
              {
                type: 'li',
                children: [{ text: 'Key point 3' }]
              }
            ]
          }
        ]
      }));

      setSlides(generatedSlides);
      
      // Set presentation info
      setCurrentPresentation(
        presentationId, 
        currentPresentationTitle || presentationInput || `Presentation ${presentationId.slice(0, 8)}`
      );

      toast.success('Slides generated successfully!');
      
      // Navigate to the presentation view
      setTimeout(() => {
        navigate(`/presentation/${presentationId}`);
      }, 1000);
      
    } catch (error) {
      console.error('Error generating slides:', error);
      toast.error('Failed to generate slides');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Create Your Presentation Outline</h1>
        <p className="text-muted-foreground">
          Organize your ideas into an outline, then generate slides automatically
        </p>
        {presentationInput && (
          <Badge variant="outline" className="text-sm">
            Topic: {presentationInput}
          </Badge>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Presentation Outline
            <Button onClick={handleAddOutlineItem} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardTitle>
          <CardDescription>
            Create and organize your presentation structure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {localOutline.map((item, index) => (
            <OutlineItem
              key={index}
              text={item}
              index={index}
              onEdit={(newText) => handleEditOutlineItem(index, newText)}
              onRemove={() => handleRemoveOutlineItem(index)}
            />
          ))}
          
          {localOutline.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No outline items yet. Click "Add Item" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={handleGenerateSlides}
          disabled={isGenerating || localOutline.length === 0}
          size="lg"
          className="w-full max-w-md"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
              Generating Slides...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Slides ({localOutline.length} slides)
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

interface OutlineItemProps {
  text: string;
  index: number;
  onEdit: (newText: string) => void;
  onRemove: () => void;
}

function OutlineItem({ text, index, onEdit, onRemove }: OutlineItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    onEdit(editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <span className="text-sm text-muted-foreground font-medium min-w-[2rem]">
        {index + 1}.
      </span>
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border rounded"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            autoFocus
          />
          <Button size="sm" onClick={handleSave}>Save</Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>Cancel</Button>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-between">
          <span className="text-sm">{text}</span>
          <div className="flex items-center gap-1">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={onRemove}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}