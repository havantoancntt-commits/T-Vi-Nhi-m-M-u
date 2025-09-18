import type { BirthData, AnalysisResult, DivinationResult } from '../types';

export const generateHoroscope = async (data: BirthData): Promise<AnalysisResult> => {
  try {
    const response = await fetch('/api/horoscope', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ birthData: data }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || `Lỗi máy chủ: ${response.status}`);
    }

    return responseData as AnalysisResult;
  } catch (error) {
    console.error("Error calling horoscope service:", error);
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
          throw new Error("Không thể kết nối đến máy chủ luận giải. Vui lòng kiểm tra kết nối mạng.");
      }
      throw error;
    }
    throw new Error("Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.");
  }
};

export const getDivinationStick = async (): Promise<DivinationResult> => {
  try {
    const response = await fetch('/api/divination', {
      method: 'POST',
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || `Lỗi máy chủ: ${response.status}`);
    }
    
    return responseData as DivinationResult;
  } catch (error) {
    console.error("Error calling divination service:", error);
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
          throw new Error("Không thể kết nối đến máy chủ gieo quẻ. Vui lòng kiểm tra kết nối mạng.");
      }
      throw error;
    }
    throw new Error("Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.");
  }
};