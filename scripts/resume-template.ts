import type { ResumeConfig, SiteConfig } from "@/lib/types";
import { resolveResumeProject } from "../content/resume";

/**
 * Renders the resume as a single-column, print-targeted HTML document.
 *
 * Single column is a hard requirement, not a style choice: applicant tracking
 * systems flatten the PDF to plain text before keyword matching, and multi-column
 * layouts interleave line-by-line across the columns, corrupting every sentence.
 *
 * For the same reason there is no photo, no icon font, and no image of any kind —
 * everything on the page is selectable text.
 */

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Strips the protocol so links print as `github.com/user` rather than the full URL. */
const displayUrl = (url: string): string => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const link = (href: string, label?: string): string =>
  `<a href="${escapeHtml(href)}">${escapeHtml(label ?? displayUrl(href))}</a>`;

const bulletList = (bullets: string[]): string =>
  `<ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`;

const section = (title: string, body: string): string =>
  `<section><h2>${escapeHtml(title)}</h2>${body}</section>`;

const styles = `
  @page { size: A4; margin: 11mm 12mm; }

  :root {
    --ink: #1a1a1a;
    --muted: #4a5058;
    --accent: #16324f;
    --rule: #c8ccd2;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: "Liberation Sans", Helvetica, Arial, sans-serif;
    font-size: 9.3pt;
    line-height: 1.34;
    color: var(--ink);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  a { color: var(--accent); text-decoration: none; }

  /* ---------- header ---------- */
  header { margin-bottom: 9pt; }

  h1 {
    font-size: 20pt;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: var(--accent);
    line-height: 1.1;
  }

  .target-role {
    font-size: 10.5pt;
    font-weight: 600;
    color: var(--ink);
    margin-top: 2pt;
  }

  .contact {
    font-size: 8.6pt;
    color: var(--muted);
    margin-top: 4pt;
  }

  .contact span + span::before { content: " · "; color: var(--rule); }

  /* ---------- sections ---------- */
  section { margin-top: 7.5pt; }

  h2 {
    font-size: 8.8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--accent);
    border-bottom: 0.8pt solid var(--rule);
    padding-bottom: 2pt;
    margin-bottom: 5pt;
  }

  .summary { text-align: justify; }

  /* ---------- skills ---------- */
  .skill-row { margin-bottom: 2.2pt; }
  .skill-row:last-child { margin-bottom: 0; }
  .skill-label { font-weight: 700; }
  .skill-label::after { content: ": "; }

  /* ---------- entries (experience + projects) ---------- */
  .entry { margin-bottom: 5.5pt; }
  .entry:last-child { margin-bottom: 0; }

  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8pt;
  }

  .entry-title { font-size: 9.8pt; font-weight: 700; }
  .entry-title .descriptor { font-weight: 400; color: var(--muted); }
  .entry-period { font-size: 8.6pt; color: var(--muted); white-space: nowrap; }

  .entry-meta { font-size: 8.6pt; color: var(--muted); margin-top: 0.5pt; }
  .entry-meta .stack { font-style: italic; }

  ul { list-style: none; margin-top: 2.5pt; }

  li {
    padding-left: 9pt;
    position: relative;
    margin-bottom: 1.3pt;
  }

  li::before {
    content: "–";
    position: absolute;
    left: 0;
    color: var(--muted);
  }

  /* ---------- education + certifications ---------- */
  .edu { display: flex; justify-content: space-between; gap: 8pt; margin-bottom: 3pt; }
  .edu:last-child { margin-bottom: 0; }
  .edu-qual { font-weight: 700; }
  .edu-inst { color: var(--muted); }
  .certs { margin-top: 2.5pt; }

  /* ---------- unfinished-content marker ---------- */
  .pending-note { color: #b03030; font-style: italic; }

  .pending {
    border: 1pt dashed #b03030;
    color: #b03030;
    padding: 5pt 7pt;
    font-size: 8.6pt;
    border-radius: 2pt;
  }

  /* Never split an entry across a page break. */
  .entry, .edu { break-inside: avoid; page-break-inside: avoid; }
  h2 { break-after: avoid; page-break-after: avoid; }
`;

