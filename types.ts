
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