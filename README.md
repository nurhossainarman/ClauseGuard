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
- ✅ **Smart Matching** — Fuzzy keyword search with context extraction
- ✅ **Scan History** — Track and compare documents over time
- ✅ **Easy Upload** — Paste text or upload PDF
- ✅ **Privacy-First** — Your data is yours; we don't sell or track

---

## Quick Start

1. Sign up at [clauseguard.vercel.app](https://clauseguard.vercel.app)
2. Select which concerns matter to you
3. Upload a T&C or paste text
4. Review highlighted matches
5. Make an informed decision

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL
- **Deployment:** Vercel (frontend), Railway (backend)

---

## Development

See [PLAN.md](PLAN.md) for the 3-week build roadmap.

See [concerns.md](concerns.md) for the full list of privacy concerns.

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

---

## Roadmap

- **Week 1:** MVP with keyword matching and basic UI
- **Week 2:** Concern filtering, improved matching, scan history
- **Week 3:** Production deployment, documentation, polish

---

## Contributing

This is a portfolio project built in 3 weeks. Feedback welcome!

---

## License

MIT

---

**Questions?** Open an issue or reach out at nharman.ca@gmail.com
