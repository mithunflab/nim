// Comprehensive stubs for all missing imports
export const useSortable = () => ({ setNodeRef: () => {}, attributes: {}, listeners: {}, transform: null, transition: null, isDragging: false });
export const CSS = { Transform: { toString: () => '' } };
export const SortableContext = ({ children }: { children: any }) => children;
export const verticalListSortingStrategy = {};
export const DndContext = ({ children }: { children: any }) => children;
export const closestCenter = () => {};
export const DragOverlay = ({ children }: { children: any }) => children;

// Next.js stubs
export const useParams = () => ({});
export const useRouter = () => ({ push: () => {}, replace: () => {} });
export const useSearchParams = () => ({ get: () => null });
export const Link = ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>;
export const Image = ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />;
export const dynamic = (fn: any) => fn;

// Other missing utilities
export const debounce = (fn: any) => fn;
export const HexColorPicker = ({ color, onChange }: any) => <input type="color" value={color} onChange={(e) => onChange(e.target.value)} />;
export const Resizable = ({ children }: { children: any }) => children;

// Action stubs
export const getCustomThemeById = () => Promise.resolve(null);
export const updatePresentationTheme = () => Promise.resolve();
export const getPresentation = () => Promise.resolve(null);
export const generateImageAction = () => Promise.resolve({ image: { url: '' } });

// ProseMirror stubs
export const EditorView = class {};
export const EditorState = class {};
export const Plugin = class {};
export const PluginKey = class {};
export const Schema = class {};

// Plate stubs
export const getMark = () => null;
export const select = () => null;
export const getParentNode = () => null;
export const insertNodes = () => {};
export const isBlock = () => false;
export const isElement = () => false;
export const isType = () => false;
export const setNodes = () => {};
