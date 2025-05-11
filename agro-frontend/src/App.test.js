import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ProductList component', () => {
  render(<App />);
  expect(screen.getByText('AgroGestão')).toBeInTheDocument(); // Verifica se o título está presente
});