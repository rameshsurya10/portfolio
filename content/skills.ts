import type { SkillGroup } from "@/lib/types";

/**
 * The portfolio-facing skills grid. Grouped for scanning rather than for ATS
 * keyword matching — `content/resume.ts` keeps its own, differently-cut list for
 * that. Both are kept factually consistent: nothing appears here that isn't
 * backed by a shipped project in `content/projects.ts`.
 */
export const skillGroups: SkillGroup[] = [
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
      "Electron",
    ],
  },
  {
    name: "Backend & APIs",
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
    name: "AI & Data",
    skills: [
      "OpenAI API",
      "LangChain",
      "LangGraph",
      "RAG",
      "pgvector",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
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
];
