# Fashion Runway Website 👗✨

## Overview

This website showcases the latest fashion trends and collections, providing an immersive and user-friendly shopping experience. The focus is on high-quality visuals, smooth interactions, and a responsive design built with modern web technologies.  The site is now structured into separate HTML files for improved organization and maintainability.

## Technologies

- HTML5: Semantic markup for structure and content.
- Tailwind CSS: Utility-first CSS framework for rapid and consistent styling across all pages.
- JavaScript: Enhances interactivity and dynamic content loading.
- GSAP (GreenSock Animation Platform): Powers smooth, performant animations and transitions.
- (Optional) A backend framework like Node.js/Express for user accounts, product management, and e-commerce functionality (not detailed here).

## Features

- **High-Quality Imagery:** Showcases clothing in the best possible light.
- **Smooth, Elegant Animations:** GSAP-powered animations enhance user engagement.
- **Responsive Design:** Adapts seamlessly to all screen sizes and devices, styled with Tailwind CSS.
- **Modern Fashion Showcase:** Highlights the latest trends and collections.
- **Interactive Product Pages:** Detailed product descriptions, multiple views, and zoom functionality.
- **Shopping Cart & Checkout:** Secure and intuitive shopping experience (implementation details depend on backend).
- **User Accounts (Optional):** User registration, login, and order history (requires backend).
- **Category Browsing:** Easy navigation through different clothing categories.
- **Search Functionality:** Allows users to quickly find specific items.
- **Modular HTML Structure:**  The website is now divided into separate HTML files for better organization and maintainability.  These include:
    - `index.html`: Home page
    - `about.html`: About Us page
    - `collection.html`:  Displays fashion collections
    - `showcase.html`: Highlights specific items or looks
    - `contact.html`: Contact information and form
    - `products.html`:  General product listing page
    - `cart.html`: Shopping cart page
    - `clothes.html`:  Specific category page for clothes
    - `accessories.html`: Specific category page for accessories
    - `shoes.html`: Specific category page for shoes
    - `profile.html`: User profile page (if user accounts are implemented)

## Setup

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd <project_directory>`
3. Install dependencies: `npm install`
4. Run the project: `npm start` (or the appropriate command for your development environment)

## Deployment to GitHub Pages

1.  **Enable GitHub Pages:** In your repository settings on GitHub, navigate to the "Pages" section.
2.  **Choose a Source:** Select the branch you want to deploy from (e.g., `main` or `gh-pages`) and the folder (e.g., `/root` or `/docs`).
3.  **GitHub Actions (Recommended):**  For automated deployments, consider using a GitHub Actions workflow.  Here's a basic example to add to `.github/workflows/deploy.yml`:
