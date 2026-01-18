// src/nlp/cd-detector.js
// Regex-based detection for obvious CDs. To be replaced by BERT/model later.

const cdPatterns = [
  { type: 'All-or-Nothing', regex: /(always|never|everyone|nobody|completely|totally)/i, difficulty: 'Obvious' },
  { type: 'Should Statements', regex: /\bshould\b|\bout to\b|\bmust\b|\bhave to\b/i, difficulty: 'Obvious' },
  { type: 'Labeling', regex: /(i[\s']*am|you[\s']*are)[\w\s]*(loser|idiot|stupid|worthless|failure)/i, difficulty: 'Obvious' },
  { type: 'Catastrophizing', regex: /(disaster|ruined|hopeless|worst( case)?|awful|terrible)/i, difficulty: 'Obvious' },
  { type: 'Emotional Reasoning', regex: /(feel|feeling)[^.!?]*\b(means|proves|shows|must be)\b/i, difficulty: 'Moderate' },
];

// sensitivity: 'low', 'medium', 'high'
function detectCDs(text, sensitivity = 'medium') {
  let patternsToCheck = cdPatterns;

  if (sensitivity === 'low') {
    patternsToCheck = cdPatterns.filter(p => p.difficulty === 'Obvious');
  } else if (sensitivity === 'medium') {
    patternsToCheck = cdPatterns.filter(p => p.difficulty === 'Obvious' || p.difficulty === 'Moderate');
  }
  // high includes all (default/fallback behavior if we just use cdPatterns, but let's be explicit if needed or just leave as is)
  // Actually, 'high' means everything.

  return patternsToCheck.reduce((found, pattern) => {
    if (pattern.regex.test(text)) found.push(pattern.type);
    return found;
  }, []);
}

export { detectCDs, cdPatterns };
