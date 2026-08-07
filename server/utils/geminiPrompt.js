/**
 * Constructs the prompt for Google Gemini API to analyze code and produce a clean, structured JSON response.
 */

const buildReviewPrompt = (code, language) => {
  return `You are a World-Class Senior Principal Software Engineer and AI Code Reviewer.
Analyze the following ${language.toUpperCase()} code thoroughly across all dimensions:
1. Syntax, Logical, and Edge Case Bugs/Errors
2. Code Quality & Architecture
3. Performance Optimization & Bottlenecks
4. Time and Space Complexity (Big-O notation)
5. Security Vulnerabilities (e.g. injection, memory leaks, unsafe operations, input validation)
6. Modern Language Best Practices & Coding Standards
7. Readability & Clean Code Suggestions
8. An overall Quality Score from 0 to 10 (decimal allowed, e.g. 7.5)
9. Fully optimized and refactored production-ready version of the code.

CRITICAL INSTRUCTION: You MUST return ONLY a valid raw JSON object. Do not include markdown code block backticks (like \`\`\`json), do not include any introductory or concluding text.

The JSON response MUST strictly follow this exact structure:
{
  "score": 8.5,
  "summary": "Brief high-level summary of the code and overall health",
  "timeComplexity": "O(N log N)",
  "spaceComplexity": "O(N)",
  "bugs": [
    {
      "line": 12,
      "description": "Potential NullPointerException when accessing list element without null check.",
      "severity": "High",
      "fix": "Add a null check before calling .methods()"
    }
  ],
  "codeQuality": [
    "Use meaningful variable names instead of generic single letters like 'x' or 't'.",
    "Extract logic into smaller modular helper functions."
  ],
  "performance": [
    "Replace redundant loop iterations with a HashMap / Map lookup."
  ],
  "security": [
    "Sanitize external inputs before passing into database queries or commands."
  ],
  "bestPractices": [
    "Follow standard naming conventions for modern ${language}.",
    "Use immutable constants (const / final) where appropriate."
  ],
  "readability": [
    "Add concise docstrings and JSDoc/Doxygen comments for complex logic blocks."
  ],
  "improvedCode": "// Refactored clean code here"
}

Severity values for bugs must be one of: "Low", "Medium", "High", "Critical".

Here is the ${language.toUpperCase()} code to review:
----------------------------------------
${code}
----------------------------------------
`;
};

/**
 * Extracts and cleans JSON from Gemini output in case markdown backticks or excess whitespace were returned.
 */
const parseGeminiResponse = (text) => {
  try {
    let cleanText = text.trim();
    // Remove markdown json fences if present
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanText);

    // Ensure fallback defaults for missing fields
    return {
      score: typeof parsed.score === 'number' ? Math.min(10, Math.max(0, parsed.score)) : 7,
      summary: parsed.summary || 'Code review completed successfully.',
      timeComplexity: parsed.timeComplexity || 'N/A',
      spaceComplexity: parsed.spaceComplexity || 'N/A',
      bugs: Array.isArray(parsed.bugs) ? parsed.bugs : [],
      codeQuality: Array.isArray(parsed.codeQuality) ? parsed.codeQuality : [],
      performance: Array.isArray(parsed.performance) ? parsed.performance : [],
      security: Array.isArray(parsed.security) ? parsed.security : [],
      bestPractices: Array.isArray(parsed.bestPractices) ? parsed.bestPractices : [],
      readability: Array.isArray(parsed.readability) ? parsed.readability : [],
      improvedCode: parsed.improvedCode || '',
    };
  } catch (error) {
    console.error('[JSON Parsing Error] Failed to parse Gemini response:', error.message);
    // Fallback response if AI text failed to format as pure JSON
    return {
      score: 6.0,
      summary: 'Analysis completed with unformatted AI output. Review the raw output below.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      bugs: [],
      codeQuality: [text.slice(0, 500)],
      performance: [],
      security: [],
      bestPractices: [],
      readability: [],
      improvedCode: '',
    };
  }
};

module.exports = { buildReviewPrompt, parseGeminiResponse };
