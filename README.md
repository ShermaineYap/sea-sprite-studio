# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f796738e-8dcc-45f4-b191-09209d76b580

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f796738e-8dcc-45f4-b191-09209d76b580) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

WaveWays is built with a modern, production-ready tech stack optimized for performance, developer experience, and scalability:

### Core Framework & Build Tools

**[Vite](https://vitejs.dev/)** - Next Generation Frontend Tooling
- Lightning-fast Hot Module Replacement (HMR) for instant feedback during development
- Optimized production builds with code splitting and tree-shaking
- Native ESM-based dev server for superior performance
- Significantly faster than traditional bundlers like Webpack

**[React 19](https://react.dev/)** - UI Library
- Component-based architecture for reusable and maintainable code
- Virtual DOM for efficient UI updates and rendering
- Rich ecosystem with extensive third-party libraries
- Industry-standard framework with strong community support

**[TypeScript](https://www.typescriptlang.org/)** - Type Safety
- Static type checking to catch errors during development
- Enhanced IDE support with intelligent code completion
- Better code documentation through type definitions
- Improved refactoring capabilities and code maintainability

### Styling & UI Components

**[Tailwind CSS](https://tailwindcss.com/)** - Utility-First CSS Framework
- Rapid UI development with utility classes
- Custom design system with ocean-inspired maritime theme
- Responsive design with mobile-first approach
- Optimized bundle size through PurgeCSS integration
- Dark mode support out of the box

**[shadcn/ui](https://ui.shadcn.com/)** - Component Library
- Beautifully designed, accessible React components
- Built on Radix UI primitives for robust accessibility
- Fully customizable to match WaveWays' maritime branding
- Copy-paste components that you own and control
- Not a dependency - components live in your codebase

### Routing & Navigation

**[React Router v6](https://reactrouter.com/)** - Client-Side Routing
- Multi-page application with seamless navigation
- Professional two-page workflow (Route Planning → Visualization)
- Programmatic navigation for enhanced UX
- URL-based state management

### Mapping & Geospatial

**[Leaflet](https://leafletjs.com/)** & **[React Leaflet](https://react-leaflet.js.org/)** - Interactive Maps
- Open-source mapping library with no API costs
- Interactive route visualization with custom markers
- Real-time vessel location tracking
- Smooth animations and user interactions
- Custom maritime-themed map styling

### Data Management

**[TanStack Query](https://tanstack.com/query/)** (React Query) - Server State Management
- Efficient data fetching and caching
- Automatic background refetching
- Optimistic updates for better UX
- Built-in loading and error states

### Form Handling & Validation

**[React Hook Form](https://react-hook-form.com/)** - Form Management
- Performant, flexible form validation
- Minimal re-renders for better performance
- Easy integration with TypeScript
- Built-in validation with Zod schema

**[Zod](https://zod.dev/)** - Schema Validation
- TypeScript-first validation library
- Runtime type checking for user inputs
- Comprehensive error messages
- Seamless integration with React Hook Form

### Additional Libraries

**[Lucide React](https://lucide.dev/)** - Icon System
- Beautiful, consistent icon set
- Tree-shakeable for optimal bundle size
- Extensive maritime and navigation icons

**[date-fns](https://date-fns.org/)** - Date Utilities
- Modern JavaScript date utility library
- Modular and lightweight
- Comprehensive date formatting and manipulation

**[Sonner](https://sonner.emilkowal.ski/)** - Toast Notifications
- Beautiful toast notifications
- Smooth animations
- Fully customizable

**[Recharts](https://recharts.org/)** - Data Visualization
- React-based charting library
- Responsive and customizable charts
- Perfect for displaying route metrics and analytics

### Why This Stack?

This technology stack was chosen specifically for WaveWays to ensure:

1. **Performance**: Vite and React provide blazing-fast development and optimized production builds
2. **Type Safety**: TypeScript catches errors early and improves code quality
3. **Professional UI**: shadcn/ui and Tailwind CSS enable rapid development of a polished, maritime-themed interface
4. **Scalability**: Modular architecture allows easy addition of new features
5. **Developer Experience**: Modern tooling with excellent documentation and community support
6. **Hackathon Ready**: Fast iteration and deployment capabilities
7. **No Backend Required**: Pure frontend solution with client-side calculations (ready for backend integration)

### Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Custom components
├── pages/           # Route-based page components
├── services/        # API and business logic
├── data/            # Static data (port database)
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f796738e-8dcc-45f4-b191-09209d76b580) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
