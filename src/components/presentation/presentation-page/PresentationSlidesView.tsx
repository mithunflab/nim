import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { usePresentationState } from '@/states/presentation-state';
import { Edit3, Save, X, Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlideChangeWatcher } from '@/hooks/presentation/useSlideChangeWatcher';

interface PresentationSlidesViewProps {
  handleSlideChange: (value: any, slideIndex: number) => void;
  isGeneratingPresentation: boolean;
}

export function PresentationSlidesView({ 
  handleSlideChange, 
  isGeneratingPresentation 
}: PresentationSlidesViewProps) {
  const { slides, setSlides, currentSlideIndex, setCurrentSlideIndex } = usePresentationState();
  const [editingSlide, setEditingSlide] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  
  // Use the slide change watcher for auto-saving
  useSlideChangeWatcher();

  const handleEditSlide = (slideIndex: number) => {
    const slide = slides[slideIndex];
    if (slide) {
      // Convert slide content to editable text
      const textContent = slide.content
        .map((node: any) => {
          if (node.type === 'h1' || node.type === 'h2' || node.type === 'h3') {
            return `# ${node.children[0]?.text || ''}`;
          }
          if (node.type === 'p') {
            return node.children[0]?.text || '';
          }
          if (node.type === 'ul') {
            return node.children
              .map((child: any) => `• ${child.children[0]?.text || ''}`)
              .join('\n');
          }
          return node.children[0]?.text || '';
        })
        .join('\n\n');
      
      setEditContent(textContent);
      setEditingSlide(slideIndex);
    }
  };

  const handleSaveSlide = (slideIndex: number) => {
    // Convert text back to slide structure
    const lines = editContent.split('\n').filter(line => line.trim());
    const content = [];
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        content.push({
          type: 'h1',
          children: [{ text: line.substring(2) }]
        });
      } else if (line.startsWith('• ')) {
        // Find existing ul or create new one
        const lastItem = content[content.length - 1];
        if (lastItem && lastItem.type === 'ul') {
          lastItem.children.push({
            type: 'li',
            children: [{ text: line.substring(2) }]
          });
        } else {
          content.push({
            type: 'ul',
            children: [{
              type: 'li',
              children: [{ text: line.substring(2) }]
            }]
          });
        }
      } else if (line.trim()) {
        content.push({
          type: 'p',
          children: [{ text: line }]
        });
      }
    }

    handleSlideChange(content, slideIndex);
    setEditingSlide(null);
    setEditContent('');
  };

  const handleCancelEdit = () => {
    setEditingSlide(null);
    setEditContent('');
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: `slide_${Date.now()}`,
      content: [
        {
          type: 'h1',
          children: [{ text: 'New Slide' }]
        },
        {
          type: 'p',
          children: [{ text: 'Add your content here...' }]
        }
      ]
    };
    
    const updatedSlides = [...slides, newSlide];
    setSlides(updatedSlides);
  };

  const handleDeleteSlide = (slideIndex: number) => {
    if (slides.length <= 1) return; // Don't delete if it's the only slide
    
    const updatedSlides = slides.filter((_, index) => index !== slideIndex);
    setSlides(updatedSlides);
    
    // Adjust current slide index if necessary
    if (currentSlideIndex >= updatedSlides.length) {
      setCurrentSlideIndex(updatedSlides.length - 1);
    }
  };

  const nextSlide = () => {
    setCurrentSlideIndex(Math.min(currentSlideIndex + 1, slides.length - 1));
  };

  const previousSlide = () => {
    setCurrentSlideIndex(Math.max(currentSlideIndex - 1, 0));
  };

  const renderSlideContent = (slide: any) => {
    return slide.content.map((node: any, nodeIndex: number) => {
      const key = `node_${nodeIndex}`;
      
      if (node.type === 'h1') {
        return (
          <h1 key={key} className="text-3xl font-bold mb-4">
            {node.children[0]?.text || ''}
          </h1>
        );
      }
      
      if (node.type === 'h2') {
        return (
          <h2 key={key} className="text-2xl font-semibold mb-3">
            {node.children[0]?.text || ''}
          </h2>
        );
      }
      
      if (node.type === 'p') {
        return (
          <p key={key} className="text-base mb-3 leading-relaxed">
            {node.children[0]?.text || ''}
          </p>
        );
      }
      
      if (node.type === 'ul') {
        return (
          <ul key={key} className="list-disc list-inside mb-3 space-y-1">
            {node.children.map((child: any, childIndex: number) => (
              <li key={childIndex} className="text-base">
                {child.children[0]?.text || ''}
              </li>
            ))}
          </ul>
        );
      }
      
      return null;
    });
  };

  if (isGeneratingPresentation) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p>Generating your presentation...</p>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="text-center space-y-4 py-12">
        <h2 className="text-2xl font-semibold">No slides yet</h2>
        <p className="text-muted-foreground">Create your first slide to get started</p>
        <Button onClick={handleAddSlide}>
          <Plus className="h-4 w-4 mr-2" />
          Add First Slide
        </Button>
      </div>
    );
  }

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="space-y-6">
      {/* Slide Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={previousSlide}
            disabled={currentSlideIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Badge variant="outline">
            Slide {currentSlideIndex + 1} of {slides.length}
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAddSlide}>
            <Plus className="h-4 w-4 mr-2" />
            Add Slide
          </Button>
          {slides.length > 1 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDeleteSlide(currentSlideIndex)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Current Slide */}
      {currentSlide && (
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Slide {currentSlideIndex + 1}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEditSlide(currentSlideIndex)}
                disabled={editingSlide === currentSlideIndex}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingSlide === currentSlideIndex ? (
              <div className="space-y-4">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Edit your slide content... Use # for headings, • for bullet points"
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="flex items-center gap-2">
                  <Button onClick={() => handleSaveSlide(currentSlideIndex)}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                {renderSlideContent(currentSlide)}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Slide Thumbnails */}
      {slides.length > 1 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">All Slides</h3>
          <div className="grid grid-cols-4 gap-4">
            {slides.map((slide, index) => (
              <Card 
                key={slide.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  index === currentSlideIndex ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCurrentSlideIndex(index)}
              >
                <CardContent className="p-3">
                  <div className="text-xs space-y-1">
                    <p className="font-medium">Slide {index + 1}</p>
                    <p className="text-muted-foreground truncate">
                      {slide.content[0]?.children[0]?.text || 'Untitled'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PresentationSlidesView;