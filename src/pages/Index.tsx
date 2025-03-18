
import React, { useState, useCallback } from 'react';
import VideoUpload from '@/components/VideoUpload';
import ProcessingIndicator from '@/components/ProcessingIndicator';
import ResultDisplay from '@/components/ResultDisplay';
import { DecisionResult, ProcessingStatus } from '@/types';
import { analyzeVideo } from '@/lib/modelService';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    progress: 0,
    statusMessage: ''
  });
  const [result, setResult] = useState<DecisionResult | null>(null);

  const processStatusMessages = [
    'Extracting video frames...',
    'Preprocessing frames for analysis...',
    'Running through CNN model...',
    'Analyzing player movements...',
    'Determining ball trajectory...',
    'Applying decision rules...',
    'Generating final decision...'
  ];

  const handleVideoSelected = useCallback(async (file: File) => {
    try {
      // Reset previous results
      setResult(null);
      
      // Start processing
      setProcessingStatus({
        isProcessing: true,
        progress: 0,
        statusMessage: processStatusMessages[0]
      });
      
      // Process video with the CNN model
      const result = await analyzeVideo(file, (progress) => {
        // Update progress and status message
        const messageIndex = Math.min(
          Math.floor((progress / 100) * processStatusMessages.length),
          processStatusMessages.length - 1
        );
        
        setProcessingStatus({
          isProcessing: true,
          progress,
          statusMessage: processStatusMessages[messageIndex]
        });
      });
      
      // Processing complete
      setProcessingStatus({
        isProcessing: false,
        progress: 100,
        statusMessage: 'Analysis complete'
      });
      
      // Show result
      setResult(result);
      
      // Show success notification
      toast({
        title: "Analysis Complete",
        description: "Your cricket video has been successfully analyzed.",
      });
      
    } catch (error) {
      console.error('Error processing video:', error);
      
      // Reset processing state
      setProcessingStatus({
        isProcessing: false,
        progress: 0,
        statusMessage: ''
      });
      
      // Show error notification
      toast({
        variant: "destructive",
        title: "Processing Failed",
        description: "An error occurred while analyzing the video. Please try again.",
      });
    }
  }, []);
  
  const resetAnalysis = useCallback(() => {
    setResult(null);
    setProcessingStatus({
      isProcessing: false,
      progress: 0,
      statusMessage: ''
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-background">
      <main className="flex-1 max-w-3xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Cricket Umpire <span className="text-primary">AI</span>
          </h1>
          <p className="text-muted-foreground">
            Upload your cricket video for instant decision analysis
          </p>
        </div>
        
        <div className="space-y-10">
          <VideoUpload 
            onVideoSelected={handleVideoSelected}
            disabled={processingStatus.isProcessing}
          />
          
          <ProcessingIndicator status={processingStatus} />
          
          <ResultDisplay result={result} onReset={resetAnalysis} />
        </div>
      </main>
    </div>
  );
};

export default Index;
