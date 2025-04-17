# Damngood Template

A flexible, internationalized Next.js 15 template for building modern websites with built-in theming and configuration.

## Features

- **Next.js 15** - Latest Next.js features
- **TypeScript** - Type safety and better developer experience
- **Internationalization** - Built-in i18n support with next-intl
- **Centralized Configuration** - Easy site-wide settings in one place
- **Theme Provider** - Dark/light mode support with customizable colors
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **SEO Optimized** - Metadata, Open Graph, and sitemap support

## Getting Started

First, clone this repository:

```bash
git clone https://github.com/yourusername/damngood-template.git my-website
cd my-website
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customizing the Template

### Site Configuration

The template uses a centralized configuration system in `lib/constants.ts`. This is where you'll make most of your site-specific changes:

```typescript
// lib/constants.ts
export const SITE_CONFIG = {
  // Company/Organization Information
  company: {
    name: "Your Company",
    domain: "example.com",
    url: "https://example.com",
    description: "Your company description",
    // ... other company settings
  },

  // Internationalization Settings
  i18n: {
    locales: ["en", "fr"], // Change to your supported languages
    defaultLocale: "en",
    routes: {
      // Define your localized routes here
    },
  },

  // Theme Configuration
  theme: {
    colors: {
      primary: "#3b82f6",
      secondary: "#10b981",
      accent: "#f59e0b",
    },
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
  },
};
```

### Internationalization

The template supports multiple languages through next-intl. Translation files are stored in the `messages` directory:

```
messages/
  en.json
  fr.json
  // Add more languages as needed
```

Routes are automatically generated for each locale using the configuration in `i18n/routing.ts`.

### Theme Customization

The template includes a ThemeProvider component that supports dark/light mode and custom colors:

```typescript
// In your component
import { useTheme } from "@/components/ThemeProvider";

function MyComponent() {
  const { isDarkMode, toggleDarkMode, theme } = useTheme();

  return (
    <div>
      <button onClick={toggleDarkMode}>
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── [locale]/         # Locale-specific routes
│   ├── assets/           # Static assets
│   ├── fonts/            # Font files
│   └── styles/           # Global styles
├── components/           # React components
│   ├── ui/               # UI components
│   └── pages/            # Page-specific components
├── i18n/                 # Internationalization config
├── lib/                  # Utilities and constants
│   └── constants.ts      # Site configuration
├── messages/             # Translation files
│   ├── en.json           # English translations
│   └── fi.json           # Finnish translations
└── public/               # Public assets
```

## Deployment

This template is optimized for deployment on Vercel:

```bash
npm run build
# or
yarn build
```

## License

MIT
