// Stub actions for React migration
export const getCustomThemeById = () => Promise.resolve(null);
export const updatePresentationTheme = () => Promise.resolve();
export const getPresentation = () => Promise.resolve(null);
export const generateImageAction = () => Promise.resolve({ image: { url: '' } });
export const createCustomTheme = () => Promise.resolve({ 
  success: true, 
  id: 'new-theme',
  message: 'Theme created successfully'
});
export const getUserCustomThemes = () => Promise.resolve({ 
  success: true, 
  themes: [] 
});
export const getPublicCustomThemes = () => Promise.resolve({ 
  success: true, 
  themes: [] 
});