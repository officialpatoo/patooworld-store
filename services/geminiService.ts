
import { GoogleGenAI, Modality } from "@google/genai";
import { Product } from "../types";

const API_KEY = process.env.API_KEY || '';

/**
 * Provides shopping recommendations using Gemini 3 Flash.
 */
export const getShoppingAdvice = async (query: string, products: Product[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const productList = products.map(p => `${p.name} ($${p.price}): ${p.description}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{
          text: `User is asking about shopping in Patooworld Store. 
          Available Products:
          ${productList}
          
          User Query: "${query}"
          
          Provide a helpful, friendly recommendation. Limit to 3 sentences.`
        }]
      }],
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return null;
  }
};

/**
 * Visual Search: Analyzes an image to find product keywords.
 */
export const performVisualSearch = async (base64Image: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        parts: [
          { text: "Identify the electronic device in this image. Provide exactly 3 keywords that describe its type, color, and style (e.g., 'Silver Headphones Minimalist')." },
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } }
        ]
      }]
    });
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Visual Search Error:", error);
    return "";
  }
};

/**
 * AI Customizer: Generates a texture for product skins.
 * Uses gemini-2.5-flash-image for generation.
 */
export const generateCustomTexture = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{
        parts: [{ 
          text: `Generate a high-detail, seamless abstract tech texture or pattern for a product skin. Theme: ${prompt}. Cinematic lighting, 4k resolution, macro tech aesthetics.` 
        }]
      }],
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Iterate through all parts to find the image data
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};

/**
 * Live API Utility: Decodes audio from base64
 */
export function decodeBase64Audio(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
