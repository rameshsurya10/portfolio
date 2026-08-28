import type { TimelineEntry } from "@/lib/types";

/**
 * The portfolio's Experience & education timeline.
 *
 * Highlights carry the same facts as the resume bullets in `content/resume.ts`,
 * rewritten shorter for screen reading — the resume is scanned in six seconds, this
 * is read at leisure. Keep the two factually in step: if a claim changes here it
 * must change there, and the metrics must stay identical.
 */
export const timeline: TimelineEntry[] = [
  {
    title: "Full-Stack Developer",
    organization: "Redlitmus Communications · Full-time",
    period: "May 2025 — Present",
    kind: "experience",
    highlights: [
      "Built Jumbo Quiz — a Django 5 + DRF platform turning uploaded coursework into ready question papers through a LangGraph + OpenAI pipeline grounded in pgvector retrieval.",
      "Built MeterSquare ERP on FastAPI and Supabase Postgres, unifying costing, procurement, material and labour tracking, payroll, and maintenance under one nine-role approval hierarchy with row-level security.",
      "Delivered Office Task Manager, a real-time telecom task and ticketing platform on Flask-SocketIO over gevent, with change-data-capture sync, optimistic UI with rollback, and SLA escalation that auto-classifies and freezes overdue tasks.",
      "Shipped that platform's AI assistant: RAG over 1536-dimension pgvector embeddings, plus a read-only natural-language-to-SQL tool secured structurally rather than by prompting.",
    ],
  },
  {
    title: "Python Developer Intern",
    organization: "Nobel Software",
    period: "Sep 2024 — Apr 2025 · 8 mo",
    kind: "experience",
    // Deliberately one line, matching the resume. This was a training-focused
    // internship; inventing achievements to pad it would be the easiest claim on the
    // whole site to expose in an interview.
    highlights: [
      "Built practical Python and SQL foundations through hands-on training, and helped newer interns work through core concepts.",
    ],
  },
  {
    title: "Post Graduate Programme, Data Analytics & Data Science",
    organization: "Skill Lync",
    period: "2023 — 2024",
    kind: "education",
  },
  {
    title: "B.E. Computer Science and Engineering",
    organization: "RVS College of Engineering and Technology",
    period: "2019 — 2023",
    kind: "education",
  },
];
