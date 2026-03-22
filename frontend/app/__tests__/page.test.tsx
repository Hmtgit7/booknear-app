import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page', () => {
  it('renders the home page header', () => {
    render(<Home />);

    // Page should render without crashing
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('renders the main container', () => {
    const { container } = render(<Home />);

    // Check for main element
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });
});
