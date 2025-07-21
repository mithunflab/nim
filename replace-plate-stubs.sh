#!/bin/bash
# Script to replace all problematic plate-ui files with stubs

# Define the base directory
BASE_DIR="src/components/text-editor/plate-ui"

# Array of all problematic files that need stub replacements
declare -a FILES=(
    "highlight-leaf"
    "history-toolbar-buttons"
    "hr-element-static"
    "image-element"
    "image-generation-model"
    "indent-list-toolbar-button"
    "indent-todo-marker-component"
    "indent-todo-marker"
    "indent-todo-toolbar-button"
    "indent-toolbar-button"
    "inline-combobox"
    "insert-dropdown-menu"
    "kbd-leaf"
    "line-height-dropdown-menu"
    "link-element-static"
    "link-element"
    "link-floating-toolbar"
    "link-toolbar-button"
    "list-element"
    "list-indent-toolbar-button"
    "list-toolbar-button"
    "mark-toolbar-button"
    "media-popover"
    "media-upload-toast"
    "mention-element"
    "mode-dropdown-menu"
    "more-dropdown-menu"
    "outdent-toolbar-button"
    "paragraph-element-static"
    "slash-input-element"
    "table-cell-element"
    "table-dropdown-menu"
    "table-element"
    "table-row-element"
    "tag-element"
    "toc-element"
    "todo-list-element"
    "toggle-element"
    "toggle-toolbar-button"
    "turn-into-dropdown-menu"
)

# This script would replace all files with simple stub implementations
# Each file would contain a basic React component that accepts any props