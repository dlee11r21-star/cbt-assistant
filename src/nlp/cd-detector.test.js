
import { detectCDs, cdPatterns } from './cd-detector.js';

console.log("Testing detectCDs...");

const testCases = [
  // Obvious
  { text: "I always fail.", expected: ['All-or-Nothing'], sensitivities: ['low', 'medium', 'high'] },
  { text: "I should do better.", expected: ['Should Statements'], sensitivities: ['low', 'medium', 'high'] },
  { text: "I am a loser.", expected: ['Labeling'], sensitivities: ['low', 'medium', 'high'] },
  { text: "It is a disaster.", expected: ['Catastrophizing'], sensitivities: ['low', 'medium', 'high'] },

  // Moderate
  // "must" triggers Should Statements, so we avoid it here to test Emotional Reasoning in isolation
  { text: "I feel scared, which proves it is dangerous.", expected: ['Emotional Reasoning'], sensitivities: ['medium', 'high'] },
  { text: "I feel guilty which means I am bad.", expected: ['Emotional Reasoning'], sensitivities: ['medium', 'high'] },

  // False positive check
  { text: "I feel happy because it is sunny.", expected: [], sensitivities: ['low', 'medium', 'high'] }
];

let failed = false;

testCases.forEach(tc => {
  ['low', 'medium', 'high'].forEach(sensitivity => {
    const result = detectCDs(tc.text, sensitivity);
    const expected = tc.sensitivities.includes(sensitivity) ? tc.expected : [];

    // Sort arrays for comparison
    const rSorted = [...result].sort();
    const eSorted = [...expected].sort();

    const match = rSorted.length === eSorted.length && rSorted.every((val, index) => val === eSorted[index]);

    if (!match) {
        console.log(`FAIL: "${tc.text}" | Sensitivity: ${sensitivity}`);
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      ${JSON.stringify(result)}`);
        failed = true;
    }
  });
});

if (failed) {
    console.log("SOME TESTS FAILED");
    process.exit(1);
} else {
    console.log("ALL TESTS PASSED");
}

console.log("Current cdPatterns:", cdPatterns.map(p => `${p.type} (${p.difficulty})`));
