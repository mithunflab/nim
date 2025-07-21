// This file replaces all problematic plate-ui files with stubs
import React from 'react';

// Basic stubs
const Stub: React.FC<any> = (props) => <div {...props} />;
const StubButton: React.FC<any> = (props) => <button {...props} />;
const StubSpan: React.FC<any> = (props) => <span {...props} />;
const StubInput: React.FC<any> = (props) => <input {...props} />;

// Re-export all components as stubs
export * from './comprehensive-stubs';

// Specific named exports that are commonly imported
export {
  Stub as ExcalidrawElement,
  Stub as HeadingElementStatic,
  StubSpan as HighlightLeaf,
  Stub as HistoryToolbarButtons,
  Stub as HrElementStatic,
  Stub as ImageElement,
  Stub as ImageGenerationModel,
  StubButton as IndentListToolbarButton,
  Stub as IndentTodoMarkerComponent,
  Stub as IndentTodoMarker,
  StubButton as IndentTodoToolbarButton,
  StubButton as IndentToolbarButton,
  Stub as InlineCombobox,
  Stub as InsertDropdownMenu,
  StubSpan as KbdLeaf,
  Stub as LineHeightDropdownMenu,
  Stub as LinkElementStatic,
  Stub as LinkElement,
  Stub as LinkFloatingToolbar,
  StubButton as LinkToolbarButton,
  Stub as ListElement,
  StubButton as ListIndentToolbarButton,
  StubButton as ListToolbarButton,
  StubButton as MarkToolbarButton,
  Stub as MediaPopover,
  Stub as MediaUploadToast,
  Stub as MentionElement,
  Stub as ModeDropdownMenu,
  Stub as MoreDropdownMenu,
  StubButton as OutdentToolbarButton,
  Stub as ParagraphElementStatic,
  Stub as SlashInputElement,
  Stub as TableCellElement,
  Stub as TableDropdownMenu,
  Stub as TableElement,
  Stub as TableRowElement,
  Stub as TagElement,
  Stub as TocElement,
  Stub as TodoListElement,
  Stub as ToggleElement,
  StubButton as ToggleToolbarButton,
  Stub as TurnIntoDropdownMenu,
  StubInput as CaptionTextarea
};

export default Stub;