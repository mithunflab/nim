import React, { useState } from 'react';
import { UploadCloud, X, File } from 'lucide-react';
import { Button } from './button';
import { useToast } from './use-toast';

interface FileUploadProps {
  files: File[];
  setFiles: (files: File[] | ((prevFiles: File[]) => File[])) => void;
  onUpload?: (files: File[]) => void;
  isLoading: boolean;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
  info?: string;
  showUploadButton?: boolean;
}

export function FileUpload({
  files,
  setFiles,
  onUpload,
  isLoading,
  multiple = true,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = [],
  info,
  showUploadButton = true
}: FileUploadProps) {
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    if (!multiple && selectedFiles.length > 1) {
      toast({ title: "Error", description: "Only one file allowed" });
      return;
    }

    if (files.length + selectedFiles.length > maxFiles) {
      toast({ title: "Error", description: `Maximum ${maxFiles} files allowed` });
      return;
    }

    for (const file of selectedFiles) {
      if (file.size > maxSize) {
        toast({ title: "Error", description: `File too large: ${file.name}` });
        return;
      }
    }

    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(prev => prev.filter(file => file !== fileToRemove));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Drag & drop files here, or click to select
          </p>
          <input
            type="file"
            multiple={multiple}
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button variant="outline" asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Select Files
            </label>
          </Button>
          {info && <p className="text-xs text-muted-foreground">{info}</p>}
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center space-x-2">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {showUploadButton && files.length > 0 && (
        <Button onClick={() => onUpload?.(files)} disabled={isLoading} className="w-full">
          {isLoading ? "Uploading..." : "Upload Files"}
        </Button>
      )}
    </div>
  );
}

export default FileUpload;