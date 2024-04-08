import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders header component', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Cooking/i);
  expect(linkElement).toBeInTheDocument();
});