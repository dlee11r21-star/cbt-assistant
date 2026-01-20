import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock the Audio object
const mockPlay = vi.fn();
window.Audio = vi.fn().mockImplementation(() => ({
  play: mockPlay,
}));

describe('App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the initial UI', () => {
    render(<App />);
    expect(screen.getByText('CBT Assistant Prototype')).toBeInTheDocument();
    expect(screen.getByLabelText(/Sensitivity:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type here to simulate speaking...')).toBeInTheDocument();
  });

  it('detects distortions and shows reframes', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Type here to simulate speaking...');

    // Simulate typing a distortion
    fireEvent.change(input, { target: { value: 'I am a complete loser' } });

    // Check if distortion is detected
    expect(screen.getByText(/Detected Distortions:/i)).toBeInTheDocument();
    expect(screen.getByText(/Labeling/i)).toBeInTheDocument();

    // Check if reframe is shown
    expect(screen.getByText(/Describe the behavior, not your whole self./i)).toBeInTheDocument();

    // Check if beep was played
    expect(window.Audio).toHaveBeenCalled();
    expect(mockPlay).toHaveBeenCalled();
  });

  it('does not trigger detection for neutral text', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Type here to simulate speaking...');
    fireEvent.change(input, { target: { value: 'I am eating breakfast' } });

    // Should not show detected distortions
    expect(screen.queryByText(/Detected Distortions:/i)).not.toBeInTheDocument();
  });
});
