// src/__tests__/components/Logo.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from '@/components/Logo/Logo';

describe('Logo component', () => {
  it('renders the logo with default props', () => {
    render(<Logo />);

    // Check that the SVG element is rendered
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();

    // Check that the title is correct
    const titleElement = screen.getByText('Recipe Vault Logo');
    expect(titleElement).toBeInTheDocument();
  });

  it('passes additional props to the svg element', () => {
    // Test with custom className
    render(<Logo className="custom-logo" data-testid="logo" />);

    const svgElement = screen.getByTestId('logo');
    expect(svgElement).toHaveClass('custom-logo');
  });

  it('renders with correct default attributes', () => {
    render(<Logo data-testid="logo" />);

    const svgElement = screen.getByTestId('logo');
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svgElement).toHaveAttribute('fill', 'none');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 1024 1024');
  });

  it('applies custom color when specified', () => {
    render(<Logo fill="red" data-testid="logo" />);

    const svgElement = screen.getByTestId('logo');
    expect(svgElement).toHaveAttribute('fill', 'red');
  });

  it('works with accessibility attributes', () => {
    render(
      <Logo
        aria-label="Recipe Vault"
        role="img"
        data-testid="logo"
      />
    );

    const svgElement = screen.getByTestId('logo');
    expect(svgElement).toHaveAttribute('aria-label', 'Recipe Vault');
    expect(svgElement).toHaveAttribute('role', 'img');
  });

  it('renders with proper dimensions when width and height are provided', () => {
    render(<Logo width={200} height={200} data-testid="logo" />);

    const svgElement = screen.getByTestId('logo');
    expect(svgElement).toHaveAttribute('width', '200');
    expect(svgElement).toHaveAttribute('height', '200');
  });

  it('maintains the path elements inside the SVG', () => {
    render(<Logo />);

    // Check if the SVG contains the path elements
    const pathElements = document.querySelectorAll('path');
    expect(pathElements.length).toBeGreaterThan(0);
  });

  it('uses currentColor for fill by default', () => {
    render(<Logo />);

    // The g element contains fill="currentColor"
    const gElement = document.querySelector('g');
    expect(gElement).toHaveAttribute('fill', 'currentColor');
  });
});