
export interface BirthData {
  date: string;
  time: string;
  gender: 'male' | 'female';
}

export interface AnalysisResult {
  chartSummary: {
    mainElement: string;
    zodiacAnimal: string;
    westernZodiac: string;
    destinyPalace: string;
  };
  lifetimeAnalysis: {
    overview: string;
    career: string;
    wealth: string;
    loveAndMarriage: string;
    health: string;
    family: string;
    synthesis: string;
    keyPeriods: {
      youth: string;
      middleAge: string;
      oldAge: string;
    };
  };
  luckyAdvice: {
    luckyNumbers: number[];
    luckyColors: string[];
    compatibleZodiacs: string[];
    thingsToDo: string;
    thingsToAvoid: string;
  };
}

export interface DivinationResult {
  stickNumber: number;
  name: string;
  poem: string;
  interpretation: {
    overview: string;
    career: string;
    love: string;
    health: string;
  };
  advice: string;
}

export interface DateSelectionData {
  eventType: string;
  birthDate: string; // YYYY-MM-DD
  targetMonth: number; // 1-12
  targetYear: number;
}

export interface AuspiciousDate {
  gregorianDate: string; // e.g., "2024-10-26"
  lunarDate: string; // e.g., "Ngày 24 tháng 9 năm Giáp Thìn"
  dayOfWeek: string; // e.g., "Saturday"
  goodHours: string; // e.g., "Tý (23-1), Dần (3-5), Mão (5-7), Ngọ (11-13), Mùi (13-15), Dậu (17-19)"
  explanation: string; // "A very good day for this event because..."
  conflictingZodiacs: string[]; // e.g., ["Dần", "Thân"]
  suitabilityScore: number;
  auspiciousStars: string[];
  inauspiciousStars: string[];
}

export interface TalismanRequestData {
  name: string;
  birthDate: string;
  wish: string;
}

export interface TalismanResult {
  imageData: string; // base64 encoded image
  mimeType: string;
  blessingText: string;
  explanation: string;
  instructions: string;
}