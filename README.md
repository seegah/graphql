# GraphQL 

This is a [Next.js](https://nextjs.org/) project aimed at learning the GraphQL query language by creating a personalized profile page.

## Project Overview

The objective of this project is to build a profile UI that displays your school information. The data for your profile is retrieved from a GraphQL endpoint provided by the platform. The UI is fully customizable, but must include a statistics section that generates graphs based on your academic journey and achievements.

### Key Features
- **Login Page**: Securely sign in using either your username or email with a password to obtain a JWT token.
- **Profile Display**: Showcase three pieces of information of your choice (e.g., basic user identification, XP amount, grades, audits, or skills).
- **Statistic Graphs**: Generate at least two different SVG-based graphs to visualize data such as XP earned over time, audit ratios, or project pass/fail ratios.
- **Logout Functionality**: Easily log out of your profile, invalidating the current session.

### GraphQL API
- **API Endpoint**: [https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql](https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql)
- **Authentication**: Obtain a JWT by making a POST request to the signin endpoint [https://learn.zone01dakar.sn/api/auth/signin](https://learn.zone01dakar.sn/api/auth/signin) with Base64 encoded credentials.

## Getting Started

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to view your project.

## Configuration

- **GraphQL Queries**: Supply your JWT using Bearer authentication to access your data via GraphQL queries.
- **Environment Variables**: Ensure your environment variables are set up to handle the GraphQL endpoint and JWT.

## Learn More

To dive deeper into Next.js or GraphQL, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive guide to Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial for mastering Next.js.
- [GraphQL Documentation](https://graphql.org/learn/) - Official documentation and tutorials for GraphQL.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/).

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
