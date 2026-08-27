export type ProjectCategory = "fullstack" | "web" | "data";

export interface CaseStudy {
  context: string;
  problem: string;
  approach: string;
  features: string[];
  impact: string;
  screenshots: { src: string; alt: string }[];
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  summary: string;
  tags: string[];
  image: string;
  github?: string;
  liveDemo?: string;
  featured: boolean;
  status?: "ongoing"; // when set, row shows an "Ongoing" tag and no external link is required
  caseStudy?: CaseStudy;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  kind: "education" | "experience";
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "instagram";
}

/** A dated role in the Experience section of the resume. */
export interface ResumeRole {
  title: string;
  organization: string;
  location: string;
  period: string;
  /** Achievement-first bullets. Lead with the outcome, then the mechanism. */
  bullets: string[];
}

/**
 * A resume entry for a portfolio project. `slug` links back to `content/projects.ts`
 * so the title, tech tags, and live URL stay in sync automatically; only the
 * resume-length bullets are authored here.
 */
export interface ResumeProject {
  slug: string;
  /** Short role descriptor shown after the title, e.g. "Multi-tenant Retail POS". */
  descriptor: string;
  bullets: string[];
  /** Tech shown on the resume line — a trimmed subset of the project's full tag list. */
  stack: string[];
}

/** A certification, optionally linking to the issued credential. */
export interface ResumeCertification {
  name: string;
  /** Public URL to the certificate. Rendered as a hyperlink on the name. */
  url?: string;
}

export interface ResumeEducation {
  qualification: string;
  institution: string;
  location: string;
  period: string;
}

export interface ResumeConfig {
  /** Headline under the name. Should match the roles being applied for. */
  targetRole: string;
  summary: string;
  skillGroups: SkillGroup[];
  experience: ResumeRole[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  certifications: ResumeCertification[];
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  whatsapp: string;
  location: string;
  currently: string;
  resumeUrl: string;
  siteUrl: string;
  socials: SocialLink[];
  stack: string[];
  reading: string;
}
