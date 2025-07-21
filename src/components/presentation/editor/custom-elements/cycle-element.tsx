// Simplified cycle element component
import React from 'react';

interface CycleElementProps {
  children?: React.ReactNode;
  className?: string;
  element?: any;
  attributes?: any;
}

export function CycleElement({ children, ...props }: CycleElementProps) {
  return (
    <div className="cycle-element border rounded p-4" {...props}>
      {children || "Cycle Element"}
    </div>
  );
}

export default CycleElement;