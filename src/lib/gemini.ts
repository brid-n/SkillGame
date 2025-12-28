import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite", // ✅ model miễn phí
});

export async function analyzePlayer(data: any) {
  const prompt = `
Bạn là hệ thống phân tích người chơi game.

CHỈ TRẢ VỀ JSON HỢP LỆ.
KHÔNG giải thích.
KHÔNG markdown.
KHÔNG text bên ngoài JSON.

JSON format BẮT BUỘC:

{
  "strengths": string[],
  "weaknesses": string[],
  "recommendations": string[],
  "stats": {
    "reflexScore": number,
    "logicScore": number,
    "mathScore": number
  }
}

Dữ liệu người chơi:
${JSON.stringify(data)}
`;

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  return safeJsonParse(rawText);
}
function safeJsonParse(text: string) {
  try {
    // 👉 Cắt JSON từ text (phòng trường hợp Gemini nói thêm)
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON found in Gemini response");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("❌ Gemini JSON parse error:", text);

    // ✅ fallback để app KHÔNG crash
    return {
      strengths: ["Không phân tích được"],
      weaknesses: ["Không phân tích được"],
      recommendations: ["Hãy chơi thêm để có dữ liệu"],
      stats: {
        reflexScore: 50,
        logicScore: 50,
        mathScore: 50,
      },
    };
  }
}