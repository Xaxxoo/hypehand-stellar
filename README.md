HypeHand - A Stellar Blockchain Project for Gifting.

HypeHand is the backend API for the StarGift platform—a gamified crypto gifting app built on the Stellar blockchain. It enables admins to manage superstars, creators, and users through a secure, scalable admin dashboard. Inspired by Whisper's on-chain messaging and XP systems, StarGift allows seamless token gifting, secret rooms for exclusive interactions, and progression tracking, all powered by Stellar's fast, low-cost transactions. This repository contains the NestJS-based API, including authentication, blockchain integrations, and resource management for the admin interface. ✨ Features

Admin Authentication & RBAC: Secure JWT-based login with role-based access control (superadmin, moderator). User & Creator Management: Full CRUD for users, profiles, and verification (KYC integration). Stellar Blockchain Integration: Wallet creation, token minting/burning, transaction history, and gifting mechanics. Gamification: XP system, leaderboards, and referral rewards. Messaging & Rooms: On-chain message management and private secret rooms. Moderation Tools: Content flagging, reporting, bans, and audit logs. Analytics & Notifications: Real-time metrics, push/email/SMS notifications. Performance & Security: Rate limiting, caching (Redis), queuing (Bull), and comprehensive testing. Scalability: GraphQL support, API versioning, and scheduled tasks. Compliance: GDPR data privacy, backups, and exports.

🛠 Tech Stack

Backend: NestJS (TypeScript), TypeORM (PostgreSQL) Blockchain: Stellar SDK for asset issuance, payments, and on-chain data. Auth: JWT, Passport, bcrypt Queue & Cache: Bull (Redis) Testing: Jest (unit, integration, E2E) Deployment: Docker, GitHub Actions CI/CD Monitoring: Winston logging, Prometheus Docs: Swagger/OpenAPI Other: @nestjs/swagger, i18n, Sharp (image processing)

🚀 Quick Start Prerequisites

Node.js (v18+) PostgreSQL (v14+) Redis (v7+) Docker (optional, for easy setup) Stellar testnet account (for development)

Installation

Clone the repository: git clone https://github.com/yourusername/hypehand.git cd hypehand

Install dependencies: npm install

Set up environment variables:Copy .env.example to .env and fill in your values: DATABASE_URL=postgresql://user:pass@localhost:5432/hypehand REDIS_URL=redis://localhost:6379 JWT_SECRET=your-super-secret-jwt-key STELLAR_SECRET_KEY=your-stellar-secret-key NODE_ENV=development PORT=3000

Run database migrations: npm run migration:run

Start the development server: npm run start:dev

The API will be available at http://localhost:3000. Access Swagger docs at http://localhost:3000/api. Docker Setup (Optional) For a containerized setup: docker-compose up -d

This spins up PostgreSQL, Redis, and the NestJS app. 📖 API Documentation

Swagger UI: Visit /api after starting the server for interactive docs. Endpoints Overview: /auth/login: Admin authentication. /users: Manage users (GET/POST/PUT/DELETE). /creators: Creator profiles. /tokens: Gift token operations (mint/burn). /transactions: Stellar transaction history. /analytics: Dashboard metrics.

GraphQL: Available at /graphql for flexible queries.

Example cURL for login: curl -X POST http://localhost:3000/auth/login
-H "Content-Type: application/json"
-d '{"username":"admin","password":"password"}'

🔧 Usage Admin Workflow

Login: Use /auth/login to get a JWT token. Manage Users: List users with /users?limit=10&page=1, create via POST. Blockchain Ops: Mint tokens with /tokens/mint (requires Stellar integration). Moderation: Flag content via /moderation/flag, ban users at /bans. Analytics: Fetch metrics at /analytics/dashboard.

Stellar Integration

All gifting uses Stellar assets for tokens. Test on Stellar's Futurenet (testnet equivalent as of 2025). Ensure your Stellar secret key is secure in env vars.

🧪 Testing Run tests: npm run test # Unit + Integration npm run test:e2e # End-to-End

Coverage report: npm run test:cov

📊 Project Structure hypehand/ ├── src/ │ ├── auth/ # Authentication module │ ├── users/ # User management │ ├── creators/ # Creator profiles │ ├── tokens/ # Gift tokens & Stellar │ ├── messaging/ # On-chain messages │ ├── moderation/ # Content & user moderation │ ├── analytics/ # Metrics & dashboards │ └── common/ # Shared utilities ├── test/ # Test files ├── migrations/ # Database migrations ├── docs/ # Additional docs └── docker-compose.yml # Docker setup

🤝 Contributing We welcome contributions! Please follow these steps:

Fork the repo and create a feature branch (git checkout -b feature/amazing-feature). Commit changes (git commit -m 'Add amazing feature'). Push to the branch (git push origin feature/amazing-feature). Open a Pull Request.

Guidelines

Follow NestJS conventions. Write tests for new features. Update Swagger docs for new endpoints. Ensure code passes linting (npm run lint).

See CONTRIBUTING.md for details. 📄 License This project is licensed under the MIT License - see the LICENSE file for details. 🛡️ Security

Report vulnerabilities via email: security@hypehand.dev. Use rate limiting and RBAC for protection. Regularly audit with tools like npm audit.

📞 Contact

Project Lead: [Your Name] - @yourtwitter on X Issues: GitHub Issues Discussions: GitHub Discussions

Built with ❤️ for creators and gifters on Stellar. Star us on GitHub if you find it useful! 🌟
