import { detectCDs, cdPatterns } from './cd-detector.js';

describe('detectCDs', () => {
  const testCases = [
    // Obvious
    { text: "I always fail.", expected: ['All-or-Nothing'], sensitivities: ['low', 'medium', 'high'] },
    { text: "I should do better.", expected: ['Should Statements'], sensitivities: ['low', 'medium', 'high'] },
    { text: "I am a loser.", expected: ['Labeling'], sensitivities: ['low', 'medium', 'high'] },
    { text: "It is a disaster.", expected: ['Catastrophizing'], sensitivities: ['low', 'medium', 'high'] },

    // Moderate
    { text: "I feel scared, which proves it is dangerous.", expected: ['Emotional Reasoning'], sensitivities: ['medium', 'high'] },
    { text: "I feel guilty which means I am bad.", expected: ['Emotional Reasoning'], sensitivities: ['medium', 'high'] },

    // False positive check
    { text: "I feel happy because it is sunny.", expected: [], sensitivities: ['low', 'medium', 'high'] }
  ];

  testCases.forEach(tc => {
    ['low', 'medium', 'high'].forEach(sensitivity => {
      const expected = tc.sensitivities.includes(sensitivity) ? tc.expected : [];
      test(`Sensitivity: ${sensitivity} | Text: "${tc.text}"`, () => {
        const result = detectCDs(tc.text, sensitivity);
        expect(result.sort()).toEqual(expected.sort());
      });
    });
  });

  test('cdPatterns export check', () => {
    expect(cdPatterns.length).toBeGreaterThan(0);
  });
});
