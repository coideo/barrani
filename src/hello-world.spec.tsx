import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import HelloWorld from './hello-world';

test('displays a "Hello World" message', () => {
  render(<HelloWorld />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});

test('should return true', () => {
  expect(true).toBe(true);
});
