import React from 'react';
import {render, screen} from '@testing-library/react';
import {Header} from './Header';
import * as prismicio from '@/prismicio';
import '@testing-library/jest-dom';

// Mock the next/link component
jest.mock('next/link', () => {
  const NextLink = ({children, href}: { children: React.ReactNode; href: string }) => {
    return (
      <a href={href} data-testid="mock-link">
        {children}
      </a>
    );
  };
  NextLink.displayName = 'NextLink';
  return NextLink;
});

// Mock the Logo component
jest.mock('../Logo/Logo', () => ({
  Logo: (props: React.ComponentProps<'div'>) => <div data-testid="mock-logo" {...props} />
}));

// Mock the PrismicNextLink component
jest.mock('@prismicio/next', () => ({
  PrismicNextLink: ({field, children, className}: {
    field?: {url?: string; text?: string};
    children?: React.ReactNode;
    className?: string;
  }) => (
    <a href={field?.url || '#'} className={className} data-testid="prismic-link">
      {children || field?.text || 'Link Text'}
    </a>
  )
}));

// Mock the createClient function
jest.mock('@/prismicio', () => ({
  createClient: jest.fn()
}));

describe('Header Component', () => {
  const mockSettings = {
    data: {
      navigation: [
        {
          link: {
            url: '/recipes',
            text: 'Recipes'
          }
        },
        {
          link: {
            url: '/about',
            text: 'About'
          }
        }
      ]
    }
  };

  beforeEach(() => {
    // Mock the implementation for each test
    const mockClient = {
      getSingle: jest.fn().mockResolvedValue(mockSettings)
    };
    (prismicio.createClient as jest.Mock).mockReturnValue(mockClient);
  });

  it('renders the header with logo and brand name', async () => {
    // Use render function with waitFor since component is async
    const {findByText} = render(await Header());

    // Check if logo is rendered
    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();

    // Check if brand name is rendered
    const brandName = await findByText('Recipe Vault');
    expect(brandName).toBeInTheDocument();
  });

  it('renders navigation links from Prismic data', async () => {
    render(await Header());

    // Get all prismic links
    const navLinks = screen.getAllByTestId('prismic-link');

    // Should have 2 navigation links based on mock data
    expect(navLinks).toHaveLength(2);
  });

  it('renders mobile menu button on smaller screens', async () => {
    render(await Header());

    // Find the mobile menu button
    const mobileButton = screen.getByRole('button', {name: ''});
    expect(mobileButton).toBeInTheDocument();

    // Check if it has the correct class for responsive display
    expect(mobileButton).toHaveClass('md:hidden');
  });

  it('has the correct styling and layout classes', async () => {
    render(await Header());

    // Header should have sticky positioning
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
    expect(header).toHaveClass('z-50');

    // Navigation should be hidden on mobile
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('hidden');
    expect(nav).toHaveClass('md:flex');
  });
});