
import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import VideoUpload from '@/components/VideoUpload';
import ProcessingIndicator from '@/components/ProcessingIndicator';
import ResultDisplay from '@/components/ResultDisplay';
import SampleGallery from '@/components/SampleGallery';
import Footer from '@/components/Footer';
import { DecisionResult, ProcessingStatus } from '@/types';
import { analyzeVideo, getSampleVideos } from '@/lib/modelService';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    progress: 0,
    statusMessage: ''
  });
  const [result, setResult] = useState<DecisionResult | null>(null);
  const sampleVideos = getSampleVideos();

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
  
  const handleSampleSelect = useCallback((videoUrl: string) => {
    // Create a file object from the video URL
    fetch(videoUrl)
      .then(response => response.blob())
      .then(blob => {
        const file = new File([blob], "sample-video.mp4", { type: "video/mp4" });
        handleVideoSelected(file);
      })
      .catch(error => {
        console.error('Error loading sample video:', error);
        toast({
          variant: "destructive",
          title: "Sample Load Failed",
          description: "Failed to load the sample video. Please try another one.",
        });
      });
  }, [handleVideoSelected]);
  
  const resetAnalysis = useCallback(() => {
    setResult(null);
    setProcessingStatus({
      isProcessing: false,
      progress: 0,
      statusMessage: ''
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20 -z-10" />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-block mb-4 rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                Powered by CNN Technology
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Cricket Umpire <span className="text-primary">AI</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Instant, accurate cricket decisions powered by advanced computer vision and neural networks.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="#upload"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-6 py-3 bg-primary text-primary-foreground shadow hover:bg-primary/90"
                >
                  Upload Video
                </a>
                <a 
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-6 py-3 bg-secondary text-secondary-foreground shadow hover:bg-secondary/90"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upload Section */}
        <section id="upload" className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Analyze Your Cricket Footage</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Upload your cricket video and our AI will automatically categorize it as no-ball, run-out, 
                wide-ball, LBW, or legal delivery with high accuracy.
              </p>
            </div>
            
            <VideoUpload 
              onVideoSelected={handleVideoSelected}
              disabled={processingStatus.isProcessing}
            />
            
            <ProcessingIndicator status={processingStatus} />
            
            <ResultDisplay result={result} onReset={resetAnalysis} />
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-16 px-4 sm:px-6 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our advanced AI system processes cricket footage using state-of-the-art computer vision techniques
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Video Analysis",
                  description: "Our system extracts key frames from your cricket video and preprocesses them for optimal analysis.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v.643a1 1 0 0 0 .383.784l9 7.2a1 1 0 0 0 1.234 0l9-7.2A1 1 0 0 0 22 9.643V9Z" />
                      <path d="M21 16V7a1 1 0 0 0-1-1h-3.5l-1-2H9.5L8.5 6H5a1 1 0 0 0-1 1v9l9 6 8-6Z" />
                    </svg>
                  )
                },
                {
                  title: "CNN Processing",
                  description: "A Convolutional Neural Network trained on thousands of cricket scenarios analyzes the visual data.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6" />
                      <path d="m9 5 7 7-7 7" />
                    </svg>
                  )
                },
                {
                  title: "Decision Making",
                  description: "The AI applies cricket rules and generates a decision with confidence score based on the analysis.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20" />
                      <path d="M2 12h20" />
                      <path d="M7 2h10" />
                      <path d="M7 22h10" />
                      <path d="M22 7v10" />
                      <path d="M2 7v10" />
                    </svg>
                  )
                }
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-xl border border-border p-6 transition-all duration-300 ease-apple hover:shadow-md">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <div className="text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Sample Gallery */}
        <SampleGallery 
          samples={sampleVideos}
          onSampleSelect={handleSampleSelect}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
