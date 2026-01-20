import React, { useState } from 'react';
import { SensitivitySelector } from './ui/SensitivitySelector.jsx';
import { TranscriptionWindow } from './ui/TranscriptionWindow.jsx';
import { ReframeWindow } from './ui/ReframeWindow.jsx';
import { detectCDs } from './nlp/cd-detector.js';
import { getReframe } from './nlp/reframe-engine.js';
import { playBeep } from './audio/beep-handler.js';

export default function App() {
  const [transcript, setTranscript] = useState('');
  const [sensitivity, setSensitivity] = useState('medium');
  const [detectedCDs, setDetectedCDs] = useState([]);
  const [reframes, setReframes] = useState([]);
  const [highlights, setHighlights] = useState([]);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setTranscript(newText);

    const found = detectCDs(newText, sensitivity);

    if (found.length > detectedCDs.length) {
       playBeep();
    }
    setDetectedCDs(found);

    const newReframes = found.map(type => getReframe(type));
    setReframes(newReframes);

    const wordCount = newText.trim().split(/\s+/).length;
    setHighlights(new Array(wordCount).fill(false));
  };

  return (
    <div style={{maxWidth:'800px', margin:'0 auto', padding: '20px', fontFamily:'sans-serif'}}>
      <h1>CBT Assistant Prototype</h1>

      <div style={{marginBottom: '20px'}}>
        <SensitivitySelector value={sensitivity} onChange={setSensitivity} />
      </div>

      <div style={{marginBottom:'20px'}}>
        <label style={{display: 'block', marginBottom: '5px'}}><b>Manual Input (Simulates Speech):</b></label>
        <textarea
          value={transcript}
          onChange={handleInputChange}
          placeholder="Type here to simulate speaking..."
          style={{width:'100%', height:'100px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc'}}
        />
      </div>

      <div style={{marginBottom:'20px'}}>
        <h3>Live Transcript</h3>
        <TranscriptionWindow transcript={transcript} highlights={highlights} />
      </div>

      {detectedCDs.length > 0 && (
        <div style={{marginBottom: '20px', padding: '10px', background: '#ffe6e6', borderRadius: '4px', borderLeft: '5px solid red'}}>
           <strong>Detected Distortions:</strong> {detectedCDs.join(', ')}
        </div>
      )}

      {reframes.length > 0 && (
         <ReframeWindow reframes={reframes} />
      )}

    </div>
  );
}
