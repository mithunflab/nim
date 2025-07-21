// Comprehensive stub exports for all editor components
import React from 'react';

// DND Components and Hooks
export function LayoutImageDrop({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export const useDndNode = () => ({});
export const useDragNode = () => ({});
export const useDraggable = () => ({});
export const useDropLine = () => ({});
export const useDropNode = () => ({});
export const onDropNode = () => {};
export const onHoverNode = () => {};
export const getHoverDirection = () => null;
export const getNewDirection = () => null;

// Native Elements
export function EditorStatic({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function PresentationElement({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function PresentationImageEditor({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function PresentationImageElement({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function PresentationLeafElement({ children }: { children?: React.ReactNode }) {
  return <span>{children}</span>;
}

export function PresentationParagraphElement({ children }: { children?: React.ReactNode }) {
  return <p>{children}</p>;
}

export function RootImage({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

// Plugin stubs
export const BulletPlugin = () => null;
export const BulletsPlugin = () => null;
export const StaircasePlugin = () => null;
export const StairItemPlugin = () => null;
export const CycleItemPlugin = () => null;
export const CyclePlugin = () => null;
export const PyramidItemPlugin = () => null;
export const IconPlugin = () => null;
export const IconsPlugin = () => null;
export const TimelineItemPlugin = () => null;

// Export all plugins as an empty array
export const plugins: any[] = [];
export default plugins;