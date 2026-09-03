import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Inter, JetBrains_Mono, Lexend, Space_Grotesk } from "next/font/google";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";
import AccessibilityWidget from "@/components/a11y/AccessibilityWidget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

// Applied before first paint so saved accessibility prefs never flash.
const A11Y_PREPAINT = `(function(){try{var p=JSON.parse(localStorage.getItem("portfolio-a11y-prefs")||"{}");var d=document.documentElement;if(p.fontSize)d.dataset.fontSize=p.fontSize;if(p.fontFamily)d.dataset.fontFamily=p.fontFamily;if(p.colorTheme)d.dataset.colorTheme=p.colorTheme;if(p.colorblind)d.dataset.colorblind=p.colorblind;if(p.reduceMotion)d.dataset.reduceMotion="true";if(p.readLineGuide)d.dataset.readLineGuide="true";if(p.highlightLinks)d.dataset.highlightLinks="true";}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://ceejayc.vercel.app"),
  title: "Ceejay Cumberbatch | Software for Caribbean businesses",
  description:
    "Founder-led design and engineering from Barbados. Five production products: an HR and payroll platform, a plant nursery and welding commerce system, a fashion boutique storefront, a contractor services hub, and a rapid-build scheduler.",
  openGraph: {
    title: "Ceejay Cumberbatch | Software for Caribbean businesses",
    description:
      "Founder-led design and engineering from Barbados. Five production products, serving real businesses every day.",
    url: "https://ceejayc.vercel.app",
    siteName: "Ceejay Cumberbatch",
    locale: "en_BB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceejay Cumberbatch | Software for Caribbean businesses",
    description:
      "Founder-led design and engineering from Barbados. Five production products, serving real businesses every day.",
  },
};

// Accurate colour-vision filters (feColorMatrix), referenced by CSS from the
// accessibility widget's data attributes. Rendered at 0x0, purely definitional.
function ColourblindFilterDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <filter id="a11y-deuteranopia">
          <feColorMatrix
            type="matrix"
            values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"
          />
        </filter>
        <filter id="a11y-protanopia">
          <feColorMatrix
            type="matrix"
            values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"
          />
        </filter>
        <filter id="a11y-tritanopia">
          <feColorMatrix
            type="matrix"
            values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${mono.variable} ${atkinson.variable} ${lexend.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: A11Y_PREPAINT }} />
      </head>
      <body>
        <ColourblindFilterDefs />
        {children}
        <AccessibilityWidget />
      </body>
    </html>
  );
}
