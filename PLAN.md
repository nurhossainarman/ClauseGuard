# Terms Radar - 3 Week Build Plan

## Project Vision

Build a tool that helps users identify concerning clauses in Terms & Conditions and Privacy Policies **before** they sign up for a service. Users select which concerns matter to them, upload/paste a T&C, and the tool highlights matches with context.

**Problem solved:** Most people don't read T&Cs (too long/complex). Those who try can't spot red flags. Terms Radar makes it easy.

**Target users:** Privacy-conscious individuals, researchers, anyone signing up for new services.

---

## Technology Stack (Industry Standard)

**Frontend:** React 18 + TypeScript + Tailwind CSS + Vite  
**Backend:** Node.js + Express.js + Prisma ORM  
**Database:** PostgreSQL  
**Authentication:** JWT (jsonwebtoken)  
**Document Processing:** 
- PDF parsing: `pdf-parse` or `pdfjs-dist`
- Text extraction: native JavaScript
- Keyword matching: `fuse.js` (fuzzy search) for MVP

**Future (Week 2+):** NLP for semantic matching (e.g., HuggingFace transformers or OpenAI API)

**Hosting:**
- Frontend: Vercel (free, built for React)
- Backend: Railway or Render (free tier)
- Database: Managed PostgreSQL (Railway/Render)

**Additional Tools:**
- API Documentation: Swagger/OpenAPI
- File upload: `multer` (Node.js middleware)
- Validation: Zod or Joi
- Linting: ESLint + Prettier

**Why This Stack?**
- Same as PrivacyVault = proven, industry-standard
- React for responsive UI
- Node.js for document processing (easier than Python for full-stack)
- PostgreSQL for relational data (user scans, concerns, results)
- Vercel + Railway = easiest deployment for beginners

---

## Week 1: Foundation & MVP (Days 1-7)

### Goal
Launch working MVP where users can select concerns, upload a T&C, and see matches highlighted.

### Tasks

#### Day 1-2: Project Setup & Architecture
- [ ] Initialize Git repo & project structure
- [ ] Create frontend boilerplate (React + TypeScript + Tailwind)
- [ ] Create backend boilerplate (Node.js + Express)
- [ ] Design database schema:
  - `users` table (id, email, password_hash, created_at, updated_at)
  - `concerns` table (id, name, description, keywords, category, severity)
  - `scans` table (id, user_id, document_name, created_at, updated_at)
  - `scan_results` table (id, scan_id, concern_id, matched_text, context, position)
- [ ] Seed `concerns` table with 20 concerns from concerns.md
- [ ] Set up environment variables (.env files)

#### Day 3-4: Authentication & User Management
- [ ] Implement user registration endpoint
- [ ] Implement user login endpoint with JWT
- [ ] Create protected routes middleware
- [ ] Build signup/login UI
- [ ] Add password hashing (bcrypt)
- [ ] Test auth flow end-to-end

#### Day 5-6: Core Feature - Document Scanning
- [ ] Implement file upload handling (accept .txt, .pdf, paste text)
- [ ] Create `/api/scan` endpoint that:
  - Accepts document (text or PDF)
  - Extracts text from PDF if needed
  - Searches for concern keywords in text
  - Stores results in database
  - Returns matches with context (surrounding text)
- [ ] Implement keyword matching algorithm:
  - Case-insensitive search
  - Find keyword + surrounding context (50 chars before/after)
  - Return position in document
- [ ] Build scan results UI showing:
  - Matched concerns with severity indicators
  - Highlighted text with context
  - Document name and scan date

#### Day 7: Testing & Deployment (Dev)
- [ ] Test upload with sample T&Cs (Google, Facebook, Instagram)
- [ ] Test keyword matching accuracy
- [ ] Deploy to staging environment
- [ ] Write basic README.md
- [ ] Fix critical bugs

### Deliverables by End of Week 1
✅ Live MVP at staging URL  
✅ Users can sign up, log in, upload T&C, see matches  
✅ 20 concerns searchable in any document  
✅ Database with scan history  
✅ GitHub repo with clean commit history

---

## Week 2: Feature Expansion (Days 8-14)

### Goal
Add concern filtering, better UI, scan history, and improved matching logic.

### Tasks

#### Day 8-9: Concern Filtering & Dashboard
- [ ] Create `/api/concerns` endpoint to list all concerns
- [ ] Build concern selection UI:
  - Checkbox filters by category (Data Sharing, Security, etc.)
  - Quick-select buttons (All, None, Top 5)
  - Show concern descriptions on hover
- [ ] Update scan logic to search only selected concerns
- [ ] Build dashboard showing:
  - Recent scans
  - Quick links to run new scan
  - Stats (total scans, concerns found)

#### Day 10-11: Improved Matching & Contextual Results
- [ ] Implement fuzzy search (using `fuse.js`) for typo tolerance
- [ ] Enhance context extraction:
  - Show full sentence/paragraph containing match
  - Highlight the specific match within context
  - Show position in document (e.g., "Section 3.2, Clause 5")
