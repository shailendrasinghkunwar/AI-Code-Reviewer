const { GoogleGenerativeAI } = require('@google/generative-ai');

const getGeminiModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[Gemini Warning] GEMINI_API_KEY is not configured in environment variables.');
  }
  const genAI = new GoogleGenerativeAI(apiKey || 'DUMMY_KEY');
  // Use gemini-1.5-flash for fast and accurate code reviews
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

module.exports = getGeminiModel;
