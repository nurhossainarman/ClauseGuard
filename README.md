# ClauseGuard

![React](https://img.shields.io/badge/React-18.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green)

> Know what you're agreeing to. ClauseGuard helps you identify concerning clauses in Terms & Conditions and Privacy Policies before you sign up for a service.

## 🎯 Overview

Most people don't read Terms & Conditions because they're overwhelming—jargon-filled, lengthy, and full of legal red flags. ClauseGuard scans documents for 20+ known privacy concerns and highlights them with context, turning hours of reading into minutes.

Select which privacy concerns matter to you, upload a T&C, and instantly spot red flags without leaving your browser.

## ❌ The Problem

- **Unread Agreements** — 91% of people don't read T&Cs they agree to
- **Hidden Clauses** — Data being sold to third parties
- **Data Risks** — Indefinite data retention, weak security standards
- **Financial Traps** — Hidden auto-renewal fees, forced arbitration clauses
- **Impossible to Track** — No easy way to understand what you're actually signing

## ✅ The Solution

ClauseGuard analyzes documents for privacy concerns and displays them with full context, so you know exactly what you're agreeing to.

## ⚡ Features

- **20+ Pre-defined Privacy Concerns** — Data sharing, tracking, retention, security, billing, legal red flags
- **Customizable Concern Filtering** — Select only the concerns that matter to you
- **Easy Upload** — Paste text or upload a PDF document directly
- **Instant Analysis** — Get results in seconds with highlighted context
- **User Authentication** — Save and revisit your document scans
- **Responsive Design** — Works seamlessly on desktop and mobile

## 🏗️ Tech Stack

### Frontend
- **React 18** — Modern UI library with hooks
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **Vite** — Fast development and build tool

### Backend
- **Node.js + Express** — Lightweight HTTP server
- **TypeScript** — Type-safe backend code
- **Prisma ORM** — Database abstraction and migrations
- **SQLite** — Local development database (PostgreSQL for production)
- **JWT Authentication** — Secure user sessions
- **bcrypt** — Password hashing

### Deployment
- **Frontend** — Vercel
- **Backend** — Railway
- **Database** — PostgreSQL (production), SQLite (development)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nurhossainarman/ClauseGuard.git
   cd ClauseGuard
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file (example provided)
   cp .env.example .env
   
   # Run database migrations
   npx prisma migrate dev
   
   # Start the backend (runs on http://localhost:5000)
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   
   # Start the development server (runs on http://localhost:5173)
   npm run dev
   ```

4. **Access the application**
   - Open your browser and go to `http://localhost:5173`

### Environment Variables

**Backend** (`.env`)
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
NODE_ENV="development"
```

**Frontend** (`.env`)
```
VITE_API_URL="http://localhost:5000"
```

## 📖 Usage

1. **Sign up or log in** to your ClauseGuard account
2. **Select your privacy concerns** — choose from 20+ predefined concerns or create custom ones
3. **Upload a document** — paste text or upload a PDF/document file
4. **Review results** — ClauseGuard highlights concerning clauses with context
5. **Save your analysis** — keep track of reviewed documents for future reference

## 📁 Project Structure

```
ClauseGuard/
├── backend/              # Node.js + Express server
│   ├── src/
│   │   ├── index.ts     # Server entry point
│   │   ├── routes/      # API endpoints (auth, documents, analysis)
│   │   ├── middleware/  # Auth, validation middleware
│   │   └── ...
│   └── prisma/          # Database schema and migrations
├── frontend/             # React + TypeScript application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── App.tsx      # Main application component
│   └── ...
└── README.md            # This file
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` — Create a new account
- `POST /api/auth/login` — Log in to an account
- `POST /api/auth/logout` — Log out

### Documents
- `POST /api/documents/upload` — Upload a document for analysis
- `GET /api/documents` — Get user's documents
- `GET /api/documents/:id` — Get a specific document and its analysis

## 🛠️ Development

### Building
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📦 Production Deployment

### Deploy Frontend to Vercel
```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

### Deploy Backend to Railway
```bash
cd backend
npm run build
# Push to Railway with your Railway config
```

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code is typed with TypeScript
- Components are documented
- Tests pass (when applicable)
- Commit messages are clear and descriptive

## 📧 Contact & Support

- **Author** — [Nur Hossain Arman](https://github.com/nurhossainarman)
- **Email** — nharman.ca@gmail.com
- **Project** — [ClauseGuard on GitHub](https://github.com/nurhossainarman/ClauseGuard)

## 🙋 FAQ

**Q: How accurate is the analysis?**  
A: ClauseGuard uses pattern matching for 20+ known privacy concern clauses. While highly accurate for common red flags, it's not a substitute for legal review for critical contracts.

**Q: Can I use ClauseGuard for commercial contracts?**  
A: Yes! ClauseGuard works with any text-based document, though it's optimized for privacy and terms documents.

**Q: Is my document data stored?**  
A: Only if you create an account and save analyses. You can also use ClauseGuard without saving.

---

**Built with ❤️ by [Nur Hossain Arman](https://github.com/nurhossainarman)**
