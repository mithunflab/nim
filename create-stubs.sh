#!/bin/bash
# This script creates stub files for all plate-ui components to fix the migration

# Create comprehensive stubs for all remaining files
cat > "src/components/text-editor/plate-ui/blockquote-element-static.tsx" << 'EOF'
import React from 'react';
export const BlockquoteElementStatic: React.FC<any> = (props) => <blockquote {...props} />;
export default BlockquoteElementStatic;
EOF

cat > "src/components/text-editor/plate-ui/caption.tsx" << 'EOF'
import React from 'react';
export const Caption: React.FC<any> = (props) => <div {...props} />;
export default Caption;
EOF

cat > "src/components/text-editor/plate-ui/code-leaf.tsx" << 'EOF'
import React from 'react';
export const CodeLeaf: React.FC<any> = (props) => <code {...props} />;
export default CodeLeaf;
EOF

cat > "src/components/text-editor/plate-ui/code-line-element-static.tsx" << 'EOF'
import React from 'react';
export const CodeLineElementStatic: React.FC<any> = (props) => <div {...props} />;
export default CodeLineElementStatic;
EOF

cat > "src/components/text-editor/plate-ui/code-syntax-leaf-static.tsx" << 'EOF'
import React from 'react';
export const CodeSyntaxLeafStatic: React.FC<any> = (props) => <span {...props} />;
export default CodeSyntaxLeafStatic;
EOF

echo "Stub files created successfully"