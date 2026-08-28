import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { resume } from "../content/resume";
import { site } from "../content/site";
import { renderResumeHtml } from "./resume-template";

/**
 * Renders the resume to a PDF with real, selectable text — Chromium's `page.pdf()`
 * embeds the text layer rather than rasterising, which is what applicant tracking
 * systems need in order to parse it.
 *
 * Usage: npm run resume:pdf  [-- --html]
 *   --html  also writes the intermediate HTML next to the PDF for layout debugging
 */

/**
 * Output path is derived from `site.resumeUrl` rather than duplicated here, so the
 * file this script writes and the file the "Download CV" button serves can never
 * drift apart — renaming one without the other previously produced a silent 404.
 */
/*
 * Derived from `site.resumeUrl` so the file this script writes and the file the
 * "Download CV" button serves cannot drift apart — renaming one without the other
 * previously produced a silent 404.
 *
 * path.join, not path.resolve: `site.resumeUrl` is root-relative ("/resume/..."),
 * and path.resolve would treat that leading slash as absolute and discard "public".
 */
const OUT_PATH = path.resolve(process.cwd(), path.join("public", site.resumeUrl));
const OUT_DIR = path.dirname(OUT_PATH);
const OUT_FILE = path.basename(OUT_PATH);

/** A4 content box in CSS pixels at 96 dpi, after the 11mm × 13mm @page margins. */
const MM_TO_PX = 96 / 25.4;
const PAGE_WIDTH_PX = Math.round((210 - 13 * 2) * MM_TO_PX);
const PAGE_HEIGHT_PX = Math.round((297 - 11 * 2) * MM_TO_PX);

async function main() {
  const dumpHtml = process.argv.includes("--html");
  const html = renderResumeHtml(site, resume);

  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: PAGE_WIDTH_PX, height: PAGE_HEIGHT_PX },
    });

    await page.emulateMedia({ media: "print" });
    await page.setContent(html, { waitUntil: "load" });

    const outPath = path.join(OUT_DIR, OUT_FILE);
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    // Measured against the print-media layout at the exact content width, so this
    // tracks the real page count rather than an on-screen approximation.
    const contentHeight = await page.evaluate(() => document.body.scrollHeight);
    const pages = Math.max(1, Math.ceil(contentHeight / PAGE_HEIGHT_PX));
    const fillOfLastPage = Math.round(((contentHeight % PAGE_HEIGHT_PX) / PAGE_HEIGHT_PX) * 100);

    if (dumpHtml) {
      const htmlPath = path.join(OUT_DIR, OUT_FILE.replace(/\.pdf$/, ".html"));
      await writeFile(htmlPath, html, "utf8");
      console.log(`  HTML   ${path.relative(process.cwd(), htmlPath)}`);
    }

    console.log(`\n  PDF    ${path.relative(process.cwd(), outPath)}`);
    console.log(`  Pages  ${pages} (last page ~${fillOfLastPage || 100}% full)`);

    if (pages > 1) {
      console.warn(
        `\n  ! Resume runs to ${pages} pages. With under 3 years of experience, ` +
          `one page is the expectation — trim bullets in content/resume.ts.`,
      );
    }

    const missing = resume.experience.filter((role) => role.bullets.length === 0);
    if (missing.length) {
      console.warn(
        `\n  ! INCOMPLETE — no achievement bullets for: ` +
          `${missing.map((r) => r.organization).join(", ")}.` +
          `\n    Experience is the heaviest-weighted section for shortlisting. ` +
          `Do not send this out yet.`,
      );
    }

    console.log("");
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
