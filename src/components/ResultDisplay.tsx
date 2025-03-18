
import React from 'react';
import { cn } from '@/lib/utils';
import { DecisionResult, CricketDecision } from '@/types';

interface ResultDisplayProps {
  result: DecisionResult | null;
  onReset: () => void;
}

const decisionConfig: Record<CricketDecision, { label: string, color: string, description: string }> = {
  'no-ball': { 
    label: 'No Ball', 
    color: 'cricket-noball',
    description: 'The bowler has overstepped the crease or delivered an illegal ball height.'
  },
  'run-out': { 
    label: 'Run Out', 
    color: 'cricket-runout',
    description: 'The batsman was out of their crease when the stumps were broken.'
  },
  'wide-ball': { 
    label: 'Wide Ball', 
    color: 'cricket-wide',
    description: 'The ball was delivered too wide of the batsman to play a normal stroke.'
  },
  'lbw': { 
    label: 'LBW', 
    color: 'cricket-lbw',
    description: 'Leg Before Wicket - the ball would have hit the stumps if not for the batsman\'s leg.'
  },
  'legal-ball': { 
    label: 'Legal Delivery', 
    color: 'cricket-legal',
    description: 'The delivery meets all the criteria for a legal ball.'
  }
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  if (!result) return null;
  
  const config = decisionConfig[result.decision];
  const confidencePercent = Math.round(result.confidence * 100);
  
  return (
    <div className="w-full max-w-md mx-auto mt-8 animate-slide-up">
      <div className={cn(
        "rounded-xl p-6 text-center bg-white border backdrop-blur-md overflow-hidden",
        "transition-all duration-500 ease-apple",
        `border-${config.color}/30`,
      )}>
        <div className="relative">
          {/* Result tag */}
          <div className={cn(
            "absolute -top-6 -right-6 w-24 h-24 flex items-center justify-center",
            `bg-${config.color}`,
            "rotate-45 transform origin-bottom-left"
          )}>
          </div>
          
          <div className="relative">
            {/* Decision badge */}
            <div className={cn(
              "inline-block mb-4 rounded-full py-1 px-4 text-sm font-medium",
              `bg-${config.color}/10 text-${config.color}`,
              "border border-current"
            )}>
              {config.label}
            </div>
            
            <h2 className="text-2xl font-bold mb-2">{config.label}</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {config.description}
            </p>
            
            {/* Confidence meter */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">Confidence</span>
                <span className="text-xs font-medium">{confidencePercent}%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    `bg-${config.color}`
                  )}
                  style={{ width: `${confidencePercent}%` }}
                />
              </div>
            </div>
            
            {/* Timestamp */}
            <div className="text-xs text-muted-foreground mb-6">
              Analysis completed at {new Date(result.timestamp).toLocaleTimeString()}
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={onReset}
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium",
                  "transition-colors focus-visible:outline-none focus-visible:ring-1",
                  "focus-visible:ring-ring px-4 py-2",
                  "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                Analyze Another Video
              </button>
              
              <button
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium",
                  "transition-colors focus-visible:outline-none focus-visible:ring-1",
                  "focus-visible:ring-ring px-4 py-2",
                  `bg-${config.color} text-white hover:bg-${config.color}/90`,
                )}
              >
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
