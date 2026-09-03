export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  world: string;
  eyebrow: string;
  problem: string;
  build: string[];
  outcome: string;
  stack: string[];
  role: string[];
  year: string;
  status: string;
  liveUrl?: string;
  liveLabel?: string;
  codeUrl?: string;
  codeLabel?: string;
  primary: Shot;
  secondary?: Shot;
  phone?: Shot;
};

const D = 2880; // desktop captures: 1440x900 @2x
const DH = 1800;
const M = 780; // mobile captures: 390x844 @2x
const MH = 1688;

export const caseStudies: CaseStudy[] = [
  {
    id: "bimhr",
    index: "01",
    name: "BimHR",
    tagline: "Payroll and HR, built for Barbados law",
    world: "world-bimhr",
    eyebrow: "Multi-tenant SaaS platform",
    problem:
      "Barbadian businesses run payroll under rules the global tools simply do not know: NIS, tiered PAYE, Health Levy, Resilience Levy, TAMIS filings. Most owners here still do it in spreadsheets, and one wrong bracket means an angry letter from the BRA.",
    build: [
      "A statutory engine that computes NIS, PAYE tiers, Health Levy and Resilience Levy per employee, per run, and stays current as rates change",
      "Multi-tenant isolation with Postgres row-level security, so every company's data is walled off by design",
      "GPS-geofenced time tracking, leave workflows, contracts with e-signatures, and TAMIS/NIS reports generated straight from live payroll data",
      "Five role-based products in one: owner, HR, department head, supervisor and employee views",
    ],
    outcome:
      "Live at bimhrsolutions.com and in active use for company payroll runs. The product now brands itself CoreIsle as it scales toward the wider market.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Postgres RLS", "Zod", "Playwright"],
    role: ["Product", "Design", "Engineering"],
    year: "2026",
    status: "In production",
    liveUrl: "https://bimhrsolutions.com",
    liveLabel: "bimhrsolutions.com",
    primary: {
      src: "/work/bimhr/dashboard.webp",
      alt: "BimHR owner dashboard showing 48 active employees, monthly payroll cost of $189,570.70 BBD, pending approvals and attendance rate",
      width: D,
      height: DH,
    },
    secondary: {
      src: "/work/bimhr/landing.webp",
      alt: "BimHR marketing landing page with product positioning for Barbadian payroll",
      width: D,
      height: DH,
    },
  },
  {
    id: "waldrons",
    index: "02",
    name: "Waldron's Creations",
    tagline: "A craftsman's nursery and welding workshop, digitised",
    world: "world-waldrons",
    eyebrow: "Commerce and operations platform",
    problem:
      "Waldron's Creations runs two trades from one yard in Christ Church: plants for sale and rent across all 11 parishes, plus welded fabrication jobs quoted per piece. Every order, rental and invoice lived in a notebook. The owner is 55 and non-technical; whatever I built had to be usable from a phone in a greenhouse with soil on his hands.",
    build: [
      "Storefront selling plants and pots with weekly rentals, deposits and delivery-versus-pickup built into one cart",
      "Quote workflow for welding and landscaping jobs that converts into branded invoices once accepted",
      "A mobile-first admin: in-store POS, order tracking with receipt uploads, maturation batch tracking, and a daily revenue chart with CSV export",
      "Guest checkout with an OpenStreetMap delivery pin, live order timelines, TOTP multi-factor login, and plain-language UI throughout",
    ],
    outcome:
      "Shipped under a BBD 3,500 fixed-price contract and now live on Vercel, running the workshop's real sales, rentals, quotes and daily bookkeeping.",
    stack: ["Next.js", "TypeScript", "Prisma", "Supabase", "Tailwind", "TanStack Query", "Vitest"],
    role: ["Product", "Design", "Engineering", "Deployment"],
    year: "2026",
    status: "In production",
    liveUrl: "https://waldrons-creations.vercel.app",
    liveLabel: "waldrons-creations.vercel.app",
    primary: {
      src: "/work/waldrons/shop.webp",
      alt: "Waldron's Creations shop grid showing plants like Bird of Paradise and Fiddle Leaf Fig with BBD prices and rental rates",
      width: D,
      height: DH,
    },
    secondary: {
      src: "/work/waldrons/home.webp",
      alt: "Waldron's Creations landing page for the family-run nursery in Barbados",
      width: D,
      height: DH,
    },
    phone: {
      src: "/work/waldrons/home-mobile.webp",
      alt: "Mobile view of Waldron's Creations",
      width: M,
      height: MH,
    },
  },
  {
    id: "kerri",
    index: "03",
    name: "Kerri's Closet",
    tagline: "Editorial e-commerce, handmade in Barbados",
    world: "world-kerri",
    eyebrow: "E-commerce with a full back office",
    problem:
      "Kerri cuts and sews custom fashion by hand in Barbados, but her online presence could not take a single order: no cart, no order tracking, no way to manage fittings, custom requests or reviews without a wall of WhatsApp messages.",
    build: [
      "An editorial storefront with category filtering, wishlists, guest checkout, order tracking by reference number, and moderated reviews",
      "A booking system for fittings and consultations with conflict-checked time slots",
      "A complete admin back office: revenue analytics, orders and invoices, product management, a content CMS, custom-order pipeline and newsletter",
      "Accessibility as a feature: text scaling, high contrast, dyslexia-friendly fonts and read-aloud built in",
    ],
    outcome:
      "Deployed on Vercel with live commerce; the back office tracks revenue, custom-order pipeline and fittings from one dashboard.",
    stack: ["Next.js", "TypeScript", "Prisma", "Tailwind", "shadcn/ui", "Zustand", "PWA"],
    role: ["Product", "Design", "Engineering"],
    year: "2026",
    status: "In production",
    liveUrl: "https://kerris-closet.vercel.app",
    liveLabel: "kerris-closet.vercel.app",
    primary: {
      src: "/work/kerri/home.webp",
      alt: "Kerri's Closet editorial landing page: Made With You In Mind, handmade fashion photography from Barbados",
      width: D,
      height: DH,
    },
    secondary: {
      src: "/work/kerri/admin-analytics.webp",
      alt: "Kerri's Closet admin analytics showing BBD revenue, orders, custom request funnel and bookings",
      width: D,
      height: DH,
    },
    phone: {
      src: "/work/kerri/home-mobile.webp",
      alt: "Mobile view of Kerri's Closet",
      width: M,
      height: MH,
    },
  },
  {
    id: "tht",
    index: "04",
    name: "The Helping Tree",
    tagline: "Fresha, Shopify and Calendly, rebuilt as one Bajan hub",
    world: "world-tht",
    eyebrow: "Services and retail platform",
    problem:
      "Candice runs a contractor crew by day (tiling, painting, cleaning, catering) and sells small-batch Bajan goods on the side, all coordinated through scattered calls and messages. Off-the-shelf tools could each solve one slice: Fresha for bookings, Shopify for the store, Calendly for the crew. She needed one place where customers could book, buy and follow along.",
    build: [
      "Public site for browsing services and the product shop, with a booking flow that feeds straight into an operations dashboard",
      "Admin, team and client views: bookings, quotes, orders, scheduling, broadcasts, reviews and invoices with payment proof",
      "Push notifications and email updates so customers never wonder what is happening with their job",
      "White-label branding: the business name, logo and colours are editable from settings and propagate across the whole product",
    ],
    outcome:
      "Live and in daily use by the business: what would have been three separate subscriptions stitched together by hand is one operations dashboard.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind", "shadcn/ui", "Web Push", "PWA"],
    role: ["Product", "Design", "Engineering"],
    year: "2026",
    status: "In production",
    liveUrl: "https://the-perfect-duo.vercel.app",
    liveLabel: "the-perfect-duo.vercel.app",
    primary: {
      src: "/work/tht/home.webp",
      alt: "The Helping Tree landing page in royal purple: Barbados contractor services and locally made products",
      width: D,
      height: DH,
    },
    secondary: {
      src: "/work/tht/services.webp",
      alt: "The Helping Tree services catalogue page",
      width: D,
      height: DH,
    },
    phone: {
      src: "/work/tht/home-mobile.webp",
      alt: "Mobile view of The Helping Tree",
      width: M,
      height: MH,
    },
  },
  {
    id: "raschedule",
    index: "05",
    name: "RASyncbot",
    tagline: "A crew scheduling system built in two days",
    world: "world-raschedule",
    eyebrow: "Rapid internal tool",
    problem:
      "Robot Adventure runs kids' robotics camps and workshops all over Barbados, and assigning twenty instructors to seventeen events ran on spreadsheets and PDFs. Double bookings, unavailable dates and unfilled slots were found out on the morning, not the week before.",
    build: [
      "Drag-and-drop scheduling: pull instructors from the roster rail onto event cards across a weekly calendar, with tap-to-assign on mobile",
      "Automatic conflict detection for double bookings, unavailable dates and fatigue streaks, flagged before they reach the venue",
      "Tokenised invite links so each instructor sees only their own schedule, plus per-day shirt colours, event drawers and a print-friendly weekly view",
      "Seeded with the real operation: 20 staff profiles, 17 events, role-based admin and instructor views",
    ],
    outcome:
      "Built free over two days to close the gap while working with the business. In the end it was not taken on, so it now lives as an open artefact: proof of how far a clear idea can get in a weekend, and an honest to-do list.",
    stack: ["Next.js", "TypeScript", "dnd-kit", "Prisma", "Turso", "TanStack Query"],
    role: ["Product", "Design", "Engineering"],
    year: "2026",
    status: "Rapid build",
    codeUrl: "https://github.com/FamineDT246/RASchedule",
    codeLabel: "github.com/FamineDT246/RASchedule",
    primary: {
      src: "/work/raschedule/scheduler.webp",
      alt: "RASyncbot scheduler: instructor roster rail beside a weekly calendar of robotics camps with 28 of 30 slots filled",
      width: D,
      height: DH,
    },
    secondary: {
      src: "/work/raschedule/events.webp",
      alt: "RASyncbot events list showing seventeen Barbados robotics camps and workshops with draft and confirmed statuses",
      width: D,
      height: DH,
    },
  },
];

export const stats = [
  { value: "05", label: "products designed, built and shipped" },
  { value: "04", label: "real businesses running on them daily" },
  { value: "BBD", label: "every price, invoice and report in local currency" },
];

export const capabilities = [
  {
    group: "Product engineering",
    items: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "PWA"],
  },
  {
    group: "Data and infrastructure",
    items: ["Supabase", "PostgreSQL", "Prisma", "Row Level Security", "Supabase Storage", "Edge cron jobs"],
  },
  {
    group: "Quality and operations",
    items: ["Playwright E2E", "Vitest", "GitHub Actions CI", "Vercel", "Sentry", "Rate limiting"],
  },
  {
    group: "Accessibility engineering",
    items: ["WCAG AA", "OpenDyslexic and hyperlegible fonts", "Colourblind filters", "Screen-reader live regions", "Keyboard-first flows", "Read-aloud"],
  },
];
