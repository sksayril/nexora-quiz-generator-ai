import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAI07JcmsTe59hBM-HafGtDaTppVz4Y5gA');

export async function generateQuiz(topic: string): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `You are a JSON generator. Respond ONLY with a raw JSON array containing 15 quiz questions about ${topic}.
DO NOT include any markdown formatting, code blocks, or explanatory text.
ONLY return a valid JSON array where each object has this exact structure:
{
  "question": "string with the question",
  "options": ["string option 1", "string option 2", "string option 3", "string option 4"],
  "correctAnswer": "exact string matching one of the options"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Remove any potential markdown code block indicators
    const cleanJson = text.replace(/```json\n?|\n?```/g, '').trim();
    
    const parsedQuestions = JSON.parse(cleanJson);
    
    // Validate the response format
    if (!Array.isArray(parsedQuestions) || parsedQuestions.length !== 15) {
      throw new Error('Invalid quiz format: Expected 10 questions');
    }

    // Validate each question
    parsedQuestions.forEach((q, idx) => {
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || !q.correctAnswer) {
        throw new Error(`Invalid question format at index ${idx}`);
      }
      if (!q.options.includes(q.correctAnswer)) {
        throw new Error(`Correct answer not found in options at index ${idx}`);
      }
    });

    return parsedQuestions;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('Failed to generate quiz. Please try again.');
  }
}