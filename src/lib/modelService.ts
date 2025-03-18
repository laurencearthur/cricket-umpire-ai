
import { CricketDecision, DecisionResult } from '@/types';

// This is a placeholder for the actual ML model integration
// In a real implementation, this would use TensorFlow.js or a similar library
// to load and run a CNN model for cricket video analysis

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Improved model processing that attempts to detect the video type
export const analyzeVideo = async (
  videoFile: File,
  onProgress: (progress: number) => void
): Promise<DecisionResult> => {
  console.log('Analyzing video:', videoFile.name);
  
  // Simulate processing steps
  for (let i = 0; i <= 100; i += 10) {
    await delay(300);
    onProgress(i);
  }
  
  // Instead of random results, try to determine based on filename patterns
  // In a real app, this would be actual CNN analysis
  let decision: CricketDecision = 'legal-ball'; // Default
  const fileName = videoFile.name.toLowerCase();
  
  if (fileName.includes('no-ball') || fileName.includes('noball')) {
    decision = 'no-ball';
  } else if (fileName.includes('run-out') || fileName.includes('runout')) {
    decision = 'run-out';
  } else if (fileName.includes('wide') || fileName.includes('wide-ball')) {
    decision = 'wide-ball';
  } else if (fileName.includes('lbw')) {
    decision = 'lbw';
  }
  
  // For demo purposes, if we can't determine from name, use the file size as a heuristic
  // This ensures consistent results for the same file
  if (decision === 'legal-ball') {
    // Use the file size to deterministically select a decision
    // This ensures the same file always gets the same result
    const fileSize = videoFile.size;
    const decisions: CricketDecision[] = ['no-ball', 'run-out', 'wide-ball', 'lbw', 'legal-ball'];
    const index = fileSize % decisions.length;
    decision = decisions[index];
  }
  
  // Generate a realistic confidence value
  const confidence = 0.75 + (Math.random() * 0.2); // Between 75% and 95%
  
  return {
    decision,
    confidence,
    timestamp: Date.now()
  };
};

// Sample videos for testing - Fixed the category type to match CricketDecision
export const getSampleVideos = () => {
  return [
    {
      id: '1',
      title: 'No Ball Example',
      thumbnailUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=500&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cricket-match-in-the-stadium-4698-large.mp4',
      category: 'no-ball' as CricketDecision,
      description: 'A clear example of a no-ball delivery'
    },
    {
      id: '2',
      title: 'Run Out Decision',
      thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=500&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-playing-cricket-4700-large.mp4',
      category: 'run-out' as CricketDecision,
      description: 'Close run out decision requiring third umpire review'
    },
    {
      id: '3',
      title: 'Wide Ball Example',
      thumbnailUrl: 'https://images.unsplash.com/photo-1595900859673-98bfc0427干a01?q=80&w=500&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coverage-of-a-cricket-match-4701-large.mp4',
      category: 'wide-ball' as CricketDecision,
      description: 'Clear wide ball delivery'
    },
    {
      id: '4',
      title: 'LBW Decision',
      thumbnailUrl: 'https://images.unsplash.com/photo-1590156534694-8194fb50d2c8?q=80&w=500&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cricket-players-in-a-field-4699-large.mp4',
      category: 'lbw' as CricketDecision,
      description: 'LBW appeal requiring detailed review'
    },
  ];
};
