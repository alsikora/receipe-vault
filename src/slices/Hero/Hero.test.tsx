import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '@/slices/Hero';
import {PrismicRichTextProps} from "@prismicio/react";


// Mock the required Prismic components
jest.mock('@prismicio/react', () => {
  return {
    PrismicRichText: ({field, components}: PrismicRichTextProps) => {
      // Simple mock implementation that renders content based on the field type
      if (!field || !field.length) return null;

      const firstItem = field[0];
      if (firstItem!.type === 'heading1' && components?.heading1) {
        return components.heading1({children: firstItem.text});
      }
      if (firstItem!.type === 'paragraph' && components?.paragraph) {
        return components.paragraph({children: firstItem.text});
      }

      return <div data-testid="rich-text-content">{firstItem!.text}</div>;
    }
  };
});

jest.mock('@prismicio/next', () => {
  return {
    PrismicNextLink: ({field, className}: PrismicRichTextProps) => {
      if (!field) return null;
      return (
        <a
          href={field.url || '#'}
          className={className}
          data-testid="cta-button"
        >
          {field.text || 'Click Here'}
        </a>
      );
    }
  };
});

describe('Hero Slice', () => {
  // Sample slice data that mimics what would come from Prismic
  const mockSlice = {
    slice_type: 'hero',
    variation: 'default',
    primary: {
      heading: [
        {
          type: 'heading1',
          text: 'Delicious Recipes For Everyone',
          spans: []
        }
      ],
      body: [
        {
          type: 'paragraph',
          text: 'Discover amazing recipes that will transform your cooking experience.',
          spans: []
        }
      ],
      button: {
        url: '/recipes',
        text: 'Explore Recipes',
        target: '_self'
      }
    },
    items: []
  };

  it('renders the hero section with correct slice attributes', () => {
    const {container} = render(<Hero slice={mockSlice}/>);

    const section = container.querySelector('section');
    expect(section).toHaveAttribute('data-slice-type', 'hero');
    expect(section).toHaveAttribute('data-slice-variation', 'default');
  });

  it('renders the heading with correct styling', () => {
    const {container} = render(<Hero slice={mockSlice}/>);

    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Delicious Recipes For Everyone');
    expect(heading).toHaveClass('text-4xl', 'font-bold', 'text-gray-800');

    // Check for the period with amber color
    const period = container.querySelector('h1 span');
    expect(period).toHaveClass('text-amber-700');
    expect(period).toHaveTextContent('.');
  });

  it('renders the body text with correct styling', () => {
    const {container} = render(<Hero slice={mockSlice}/>);

    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(
      'Discover amazing recipes that will transform your cooking experience.'
    );
    expect(paragraph).toHaveClass('text-lg', 'text-gray-600', 'mb-6');
  });

  it('renders the CTA button with correct attributes', () => {
    const {getByTestId} = render(<Hero slice={mockSlice}/>);

    const button = getByTestId('cta-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/recipes');
    expect(button).toHaveTextContent('Explore Recipes');
    expect(button).toHaveClass('bg-amber-700', 'text-white', 'rounded-lg');
  });

  it('renders decorative elements', () => {
    const {container} = render(<Hero slice={mockSlice}/>);

    const decorativeElements = container.querySelectorAll('.bg-amber-200.rounded-full');
    expect(decorativeElements).toHaveLength(2);

    // Check positioning classes
    const topElement = container.querySelector('.-top-16.-right-16');
    expect(topElement).toBeInTheDocument();

    const bottomElement = container.querySelector('.-bottom-24.-left-24');
    expect(bottomElement).toBeInTheDocument();
  });

  it('maintains responsive layout structure', () => {
    const {container} = render(<Hero slice={mockSlice}/>);

    // Check main container
    const mainContainer = container.querySelector('.max-w-7xl.mx-auto');
    expect(mainContainer).toBeInTheDocument();

    // Check responsive layout
    const flexContainer = container.querySelector('.flex.flex-col.md\\:flex-row');
    expect(flexContainer).toBeInTheDocument();

    // Check responsive width
    const contentContainer = container.querySelector('.md\\:w-1\\/2');
    expect(contentContainer).toBeInTheDocument();
  });

  it('handles missing data gracefully', () => {
    const emptySlice = {
      slice_type: 'hero',
      variation: 'default',
      primary: {
        heading: [],
        body: [],
        button: null
      },
      items: []
    };

    const {container} = render(<Hero slice={emptySlice}/>);

    // Should still render the section
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    // But no heading or paragraph should be rendered
    const heading = container.querySelector('h1');
    expect(heading).not.toBeInTheDocument();

    const paragraph = container.querySelector('p');
    expect(paragraph).not.toBeInTheDocument();

    // And no button
    const button = container.querySelector('a');
    expect(button).not.toBeInTheDocument();
  });
});