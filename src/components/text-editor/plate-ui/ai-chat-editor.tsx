// Stub AI Chat Editor for migration
import React from 'react';

export const AiChatEditor: React.FC<any> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

export const AIChatEditor = AiChatEditor; // Alias for compatibility

export default AiChatEditor;