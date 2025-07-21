// Simplified arrow item component
import React from 'react';

interface ArrowItemProps {
  children?: React.ReactNode;
  className?: string;
  element?: any;
  attributes?: any;
}

export function ArrowItem({ children, ...props }: ArrowItemProps) {
  return (
    <div className="arrow-item p-2 border rounded" {...props}>
      {children || "Arrow Item"}
    </div>
  );
}

export default ArrowItem;