
import React from 'react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 backdrop-blur-lg border-b border-border/40 bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m14.5 12.5-3-1V7" />
            </svg>
          </div>
          <h1 className="text-lg sm:text-xl font-medium">Cricket Umpire AI</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-apple">Home</a>
          <a href="#how-it-works" className="text-sm text-foreground/80 hover:text-foreground transition-apple">How It Works</a>
          <a href="#samples" className="text-sm text-foreground/80 hover:text-foreground transition-apple">Samples</a>
        </nav>
        
        <div className="flex items-center gap-2">
          <button
            className={cn(
              "relative inline-flex h-9 items-center rounded-md px-4 py-2",
              "bg-primary text-primary-foreground shadow hover:bg-primary/90",
              "text-sm font-medium transition-colors focus-visible:outline-none",
              "focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none",
              "disabled:opacity-50"
            )}
          >
            Try Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
