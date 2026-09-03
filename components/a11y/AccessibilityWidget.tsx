"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The accessibility widget I ship inside my products (Kerri's Closet,
 * Waldron's Creations, BimHR), built here as a standalone component.
 * Preferences persist to localStorage and apply as data attributes on
 * <html>; all visual behaviour lives in CSS keyed on those attributes.
 */

const STORAGE_KEY = "portfolio-a11y-prefs";

export type A11yPrefs = {
  fontSize: "sm" | "md" | "lg" | "xl";
  fontFamily: "default" | "atkinson" | "lexend" | "dyslexic" | "system";
  colorTheme: "default" | "contrast";
  colorblind: "none" | "deuteranopia" | "protanopia" | "tritanopia" | "monochrome";
  reduceMotion: boolean;
  readLineGuide: boolean;
  highlightLinks: boolean;
};

const DEFAULTS: A11yPrefs = {
  fontSize: "md",
  fontFamily: "default",
  colorTheme: "default",
  colorblind: "none",
  reduceMotion: false,
  readLineGuide: false,
  highlightLinks: false,
};

function loadPrefs(): A11yPrefs {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return DEFAULTS;
  }
}

function applyPrefs(p: A11yPrefs) {
  const d = document.documentElement;
  d.dataset.fontSize = p.fontSize;
  d.dataset.fontFamily = p.fontFamily;
  d.dataset.colorTheme = p.colorTheme;
  d.dataset.colorblind = p.colorblind;
  if (p.reduceMotion) d.dataset.reduceMotion = "true";
  else delete d.dataset.reduceMotion;
  if (p.readLineGuide) d.dataset.readLineGuide = "true";
  else delete d.dataset.readLineGuide;
  if (p.highlightLinks) d.dataset.highlightLinks = "true";
  else delete d.dataset.highlightLinks;
}

const FONT_SIZES: { value: A11yPrefs["fontSize"]; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Default" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "X-Large" },
];

const FONTS: { value: A11yPrefs["fontFamily"]; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "atkinson", label: "Atkinson Hyperlegible" },
  { value: "lexend", label: "Lexend" },
  { value: "dyslexic", label: "OpenDyslexic" },
  { value: "system", label: "System font" },
];

const THEMES: { value: A11yPrefs["colorTheme"]; label: string }[] = [
  { value: "default", label: "Studio dark" },
  { value: "contrast", label: "High contrast" },
];

const COLORBLIND: { value: A11yPrefs["colorblind"]; label: string }[] = [
  { value: "none", label: "None" },
  { value: "deuteranopia", label: "Red-green" },
  { value: "protanopia", label: "Red blindness" },
  { value: "tritanopia", label: "Blue-yellow" },
  { value: "monochrome", label: "Monochrome" },
];

