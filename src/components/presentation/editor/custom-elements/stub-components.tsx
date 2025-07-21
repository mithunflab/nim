// Temporary stub components to replace complex Plate editor components
// These components provide basic functionality without the full Plate ecosystem

interface StubItemProps {
  children?: React.ReactNode;
  className?: string;
  element?: any;
  attributes?: any;
}

export function ArrowItem({ children, ...props }: StubItemProps) {
  return (
    <div className="arrow-item p-2 border rounded" {...props}>
      {children || "Arrow Item"}
    </div>
  );
}

export function BulletItem({ children, ...props }: StubItemProps) {
  return (
    <div className="bullet-item flex items-center gap-2 p-2" {...props}>
      <span>•</span>
      {children || "Bullet Item"}
    </div>
  );
}

export function BulletsElement({ children, ...props }: StubItemProps) {
  return (
    <div className="bullets-element space-y-1" {...props}>
      {children || "Bullets Element"}
    </div>
  );
}

export function CycleElement({ children, ...props }: StubItemProps) {
  return (
    <div className="cycle-element border rounded p-4" {...props}>
      {children || "Cycle Element"}
    </div>
  );
}

export function CycleItem({ children, ...props }: StubItemProps) {
  return (
    <div className="cycle-item p-2 border-l-2" {...props}>
      {children || "Cycle Item"}
    </div>
  );
}

export function GeneratingLeaf({ children, ...props }: StubItemProps) {
  return (
    <span className="generating-leaf animate-pulse" {...props}>
      {children || "Generating..."}
    </span>
  );
}

export function IconItem({ children, ...props }: StubItemProps) {
  return (
    <div className="icon-item flex items-center gap-2 p-2" {...props}>
      <span>🔖</span>
      {children || "Icon Item"}
    </div>
  );
}

export function IconElement({ children, ...props }: StubItemProps) {
  return (
    <div className="icon-element inline-flex items-center" {...props}>
      {children || "📋"}
    </div>
  );
}

export function IconsElement({ children, ...props }: StubItemProps) {
  return (
    <div className="icons-element flex gap-2" {...props}>
      {children || "Icons Element"}
    </div>
  );
}

export function PyramidItem({ children, ...props }: StubItemProps) {
  return (
    <div className="pyramid-item p-2 border" {...props}>
      {children || "Pyramid Item"}
    </div>
  );
}

export function StaircaseElement({ children, ...props }: StubItemProps) {
  return (
    <div className="staircase-element space-y-2" {...props}>
      {children || "Staircase Element"}
    </div>
  );
}

export function StaircaseItem({ children, ...props }: StubItemProps) {
  return (
    <div className="staircase-item p-2 ml-4 border-l" {...props}>
      {children || "Staircase Item"}
    </div>
  );
}

export function TimelineItem({ children, ...props }: StubItemProps) {
  return (
    <div className="timeline-item flex gap-4 p-2" {...props}>
      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
      <div>{children || "Timeline Item"}</div>
    </div>
  );
}

// Plugin stubs
export function VisualizationItemPlugin() {
  return null;
}

export function VisualizationListPlugin() {
  return null;
}