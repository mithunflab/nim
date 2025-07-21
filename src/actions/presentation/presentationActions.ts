import { mockApi } from '@/lib/mock-data';

export const createEmptyPresentation = mockApi.createEmptyPresentation;
export const deletePresentation = mockApi.deletePresentation;

// Add updatePresentation function
export const updatePresentation = async (data: any) => {
  console.log('Updating presentation:', data);
  return { success: true };
};