- [ ] Add result sorting/filtering:
  - By severity (red flag, warning, info)
  - By concern category
  - By document position
- [ ] Create `/api/scan/:id` endpoint for detailed results

#### Day 12: Scan History & Comparison
- [ ] Build scan history page showing:
  - All past scans with metadata
  - Date, document name, concerns found count
  - Quick re-scan button
- [ ] Add ability to compare two scans:
  - Side-by-side concern match view
  - Diff showing what changed
- [ ] Implement result export (PDF or JSON)

#### Day 13-14: UI Polish & Advanced Features
- [ ] Improve document upload UX:
  - Drag-and-drop for files
  - Progress indicator during upload/processing
  - Error messages for unsupported formats
- [ ] Build concern detail modal:
  - Full description
  - Why it matters
  - Example language
  - Link to relevant law/regulation
- [ ] Add dark mode toggle
- [ ] Mobile responsiveness testing
- [ ] Performance: Optimize text search for large documents (5000+ pages)

### Deliverables by End of Week 2
✅ Concern filtering system (by category, severity)  
✅ Improved document upload with drag-and-drop  
✅ Scan history with comparison feature  
✅ Fuzzy keyword matching for typo tolerance  
✅ Context extraction showing full clauses  
✅ Result export (PDF/JSON)  
✅ Mobile-responsive UI  
✅ No critical bugs

---

## Week 3: Polish & Deployment (Days 15-21)

### Goal
Production-ready, deployed, fully documented application.

### Tasks

#### Day 15: Security & Code Quality
- [ ] Security audit:
  - Check for SQL injection (Prisma helps here)
  - Verify passwords hashed (bcrypt)
  - Ensure JWT tokens expire (recommend 24 hours)
  - Check CORS is configured correctly
  - Add rate limiting to `/api/scan` endpoint
  - Validate all file uploads (max size, file type)
- [ ] Remove hardcoded secrets, move to .env
- [ ] Add input validation on all endpoints (Zod/Joi)
- [ ] Enable HTTPS (required for production)
- [ ] Test file upload with malicious files (injection attempts)

#### Day 16: Testing & Bug Fixes
- [ ] Manual end-to-end testing:
  - Create test accounts, run multiple scans
  - Test with real T&Cs (Google, Meta, TikTok, etc.)
  - Test edge cases (empty file, huge file, unsupported format)
  - Test on mobile browsers
  - Test file uploads at different sizes
- [ ] Fix any remaining bugs
- [ ] Performance: Check API response times, optimize slow queries
- [ ] Test with large documents (1000+ page PDFs)

#### Day 17: Deployment Setup
- [ ] Deploy backend:
  - Create production database
  - Set up CI/CD pipeline (GitHub Actions optional)
  - Deploy to Railway/Render
  - Test all API endpoints in production
- [ ] Deploy frontend:
  - Deploy to Vercel
  - Update API URLs to production
  - Test all features in production
- [ ] Set up monitoring (basic error logging)

#### Day 18: Documentation & Landing Page
- [ ] Write comprehensive README.md:
  - Overview of project
  - How to use (walkthrough)
  - Tech stack choices explained
  - API documentation (all endpoints)
  - How the scanning algorithm works
  - Limitations (e.g., keyword-based, not semantic)
- [ ] Create landing page:
  - Hero section with value prop ("Know what you're agreeing to")
  - Feature list with screenshots
  - How it works (3-step explanation)
  - List of all 20 concerns
  - Call-to-action (sign up)
  - Tech stack listed
  - Link to GitHub
- [ ] Write 2-3 paragraph project summary for portfolio

#### Day 19-20: Final Polish & Testing
- [ ] UX refinements:
  - Ensure all buttons/links work
  - Check form validation messages
  - Improve error handling (show helpful error messages)
  - Add loading states during uploads/scanning
  - Add success notifications
- [ ] Accessibility:
  - Keyboard navigation
  - Screen reader basics
  - Color contrast checks
- [ ] Final security sweep:
  - Run `npm audit` for dependency vulnerabilities
  - Check for leaked secrets in code
  - Verify no console errors in production
- [ ] Create demo account & test full flow one more time

#### Day 21: Final Release & Documentation
- [ ] Tag release on GitHub (v1.0.0)
- [ ] Write release notes
- [ ] Create demo video/GIF showing:
  - Selecting concerns
  - Uploading a T&C
  - Viewing results
- [ ] Add link to live app in GitHub repo
- [ ] Create "SETUP.md" with local development instructions
- [ ] Update personal portfolio website with Terms Radar project:
  - Project description
  - Live link
  - GitHub link
  - Screenshot/video
  - Key learnings

### Deliverables by End of Week 3
✅ Live production app at custom domain  
✅ Backend API deployed & tested  
✅ All code on GitHub with clean history  
✅ Comprehensive README.md & documentation  
✅ Landing page explaining the project  
✅ Demo video/GIF  
✅ Ready to share in interviews/portfolio

