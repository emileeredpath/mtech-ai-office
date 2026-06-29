export type CharacterGender = 'male' | 'female' | 'neutral';
export type CharacterStyle = 'casual' | 'business' | 'creative';
export type HairStyle = 'short' | 'long' | 'curly' | 'straight' | 'ponytail';

export interface CharacterAppearance {
  gender: CharacterGender;
  skinTone: string; // hex color
  hairStyle: HairStyle;
  hairColor: string; // hex color
  clothingStyle: CharacterStyle;
  clothingColor: string; // hex color
  accentColor: string; // employee brand color
}

export interface CharacterPersonality {
  traits: string[]; // e.g., ["analytical", "collaborative", "creative"]
  communicationStyle: 'formal' | 'casual' | 'enthusiastic' | 'reserved';
  energyLevel: 'high' | 'medium' | 'low';
  socialBias: 'introverted' | 'ambiverted' | 'extroverted';
}

export const appearancePresets: Record<string, CharacterAppearance> = {
  marketingDirector: {
    gender: 'female',
    skinTone: '#f4a460',
    hairStyle: 'long',
    hairColor: '#2c1810',
    clothingStyle: 'business',
    clothingColor: '#6366f1',
    accentColor: '#6366f1',
  },
  proposalWriter: {
    gender: 'male',
    skinTone: '#e0ac69',
    hairStyle: 'short',
    hairColor: '#8b4513',
    clothingStyle: 'business',
    clothingColor: '#10b981',
    accentColor: '#10b981',
  },
  websiteAuditor: {
    gender: 'neutral',
    skinTone: '#d2b48c',
    hairStyle: 'curly',
    hairColor: '#4a4a4a',
    clothingStyle: 'casual',
    clothingColor: '#f59e0b',
    accentColor: '#f59e0b',
  },
  seoManager: {
    gender: 'male',
    skinTone: '#c19a6b',
    hairStyle: 'straight',
    hairColor: '#1a1a1a',
    clothingStyle: 'casual',
    clothingColor: '#06b6d4',
    accentColor: '#06b6d4',
  },
  socialMediaManager: {
    gender: 'female',
    skinTone: '#ffdbac',
    hairStyle: 'ponytail',
    hairColor: '#ff69b4',
    clothingStyle: 'creative',
    clothingColor: '#ec4899',
    accentColor: '#ec4899',
  },
  emailManager: {
    gender: 'female',
    skinTone: '#f8d7b8',
    hairStyle: 'long',
    hairColor: '#d2691e',
    clothingStyle: 'business',
    clothingColor: '#f97316',
    accentColor: '#f97316',
  },
  caseStudyWriter: {
    gender: 'male',
    skinTone: '#daa520',
    hairStyle: 'short',
    hairColor: '#696969',
    clothingStyle: 'creative',
    clothingColor: '#a855f7',
    accentColor: '#a855f7',
  },
  fundingManager: {
    gender: 'female',
    skinTone: '#f0e68c',
    hairStyle: 'curly',
    hairColor: '#8b7355',
    clothingStyle: 'business',
    clothingColor: '#14b8a6',
    accentColor: '#14b8a6',
  },
};

export const personalityPresets: Record<string, CharacterPersonality> = {
  marketingDirector: {
    traits: ['strategic', 'visionary', 'data-driven'],
    communicationStyle: 'formal',
    energyLevel: 'high',
    socialBias: 'extroverted',
  },
  proposalWriter: {
    traits: ['detail-oriented', 'persuasive', 'structured'],
    communicationStyle: 'formal',
    energyLevel: 'medium',
    socialBias: 'ambiverted',
  },
  websiteAuditor: {
    traits: ['analytical', 'critical', 'methodical'],
    communicationStyle: 'casual',
    energyLevel: 'medium',
    socialBias: 'introverted',
  },
  seoManager: {
    traits: ['metric-obsessed', 'agile', 'competitive'],
    communicationStyle: 'casual',
    energyLevel: 'high',
    socialBias: 'extroverted',
  },
  socialMediaManager: {
    traits: ['creative', 'trend-aware', 'energetic'],
    communicationStyle: 'casual',
    energyLevel: 'high',
    socialBias: 'extroverted',
  },
  emailManager: {
    traits: ['conversion-focused', 'organised', 'empathetic'],
    communicationStyle: 'formal',
    energyLevel: 'medium',
    socialBias: 'ambiverted',
  },
  caseStudyWriter: {
    traits: ['storyteller', 'evidence-based', 'thorough'],
    communicationStyle: 'formal',
    energyLevel: 'low',
    socialBias: 'introverted',
  },
  fundingManager: {
    traits: ['opportunity-seeking', 'tenacious', 'detail-oriented'],
    communicationStyle: 'casual',
    energyLevel: 'high',
    socialBias: 'extroverted',
  },
};
