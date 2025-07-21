// Stub for PresentationEditor
import React from 'react';

interface PresentationEditorProps {
  initialContent?: any;
  onChange?: (value: any, index: number) => void;
  className?: string;
  id?: string;
  autoFocus?: boolean;
  slideIndex: number;
  isGenerating: boolean;
  readOnly?: boolean;
  isPreview?: boolean;
}

const PresentationEditor = React.memo(
  ({
    initialContent,
    onChange,
    className,
    id,
    autoFocus = true,
    slideIndex,
    isGenerating = false,
    readOnly = false,
    isPreview = false,
  }: PresentationEditorProps) => {
    return (
      <div className="min-h-[500px] p-4">
        <p>Presentation Editor - Stubbed for migration</p>
        <p>Slide Index: {slideIndex}</p>
        {initialContent && <p>Has content</p>}
      </div>
    );
  }
);

PresentationEditor.displayName = "PresentationEditor";

export default PresentationEditor;