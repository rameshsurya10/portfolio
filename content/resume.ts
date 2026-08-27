import type { ResumeConfig } from "@/lib/types";
import { projects } from "./projects";

/**
 * Resume content. Deliberately separate from the portfolio copy in `projects.ts`:
 * case studies are written to be read, resume bullets are written to be scanned.
 *
 * Project titles, live URLs, and existence are still pulled from `projects.ts` at
 * build time via `resolveResumeProject` below, so a project renamed or removed there
 * fails the resume build instead of silently drifting out of sync.
 */
export const resume: ResumeConfig = {
  targetRole: "Full-Stack Developer",

  summary:
    "Full-Stack Developer with 2 years shipping production Django, Flask, and FastAPI services with " +
    "React front ends, including AI features in live use: RAG over pgvector, LangGraph generation " +
    "pipelines, and a natural-language-to-SQL tool secured structurally rather than by prompting. " +
    "Cut page loads on a live POS from 3–9 seconds to 1–20 ms.",

  skillGroups: [
    {
      name: "Languages",
      skills: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
    },
    {
      name: "Backend",
      skills: [
        "Django",
        "Django REST Framework",
        "Flask",
        "FastAPI",
        "SQLAlchemy",
        "Celery",
        "Socket.IO",
        "REST APIs",
        "JWT",
        "OAuth2",
      ],
    },
    {
      name: "Frontend",
      skills: [
        "React",
        "Next.js",
        "Vite",
        "Redux Toolkit",
        "TanStack Query",
        "Tailwind CSS",
        "Material UI",
      ],
    },
    {
      name: "AI & Data",
      skills: [
        "OpenAI API",
        "LangChain",
        "LangGraph",
        "RAG",
        "pgvector",
        "Pandas",
        "NumPy",
        "Power BI",
        "Tableau",
      ],
    },
    {
      name: "Databases & Infrastructure",
      skills: [
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "Redis",
        "Supabase",
        "Neo4j",
        "Docker",
        "AWS S3",
        "Linux",
        "Git",
      ],
    },
  ],

  // Dates and employers are confirmed from content/experience.ts.
  experience: [
    {
      title: "Full-Stack Developer",
      organization: "Redlitmus Communications",
      location: "India",
      period: "May 2025 — Present",
      bullets: [
        "Built Jumbo Quiz, a Django 5 + DRF platform that turns uploaded PDF, DOCX, and spreadsheet " +
          "coursework into ready question papers via a LangGraph + OpenAI pipeline with pgvector " +
          "retrieval, replacing manual paper-setting.",
        "Built MeterSquare ERP on FastAPI and Supabase Postgres — costing, procurement, material and " +
          "labour tracking, payroll, and maintenance under one nine-role approval hierarchy with " +
          "value-threshold gates and row-level security.",
        "Delivered a real-time task and ticketing platform for telecom operations on Flask-SocketIO over " +
          "gevent, with change-data-capture sync, optimistic UI with rollback, and SLA escalation that " +
          "auto-classifies and freezes overdue tasks.",
        "Shipped that platform's AI assistant: RAG over 1536-dimension pgvector embeddings, plus a " +
          "read-only natural-language-to-SQL tool secured structurally rather than by prompting — " +
          "AST-level table allow-listing, user-scoped CTE shadowing, injected LIMIT caps, and query " +
          "timeouts, with every call audit-logged.",
      ],
    },
    {
      title: "Python Developer Intern",
      organization: "Nobel Software",
      location: "India",
      period: "Sep 2024 — Apr 2025",
      // Deliberately one line. This was a training-focused internship; padding it with
      // invented achievements would be the easiest thing on this resume to expose in an
      // interview, and the Redlitmus role already carries the weight.
      bullets: [
        "Built practical Python and SQL foundations through hands-on training, and helped newer " +
          "interns work through core concepts.",
      ],
    },
  ],

  projects: [
    {
      slug: "valoryx-software",
      descriptor: "Multi-tenant Retail POS & Back-Office",
      stack: ["React", "TypeScript", "Flask", "SQLAlchemy", "Supabase", "SQLite", "Redis", "Electron"],
      bullets: [
        "Cut page loads from 3–9 seconds to 1–20 ms — a 100×+ improvement on hot paths — by replacing " +
          "per-request Supabase round-trips with a local SQLite mirror and an in-memory analytics cache.",
        "Built offline-first billing that keeps the counter running through internet outages and syncs to " +
          "Supabase Postgres on reconnect, with multi-tenant isolation on every query, five-role " +
          "permissions, and TOTP 2FA.",
      ],
    },
    {
      slug: "bigtreat-mlm-platform",
      descriptor: "MLM Commission Platform & Media Feed",
      stack: ["React", "TypeScript", "Redux Toolkit", "Flask", "PostgreSQL", "Redis", "Gunicorn"],
      bullets: [
        "Reduced the profile page from hundreds of API calls per second to exactly one on mount by " +
          "correcting a useEffect dependency defect.",
        "Moved the JWT blacklist to Redis for consistent logout across 64 concurrent handlers (8 Gunicorn " +
          "workers × 8 threads), made reactivation race-safe with row-level locking, and tuned the " +
          "deployment to ~300–500 requests/second.",
      ],
    },
    {
      slug: "acadrix-school-platform",
      descriptor: "K-12 School Management Platform",
      stack: ["Django 5", "DRF", "React 18", "TypeScript", "PostgreSQL", "Redis", "Celery"],
      // Single bullet, and deliberately the scale one rather than the AI one: question
      // generation is already covered by the Jumbo Quiz bullet under Redlitmus, so this
      // entry earns its space on breadth (apps, endpoints, tables, roles) instead.
      bullets: [
        "Architected 13 domain-bounded Django apps over 94 multi-tenant models, exposing 140+ " +
          "OpenAPI-documented REST routes across seven role-scoped dashboards.",
      ],
    },
  ],

  education: [
    {
      qualification: "B.E. Computer Science and Engineering",
      institution: "RVS College of Engineering and Technology",
      location: "Coimbatore, India",
      period: "2019 — 2023",
    },
    {
      qualification: "Post Graduate Programme, Data Analytics & Data Science",
      institution: "Skill Lync",
      location: "India",
      period: "2023 — 2024",
    },
  ],

  // URLs recovered from the link annotations in the previous resume PDF, kept in the
  // order they appeared there. VERIFY each one opens the certificate it is named for —
  // annotation order is a strong hint, not a guarantee.
  certifications: [
    { name: "Python Programming", url: "https://drive.google.com/file/d/1LHwP6fDrT2KGGrJA0MkFzktIChY4jCjj/view" },
    { name: "MySQL", url: "https://drive.google.com/file/d/1tRQ-jllT9MfhUWts-9WAmfnZDDPm5HMW/view" },
    { name: "Power BI", url: "https://drive.google.com/file/d/14Ry9KhXdQglW5QDLuxR80JwsPAJ4rA5j/view" },
    { name: "Tableau", url: "https://drive.google.com/file/d/1Q-Sik1I5lvm6NQ-iJ_oaHPWIuqzY4zqn/view" },
    { name: "Advanced Excel", url: "https://drive.google.com/file/d/1o62AOEMAeKcN3G_dXAYsMNK9m5cir9RB/view" },
  ],
};

/**
 * Joins a resume project to its portfolio entry so the title and live URL have one
 * definition. Throws rather than rendering a half-empty entry — a resume that
 * silently loses a project is worse than a build that fails.
 */
export function resolveResumeProject(entry: ResumeConfig["projects"][number]) {
  const source = projects.find((p) => p.slug === entry.slug);
  if (!source) {
    throw new Error(
      `resume.ts references project "${entry.slug}", which no longer exists in content/projects.ts`,
    );
  }
  return {
    ...entry,
    title: source.title.split(" — ")[0],
    liveDemo: source.liveDemo,
    github: source.github,
    ongoing: source.status === "ongoing",
  };
}
