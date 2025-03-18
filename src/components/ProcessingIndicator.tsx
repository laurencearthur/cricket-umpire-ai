
import React from 'react';
import { cn } from '@/lib/utils';
import { ProcessingStatus } from '@/types';

interface ProcessingIndicatorProps {
  status: ProcessingStatus;
}

const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({ status }) => {
  if (!status.isProcessing) return null;
  
  return (
    <div className="w-full max-w-md mx-auto mt-8 mb-4 animate-fade-in">
      <div className="glass rounded-xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium">{status.progress}%</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-2">Analyzing Video</h3>
        <p className="text-sm text-muted-foreground">
          {status.statusMessage}
        </p>
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-secondary rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300 ease-apple"
            style={{ width: `${status.progress}%` }}
          />
        </div>
        
        {/* Processing steps */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {['Preprocessing', 'Analysis', 'Decision'].map((step, index) => {
            const isActive = status.progress >= (index + 1) * 33;
            
            return (
              <div 
                key={step} 
                className={cn(
                  "text-xs rounded-md py-1.5 transition-colors",
                  isActive ? "text-primary-foreground bg-primary" : "text-muted-foreground bg-secondary"
                )}
              >
                {step}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;
