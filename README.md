# ClauseGuard

**Know what you're agreeing to.**

ClauseGuard helps you identify concerning clauses in Terms & Conditions and Privacy Policies before you sign up for a service. Select which privacy concerns matter to you, upload a T&C, and instantly spot red flags with full context.

---

## The Problem

Most people don't read Terms & Conditions. Those who try are overwhelmed by jargon and length. You end up agreeing to things like:
- Data being sold to third parties
- Indefinite data retention
- Forced arbitration clauses
- Hidden auto-renewal fees

## The Solution

ClauseGuard scans documents for 20+ known privacy concerns and highlights them with context. It takes minutes, not hours.

---

## Features

- ✅ **20+ Pre-defined Concerns** — Data sharing, tracking, retention, security, billing, legal red flags
- ✅ **Concern Filtering** — Select only what matters to you
- ✅ **Easy Upload** — Paste text or upload PDF
---

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL
- **Deployment:** Vercel (frontend), Railway (backend)

---

### Local Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/clauseguard.git
cd clauseguard

# Install dependencies
npm install

# Create .env file with database URL and JWT secret
cp .env.example .env

# Run migrations
npx prisma migrate dev

# Start backend (port 5000)
npm run dev

# Start frontend (port 5173, in a new terminal)
cd frontend
npm run dev
```

