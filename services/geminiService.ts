import type { BirthData, AnalysisResult, DivinationResult, DateSelectionData, AuspiciousDate, TalismanRequestData, TalismanResult } from '../types';

async function apiClient<T>(endpoint: string, body: object, lang: string): Promise<T> {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body, lang }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            const defaultError = lang === 'en' 
                ? 'An unexpected error occurred. Please try again later.'
                : 'Đã có lỗi không mong muốn xảy ra. Vui lòng thử lại sau.';
            throw new Error(responseData.error || `${lang === 'en' ? 'Server error' : 'Lỗi máy chủ'}: ${response.status} - ${defaultError}`);
        }

        return responseData as T;
    } catch (error) {
        console.error(`Error calling ${endpoint} service:`, error);
        if (error instanceof Error) {
            if (error.message.includes('Failed to fetch') || error instanceof TypeError) {
                 const networkError = lang === 'en'
                    ? "Could not connect to the analysis server. Please check your network connection."
                    : "Không thể kết nối đến máy chủ phân tích. Vui lòng kiểm tra lại đường truyền mạng.";
                throw new Error(networkError);
            }
            throw error;
        }
        const unknownError = lang === 'en' 
            ? 'An unknown error occurred. Please try again later.'
            : 'Đã có lỗi không xác định xảy ra. Vui lòng thử lại sau.';
        throw new Error(unknownError);
    }
}

export const generateHoroscope = async (data: BirthData, lang: string): Promise<AnalysisResult> => {
    return apiClient<AnalysisResult>('/api/horoscope', { birthData: data }, lang);
};

export const getDivinationStick = async (lang: string): Promise<DivinationResult> => {
    return apiClient<DivinationResult>('/api/divination', {}, lang);
};

export const selectAuspiciousDate = async (data: DateSelectionData, lang: string): Promise<{ auspiciousDates: AuspiciousDate[] }> => {
    const response = await apiClient<{ auspiciousDates: AuspiciousDate[] }>('/api/date_selection', { dateSelectionData: data }, lang);
    return response;
};


export const generateTalisman = async (data: TalismanRequestData, lang: string): Promise<TalismanResult> => {
    return apiClient<TalismanResult>('/api/talisman', { talismanData: data }, lang);
};