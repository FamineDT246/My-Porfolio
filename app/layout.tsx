import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://ceejayc.vercel.app"),
  title: "Ceejay Cumberbatch | Software for Caribbean businesses",
  description:
    "Founder-led design and engineering from Barbados. Four production products live: an HR and payroll platform, a plant nursery commerce system, a fashion boutique storefront, and a contractor services hub.",
  openGraph: {
    title: "Ceejay Cumberbatch | Software for Caribbean businesses",
    description:
      "Founder-led design and engineering from Barbados. Four production products, serving real businesses every day.",
    url: "https://ceejayc.vercel.app",
    siteName: "Ceejay Cumberbatch",
    locale: "en_BB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceejay Cumberbatch | Software for Caribbean businesses",
    description:
      "Founder-led design and engineering from Barbados. Four production products, serving real businesses every day.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
