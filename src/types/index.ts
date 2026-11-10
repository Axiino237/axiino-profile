export type ItemType = 'product' | 'project' | 'ai_feature';

export interface KeyOutcome {
  label: string;
  value: string;
}

export interface ShowcaseItem {
  id: string;
  slug: string;
  title: string;
  type: ItemType;
  subtitle: string;
  tagline: string;
  clientOrBrand: string;
  category: string;
  
  // Non-technical clarity
  simpleExplanation: string;
  problemSolved: string;
  businessImpact: string;
  
  // AI and Engineering Highlights
  aiCapabilities: string[];
  techStack: string[];
  keyOutcomes: KeyOutcome[];
  
  // Media & Visuals
  screenshotUrl: string;
  bgAtmosphereUrl?: string;
  accentColor: string; // e.g. '#6366f1' or hex
  gradientOverlay: string; // Tailwind gradient classes
  
  // Links
  liveUrl: string;
  caseStudyAvailable: boolean;
  featured: boolean;
}
