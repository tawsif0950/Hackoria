import { Message } from '../types';
import { GoogleGenAI } from "@google/genai";

// Fixed: Using process.env.API_KEY as per guidelines.
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const SYSTEM_PROMPT = `
You are HACKORIA AI, the intelligent assistant for HACKORIA, a premier Web Development and Cyber Security company.
The Founder and CEO of HACKORIA is Abdur Rahman.
Your tone is professional, technical, secure, and helpful.
Services offered include: Advanced Web Development, Cyber Security Audits, Penetration Testing, Secure Cloud Solutions, and Custom Software Development.
Answer inquiries briefly and professionally. Encourage users to contact via WhatsApp for quotes.
`;

export const sendMessageToAI = async (history: Message[]): Promise<string> => {
  try {
    // Fixed: Initialize GoogleGenAI with named parameter apiKey.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Map the message history to Gemini content format.
    // 'assistant' role is mapped to 'model'. 'user' remains 'user'.
    const contents = history
      .filter(msg => msg.role !== 'system') // System prompt is handled via config
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

    // Fixed: Use ai.models.generateContent to query GenAI with model and contents.
    // Using 'gemini-2.5-flash' for basic text tasks as recommended.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    // Fixed: Access .text property directly.
    return response.text || "I apologize, but I couldn't process that request securely at the moment.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Connection interrupted. Secure link failed. Please try again later.";
  }
};