import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("projects content", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every featured project has a case study", () => {
    for (const p of projects.filter((p) => p.featured)) {
      expect(p.caseStudy, `${p.slug} must have a caseStudy`).toBeDefined();
    }
  });

  /*
   * `featured` does not control what the Work section shows — that renders every
   * project. It drives exactly two things: which slugs `generateStaticParams`
   * prerenders, and which URLs land in the sitemap. So the invariant that matters is
   * that a featured project actually has a case-study page to prerender, not how many
   * of them there are.
   */
  it("features every project that has a case study, so none is left unprerendered", () => {
    for (const p of projects.filter((p) => p.caseStudy)) {
      expect(p.featured, `${p.slug} has a caseStudy but is not featured — its page will not prerender`).toBe(true);
    }
  });

  it("every project has at least one destination — case study, github, or live demo", () => {
    for (const p of projects) {
      const hasDestination = Boolean(p.caseStudy || p.github || p.liveDemo);
      expect(hasDestination, `${p.slug} needs at least a case study, github, or liveDemo`).toBe(true);
    }
  });
});
