// Mass stub replacement for all remaining text-editor plate-ui components
import React from 'react';

// Basic stub components for all missing plate-ui components
const StubDiv: React.FC<any> = ({ children, ...props }) => <div {...props}>{children}</div>;
const StubButton: React.FC<any> = ({ children, ...props }) => <button {...props}>{children}</button>;
const StubInput: React.FC<any> = ({ ...props }) => <input {...props} />;
const StubSpan: React.FC<any> = ({ children, ...props }) => <span {...props}>{children}</span>;

export { StubDiv as BlockquoteElementStatic };
export { StubDiv as Caption };
export { StubSpan as CodeLeaf };
export { StubDiv as CodeLineElementStatic };
export { StubSpan as CodeSyntaxLeafStatic };
export { StubSpan as CodeSyntaxLeaf };
export { StubDiv as ColorDropdownMenu };
export { StubInput as ColorInput };
export { StubDiv as ColorsCustom };
export { StubDiv as ColumnElement };
export { StubDiv as ColumnGroupElement };
export { StubDiv as CursorOverlay };
export { StubDiv as DateElement };
export { StubDiv as Draggable };
export { StubDiv as EditorStatic };
export { StubDiv as ExcalidrawElement };
export { StubDiv as FloatingToolbar };
export { StubDiv as FloatingToolbarButtons };
export { StubButton as FontFamilyToolbarButton };
export { StubDiv as FontLoader };
export { StubInput as FontSizeInput };
export { StubDiv as HeadingElement };
export { StubDiv as HeadingElementStatic };
export { StubSpan as HighlightLeaf };
export { StubDiv as HistoryToolbarButtons };
export { StubDiv as HrElement };
export { StubDiv as HrElementStatic };
export { StubDiv as ImageElement };
export { StubDiv as ImageGenerationModel };
export { StubButton as IndentListToolbarButton };
export { StubDiv as IndentTodoMarker };
export { StubDiv as IndentTodoMarkerComponent };
export { StubButton as IndentTodoToolbarButton };
export { StubButton as IndentToolbarButton };
export { StubDiv as InlineCombobox };
export { StubDiv as InsertDropdownMenu };
export { StubSpan as KbdLeaf };
export { StubDiv as LineHeightDropdownMenu };
export { StubSpan as LinkElement };
export { StubSpan as LinkElementStatic };
export { StubDiv as LinkFloatingToolbar };
export { StubButton as LinkToolbarButton };
export { StubDiv as ListElement };
export { StubButton as ListIndentToolbarButton };
export { StubButton as ListToolbarButton };
export { StubButton as MarkToolbarButton };
export { StubDiv as MediaPopover };
export { StubDiv as MediaUploadToast };
export { StubSpan as MentionElement };
export { StubDiv as ModeDropdownMenu };
export { StubDiv as MoreDropdownMenu };
export { StubButton as OutdentToolbarButton };
export { StubDiv as ParagraphElement };
export { StubDiv as ParagraphElementStatic };
export { StubDiv as PlateElement };
export { StubSpan as SearchHighlightLeaf };
export { StubDiv as SlashInputElement };
export { StubDiv as TableCellElement };
export { StubDiv as TableDropdownMenu };
export { StubDiv as TableElement };
export { StubDiv as TableRowElement };
export { StubSpan as TagElement };
export { StubDiv as TocElement };
export { StubDiv as TodoListElement };
export { StubDiv as ToggleElement };
export { StubButton as ToggleToolbarButton };
export { StubDiv as TurnIntoDropdownMenu };

// Additional exports for compatibility
export { StubButton as AIToolbarButton }; // Alias for naming compatibility
export const useFontSizeDropdownMenu = () => ({ radioGroupProps: {}, checkboxItemProps: () => ({}) });

export default StubDiv;