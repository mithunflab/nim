import { usePresentationState } from "@/states/presentation-state";

export const getPresentation = (id: string) => {
  // For now, return mock data that works with the UI
  return Promise.resolve({
    success: true,
    presentation: {
      id,
      title: `Presentation ${id.slice(0, 8)}`,
      slides: [
        {
          id: '1',
          content: [
            {
              type: 'h1',
              children: [{ text: 'Welcome to Your Presentation' }]
            },
            {
              type: 'p', 
              children: [{ text: 'This is your first slide. Click to edit and add content.' }]
            }
          ]
        },
        {
          id: '2',
          content: [
            {
              type: 'h2',
              children: [{ text: 'Slide 2' }]
            },
            {
              type: 'p',
              children: [{ text: 'Add your content here...' }]
            }
          ]
        }
      ],
      outline: ['Introduction', 'Main Content', 'Conclusion'],
      theme: 'mystique',
      imageModel: 'stable-diffusion',
      presentationStyle: 'professional',
      language: 'en-US'
    }
  });
};

export const updatePresentationTheme = (id: string, theme: string) => Promise.resolve({
  success: true,
  message: 'Theme updated successfully'
});

export const createEmptyPresentation = (title?: string) => {
  const id = `pres_${Date.now()}`;
  return Promise.resolve({ 
    success: true,
    presentation: {
      id,
      title: title || 'Untitled Presentation',
      slides: [],
      outline: [],
      theme: 'mystique',
      imageModel: 'stable-diffusion',
      presentationStyle: 'professional',
      language: 'en-US'
    }
  });
};

export const updatePresentation = (id: string, data: any) => Promise.resolve({
  success: true,
  message: 'Presentation updated successfully'
});