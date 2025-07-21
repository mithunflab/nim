// Stub image generation action for React migration
export const generateImageAction = () => Promise.resolve({ 
  image: { 
    url: 'https://via.placeholder.com/400x300' 
  } 
});

export const ImageModelList = [
  { id: 'stable-diffusion', name: 'Stable Diffusion' },
  { id: 'dall-e', name: 'DALL-E' }
];