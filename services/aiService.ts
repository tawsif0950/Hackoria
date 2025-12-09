import { Message } from '../types';

// In a production environment, this should be in process.env
// Using the specific key provided by the user for this request.
const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'meta-llama/llama-3.2-3b-instruct:free';

const SYSTEM_PROMPT = `
You are HACKORIA AI, the intelligent assistant for HACKORIA, a premier Web Development and Cyber Security company.
The Founder and CEO of HACKORIA is Abdur Rahman.
Your tone is professional, technical, secure, and helpful.
Services offered include: Advanced Web Development, Cyber Security Audits, Penetration Testing, Secure Cloud Solutions, and Custom Software Development.
Answer inquiries briefly and professionally. Encourage users to contact via WhatsApp for quotes.
`;

export const sendMessageToAI = async (history: Message[]): Promise<string> => {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        // 'HTTP-Referer': 'https://hackoria.com', // Optional: for OpenRouter rankings
        // 'X-Title': 'HACKORIA' // Optional
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I apologize, but I couldn't process that request securely at the moment.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Connection interrupted. Secure link failed. Please try again later.";
  }
};
