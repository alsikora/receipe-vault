This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run teste:
```bash
npm run test
```


# Project Proposal: Personal Recipe Collection

## Overview
This project implements a structured content model using Prismic.io with two key pages (Homepage and All Recipes) and three custom slices (Hero, RecipeGrid, and RecipeCard). The content structure follows a modular approach where RecipeGrid uses RecipeCard as a child component.

## Custom Types
### 1. Homepage
The Homepage custom type serves as the main landing page for the Recipe Vault application.
### 2. All Recipes
The All Recipes custom type serves as a comprehensive listing page for browsing the complete recipe collection.

## Component Relationships
### Nesting Structure
1. **Homepage / All Recipes** (Custom Types)
    - Contains → **Slice Zone**
        - Contains → **Hero** (on Homepage)
        - Contains → **RecipeGrid**
            - Contains → Multiple **RecipeCard** instances
### Data Flow
- **RecipeGrid** queries the Prismic API for recipe data based on configured parameters
- Each recipe is rendered as a **RecipeCard** within the grid
- **RecipeCard** receives data as props from the parent RecipeGrid

### Implementation Benefits
1. **Modular Design**: Each component serves a specific purpose and can be reused across different contexts
2. **Consistent Presentation**: RecipeCard ensures consistent styling and information display for recipes
3. **Flexible Layouts**: Content editors can adjust the layout and content without developer intervention
4. **Performance Optimization**: Grid can implement pagination or lazy loading for efficient rendering
5. **Maintainability**: Changes to RecipeCard automatically propagate to all instances throughout the site

## Use of Generative AI in the Project
Generative AI was utilized in three key areas to speed up development and improve quality:
### 1. **Content Generation**
- **Text**: Generated recipe descriptions, instructions, ingredient lists, category definitions, and SEO-friendly content.
- **Images**: Created recipe images, category thumbnails, and decorative UI visuals where real assets were unavailable.

### 2. **CSS/Tailwind Styling**
- Styled components like `Hero`, `RecipeGrid`, and `RecipeCard` using AI-suggested Tailwind classes.
- Optimized responsive layouts, animations, and overall visual consistency.
- Consolidated redundant class usage for cleaner, maintainable styles.

### 3. **Unit Testing**

## Future improvements
- image optimization
- error handling - currently there is none
- extend testing

## Site
https://receipe-vault.netlify.app/

