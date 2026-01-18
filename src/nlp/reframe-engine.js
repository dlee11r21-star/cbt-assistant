// src/nlp/reframe-engine.js
// Improved templated reframing with variety

const reframeTemplates = {
  'All-or-Nothing': [
    'Try to find the gray area. Life is rarely all one way or another.',
    'Look for the middle ground. Success isn\'t just 0% or 100%.',
    'Acknowledge partial success rather than viewing it as a total failure.',
    'Ask yourself: Is there a more balanced way to look at this?'
  ],
  'Should Statements': [
    'Consider what you want or prefer, not just what you "should" do.',
    'Replace "should" with "could" or "would like to" to reduce pressure.',
    'Ask yourself if this rule is helpful or realistic in this situation.',
    'Are you holding yourself to an impossible standard?'
  ],
  'Labeling': [
    'Describe the behavior, not your whole self.',
    'Remember that one mistake doesn\'t define who you are.',
    'Focus on the specific action rather than attaching a negative label to yourself.',
    'We all make mistakes; it doesn\'t make us "failures".'
  ],
  'Catastrophizing': [
    'Focus on most likely outcomes, not just the worst-case.',
    'Ask yourself: What is the evidence that the worst will happen?',
    'Even if the worst happened, could you cope? But more likely, it won\'t be that bad.',
    'What is the best-case scenario? What is the most realistic one?'
  ]
};

const defaultReframes = [
  'Try to identify and rephrase unhelpful thinking.',
  'What would you say to a friend in this situation?',
  'Is this thought based on facts or feelings?'
];

function getReframe(distortionType) {
  const templates = reframeTemplates[distortionType] || defaultReframes;
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
}

export { getReframe };
