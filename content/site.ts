import type { SiteConfig } from "@/lib/types";

export const site: SiteConfig = {
  name: "Ramesh Aravindh T",
  role: "Full-Stack Developer & Data Analyst",
  tagline:
    "I build full-stack web applications and turn data into decisions — bridging engineering and analytics.",
  email: "ramesharavindht@gmail.com",
  whatsapp: "918667258008",
  location: "India",
  currently: "Building Acadrix — a multi-role school platform for Indian K-12",
  // Served CV — the generated resume. `npm run resume:pdf` writes exactly here, so
  // editing content/resume.ts and regenerating updates what the site hands out.
  // (The earlier hand-authored FlowCV export still sits at public/Ramesh-Resume.pdf.)
  resumeUrl: "/resume/Ramesh.pdf",
  siteUrl: "https://ramesharavindh.vercel.app",
  socials: [
    { label: "GitHub", href: "https://github.com/rameshsurya10", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ramesharavindh08/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/king_of_heart_robber/", icon: "instagram" },
  ],
  stack: ["Cursor", "VS Code", "GitHub", "Linear", "Figma", "Tmux"],
  reading: "Designing Data-Intensive Applications",
};
