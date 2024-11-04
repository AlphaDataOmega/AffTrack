# AffTrack - Open Source Affiliate Tracking Platform

AffTrack is a modern, self-hosted platform for tracking affiliate campaigns, managing leads, and optimizing revenue. Built with Next.js 13, TypeScript, and Prisma.

## Features

- 📊 Real-time analytics and reporting
- 🔄 Automated lead distribution
- 🎯 Multi-channel tracking (visits, clicks, leads, conversions)
- 🔐 Role-based access control
- 🌐 Webhook integrations
- 📱 Responsive dashboard
- 🎨 Light/dark mode support

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Prisma ORM
- PostgreSQL
- shadcn/ui Components
- NextAuth.js for Authentication
- Tailwind CSS
- Lucide Icons

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Redis (optional, for caching)

## Installation

### Using Docker (Recommended)


### From Source

```bash
# Clone the repository
git clone https://github.com/yourusername/afftrack.git
cd afftrack

# Install dependencies
npm install

# Setup the database
npm run db:setup

# Start the development server
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/afftrack"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional Redis Cache
REDIS_URL="redis://localhost:6379"
```

## Development

```bash
# Run development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Documentation

Full documentation is available at `/docs` in the application, including:

- Getting Started Guide
- Tracking Implementation
- Transfer Management
- API Reference
- Security Best Practices

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Security

For security issues, please email security@yourdomain.com instead of using the issue tracker.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Project Structure

```
afftrack/
├── app/                  # Next.js 13 app directory
│   ├── api/             # API routes
│   ├── assets/          # Asset management pages
│   ├── auth/            # Authentication pages
│   ├── docs/            # Documentation pages
│   └── dashboard/       # Dashboard pages
├── components/          # React components
├── lib/                 # Utility functions and shared logic
├── prisma/             # Database schema and migrations
│   └── schema/         # Modular schema files
└── public/             # Static files
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Setup your PostgreSQL database

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Generate Prisma Client:
```bash
npx prisma generate
```

5. Start the development server:
```bash
npm run dev
```

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Vercel Deployment
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.