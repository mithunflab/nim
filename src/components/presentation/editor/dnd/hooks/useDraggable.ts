// Stub for useDraggable
import React from "react";

export type DraggableState = {
  isDragging: boolean;
  previewRef: React.RefObject<HTMLDivElement | null>;
  handleRef: any;
};

export const useDraggable = (): DraggableState => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  
  return {
    isDragging: false,
    previewRef: nodeRef,
    handleRef: () => {},
  };
};
