// src/nlp/cd-detector.js
// Regex-based detection for obvious CDs. To be replaced by BERT/model later.

const cdPatterns = [
  { type: 'All-or-Nothing', regex: /(always|never|everyone|nobody|completely|totally)/i },
  { type: 'Should Statements', regex: /\bshould\b|\bout to\b|\bmust\b|\bhave to\b/i },
  { type: 'Labeling', regex: /(i[\s']*am|you[\s']*are)[\w\s]*(loser|idiot|stupid|worthless|failure)/i },
  { type: 'Catastrophizing', regex: /(disaster|ruined|hopeless|worst( case)?|awful|terrible)/i },
  { type: 'Emotional Reasoning', regex: /\b(feel|felt)\s+(like|that|as if)\b|\b(because|since)\s+i\s+(feel|felt)\b/i },
  { type: 'Jumping to Conclusions', regex: /\b(he|she|they|everyone|you)\s+(think|thinks|believes|must think)\b|\b(i|it)\s+(will|is going to)\s+(fail|go wrong|be terrible)\b/i },
  { type: 'Personalization', regex: /\b(my|all my)\s+fault\b|\bblame\s+(myself|me)\b|\bbecause\s+of\s+me\b/i },
  { type: 'Disqualifying the Positive', regex: /\b(doesn't|don't|didn't)\s+count\b|\bnot\s+good\s+enough\b|\bonly\s+luck\b/i },
];

// sensitivity: 'low', 'medium', 'high'
function detectCDs(text, sensitivity = 'medium') {
  let patternsToCheck = [];
  if (sensitivity === 'low') {
    patternsToCheck = cdPatterns.slice(0, 2);
  } else if (sensitivity === 'high') {
    patternsToCheck = cdPatterns;
  } else {
    // medium (default)
    patternsToCheck = cdPatterns.slice(0, 4);
  }

  return patternsToCheck.reduce((found, pattern) => {
    if (pattern.regex.test(text)) found.push(pattern.type);
    return found;
  }, []);
}

export { detectCDs, cdPatterns };