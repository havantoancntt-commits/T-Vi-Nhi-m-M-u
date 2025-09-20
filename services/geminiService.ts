
import type { BirthData, AnalysisResult, DivinationResult, DateSelectionData, AuspiciousDate, TalismanRequestData, TalismanResult } from '../types';

export const generateHoroscope = async (data: BirthData, lang: string): Promise<AnalysisResult> => {
  try {
    const response = await fetch('/api/horoscope', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ birthData: data, lang }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || `Server error: ${response.status}`);
    }

    return responseData as AnalysisResult;
  } catch (error) {
    console.error("Error calling horoscope service:", error);
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
          throw new Error("Could not connect to the analysis server. Please check your network connection.");
      }
      throw error;
    }
    throw new Error("An unknown error occurred. Please try again later.");
  }
};

export const getDivinationStick = async (lang: string): Promise<DivinationResult> => {
  try {
    const response = await fetch('/api/divination', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lang }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || `Server error: ${response.status}`);
    }
    
    return responseData as DivinationResult;
  } catch (error) {
    console.error("Error calling divination service:", error);
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
          throw new Error("Could not connect to the divination server. Please check your network connection.");
      }
      throw error;
    }
    throw new Error("An unknown error occurred. Please try again later.");
  }
};

export const selectAuspiciousDate = async (data: DateSelectionData, lang: string): Promise<AuspiciousDate[]> => {
  try {
    const response = await fetch('/api/date_selection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dateSelectionData: data, lang }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || `Server error: ${response.status}`);
    }

    return responseData.auspiciousDates as AuspiciousDate[];
  } catch (error) {
    console.error("Error calling date selection service:", error);
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error("Could not connect to the date selection server. Please check your network connection.");
      }
      throw error;
    }
    throw new Error("An unknown error occurred. Please try again later.");
  }
};

export const generateTalisman = async (data: TalismanRequestData, lang: string): Promise<TalismanResult> => {
  try {
    const response = await fetch('/api/talisman', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ talismanData: data, lang }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || `Server error: ${response.status}`);
    }

    return responseData as TalismanResult;
  } catch (error) {
    console.error("Error calling talisman service:", error);
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error("Could not connect to the talisman generation server. Please check your network connection.");
      }
      throw error;
    }
    throw new Error("An unknown error occurred. Please try again later.");
  }
};
