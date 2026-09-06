"use client";

import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/lib/work";

export default function Nav() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const desktopWrapRef = useRef<HTMLDivElement>(null);
  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // close on Escape
  useEffect(() => {
    if (!projectsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProjectsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [projectsOpen]);

  // close on click outside either dropdown
  useEffect(() => {
    if (!projectsOpen) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      const inDesktop = desktopWrapRef.current?.contains(t) ?? false;
      const inMobile = mobileWrapRef.current?.contains(t) ?? false;
      if (!inDesktop && !inMobile) setProjectsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [projectsOpen]);

  const hoverOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProjectsOpen(true);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setProjectsOpen(false), 180);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/75 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-display text-lg font-bold text-ink">
            C
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight text-snow sm:block">
            Ceejay Cumberbatch
          </span>
        </a>

        <div className="hidden items-center gap-6 text-[13px] text-mist lg:flex">
          {/* Projects dropdown */}
          <div
            ref={desktopWrapRef}
            className="relative"
            onMouseEnter={hoverOpen}
            onMouseLeave={hoverClose}
          >
            <button
              type="button"
              aria-expanded={projectsOpen}
              aria-controls="nav-projects-desktop"
              onClick={() => setProjectsOpen((v) => !v)}
              className={`flex items-center gap-1.5 py-2 transition ${
                projectsOpen ? "text-snow" : "hover:text-snow"
              }`}
            >
              Projects
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  projectsOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {projectsOpen && (
              <div
                id="nav-projects-desktop"
                className="absolute left-1/2 top-full w-[360px] max-w-[calc(100vw-2.5rem)] -translate-x-1/2 rounded-xl border border-line bg-panel p-2 shadow-2xl"
              >
                {caseStudies.map((cs) => (
                  <a
                    key={cs.id}
                    href={`#work-${cs.id}`}
                    onClick={() => setProjectsOpen(false)}
                    className="block rounded-lg px-3 py-2.5 transition hover:bg-white/5"
                  >
                    <span className="block text-sm font-semibold text-snow">
                      {cs.name}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-mist">
                      {cs.tagline}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#vision" className="whitespace-nowrap py-2 transition hover:text-snow">
            Vision
          </a>
          <a href="#accessibility" className="whitespace-nowrap py-2 transition hover:text-snow">
            Accessibility
          </a>
          <a href="#capabilities" className="whitespace-nowrap py-2 transition hover:text-snow">
            Capabilities
          </a>
        </div>

        {/* Mobile + compact: Projects dropdown lives here too */}
        <div className="flex items-center gap-3">
          <div ref={mobileWrapRef} className="relative lg:hidden">
            <button
              type="button"
              aria-expanded={projectsOpen}
              aria-controls="nav-projects-mobile"
              onClick={() => setProjectsOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[13px] text-snow transition hover:border-mist"
            >
              Projects
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  projectsOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {projectsOpen && (
              <div
                id="nav-projects-mobile"
                className="absolute right-0 top-full mt-3 w-[300px] rounded-xl border border-line bg-panel p-2 shadow-2xl"
              >
                {caseStudies.map((cs) => (
                  <a
                    key={cs.id}
                    href={`#work-${cs.id}`}
                    onClick={() => setProjectsOpen(false)}
                    className="block rounded-lg px-3 py-2.5 transition hover:bg-white/5"
                  >
                    <span className="block text-sm font-semibold text-snow">
                      {cs.shortName ?? cs.name}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-mist">
                      {cs.tagline}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://github.com/FamineDT246"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden text-mist transition hover:text-snow sm:block"
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
          </a>
          <a
            href="mailto:hello@coreislesolutions.com?subject=Portfolio%20Inquiry"
            className="whitespace-nowrap rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold-deep"
          >
            Let&apos;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
