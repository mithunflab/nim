// Simple stub replacements for all custom elements
import React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  element?: any;
  attributes?: any;
  index?: number;
}

// Replace all remaining problematic components with stubs
export function GeneratingLeaf({ children, ...props }: BaseProps) {
  return <span className="animate-pulse" {...props}>{children || "Generating..."}</span>;
}

export function IconItem({ children, ...props }: BaseProps) {
  return <div className="flex items-center gap-2 p-2" {...props}>🔖 {children}</div>;
}

export function IconElement({ children, ...props }: BaseProps) {
  return <span {...props}>{children || "📋"}</span>;
}

export function IconsElement({ children, ...props }: BaseProps) {
  return <div className="flex gap-2" {...props}>{children}</div>;
}

export function PyramidItem({ children, ...props }: BaseProps) {
  return <div className="p-2 border" {...props}>{children || "Pyramid Item"}</div>;
}

export function StaircaseElement({ children, ...props }: BaseProps) {
  return <div className="space-y-2" {...props}>{children}</div>;
}

export function StaircaseItem({ children, ...props }: BaseProps) {
  return <div className="p-2 ml-4 border-l" {...props}>{children}</div>;
}

export function TimelineItem({ children, ...props }: BaseProps) {
  return (
    <div className="flex gap-4 p-2" {...props}>
      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
      <div>{children}</div>
    </div>
  );
}

export function VisualizationItemElement({ children, ...props }: BaseProps) {
  return <div className="p-2 border rounded" {...props}>{children}</div>;
}

export function VisualizationListElement({ children, ...props }: BaseProps) {
  return <div className="space-y-2" {...props}>{children}</div>;
}

// Plugin stubs
export const VisualizationItemPlugin = () => null;
export const VisualizationListPlugin = () => null;
export const VISUALIZATION_ITEM_ELEMENT = 'visualization_item';

// DND stub
export function LayoutImageDrop({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}