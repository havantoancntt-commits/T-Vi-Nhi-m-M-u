import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

/**
 * Returns a singleton instance of the GoogleGenAI client.
 * Initializes the client on the first call.
 * @throws {Error} if the API_KEY environment variable is not set.
 */
export const getAiClient = (): GoogleGenAI => {
    if (!ai) {
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            throw new Error("API_KEY environment variable not set. Please configure it in your deployment environment.");
        }

        ai = new GoogleGenAI({ apiKey: API_KEY });
    }
    return ai;
};
