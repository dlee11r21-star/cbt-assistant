import React from 'react';
import { create, act } from 'react-test-renderer';
import { TranscriptionWindow } from '../TranscriptionWindow';

describe('TranscriptionWindow Performance', () => {
  const wordCount = 50000;
  const transcript = Array(wordCount).fill('word').join(' ');
  const highlights = Array(wordCount).fill(false);

  it('should render correctly', () => {
    let component;
    act(() => {
      component = create(<TranscriptionWindow transcript="hello world" highlights={[false, true]} />);
    });
    const root = component.root;
    const spans = root.findAllByType('span');
    expect(spans).toHaveLength(2);
    expect(spans[1].props.style).toEqual(expect.objectContaining({ background: '#ffe066' }));
  });

  it('should not re-split transcript on re-render', () => {
    const splitSpy = jest.spyOn(String.prototype, 'split');
    let component;

    // Initial render
    act(() => {
      component = create(<TranscriptionWindow transcript={transcript} highlights={highlights} />);
    });

    splitSpy.mockClear();

    // Re-render
    const newHighlights = [...highlights];
    newHighlights[0] = true;

    const start = performance.now();
    act(() => {
      component.update(<TranscriptionWindow transcript={transcript} highlights={newHighlights} />);
    });
    const end = performance.now();
    console.log(`Re-render time: ${end - start}ms`);

    if (splitSpy.mock.calls.length > 0) {
      console.warn('PERFORMANCE WARNING: split called during re-render!');
    }
    expect(splitSpy).not.toHaveBeenCalled();

    splitSpy.mockRestore();
  });
});
