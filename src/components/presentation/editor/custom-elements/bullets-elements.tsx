// Simplified bullets element component
import React from 'react';

interface BulletsElementProps {
  children?: React.ReactNode;
  className?: string;
  element?: any;
  attributes?: any;
}

export function BulletsElement({ children, ...props }: BulletsElementProps) {
  return (
    <div className="bullets-element space-y-1" {...props}>
      {children || "Bullets Element"}
    </div>
  );
}

export default BulletsElement;