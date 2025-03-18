
export type CricketDecision = 
  | 'no-ball'
  | 'run-out'
  | 'wide-ball'
  | 'lbw'
  | 'legal-ball';

export interface DecisionResult {
  decision: CricketDecision;
  confidence: number;
  timestamp: number;
}

export interface SampleVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: CricketDecision;
  description?: string;
}

export interface ProcessingStatus {
  isProcessing: boolean;
  progress: number;
  statusMessage: string;
}
