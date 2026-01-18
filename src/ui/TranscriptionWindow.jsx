import React, { useMemo } from 'react';

export const TranscriptionWindow = ({ transcript, highlights }) => {
  const words = useMemo(() => transcript.split(' '), [transcript]);

  return (
    <div style={{background:'#fff',padding:'1em',borderRadius:'8px',minHeight:'120px',fontFamily:'monospace'}}>
      {words.map((word, i) =>
        highlights[i]
          ? <span key={i} style={{background:'#ffe066',borderRadius:'4px'}}>{word+' '}</span>
          : <span key={i}>{word+' '}</span>
      )}
    </div>
  );
};
