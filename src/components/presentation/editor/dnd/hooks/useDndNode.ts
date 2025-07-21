// Stub for useDndNode
export const useDndNode = () => ({
  dragRef: () => {},
  isDragging: false,
  isOver: false,
});

export interface UseDndNodeOptions {
  element?: any;
  nodeRef?: any;
  onDropHandler?: any;
}