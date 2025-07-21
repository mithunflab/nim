// Mock data and types for the presentation system

export interface Presentation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  content?: any;
  isFavorite?: boolean;
}

// Mock presentations data
const mockPresentations: Presentation[] = [
  {
    id: '1',
    title: 'Sample Presentation 1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    userId: '1',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Sample Presentation 2',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    userId: '1',
    isFavorite: true,
  },
];

// Mock API functions
export const mockApi = {
  async createEmptyPresentation(title: string): Promise<{ success: boolean; presentation?: Presentation; message?: string }> {
    const newPresentation: Presentation = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
      isFavorite: false,
    };
    
    mockPresentations.push(newPresentation);
    
    return {
      success: true,
      presentation: newPresentation,
    };
  },

  async fetchPresentations(): Promise<Presentation[]> {
    return mockPresentations;
  },

  async toggleFavorite(id: string): Promise<{ success: boolean }> {
    const presentation = mockPresentations.find(p => p.id === id);
    if (presentation) {
      presentation.isFavorite = !presentation.isFavorite;
    }
    return { success: true };
  },

  async deletePresentation(id: string): Promise<{ success: boolean }> {
    const index = mockPresentations.findIndex(p => p.id === id);
    if (index > -1) {
      mockPresentations.splice(index, 1);
    }
    return { success: true };
  },
};