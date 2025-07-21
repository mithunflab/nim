// Comprehensive stub for all text-editor plate-ui components
import React from 'react';

// Basic stub component that accepts any props
const StubComponent: React.FC<any> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const StubButtonComponent: React.FC<any> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

// Export all commonly used plate-ui components as stubs
export const AiLeft = StubComponent;
export const AiMenuItems = StubComponent;
export const AiMenu = StubComponent;
export const AiToolbarButton = StubButtonComponent;
export const AlignDropdownMenu = StubComponent;
export const AudioElement = StubComponent;
export const BlockContextMenu = StubComponent;
export const BlockSelection = StubComponent;
export const BlockquoteElement = StubComponent;
export const BlockquoteElementStatic = StubComponent;
export const Caption = StubComponent;
export const CodeLeaf = StubComponent;
export const CodeLineElement = StubComponent;
export const CodeLineElementStatic = StubComponent;
export const CodeSyntaxLeaf = StubComponent;
export const CodeSyntaxLeafStatic = StubComponent;
export const ColorDropdownMenu = StubComponent;
export const ColorInput = StubComponent;
export const ColorsCustom = StubComponent;
export const ColumnElement = StubComponent;
export const ColumnGroupElement = StubComponent;
export const CursorOverlay = StubComponent;
export const DateElement = StubComponent;
export const Draggable = StubComponent;
export const EditorStatic = StubComponent;
export const ExcalidrawElement = StubComponent;
export const FloatingToolbar = StubComponent;
export const FloatingToolbarButtons = StubComponent;
export const FontFamilyToolbarButton = StubButtonComponent;
export const FontSizeInput = StubComponent;
export const HeadingElement = StubComponent;
export const HeadingElementStatic = StubComponent;
export const HighlightLeaf = StubComponent;
export const HistoryToolbarButtons = StubComponent;
export const HrElement = StubComponent;
export const HrElementStatic = StubComponent;
export const ImageElement = StubComponent;
export const ImageGenerationModel = StubComponent;
export const IndentListToolbarButton = StubButtonComponent;
export const IndentTodoMarker = StubComponent;
export const IndentTodoMarkerComponent = StubComponent;
export const IndentTodoToolbarButton = StubButtonComponent;
export const IndentToolbarButton = StubButtonComponent;
export const InlineCombobox = StubComponent;
export const InsertDropdownMenu = StubComponent;
export const KbdLeaf = StubComponent;
export const LineHeightDropdownMenu = StubComponent;
export const LinkElement = StubComponent;
export const LinkElementStatic = StubComponent;
export const LinkFloatingToolbar = StubComponent;
export const LinkToolbarButton = StubButtonComponent;
export const ListElement = StubComponent;
export const ListIndentToolbarButton = StubButtonComponent;
export const ListToolbarButton = StubButtonComponent;
export const MarkToolbarButton = StubButtonComponent;
export const MediaPopover = StubComponent;
export const MediaUploadToast = StubComponent;
export const MentionElement = StubComponent;
export const ModeDropdownMenu = StubComponent;
export const MoreDropdownMenu = StubComponent;
export const OutdentToolbarButton = StubButtonComponent;
export const ParagraphElement = StubComponent;
export const ParagraphElementStatic = StubComponent;
export const PlateElement = StubComponent;
export const SearchHighlightLeaf = StubComponent;
export const SlashInputElement = StubComponent;
export const TableCellElement = StubComponent;
export const TableDropdownMenu = StubComponent;
export const TableElement = StubComponent;
export const TableRowElement = StubComponent;
export const TagElement = StubComponent;
export const TocElement = StubComponent;
export const TodoListElement = StubComponent;
export const ToggleElement = StubComponent;
export const ToggleToolbarButton = StubButtonComponent;
export const TurnIntoDropdownMenu = StubComponent;

// Export default for modules that need it
export default StubComponent;