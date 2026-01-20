import React from 'react';

export const SensitivitySelector = ({ value, onChange }) => (
  <div style={{margin:'1em 0'}}>
    <label>
      Sensitivity:
      <select value={value} onChange={e=>onChange(e.target.value)} style={{marginLeft:'0.5em'}}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </label>
  </div>
);
