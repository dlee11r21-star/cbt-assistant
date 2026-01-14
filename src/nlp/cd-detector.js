// src/nlp/cd-detector.js
// Regex-based detection for obvious CDs. To be replaced by BERT/model later.

const cdPatterns = [
  { type: 'All-or-Nothing', regex: /(always|never|everyone|nobody|completely|totally)/i },
  { type: 'Should Statements', regex: /\bshould\b|\bought to\b|\bmust\b|\bhave to\b/i },
  { type: 'Labeling', regex: /(i[\s']*am|you[\s']*are)[\w\s]*(loser|idiot|stupid|worthless|failure)/i },
  { type: 'Catastrophizing', regex: /(disaster|ruined|hopeless|worst( case)?|awful|terrible)/i },
  { type: 'Disqualifying the Positive', regex: /(doesn't count|meaningless|trivial)/i },
];

// sensitivity: 'low', 'medium', 'high'
function detectCDs(text, sensitivity = 'medium') {
  let patternsToCheck = cdPatterns.slice(0, 4); // Medium sensitivity
  if (sensitivity === 'low') patternsToCheck = cdPatterns.slice(0, 2);
  if (sensitivity === 'high') patternsToCheck = cdPatterns;
  return patternsToCheck.reduce((found, pattern) => {
    if (pattern.regex.test(text)) found.push(pattern.type);
    return found;
  }, []);
}

export { detectCDs, cdPatterns };