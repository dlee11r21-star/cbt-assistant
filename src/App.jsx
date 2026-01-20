import React, { useState, useEffect } from 'react';
import { TranscriptionWindow } from './ui/TranscriptionWindow';
import { ReframeWindow } from './ui/ReframeWindow';
import { SensitivitySelector } from './ui/SensitivitySelector';
import { detectCDs } from './nlp/cd-detector';
import { getReframe } from './nlp/reframe-engine';

const App = () => {
  const [transcript, setTranscript] = useState("I am a total failure and nobody likes me.");
  const [sensitivity, setSensitivity] = useState('medium');
  const [highlights, setHighlights] = useState({});
  const [reframes, setReframes] = useState([]);

  useEffect(() => {
    const distortions = detectCDs(transcript, sensitivity);
    const newReframes = distortions.map(d => `${d}: ${getReframe(d)}`);
    setReframes(newReframes);

    // Highlights logic is currently placeholder as detectCDs does not return indices
    setHighlights({});
  }, [transcript, sensitivity]);

  return (
    <div style={{padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif'}}>
      <h1>CBT Assistant</h1>
      <SensitivitySelector value={sensitivity} onChange={setSensitivity} />

      <div style={{marginBottom: '1rem'}}>
        <label style={{display: 'block', marginBottom: '0.5rem'}}>Enter text to analyze:</label>
        <textarea
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
          style={{width: '100%', padding: '0.5rem', minHeight: '100px', borderRadius: '4px', border: '1px solid #ccc'}}
        />
      </div>

      <h3>Analysis View</h3>
      <TranscriptionWindow transcript={transcript} highlights={highlights} />
      <ReframeWindow reframes={reframes} />
    </div>
  );
};

export default App;
