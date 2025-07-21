// Simplified bullet item component
import React from 'react';

interface BulletItemProps {
  children?: React.ReactNode;
  className?: string;
  element?: any;
  attributes?: any;
}

export function BulletItem({ children, ...props }: BulletItemProps) {
  return (
    <div className="bullet-item flex items-center gap-2 p-2" {...props}>
      <span>•</span>
      {children || "Bullet Item"}
    </div>
  );
}

export default BulletItem;