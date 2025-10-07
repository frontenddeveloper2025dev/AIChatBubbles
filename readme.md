# Overview

This is a full-stack chat application built with React and Express.js that enables real-time conversations with an AI assistant powered by OpenAI's GPT-4o model. The application features a modern, responsive interface with message bubbles, typing indicators, and session-based conversation management. Users can send messages and receive AI responses in a clean chat interface with proper message history and visual feedback.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Comprehensive component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Framework**: Express.js with TypeScript for RESTful API endpoints
- **Development Server**: Custom Vite integration for hot module replacement in development
- **Storage**: In-memory storage implementation with interface for easy database migration
- **API Design**: RESTful endpoints for message management with session-based organization
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

## Data Layer
- **Database ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Schema Management**: Shared schema between frontend and backend using Zod for validation
- **Migration System**: Drizzle Kit for database migrations and schema changes
- **Connection**: Neon Database serverless PostgreSQL integration

## AI Integration
- **Provider**: OpenAI API with GPT-4o model for chat completions
- **Context Management**: Conversation history maintained per session for contextual responses
- **Configuration**: Configurable temperature and token limits for response customization
- **Error Handling**: Graceful fallback handling for AI service failures

## Development Workflow
- **Build System**: Vite for fast development builds and optimized production bundles
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared code
- **Hot Reload**: Development server with automatic refresh for code changes
- **Path Mapping**: Organized imports using TypeScript path aliases for clean code structure

# External Dependencies

## Core Runtime Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **openai**: Official OpenAI API client for GPT-4o integration
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web framework for API server
- **react**: Frontend UI library with hooks
- **@tanstack/react-query**: Server state management and caching

## UI and Styling
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Utility for conditional CSS class names

## Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **drizzle-kit**: Database migration and introspection tools
- **esbuild**: Fast JavaScript bundler for production builds

## Form and Validation
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for various schema libraries
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

## Additional Libraries
- **wouter**: Minimalist routing for React applications
- **date-fns**: Modern JavaScript date utility library
- **lucide-react**: Beautiful and consistent icon library
- **nanoid**: URL-safe unique string ID generator