function OptionButton({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-lg border px-2.5 py-2 text-left text-xs font-medium transition ${
        selected
          ? "border-gold bg-gold/15 text-gold"
          : "border-line text-mist hover:border-mist hover:text-snow"
      }`}
    >
      {label}
      {selected && <span aria-hidden="true"> ✓</span>}
    </button>
  );
}

function Toggle({
  on,
  label,
  hint,
  onClick,
}: {
  on: boolean;
  label: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-line px-3 py-2.5 text-left transition hover:border-mist"
    >
      <span>
        <span className="block text-xs font-semibold text-snow">{label}</span>
        {hint && <span className="mt-0.5 block text-[11px] text-mist">{hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
          on ? "bg-gold" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
            on ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export default function AccessibilityWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULTS);
  const [speaking, setSpeaking] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = loadPrefs();
    setPrefs(p);
    applyPrefs(p);
    setMounted(true);
  }, []);

  const update = useCallback((patch: Partial<A11yPrefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      applyPrefs(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    applyPrefs(DEFAULTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
    setPrefs(DEFAULTS);
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  // Alt+A opens the panel, from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Esc closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Reading line guide: track the cursor with a full-width rule.
  useEffect(() => {
    if (!prefs.readLineGuide) return;
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--a11y-line-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefs.readLineGuide]);

  // Stop speech when the panel closes.
  useEffect(() => {
    if (!open && speaking) {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
    }
  }, [open, speaking]);

  const readAloud = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const main = document.querySelector("main");
    if (!main) return;
    const clone = main.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("script, style, [aria-hidden='true']").forEach((n) => n.remove());
    const text = (clone.innerText || "").slice(0, 8000);
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open accessibility settings (Alt+A)"
        aria-expanded={open}
        title="Accessibility settings (Alt+A)"
        className="fixed bottom-5 right-4 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold text-ink shadow-lg transition hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="16" cy="4" r="1" />
          <path d="m18 19 1-7-6 1" />
          <path d="m5 8 3-3 5.5 3-2.36 3.5" />
          <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
          <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility settings"
          className="fixed bottom-20 right-4 z-[70] max-h-[76vh] w-[330px] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-line bg-panel p-5 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-base font-semibold text-snow">
                Accessibility settings
              </h2>
              <p className="mt-1 text-[11px] leading-snug text-mist">
                Customise this site for your needs. Settings save to this
                device.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close accessibility settings"
              className="rounded-md px-2 py-1 text-mist transition hover:bg-white/5 hover:text-snow"
            >
              ✕
            </button>
          </div>

          <div className="mt-5 space-y-5">
            <section>
              <h3 className="eyebrow text-mist">Text size</h3>
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {FONT_SIZES.map((f) => (
                  <OptionButton
                    key={f.value}
                    selected={prefs.fontSize === f.value}
                    label={f.label}
                    onClick={() => update({ fontSize: f.value })}
                  />
                ))}
              </div>
            </section>

            <section>
              <h3 className="eyebrow text-mist">Font</h3>
              <p className="mt-1 text-[11px] text-mist">
                There is no single &quot;dyslexia font&quot;. It is personal
                preference.
              </p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {FONTS.map((f) => (
                  <OptionButton
                    key={f.value}
                    selected={prefs.fontFamily === f.value}
                    label={f.label}
                    onClick={() => update({ fontFamily: f.value })}
                  />
                ))}
              </div>
            </section>

            <section>
              <h3 className="eyebrow text-mist">Colour theme</h3>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {THEMES.map((t) => (
                  <OptionButton
                    key={t.value}
                    selected={prefs.colorTheme === t.value}
                    label={t.label}
                    onClick={() => update({ colorTheme: t.value })}
                  />
                ))}
              </div>
            </section>

            <section>
              <h3 className="eyebrow text-mist">Colour vision</h3>
              <p className="mt-1 text-[11px] text-mist">
                Helps distinguish problematic colour pairs. The design never
                relies on colour alone.
              </p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {COLORBLIND.map((c) => (
                  <OptionButton
                    key={c.value}
                    selected={prefs.colorblind === c.value}
                    label={c.label}
                    onClick={() => update({ colorblind: c.value })}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="eyebrow text-mist">Enhancements</h3>
              <Toggle
                on={prefs.reduceMotion}
                label="Reduce motion"
                hint="Disables animations and transitions"
                onClick={() => update({ reduceMotion: !prefs.reduceMotion })}
              />
              <Toggle
                on={prefs.readLineGuide}
                label="Reading line guide"
                hint="A rule follows your cursor while reading"
                onClick={() => update({ readLineGuide: !prefs.readLineGuide })}
              />
              <Toggle
                on={prefs.highlightLinks}
                label="Highlight links"
                hint="Always underlines every link"
                onClick={() => update({ highlightLinks: !prefs.highlightLinks })}
              />
            </section>

            <section>
              <button
                type="button"
                onClick={readAloud}
                aria-pressed={speaking}
                className="w-full rounded-lg border border-line px-3 py-2.5 text-left text-xs font-semibold text-snow transition hover:border-mist"
              >
                {speaking ? "■ Stop reading" : "▶ Read this page aloud"}
                <span className="mt-0.5 block text-[11px] font-normal text-mist">
                  Reads the main content with your browser&apos;s voice
                </span>
              </button>
            </section>

            <div className="flex items-center justify-between border-t border-line pt-4">
              <p className="text-[11px] text-mist">
                Press <kbd className="rounded border border-line px-1 font-mono">Alt</kbd>{" "}
                + <kbd className="rounded border border-line px-1 font-mono">A</kbd>{" "}
                anywhere
              </p>
              <button
                type="button"
                onClick={reset}
                className="text-xs font-semibold text-gold transition hover:text-gold-deep"
              >
                Reset to defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
