import { GoogleGenAI, Chat } from "@google/genai";
import { Tariff } from "../types";
import { getShipments } from "./shipmentService";

// This value is exposed by Vite's `define` config.
// For local development, create a `.env` file in the project root and add:
// API_KEY=YOUR_GEMINI_API_KEY
// In your hosting platform (Vercel), set an environment variable named API_KEY.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

// Initialize the AI client only if the API key is available.
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  // This warning will appear in the browser console if the key is missing.
  console.warn("Gemini API key is missing. Create a .env file with API_KEY or set it as an environment variable in your deployment platform.");
}

export const startChatSession = async (): Promise<Chat | null> => {
    if (!ai) {
        console.error("Gemini AI service is not available. Please ensure the API_KEY is set up correctly.");
        return null;
    }
    try {
        const chat = ai.chats.create({
            model: 'gemini-1.5-flash',
            config: {
                systemInstruction: 'You are a helpful logistics assistant for a company called Shipify. Be friendly, concise, and professional. Answer questions about shipping, logistics, tariffs, and the features of the Shipify application.'
            }
        });
        return chat;
    } catch (e) {
        console.error("Could not start chat session", e);
        return null;
    }
};

export const getShipmentUpdate = async (question: string): Promise<string> => {
    if (!ai) {
        console.error("Gemini AI service is not available.");
        return 'The AI service is not available. Please ensure the API_KEY is set up correctly.';
    }

    try {
        const shipments = await getShipments();
        const prompt = `
        You are a helpful logistics assistant for a company called Shipify.
        A user is asking about a shipment. Answer their question based ONLY on the data provided below.
        If you cannot find the shipment in the data, say that you couldn't find details for that shipment.
        Be friendly and concise. Format your response clearly. Do not mention that you were given data. Just answer the question.

        Current Shipment Data:
        ${JSON.stringify(shipments, null, 2)}

        ---
        User's question: "${question}"
        ---

        Your answer:
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
            config: {
                temperature: 0.2,
            }
        });
        return response.text ?? "I am sorry, I could not generate a response.";
    } catch (error) {
        console.error('Gemini API call for shipment update failed:', error);
        return 'An error occurred while communicating with the AI. Please try again later.';
    }
};

export const getTariffExplanation = async (tariff: Tariff): Promise<string> => {
  // Check if the AI client is configured before making a call.
  if (!ai) {
    console.error("Gemini AI service is not available.");
    return 'The AI service is not available. Please ensure the API_KEY is set up correctly.';
  }
  
  const prompt = `
    You are a logistics and shipping expert. 
    A user wants a simple explanation of a tariff plan.
    Please break down the following tariff details into a clear, easy-to-understand summary. 
    Explain what each major fee (like Port Dues, Cargo Handling, Landing Charges) is for. 
    Focus on clarity over technical jargon. Use bullet points for the breakdown.

    Tariff for: ${tariff.name} (${tariff.code})
    Type: ${tariff.type}
    Country: ${tariff.country}

    --- TARIFF DETAILS ---
    ${tariff.details}
    --- END OF DETAILS ---

    Generate the explanation now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        temperature: 0.3,
      }
    });
    return response.text ?? "I am sorry, I could not generate a response.";
  } catch (error) {
    console.error('Gemini API call failed:', error);
    return 'An error occurred while communicating with the AI. Please try again later.';
  }
};