const renderHeader = (site: SiteConfig, resume: ResumeConfig): string => {
  const github = site.socials.find((s) => s.icon === "github")?.href;
  const linkedin = site.socials.find((s) => s.icon === "linkedin")?.href;

  // Instagram is deliberately excluded — personal social accounts do not belong on a resume.
  const contacts = [
    link(`mailto:${site.email}`, site.email),
    link(`tel:+${site.whatsapp}`, `+${site.whatsapp}`),
    escapeHtml("Tiruppur, Tamil Nadu, India"),
    linkedin ? link(linkedin, "LinkedIn") : "",
    github ? link(github, "GitHub") : "",
    link(site.siteUrl, displayUrl(site.siteUrl)),
  ].filter(Boolean);

  return `<header>
    <h1>${escapeHtml(site.name)}</h1>
    <div class="target-role">${escapeHtml(resume.targetRole)}</div>
    <div class="contact">${contacts.map((c) => `<span>${c}</span>`).join("")}</div>
  </header>`;
};

const renderSkills = (resume: ResumeConfig): string =>
  resume.skillGroups
    .map(
      (group) =>
        `<div class="skill-row"><span class="skill-label">${escapeHtml(group.name)}</span>` +
        `${escapeHtml(group.skills.join(" · "))}</div>`,
    )
    .join("");

const renderExperience = (resume: ResumeConfig): string =>
  resume.experience
    .map((role) => {
      const body = role.bullets.length
        ? bulletList(role.bullets)
        : `<ul><li class="pending-note">Bullets pending.</li></ul>`;

      return `<div class="entry">
        <div class="entry-head">
          <div class="entry-title">${escapeHtml(role.title)}</div>
          <div class="entry-period">${escapeHtml(role.period)}</div>
        </div>
        <div class="entry-meta">${escapeHtml(`${role.organization} · ${role.location}`)}</div>
        ${body}
      </div>`;
    })
    .join("");

const renderProjects = (resume: ResumeConfig): string =>
  resume.projects
    .map((entry) => {
      const project = resolveResumeProject(entry);
      const url = project.liveDemo ?? project.github;
      const tail = project.ongoing && !url ? `<span>In development</span>` : "";

      return `<div class="entry">
        <div class="entry-head">
          <div class="entry-title">
            ${escapeHtml(project.title)}
            <span class="descriptor">— ${escapeHtml(entry.descriptor)}</span>
          </div>
          <div class="entry-period">${url ? link(url) : tail}</div>
        </div>
        <div class="entry-meta"><span class="stack">${escapeHtml(entry.stack.join(" · "))}</span></div>
        ${bulletList(entry.bullets)}
      </div>`;
    })
    .join("");

const renderEducation = (resume: ResumeConfig): string =>
  resume.education
    .map(
      (edu) => `<div class="edu">
        <div>
          <span class="edu-qual">${escapeHtml(edu.qualification)}</span>
          <span class="edu-inst">${escapeHtml(` — ${edu.institution}, ${edu.location}`)}</span>
        </div>
        <div class="entry-period">${escapeHtml(edu.period)}</div>
      </div>`,
    )
    .join("");

/**
 * Certifications ride along inside the Education section rather than claiming a
 * heading of their own — they are a single line, and a dedicated heading plus rule
 * costs more vertical space than the content is worth.
 */
const renderCertifications = (resume: ResumeConfig): string => {
  if (!resume.certifications.length) return "";
  // Linked certificates keep the name as visible text so the ATS still reads the
  // keyword — the URL rides along in the annotation rather than replacing it.
  const items = resume.certifications
    .map((cert) => (cert.url ? link(cert.url, cert.name) : escapeHtml(cert.name)))
    .join(" · ");
  return `<div class="certs"><span class="skill-label">Certifications</span>${items}</div>`;
};

export function renderResumeHtml(site: SiteConfig, resume: ResumeConfig): string {
  const hasExperienceBullets = resume.experience.some((role) => role.bullets.length > 0);

  const experienceSection = hasExperienceBullets
    ? renderExperience(resume)
    : `<div class="pending">Experience bullets not yet supplied — this section is incomplete. ` +
      `Add them to <strong>content/resume.ts</strong> and re-run <strong>npm run resume:pdf</strong>.</div>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(`${site.name} — ${resume.targetRole}`)}</title>
  <style>${styles}</style>
</head>
<body>
  ${renderHeader(site, resume)}
  ${section("Summary", `<p class="summary">${escapeHtml(resume.summary)}</p>`)}
  ${section("Experience", experienceSection)}
  ${section("Selected Projects", renderProjects(resume))}
  ${section("Technical Skills", renderSkills(resume))}
  ${section("Education & Certifications", renderEducation(resume) + renderCertifications(resume))}
</body>
</html>`;
}
