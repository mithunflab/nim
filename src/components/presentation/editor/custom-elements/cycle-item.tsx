// Simplified cycle item component
import React from 'react';

interface CycleItemProps {
  children?: React.ReactNode;
  className?: string;
  element?: any;
  attributes?: any;
}

export function CycleItem({ children, ...props }: CycleItemProps) {
  return (
    <div className="cycle-item p-2 border-l-2" {...props}>
      {children || "Cycle Item"}
    </div>
  );
}

export default CycleItem;