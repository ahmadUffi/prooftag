import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function analyzeProductImage(base64Image: string) {
  if (!ai) {
    throw new Error("Gemini API key not found in environment.");
  }

  const prompt = `
    Analyze this product photo for verification. 
    1. Identify the product.
    2. Check for the Shieldtag QR/Hologram.
    3. Determine if the packaging looks authentic or tampered.
    Return a JSON response with: { "product": string, "hologramDetected": boolean, "authenticityScore": number, "notes": string }
  `;

  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: base64Image,
              mimeType: "image/jpeg"
            }
          }
        ]
      }
    ]
  });

  return result.text;
}
