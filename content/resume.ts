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
    "Focused on building production applications, data-driven solutions, and intelligent systems, " +
    "combining software development, data analytics, and applied AI to solve practical business problems.",

  skillGroups: [
    {
      name: "Backend",
      skills: [
        "Python",
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
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
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
        "SQL",
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
        // Collapsed from two bullets: the Selected Projects entry below now carries the
        // gevent and natural-language-to-SQL detail, and repeating it here cost a page.
        "Delivered Office Task Manager, a real-time telecom task and ticketing platform with " +
          "change-data-capture sync, optimistic UI with rollback, SLA escalation that auto-classifies " +
          "and freezes overdue tasks, and an AI assistant built on pgvector RAG.",
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
      slug: "office-task-manager",
      descriptor: "Real-Time Telecom Ops Platform & AI Assistant",
      stack: ["React 18", "TypeScript", "Flask-SocketIO", "gevent", "PostgreSQL", "pgvector", "Supabase"],
      bullets: [
        "Ran Socket.IO in gevent mode with psycogreen-cooperative psycopg2 so one slow query cannot " +
          "freeze the event loop, keeping websockets alive across full LLM round-trips.",
        "Bounded the AI assistant's natural-language-to-SQL path with a sqlparse table allow-list and " +
          "user-scoped CTE rewriting — a parser-level boundary, not prompt instructions.",
      ],
    },
    {
      slug: "metersquare-erp",
      descriptor: "Construction ERP & Approval Hierarchy",
      stack: ["FastAPI", "Python", "Supabase", "PostgreSQL", "SQLAlchemy"],
      bullets: [
        "Unified costing, procurement, material and labour tracking, payroll, and maintenance under " +
          "one role hierarchy with value-threshold approval gates, enforced by Postgres row-level " +
          "security rather than per-route checks.",
      ],
    },
    {
      slug: "valoryx-software",
      descriptor: "Offline-First GST Billing & Business Management Platform",
      stack: ["React", "TypeScript", "Flask", "SQLAlchemy", "Supabase", "SQLite", "Electron"],
      bullets: [
        "Built an offline-first billing platform covering GST invoicing, inventory, multi-branch " +
          "operations, business reporting, and thermal printing, with multi-tenant isolation on every " +
          "query and TOTP 2FA.",
        "Cut page loads from 3–9 seconds to 1–20 ms — a 100×+ improvement on hot paths — by replacing " +
          "per-request Supabase round-trips with a local SQLite mirror that keeps the counter running " +
          "through network outages and syncs on reconnect.",
        "Shipped one codebase as both a responsive web app and an auto-updating Electron desktop build, " +
          "with dashboards for sales and operational performance.",
      ],
    },
    {
      slug: "acadrix-school-platform",
      descriptor: "Multi-Tenant School Management & AI Assessment Platform",
      stack: ["Django 5", "DRF", "React 18", "TypeScript", "PostgreSQL", "Redis", "Celery"],
      bullets: [
        "Architected 26 domain-bounded Django apps over 129 multi-tenant models, exposing 280+ " +
          "OpenAPI-documented REST routes across nine role-scoped dashboards — covering admissions, " +
          "academics, attendance, fees, examinations, transport, library, and HR/payroll.",
        "Implemented tenant isolation, RBAC, JWT and OTP authentication, TOTP 2FA, and PostgreSQL " +
          "row-level security for school-level data separation.",
        "Built asynchronous AI workflows on Celery and Redis for question generation, exam-blueprint " +
          "creation, online assessment, and written-answer grading.",
      ],
    },
    {
      slug: "uber-supply-demand-analysis",
      descriptor: "Python EDA & BI",
      stack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI"],
      bullets: [
        "Analysed ride-request, cancellation, and fulfilment patterns to isolate peak-demand periods " +
          "and the locations where supply shortages concentrate.",
        "Cleaned and explored trip-level data with time- and location-based segmentation, then " +
          "reported through Power BI with recommendations for driver allocation and availability.",
      ],
    },
    {
      slug: "alumni-career-analysis",
      descriptor: "SQL Segmentation & BI Dashboards",
      stack: ["SQL", "MySQL", "PostgreSQL", "Python", "Pandas", "Power BI", "Tableau"],
      bullets: [
        "Used SQL and exploratory analysis to examine career paths, industry distribution, job roles, " +
          "and salary progression across alumni records.",
        "Built analytical views and visualisations answering business questions on industry growth, " +
          "career progression, and compensation trends.",
      ],
    },
  ],

  education: [
    {
      qualification: "Post Graduate Programme, Data Analytics & Data Science",
      institution: "Skill Lync",
      location: "India",
      period: "2023 — 2024",
    },
    {
      qualification: "B.E. Computer Science and Engineering",
      institution: "RVS College of Engineering and Technology",
      location: "Coimbatore, India",
      period: "2019 — 2023",
    },
  ],

  // Corroborated against two independent sources: the link annotations in the previous
  // resume PDF, and the hand-built FlowCV export where each URL was pasted next to its
  // own certificate name. Both agree on this exact set and order.
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
