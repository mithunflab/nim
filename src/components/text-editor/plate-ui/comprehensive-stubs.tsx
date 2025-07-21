import React from 'react';

// Basic stub component
const StubComponent: React.FC<any> = (props) => <div {...props} />;
const StubButtonComponent: React.FC<any> = (props) => <button {...props} />;
const StubSpanComponent: React.FC<any> = (props) => <span {...props} />;
const StubInputComponent: React.FC<any> = (props) => <input {...props} />;

// Export all missing components as stubs
export const ExcalidrawElement = StubComponent;
export const HeadingElementStatic = StubComponent;
export const HighlightLeaf = StubSpanComponent;
export const HistoryToolbarButtons = StubComponent;
export const HrElementStatic = StubComponent;
export const ImageElement = StubComponent;
export const ImageGenerationModel = StubComponent;
export const IndentListToolbarButton = StubButtonComponent;
export const IndentTodoMarkerComponent = StubComponent;
export const IndentTodoMarker = StubComponent;
export const IndentTodoToolbarButton = StubButtonComponent;
export const IndentToolbarButton = StubButtonComponent;
export const InlineCombobox = StubComponent;
export const InsertDropdownMenu = StubComponent;
export const KbdLeaf = StubSpanComponent;
export const LineHeightDropdownMenu = StubComponent;
export const LinkElementStatic = StubComponent;
export const LinkElement = StubComponent;
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
export const ParagraphElementStatic = StubComponent;
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

// Caption exports
export const CaptionTextarea = StubInputComponent;

// Default export
export default StubComponent;