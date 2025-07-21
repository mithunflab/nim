// Stub implementation for uploadthing
export const useUploadThing = (endpoint: string) => ({
  startUpload: async (files: File[]) => {
    // Stub implementation
    return Promise.resolve([]);
  },
  isUploading: false,
});

export const uploadFiles = async (endpoint: string, files: File[]) => {
  // Stub implementation
  return Promise.resolve([]);
};
