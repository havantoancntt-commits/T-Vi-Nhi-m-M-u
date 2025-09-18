import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set. Please configure it in your deployment environment.");
}

export const ai = new GoogleGenAI({ apiKey: API_KEY });
