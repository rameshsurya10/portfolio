import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "acadrix-school-platform",
    title: "Acadrix",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Multi-role K-12 school management platform — 9 user roles, 26 Django apps, 280+ API routes across 129 multi-tenant models, covering admissions, academics, fees, report cards, library, transport, homework, attendance devices, payroll, leave, messaging, and AI question generation.",
    tags: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind",
      "Django 5",
      "DRF",
      "PostgreSQL",
      "Redis",
      "Celery",
      "JWT",
      "TOTP 2FA",
    ],
    image: "/images/projects/project-7.jpg",
    liveDemo: "https://acadrix.ryxtech.in",
    featured: true,
    status: "ongoing",
    caseStudy: {
      context:
        "Indian K-12 schools manage admissions, fees, grades, certificates, payroll, and parent communication across separate spreadsheets, paper forms, and disconnected SaaS tools. The full lifecycle — from a parent's first inquiry to a graduating student's transfer certificate — has no single source of truth.",
      problem:
        "Nine distinct user types (Super Admin, Platform Owner, Admin, Finance, Librarian, Principal, Teacher, Student, Parent) each need a focused interface and authority boundary. Indian-specific requirements pile on: CBSE / ICSE / State board report card formats, SMS OTP via MSG91 for parent contact, UDISE government compliance reporting, Razorpay for online fee collection, and Indian payroll components (PF, ESI, TDS). Storage backend should be swappable between local disk, S3, R2, B2, or MinIO depending on the school's deployment.",
      approach:
        "Django 5 + DRF backend with 26 domain-bounded apps and a React 18 + Vite + TypeScript front end with role-isolated route groups. Auth supports email/password, email and SMS OTP, Google OAuth2, and TOTP 2FA — with JWT refresh-token rotation and blacklisting. PostgreSQL for source-of-truth, Redis for cache plus SSE event stream plus Celery broker. Celery + Celery Beat handle scheduled announcements and OTP delivery. Pluggable storage (local / S3 / R2 / B2 / MinIO) toggled via env. AI question generation pipeline extracts text from uploaded PDFs and produces 2-mark / 5-mark questions with rubrics. drf-spectacular auto-generates Swagger documentation across all 280+ route declarations.",
      features: [
        "9 role-based dashboards (Super Admin, Platform Owner, Admin, Finance, Librarian, Principal, Teacher, Student, Parent) with custom DRF permission classes on every endpoint",
        "Admissions pipeline state machine: pending → verified → approved → finalized, with document verification at each stage",
        "Configurable fee templates per grade per academic year — auto-applied on enrollment, with scholarships, sibling discounts, and merit awards",
        "Report card engine: CBSE / ICSE / State / Custom templates; data snapshot-frozen at generation for audit integrity; status flow draft → final → distributed",
        "Certificate templates (Transfer, Bonafide, Character, Migration) with placeholder rendering and serial-number tracking",
        "Asynchronous AI assessment workflows on Celery and Redis — question generation from source PDFs (2-mark, 5-mark, answer keys, rubrics), exam-blueprint creation, online assessment, and written-answer grading",
        "Indian payroll with Basic / HRA / DA / PF / ESI / TDS components, monthly runs with attendance-based calculation",
        "Hardened auth: JWT rotation + blacklisting, OTP login, rate limiting (5 login/min, 3 password reset/min), TOTP 2FA, PostgreSQL row-level security for school-level data separation, and audit logging on critical operations",
        "Auto-generated API docs via drf-spectacular at /api/docs/ (Swagger) and /api/schema/ (OpenAPI)",
      ],
      impact:
        "26 Django apps, 280+ API route declarations, 129 multi-tenant models over 185 migrations, and 174 frontend page components across 14 role-scoped route groups. UDISE government compliance reporting and a dedicated mobile app module are built in. Currently in active development for deployment to Indian K-12 institutions.",
      screenshots: [{ src: "/images/projects/project-7.jpg", alt: "Acadrix dashboard" }],
    },
  },
  /*
   * Jumbo Quiz and MeterSquare ERP are Redlitmus client work, not personal projects —
   * there is no public URL or repository to link, so `image` is omitted and the case
   * study is the only destination.
   *
   * The copy below is derived strictly from the resume bullets in `content/resume.ts`
   * and deliberately carries no invented metrics. Both entries want a real `impact`
   * paragraph with measured numbers before they carry weight in an interview.
   */
  {
    slug: "jumbo-quiz",
    title: "Jumbo Quiz",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Turns uploaded PDF, DOCX, and spreadsheet coursework into ready question papers through a LangGraph + OpenAI pipeline with pgvector retrieval — replacing manual paper-setting.",
    tags: ["Django 5", "DRF", "Python", "LangGraph", "OpenAI", "pgvector", "PostgreSQL"],
    featured: true,
    caseStudy: {
      context:
        "Setting a question paper is slow, repetitive work. An educator reads through the source material, decides on coverage and difficulty spread, then writes each question by hand — repeating the whole exercise for every subject, every term.",
      problem:
        "Coursework arrives in whatever format the department already uses: PDF chapters, DOCX handouts, spreadsheet question banks. A generation pipeline has to accept all three and stay grounded in the uploaded material — a model asked to write questions from a topic name alone will invent content that was never taught.",
      approach:
        "A Django 5 + DRF backend ingests the uploaded document, extracts its text, and embeds it into pgvector so generation retrieves from the actual source rather than from model recall. Generation runs as a LangGraph pipeline over the OpenAI API, which makes the multi-step flow — retrieve, draft, check, assemble — explicit and inspectable rather than a single opaque prompt.",
      features: [
        "Accepts PDF, DOCX, and spreadsheet coursework through one upload path",
        "pgvector retrieval grounds every generated question in the uploaded source material",
        "LangGraph pipeline models generation as inspectable steps instead of one opaque prompt call",
        "Assembles generated questions into a complete, ready-to-use question paper",
      ],
      impact:
        "Replaces manual paper-setting: an educator uploads the coursework they already have and receives an assembled question paper grounded in it. Delivered in production at Redlitmus Communications.",
      screenshots: [],
    },
  },
  {
    slug: "metersquare-erp",
    title: "MeterSquare ERP",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Construction ERP unifying costing, procurement, material and labour tracking, payroll, and maintenance under a single nine-role approval hierarchy with value-threshold gates and row-level security.",
    tags: ["FastAPI", "Python", "Supabase", "PostgreSQL", "Row-Level Security"],
    featured: true,
    caseStudy: {
      context:
        "Costing, procurement, material and labour tracking, payroll, and maintenance are usually five disconnected systems. Each one has its own idea of who may approve what, so authority is re-implemented five times and agrees with itself nowhere.",
      problem:
        "Nine distinct roles need different authority over the same records, and approval cannot be a flat yes/no — what a role may sign off depends on the value of the transaction. Authorisation enforced only in application code leaks the moment a new endpoint forgets to check, so the boundary had to sit lower than the API layer.",
      approach:
        "A FastAPI service over Supabase Postgres with all five domains modelled against one shared approval hierarchy, so a role means the same thing whether it is approving a purchase order or a payroll run. Approvals are gated on value thresholds rather than role alone. Access control is enforced by Postgres row-level security, which makes the database — not each individual route handler — the place the rule is guaranteed.",
      features: [
        "One nine-role approval hierarchy shared across all five domains",
        "Value-threshold approval gates — authority scales with transaction size, not role alone",
        "Postgres row-level security enforcing access at the database rather than per-route",
        "Costing, procurement, material and labour tracking, payroll, and maintenance in a single system",
      ],
      impact:
        "Five previously separate workflows run against one authority model, so approval rules are defined once instead of re-implemented per module. Row-level security means a missed check in a new endpoint cannot expose another role's records. Delivered in production at Redlitmus Communications.",
      screenshots: [],
    },
  },
  /*
   * Redlitmus client work (repo: suryasblaze/taskmangekol, not public) — no live URL
   * or repository to link, so `image` is omitted and the case study is the only
   * destination. Details below are verified against the codebase itself, not just the
   * resume line: backend/requirements.txt, frontend/package.json, and README.md.
   */
  {
    slug: "office-task-manager",
    title: "Office Task Manager",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Real-time task and ticketing platform for telecom operations — live sync over Flask-SocketIO on gevent, optimistic UI with rollback, automatic overdue escalation, and an AI assistant whose natural-language-to-SQL tool is constrained by a SQL parser rather than by prompting.",
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind",
      "TanStack Query",
      "Flask",
      "Flask-SocketIO",
      "gevent",
      "PostgreSQL",
      "pgvector",
      "Supabase",
    ],
    featured: true,
    caseStudy: {
      context:
        "A telecom operator runs on tickets across departments that barely resemble each other — NOC, Sales, Finance, Development, and general staff each work a different queue with different authority. Work is raised, assigned, escalated, and closed against a clock, and everyone has to be looking at the same queue at the same moment.",
      problem:
        "Three problems compound. Live state must stay consistent across many simultaneous sessions without every client polling the database. The interface has to feel instant on a poor connection yet never leave someone believing an action succeeded when it did not. And an AI assistant that can query the operational database is genuinely dangerous: a natural-language-to-SQL tool talked into the wrong query can read another user's records or table-scan production. A prompt instructing a model to behave is not a security boundary — it is a request the model may decline.",
      approach:
        "Socket.IO runs in gevent mode so websockets stay open across a slow LLM round-trip, with psycogreen making psycopg2 cooperative so one slow query cannot freeze the event loop — and an automatic fallback to threading mode when those extras are absent. Supabase Realtime supplies PostgreSQL change-data-capture, batched behind 100 ms debouncing. The UI updates optimistically and rolls back on error. The assistant retrieves over a vector(1536) pgvector column on the message table, and its SQL path is policed by a sqlparse-based tokenizer enforcing a table allow-list and user-scoped CTE rewriting — the constraint lives in a parser, outside the model, where the model cannot argue with it. A YAML schema file is the single source of truth for which tables mean what.",
      features: [
        "Role-based department dashboards — Admin, Employee, NOC, Sales, Finance, Development — with granular per-role permissions",
        "Live multi-session sync via Supabase Realtime CDC, batched behind 100 ms debouncing rather than client polling",
        "Optimistic UI with automatic rollback — instant feedback that still reflects the real outcome on failure",
        "Universal overdue manager: auto-classifies tasks Low / Medium / High / Critical, freezes overdue items, and routes deadline-extension requests",
        "Task transfer between users and departments with a full audit trail",
        "SOS emergency alerting with priority routing and automatic escalation to management",
        "Presence tracking on a 30-second heartbeat, with reconnection on exponential backoff",
        "AI assistant over vector(1536) pgvector retrieval, with structured tool output exportable straight to CSV",
        "Natural-language-to-SQL guarded by a sqlparse allow-list and user-scoped CTE rewriting, not by prompt wording",
      ],
      impact:
        "Operations staff work one live queue instead of reconciling stale views, and SLA breaches surface on their own rather than on inspection. Because the query guard is a parser rather than a prompt, a misbehaving model still cannot read another user's rows. Socket.IO on gevent keeps websockets alive through the full LLM round-trip, so the assistant answers without dropping the live connection everyone else is using. Delivered in production at Redlitmus Communications.",
      screenshots: [],
    },
  },
  {
    slug: "valoryx-software",
    title: "Valoryx Software",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Offline-first GST billing and business management platform — GST invoicing, inventory, multi-branch operations, thermal printing, suppliers, payroll, and audit — running on the counter through network outages and syncing to Supabase. Page loads went from 3–9 seconds to 1–20ms.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "Flask", "SQLAlchemy", "Supabase", "SQLite", "Redis", "Electron"],
    image: "/images/projects/project-10.jpg",
    liveDemo: "https://valoryx.ryxtech.in",
    featured: true,
    caseStudy: {
      context:
        "Small retailers were juggling a thin billing tool with paper and Excel for every workflow beyond the invoice — pending payments, returns, supplier deliveries, stock movement between branches, expenses, payroll. Month-end audits were painful and the numbers couldn't be trusted.",
      problem:
        "The first version could only create a GST or Non-GST invoice and decrement stock. Every other shop workflow had to happen outside the app. Multi-tenant data isolation was incomplete, internet outages broke the counter entirely, and audits had visible holes — soft-deleted bills were unrecoverable and route-level audit logging was inconsistent. Page loads ran 3–9 seconds because every request hit Supabase over the network.",
      approach:
        "Built a complete multi-tenant POS + back-office on Flask + SQLAlchemy with a Supabase Postgres source-of-truth and a local SQLite mirror for offline operation. Every query is scoped by client_id server-side. The React + TypeScript + Vite + Tailwind front end ships as both a web app and an auto-updating Electron desktop build. Permissions are role + fine-grained (owner / manager / admin / staff / cashier) with TOTP 2FA and full session tracking. Performance moved from live Supabase round-trips to local SQLite plus an in-memory analytics cache.",
      features: [
        "GST and Non-GST invoicing with thermal printing, across multi-branch operations",
        "Multi-tenant client_id isolation enforced on every route, query, and view; offline-first local SQLite mirror keeps billing alive during outages and syncs to Supabase in the background",
        "Full back-office: Pending Bills, Returns/Exchanges, Soft-delete Restore, Branch-aware Stock Transfers, Supplier deliveries with file upload, Bulk Stock Orders (auto-numbered POs), Expenses, Payroll, Notes",
        "Audit log with permission-gated views — every create/update/delete recorded with client_id; view_all_bills vs view_own_bills enforced server-side",
        "Role-based permissions (owner / manager / admin / staff / cashier) with fine-grained route checks",
        "Security: TOTP 2FA, forced password change, IP / last-seen tracking, throttled writes, dedicated security regression suite",
        "Cross-platform: web build plus an auto-updating Electron desktop build from one codebase",
      ],
      impact:
        "Page loads went from 3–9 seconds (live Supabase per request) to 1–20ms (local SQLite + in-memory cache) — a 100×+ speed-up on hot paths. A shop owner now runs the entire day inside Valoryx: sale → pending bill → return → supplier delivery → expense → stock transfer → payroll → audit — without ever opening Excel. Database schema is at v16 with full migration history; every mutation is auditable and reversible. The counter keeps billing during internet outages.",
      screenshots: [{ src: "/images/projects/project-10.jpg", alt: "Valoryx dashboard" }],
    },
  },
  {
    slug: "ai-quiz-generator",
    title: "AI-Powered Quiz Generator",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    summary:
      "Generates four question types from any PDF / DOCX / TXT using OpenAI, with role-isolated auth (JWT for admins, OTP for teachers and students) and a pluggable storage backend swappable via one env toggle.",
    tags: ["Django", "DRF", "React", "Material-UI", "PostgreSQL", "pgvector", "OpenAI", "Supabase"],
    image: "/images/projects/project-6.jpg",
    github: "https://github.com/rameshsurya10/Quiz-Rework",
    featured: true,
    caseStudy: {
      context:
        "Teachers spend significant time turning course material into assessments. The same platform needed to serve three very different user types — admins managing the platform, teachers creating and sharing quizzes, students taking them — with completely different capabilities and auth flows.",
      problem:
        "Manual quiz writing from PDFs and textbook chapters is slow and repetitive. Admin sessions need long-lived secure password auth; teachers and students need low-friction onboarding without per-user password resets. Storage backend choices (local disk for dev, cloud for production) should not require code changes between environments.",
      approach:
        "Built a Django REST + React monorepo. Document upload triggers an AI pipeline that extracts text from PDF / DOCX / TXT and sends it to the OpenAI API to generate four question types (MCQ, Fill in the Blanks, True/False, One-Line). Dual auth strategy: JWT password login for admins, email OTP for teachers and students. Pluggable storage layer (local file storage / Supabase / AWS S3) toggled via the `USE_SUPABASE_STORAGE` env flag — zero code change to swap. pgvector PostgreSQL extension stores document embeddings for retrieval. drf-yasg auto-generates Swagger and ReDoc documentation.",
      features: [
        "Four question types generated from any PDF, DOCX, or TXT — MCQ, Fill in the Blanks, True/False, One-Line",
        "Dual auth strategy — JWT password for admins, email OTP for teachers and students; isolated flows in code",
        "Pluggable storage backend — local / Supabase / AWS S3 — switched via a single env toggle, no code changes",
        "pgvector PostgreSQL extension for storing document embeddings",
        "Bulk student onboarding via CSV / XLSX templates, organised into departments",
        "Shareable quiz URLs so teachers can distribute without sending invites individually",
        "Auto-generated API docs via drf-yasg (Swagger at /api/docs/, ReDoc at /api/redoc/)",
        "Three role-isolated interfaces from one codebase: Admin (platform), Teacher (create + share), Student (take + score)",
      ],
      impact:
        "Turns hours of manual quiz writing into the time it takes to upload a PDF. Three audiences served by one codebase with role-isolated auth so neither flow leaks into the other. Storage backend swap is a single env toggle — production can move from local to Supabase to S3 without redeploying any code or touching the call sites.",
      screenshots: [{ src: "/images/projects/project-6.jpg", alt: "AI quiz generator interface" }],
    },
  },
  {
    slug: "alumni-career-analysis",
    title: "Alumni Career Analysis",
    category: "data",
    categoryLabel: "Data Analytics",
    summary:
      "SQL-driven analysis of alumni career trends across industry, role, and tenure — surfaced where the placements are, when salary growth actually kicks in, and which cities dominate as job hubs.",
    tags: ["SQL", "MySQL", "PostgreSQL", "Power BI", "Tableau"],
    image: "/images/projects/project-1.jpg",
    github: "https://github.com/rameshsurya10/Alumni-Career-Analysis",
    featured: true,
    caseStudy: {
      context:
        "Institutions want a clear view of where their graduates end up — across industries, roles, and geography.",
      problem:
        "Raw alumni records had the data but no aggregated view — no easy way to answer where placements concentrate, when salary growth kicks in, or which programmes outperform.",
      approach:
        "SQL queries against MySQL / PostgreSQL segment alumni by industry, role, tenure, and city. Power BI and Tableau layer on top for visualization. Re-running against new data is just re-running the queries.",
      features: [
        "SQL-driven analysis — re-runnable on fresh alumni data",
        "Industry, role, and tenure segmentation",
        "Power BI + Tableau dashboards over the SQL output",
      ],
      impact:
        "Surfaced four findings: IT & Finance dominate placements; salary growth becomes significant after 5+ years; Computer Science graduates have higher placement rates than other programmes; major job hubs are Bangalore, Chennai, and Hyderabad.",
      screenshots: [{ src: "/images/projects/project-1.jpg", alt: "Alumni career analysis dashboard" }],
    },
  },
  {
    slug: "uber-supply-demand-analysis",
    title: "Uber Supply-Demand Gap Analysis",
    category: "data",
    categoryLabel: "Data Analytics",
    summary:
      "Python EDA on Uber trip data exposing where and when supply-demand gaps concentrate, and what drives ride cancellations.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    image: "/images/projects/project-4.jpg",
    github: "https://github.com/rameshsurya10/Uber-Supply-Demand-Gap-EDA",
    featured: true,
    caseStudy: {
      context:
        "Ride-hailing services lose trips when cars aren't available where and when riders request them.",
      problem:
        "Raw Uber trip data hinted at supply-demand gaps but didn't show when they were worst, where they concentrated, or why riders cancelled.",
      approach:
        "EDA in Python with Pandas, NumPy, Matplotlib, and Seaborn — segmenting requests by time slot, location, and trip status to expose the gap patterns.",
      features: [
        "Time-slot and trip-status segmentation",
        "Geographic clustering of shortage hotspots",
        "Cancellation-driver analysis",
      ],
      impact:
        "Three concrete findings: demand spikes during rush hours and weekends; airports and business hubs concentrate the shortages; high wait times directly drive cancellations. These are the basis for targeted supply decisions.",
      screenshots: [{ src: "/images/projects/project-4.jpg", alt: "Uber supply-demand analysis charts" }],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
