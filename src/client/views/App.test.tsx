import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const title = screen.getByText(/The Great Ant Race/i);
  expect(title).toBeInTheDocument();
});
