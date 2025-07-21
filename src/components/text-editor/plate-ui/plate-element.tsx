import React from 'react';

export const PlateElement = React.forwardRef<HTMLDivElement, any>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  },
);

PlateElement.displayName = "PlateElement";

export const BlockSelection: React.FC<any> = (props) => <div {...props} />;

export default PlateElement;
