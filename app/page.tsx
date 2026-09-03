import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { BrowserFrame, PhoneFrame } from "@/components/Frames";
import { capabilities, caseStudies, stats, type CaseStudy } from "@/lib/work";

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(52% 42% at 78% -6%, rgba(242,179,61,0.13), transparent 70%), radial-gradient(46% 40% at 12% 8%, rgba(59,90,199,0.16), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 sm:px-8 sm:pt-32">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            Founder-led software studio · Barbados
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="display mt-7 max-w-4xl text-[13vw] font-bold text-snow sm:text-6xl md:text-7xl">
            I build software
            <br />
            that <span className="text-gold">Barbados</span> runs on.
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist">
            I&apos;m Ceejay Cumberbatch, a full-stack engineer and founder. I design
            and ship production products for Caribbean businesses: a payroll
            platform that knows Barbados tax law, a nursery&apos;s storefront, a
            boutique&apos;s back office, a contractor&apos;s operations hub. Not
            prototypes. Products with paying customers.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-xl bg-gold px-6 py-3.5 font-semibold text-ink transition hover:bg-gold-deep"
            >
              See the work
            </a>
            <a
              href="mailto:ceejaycumberbatch@gmail.com?subject=Portfolio%20Inquiry"
              className="rounded-xl border border-line px-6 py-3.5 font-semibold text-snow transition hover:border-mist"
            >
              Start a project
            </a>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <dl className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-panel px-7 py-6">
                <dt className="order-last mt-2 text-sm leading-snug text-mist">
                  {s.label}
                </dt>
                <dd className="font-display text-4xl font-bold text-gold">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" className="relative border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal>
          <div>
            <p className="eyebrow text-gold">The long game</p>
            <h2 className="display mt-5 text-4xl font-bold text-snow sm:text-5xl">
              Software from
              <br />
              the region, for
              <br />
              the region.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-6 text-lg leading-relaxed text-mist">
            <p>
              Every product on this page started the same way: a Barbadian owner
              doing important work by hand because nobody built software for
              them. Payroll that understands NIS and PAYE. A nursery taking
              rental bookings over the phone. A seamstress managing orders in
              WhatsApp threads.
            </p>
            <p>
              So I build it myself: design, engineering, deployment, and the
              aftercare. World-class tools, priced for the businesses here,
              fluent in BBD, parishes, and how work actually gets done on this
              island.
            </p>
            <p className="border-l-2 border-gold pl-6 font-medium text-snow">
              I&apos;m now formalising that mission into a SaaS company of my
              own, registered in Barbados, shipping affordable tools for
              Caribbean small businesses. The four products below are the proof
              of concept.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseStudy({ cs }: { cs: CaseStudy }) {
  const flip = Number(cs.index) % 2 === 0;
  return (
    <article id={`work-${cs.id}`} className={`world ${cs.world}`}>
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="eyebrow" style={{ color: "var(--w-accent)" }}>
              {cs.index} · {cs.eyebrow}
            </p>
            <p className="font-mono text-xs text-[--w-muted]" style={{ color: "var(--w-muted)" }}>
              {cs.year} · {cs.status}
            </p>
          </div>
          <h3 className="display mt-5 text-4xl font-bold sm:text-5xl">
            {cs.name}
            <span
              className="mt-3 block text-xl font-normal sm:text-2xl"
              style={{ color: "var(--w-muted)" }}
            >
              {cs.tagline}
            </span>
          </h3>
        </Reveal>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal className={flip ? "lg:order-2" : ""}>
            <div>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "var(--w-muted)" }}
              >
                The problem
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: "var(--w-fg)" }}>
                {cs.problem}
              </p>

              <p
                className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "var(--w-muted)" }}
              >
                What I built
              </p>
              <ul className="mt-4 space-y-3.5">
                {cs.build.map((b) => (
                  <li key={b.slice(0, 24)} className="flex gap-3 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-1 font-mono text-sm font-bold"
                      style={{ color: "var(--w-accent)" }}
                    >
                      +
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-10 rounded-xl p-5"
                style={{
                  background: "var(--w-chip)",
                  borderLeft: "3px solid var(--w-accent)",
                }}
              >
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--w-muted)" }}
                >
                  Outcome
                </p>
                <p className="mt-2 leading-relaxed">{cs.outcome}</p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <dt
                    className="font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--w-muted)" }}
                  >
                    Role
                  </dt>
                  <dd className="mt-2">{cs.role.join(" · ")}</dd>
                </div>
                <div>
                  <dt
                    className="font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--w-muted)" }}
                  >
                    Stack
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {cs.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md px-2 py-1 text-xs"
                        style={{ background: "var(--w-chip)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <a
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition hover:opacity-90"
                style={{
                  background: "var(--w-accent)",
                  color: "var(--w-accent-ink)",
                }}
              >
                Visit {cs.liveLabel}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={140} className={flip ? "lg:order-1" : ""}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-3xl opacity-25 blur-2xl"
                style={{ background: "var(--w-accent)" }}
              />
              <BrowserFrame shot={cs.primary} url={cs.liveUrl.replace("https://", "")} priority={cs.index === "01"} />
              {cs.phone && (
                <div className="absolute -bottom-12 hidden w-32 rotate-3 sm:block lg:-right-8 lg:w-40">
                  <PhoneFrame shot={cs.phone} />
                </div>
              )}
              {cs.secondary && (
                <div className="mt-8 lg:mt-10 lg:pr-16">
                  <BrowserFrame shot={cs.secondary} url={cs.liveUrl.replace("https://", "")} />
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

function WorkIntro() {
  return (
    <section id="work" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pb-4 pt-24 sm:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Selected work</p>
          <h2 className="display mt-5 max-w-3xl text-4xl font-bold text-snow sm:text-5xl">
            Four products. Real customers. Live right now.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-mist">
            No mockups, no abandoned demos. Every product below is in
            production, and the screenshots are taken straight from the running
            software.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Capabilities</p>
          <h2 className="display mt-5 text-4xl font-bold text-snow sm:text-5xl">
            Everything a product needs,
            <br />
            under one roof.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.group} delay={i * 110}>
              <div className="h-full rounded-2xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-semibold text-snow">
                  {cap.group}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line px-3 py-1.5 text-sm text-mist"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-12 max-w-3xl text-mist">
            Current availability: I take on a small number of client builds at a
            time, and I&apos;m always interested in Barbadian and Caribbean
            businesses that deserve better software. If that&apos;s you, the
            inbox is open.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 60% at 50% 110%, rgba(242,179,61,0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-28 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Contact</p>
          <h2 className="display mx-auto mt-6 max-w-3xl text-4xl font-bold text-snow sm:text-6xl">
            Have a business that
            <br />
            deserves better software?
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg text-mist">
            Tell me what&apos;s slowing you down. I&apos;ll tell you honestly
            whether software can fix it, and what it would take.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:ceejaycumberbatch@gmail.com?subject=Portfolio%20Inquiry"
              className="rounded-xl bg-gold px-8 py-4 font-semibold text-ink transition hover:bg-gold-deep"
            >
              ceejaycumberbatch@gmail.com
            </a>
            <a
              href="https://github.com/FamineDT246"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-line px-8 py-4 font-semibold text-snow transition hover:border-mist"
            >
              GitHub
            </a>
          </div>
          <p className="mt-16 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-mist">
            <span>Built in Barbados</span>
            <span aria-hidden="true">·</span>
            <span>Designed and engineered by me</span>
            <span aria-hidden="true">·</span>
            <span>Live on Vercel</span>
          </p>
          <p className="mt-3 text-sm text-mist/70">
            © {new Date().getFullYear()} Ceejay Cumberbatch
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Vision />
        <WorkIntro />
        {caseStudies.map((cs) => (
          <CaseStudy key={cs.id} cs={cs} />
        ))}
        <Capabilities />
        <Contact />
      </main>
    </>
  );
}
