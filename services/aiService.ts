'use server';

import { Message } from '../types';
import { GoogleGenAI } from "@google/genai";

// The API key is obtained from the environment variable process.env.API_KEY.
// By using 'use server', this code runs on the server side (Edge/Node) where the key is available.

const SYSTEM_PROMPT = `
You are HACKORIA AI, the intelligent assistant for HACKORIA, a premier Web Development and Cyber Security company.
The Founder and CEO of HACKORIA is Abdur Rahman.
Your tone is professional, technical, secure, and helpful.
Services offered include: Advanced Web Development, Cyber Security Audits, Penetration Testing, Secure Cloud Solutions, and Custom Software Development.
Answer inquiries briefly and professionally. Encourage users to contact via WhatsApp for quotes.
`;

export const sendMessageToAI = async (history: Message[]): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY?.trim();
    if (!apiKey) {
      console.error("CRITICAL ERROR: API_KEY is missing in environment variables.");
      console.error("Please go to Vercel Dashboard > Settings > Environment Variables and add API_KEY.");
      return "Security Alert: System configuration incomplete. Unable to process request.";
    }

    const ai = new GoogleGenAI({ apiKey });

    // Map the message history to Gemini content format.
    const contents = history
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return response.text || "I apologize, but I couldn't process that request securely at the moment.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Connection interrupted. Secure link failed. Please try again later.";
  }
};