
import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

interface VideoUploadProps {
  onVideoSelected: (file: File) => void;
  disabled?: boolean;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ 
  onVideoSelected,
  disabled = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        processVideo(file);
      }
    }
  }, [onVideoSelected]);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processVideo(e.target.files[0]);
    }
  }, [onVideoSelected]);
  
  const processVideo = (file: File) => {
    setVideoPreview(URL.createObjectURL(file));
    onVideoSelected(file);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div 
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 text-center",
          "transition-all duration-300 ease-apple",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          "overflow-hidden"
        )}
        onDragOver={!disabled ? handleDragOver : undefined}
        onDragLeave={!disabled ? handleDragLeave : undefined}
        onDrop={!disabled ? handleDrop : undefined}
      >
        {videoPreview ? (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <video 
              src={videoPreview} 
              className="w-full h-full object-cover" 
              controls 
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 rounded-full bg-secondary p-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-foreground"
                >
                  <path d="m13 2-2 2h-6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6l-2-2z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">Upload cricket video</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                Drag and drop your cricket video here, or click to browse
              </p>
              <div className="space-y-2">
                <button
                  className={cn(
                    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium",
                    "bg-primary text-primary-foreground shadow transition-colors",
                    "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1",
                    "focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  )}
                  disabled={disabled}
                >
                  Select Video
                </button>
                <p className="text-xs text-muted-foreground">
                  MP4, WebM or MOV. Max 50MB.
                </p>
              </div>
            </div>

            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              accept="video/*"
              onChange={handleFileChange}
              disabled={disabled}
            />
          </>
        )}
      </div>
      
      {videoPreview && (
        <div className="mt-4 text-center">
          <button
            className={cn(
              "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium",
              "bg-secondary text-secondary-foreground shadow transition-colors",
              "hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1",
              "focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            )}
            onClick={() => {
              setVideoPreview(null);
            }}
            disabled={disabled}
          >
            Change Video
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