---

## Success Metrics

By end of Week 3, you should be able to:
- [ ] Go to live URL and complete full user journey (sign up → select concerns → upload T&C → view results)
- [ ] Accurately identify 15+ concerns in a sample T&C
- [ ] Show concern details, context, and severity
- [ ] Explain why keyword-based matching was chosen for MVP
- [ ] Walk through 5-minute demo of key features
- [ ] Share clean GitHub repo with 40+ commits
- [ ] Link project from portfolio website

---

## Key Decisions & Tradeoffs

### MVP Approach: Keyword Matching (not AI/NLP)

**Why:** Faster to build, works well enough for MVP, easy to iterate

**Tradeoff:** May miss semantically similar concerns (e.g., "we may retain your data" vs. "your data will be kept")

**Future:** Add semantic matching with HuggingFace/OpenAI API in Week 2+ if time permits

### Concerns: Pre-defined vs. User-created

**Why:** Pre-defined concerns (from concerns.md) are simpler, more curated

**Tradeoff:** Users can't add custom concerns yet

**Future:** Add custom concern creation in Week 2+

### Document Input: Text + PDF vs. Web URL

**Why:** Text paste + PDF upload covers most use cases for MVP

**Tradeoff:** Can't auto-fetch T&Cs from company websites

**Future:** Add URL fetching (web scraping) in Week 2+

---

## Key Constraints & Tips

**Time Management:**
- Prioritize MVP (Week 1) first. Concerns filtering is secondary.
- Keyword matching is faster to implement than NLP.
- Set a time box per task. If stuck > 1 hour, move on.

**Quality Over Quantity:**
- One polished concern matcher > 20 half-baked features
- Better to ship 80% working well than 100% broken

**Document Processing:**
- Start simple: extract text, search keywords
- PDF parsing can be tricky—use `pdf-parse` library (proven)
- Test with real T&Cs early (Google, Meta, TikTok)

**Concerns:**
- Keep the 20 concerns simple & searchable
- Use specific keywords (not fuzzy descriptions)
- Add categories for filtering

**Database:**
- Start simple: users, concerns, scans, results
- Don't normalize excessively
- Can always add indexes later

**API Rate Limiting:**
- Limit `/api/scan` to prevent abuse (e.g., 10 scans/hour per user)
- Document this clearly

**What NOT to Build (Save for Later):**
- ❌ Multi-language support
- ❌ Browser extension
- ❌ AI/semantic matching (for MVP)
- ❌ Auto-fetching T&Cs from websites
- ❌ Community/social features
- ❌ Mobile app
- ❌ Advanced analytics

---

## Project Name Ideas

- **Terms Radar** — Scans for red flags in Terms & Conditions
- **PolicyLens** — Clear lens on privacy policies
- **ToCScanner** — Simple, direct
- **ClauseCheck** — Finds problematic clauses
- **TermsAudit** — Audits T&Cs for concerns
- **PrivacyParser** — Parses privacy policies
- **RedFlags** — Highlights red flags in agreements
- **ToS Detective** — Investigates Terms of Service

(Pick whichever resonates most—will refine later)

---

## Checklist for Week 3 Sign-Off

- [ ] All features working in production
- [ ] No console errors in browser
- [ ] Keyword matching accurate (tested on 5+ real T&Cs)
- [ ] Upload handles PDFs, text files, pasted text
- [ ] Concern filtering works correctly
- [ ] Scan results display with context
- [ ] Mobile responsive (tested on phone)
- [ ] GitHub repo has meaningful commit messages
- [ ] README is detailed and clear
- [ ] Landing page looks professional
- [ ] Can explain every design decision
- [ ] No hardcoded secrets in code
- [ ] All dependencies documented
- [ ] File upload limits enforced (max 50MB, etc.)

---

## Post-Project: Interview Prep

Once deployed, prepare 2-3 minute explanations for:

1. **What problem does this solve?**
   - Most people don't read T&Cs → don't know what they're agreeing to → Terms Radar helps identify red flags

2. **Why keyword matching instead of AI?**
   - MVP speed: keyword matching ships faster
   - Accuracy: specific keywords are more reliable than fuzzy AI
   - Cost: free to run, no API costs

3. **How did you approach document processing?**
   - Text paste is simple + covers 80% of use cases
   - PDF parsing via `pdf-parse` library
   - Keyword search with fuzzy matching for typos

4. **What was hardest?**
   - Finding right keywords for concerns (needed research)
   - PDF parsing edge cases (images, tables, corrupted files)
   - Showing context without overwhelming users

5. **What would you add next?**
   - Semantic matching with NLP
   - Auto-fetch T&Cs from company websites
   - Custom user concerns
   - Browser extension
   - Comparison tool (compare two companies' T&Cs)

---

Good luck! 🚀
