// Comprehensive stubs for Plate editor components during migration

import React from 'react';

// Basic stub component
const StubComponent = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

// Export all the Plate editor stubs
export const PlateProvider = StubComponent;
export const Plate = StubComponent;
export const PlateEditor = StubComponent;
export const createPlateEditor = () => null;
export const createPlugins = () => [];
export const SlateEditor = {};
export const BaseParagraphPlugin = {};
export const SlateLeaf = StubComponent;

// Hook stubs
export const useEditorRef = () => null;
export const usePlateEditor = () => null;
export const useEditorState = () => null;
export const useElement = () => ({});
export const useSelected = () => false;
export const useFocused = () => false;
export const useReadOnly = () => false;

// Utility function stubs
export const getMark = () => null;
export const select = () => null;
export const getParentNode = () => null;
export const insertNodes = () => null;
export const isBlock = () => false;
export const isElement = () => false;
export const isType = () => false;
export const setNodes = () => null;

// Plugin stubs
export const withProps = () => StubComponent;
export const createPluginFactory = () => () => ({});

// AI plugin stubs
export const AiPlugin = {};
export const useAIState = () => ({ isOpen: false });

export default StubComponent;