const { GoogleGenAI } = require('@google/genai');

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    const error = new Error('GEMINI_API_KEY is not configured. Add it to server/.env and restart the server.');
    error.statusCode = 503;
    throw error;
  }

  return new GoogleGenAI({ apiKey });
};

module.exports = getGeminiClient;
