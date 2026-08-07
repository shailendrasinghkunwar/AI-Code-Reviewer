/**
 * Converts a review object into clean GitHub-flavored Markdown string.
 */
export const formatReviewAsMarkdown = (review) => {
  if (!review) return '';

  const {
    title,
    language,
    score,
    summary,
    timeComplexity,
    spaceComplexity,
    bugs,
    codeQuality,
    performance,
    security,
    bestPractices,
    readability,
    improvedCode,
    createdAt,
  } = review;

  const date = createdAt ? new Date(createdAt).toLocaleDateString() : new Date().toLocaleDateString();

  let md = `# ${title || 'AI Code Review Report'}\n\n`;
  md += `**Date:** ${date}  \n`;
  md += `**Language:** ${language ? language.toUpperCase() : 'N/A'}  \n`;
  md += `**Overall Score:** ${score}/10  \n`;
  md += `**Time Complexity:** \`${timeComplexity || 'N/A'}\`  \n`;
  md += `**Space Complexity:** \`${spaceComplexity || 'N/A'}\`  \n\n`;

  md += `---  \n\n`;
  md += `## 📋 Summary\n${summary}\n\n`;

  if (bugs && bugs.length > 0) {
    md += `## 🐞 Bugs & Critical Errors (${bugs.length})\n`;
    bugs.forEach((b, idx) => {
      md += `### ${idx + 1}. ${b.severity} Severity ${b.line ? `(Line ${b.line})` : ''}\n`;
      md += `- **Description:** ${b.description}\n`;
      if (b.fix) md += `- **Recommended Fix:** ${b.fix}\n`;
      md += `\n`;
    });
  }

  if (security && security.length > 0) {
    md += `## 🛡️ Security Vulnerabilities\n`;
    security.forEach((item) => {
      md += `- ${item}\n`;
    });
    md += `\n`;
  }

  if (performance && performance.length > 0) {
    md += `## ⚡ Performance Optimizations\n`;
    performance.forEach((item) => {
      md += `- ${item}\n`;
    });
    md += `\n`;
  }

  if (codeQuality && codeQuality.length > 0) {
    md += `## 🔍 Code Quality & Architecture\n`;
    codeQuality.forEach((item) => {
      md += `- ${item}\n`;
    });
    md += `\n`;
  }

  if (bestPractices && bestPractices.length > 0) {
    md += `## 💡 Best Practices\n`;
    bestPractices.forEach((item) => {
      md += `- ${item}\n`;
    });
    md += `\n`;
  }

  if (readability && readability.length > 0) {
    md += `## 📖 Readability & Clean Code\n`;
    readability.forEach((item) => {
      md += `- ${item}\n`;
    });
    md += `\n`;
  }

  if (improvedCode) {
    md += `## ✨ Refactored Code\n\n\`\`\`${language.toLowerCase()}\n${improvedCode}\n\`\`\`\n`;
  }

  return md;
};

/**
 * Downloads text/markdown as a file.
 */
export const downloadFile = (content, filename, type = 'text/markdown') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
