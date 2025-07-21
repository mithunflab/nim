// Stub for LayoutImageDrop
import React from 'react';

export function LayoutImageDrop({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export default function LayoutImageDropDefault({
  slideIndex,
}: {
  slideIndex: number;
}) {
  return <LayoutImageDrop />;
}