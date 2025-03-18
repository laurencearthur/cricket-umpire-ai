
import React from 'react';
import { cn } from '@/lib/utils';
import { SampleVideo, CricketDecision } from '@/types';

interface SampleGalleryProps {
  samples: SampleVideo[];
  onSampleSelect: (videoUrl: string) => void;
}

const SampleGallery: React.FC<SampleGalleryProps> = ({ samples, onSampleSelect }) => {
  return (
    <section id="samples" className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sample Videos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test our cricket umpire AI with these pre-selected video samples
            covering different scenarios
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {samples.map((sample) => (
            <SampleCard 
              key={sample.id} 
              sample={sample} 
              onSelect={() => onSampleSelect(sample.videoUrl)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SampleCardProps {
  sample: SampleVideo;
  onSelect: () => void;
}

const getCategoryColor = (category: CricketDecision): string => {
  const colorMap: Record<CricketDecision, string> = {
    'no-ball': 'cricket-noball',
    'run-out': 'cricket-runout',
    'wide-ball': 'cricket-wide',
    'lbw': 'cricket-lbw',
    'legal-ball': 'cricket-legal'
  };
  
  return colorMap[category] || 'primary';
};

const SampleCard: React.FC<SampleCardProps> = ({ sample, onSelect }) => {
  const categoryColor = getCategoryColor(sample.category);
  
  return (
    <div 
      className={cn(
        "group relative rounded-xl overflow-hidden border border-border",
        "transition-all duration-300 ease-apple hover:border-primary/50",
        "hover:shadow-lg hover:-translate-y-1",
        "bg-white"
      )}
      onClick={onSelect}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={sample.thumbnailUrl} 
          alt={sample.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className={cn(
              "rounded-full text-xs py-1 px-3 font-medium",
              `bg-${categoryColor} text-white`
            )}>
              {sample.category.replace('-', ' ')}
            </div>
            
            <button className="rounded-full bg-white/90 backdrop-blur-sm p-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-foreground"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium mb-1">{sample.title}</h3>
        <p className="text-sm text-muted-foreground">
          {sample.description || 'Click to analyze this video clip'}
        </p>
      </div>
    </div>
  );
};

export default SampleGallery;
