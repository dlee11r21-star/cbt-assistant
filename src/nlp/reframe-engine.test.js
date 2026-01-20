import { describe, it, expect } from 'vitest';
import { getReframe } from './reframe-engine';

describe('reframe-engine', () => {
  it('should return a reframe for "All-or-Nothing"', () => {
    const result = getReframe('All-or-Nothing');
    expect(result).toBe('Try to find the gray area. Life is rarely all one way or another.');
  });

  it('should return a reframe for "Should Statements"', () => {
    const result = getReframe('Should Statements');
    expect(result).toBe('Consider what you want or prefer, not just what you "should" do.');
  });

  it('should return a default message for unknown types', () => {
    const result = getReframe('Unknown Type');
    expect(result).toBe('Try to identify and rephrase unhelpful thinking.');
  });
});
