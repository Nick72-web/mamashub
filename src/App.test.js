import { render, screen } from '@testing-library/react';
import App from './App';

test('renders User Posts Overview title', () => {
  render(<App />);
  const titleElement = screen.getByText(/User Posts/i);
  expect(titleElement).toBeInTheDocument();
});

