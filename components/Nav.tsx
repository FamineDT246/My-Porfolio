import { caseStudies } from "@/lib/work";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/75 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-display text-lg font-bold text-ink">
            C
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-snow">
            Ceejay Cumberbatch
          </span>
        </a>

        <div className="hidden items-center gap-5 text-[13px] text-mist lg:flex">
          {caseStudies.map((cs) => (
            <a key={cs.id} href={`#work-${cs.id}`} className="whitespace-nowrap transition hover:text-snow">
              {cs.name}
            </a>
          ))}
          <a href="#vision" className="transition hover:text-snow">
            Vision
          </a>
          <a href="#accessibility" className="transition hover:text-snow">
            Accessibility
          </a>
          <a href="#capabilities" className="transition hover:text-snow">
            Capabilities
          </a>
        </div>

        <div className="flex items-center gap-3">
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
            href="mailto:ceejaycumberbatch@gmail.com?subject=Portfolio%20Inquiry"
            className="whitespace-nowrap rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold-deep"
          >
            Let&apos;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
