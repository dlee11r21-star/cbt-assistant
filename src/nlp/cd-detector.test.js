import { describe, it, expect } from 'vitest';
import { detectCDs } from './cd-detector';

describe('cd-detector', () => {
  it('should detect "All-or-Nothing" thinking', () => {
    const text = "I always fail at everything.";
    const result = detectCDs(text, 'medium');
    expect(result).toContain('All-or-Nothing');
  });

  it('should detect "Should Statements"', () => {
    const text = "I must do this perfectly.";
    const result = detectCDs(text, 'medium');
    expect(result).toContain('Should Statements');
  });

  it('should detect "Labeling"', () => {
    const text = "I am a complete loser.";
    const result = detectCDs(text, 'medium');
    expect(result).toContain('Labeling');
  });

  it('should detect "Catastrophizing"', () => {
    const text = "This is a total disaster.";
    const result = detectCDs(text, 'medium');
    expect(result).toContain('Catastrophizing');
  });

  it('should respect "low" sensitivity', () => {
    const textLabeling = "I am an idiot.";
    const result = detectCDs(textLabeling, 'low');
    expect(result).not.toContain('Labeling');

    const textShould = "I should go.";
    const resultShould = detectCDs(textShould, 'low');
    expect(resultShould).toContain('Should Statements');
  });

  it('should respect "high" sensitivity', () => {
    const text = "I am worthless.";
    const result = detectCDs(text, 'high');
    expect(result).toContain('Labeling');
  });

  it('should return empty array when no distortion found', () => {
    const text = "I am going to the store.";
    const result = detectCDs(text, 'medium');
    expect(result).toEqual([]);
  });
});
