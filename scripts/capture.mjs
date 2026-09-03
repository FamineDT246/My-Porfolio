// Screenshot capture runner for the portfolio.
// Usage: node capture.mjs <jobName>   (jobName defined in JOBS below)
// Requires: NODE_PATH pointed at a playwright install, Chrome on this machine.
import { mkdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = 'C:/projects/my-portfolio/public/work';

// Parse a .env file into a map (no secret ever gets printed).
function loadEnv(path) {
  try {
    const out = {};
    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\r\n]*)"?/);
      if (m) out[m[1]] = m[2];
    }
    return out;
  } catch { return {}; }
}

const JOBS = {
  // ---- Kerri's Closet (local dev, pre-seeded SQLite) ----
  kerri: {
    base: 'http://localhost:3000',
    out: 'kerri',
    shots: [
      { name: 'home', url: '/', wait: 2600 },
      { name: 'shop', url: '/shop', wait: 2600 },
      { name: 'product', url: null, fromShopLink: '/shop/', wait: 2200 },
      { name: 'admin-analytics', url: '/admin/analytics', auth: 'kerri-admin', wait: 3200 },
    ],
    mobile: [{ name: 'home-mobile', url: '/', wait: 2600 }],
  },
  // ---- The Helping Tree (live public site) ----
  tht: {
    base: 'https://the-perfect-duo.vercel.app',
    out: 'tht',
    shots: [
      { name: 'home', url: '/', wait: 3500 },
      { name: 'services', url: '/services', wait: 2800 },
      { name: 'shop', url: '/shop', wait: 2800 },
    ],
    mobile: [{ name: 'home-mobile', url: '/', wait: 3500 }],
  },
  // ---- Waldron's Creations (live public site) ----
  waldrons: {
    base: 'https://waldrons-creations.vercel.app',
    out: 'waldrons',
    shots: [
      { name: 'home', url: '/', wait: 3500 },
      { name: 'shop', url: '/shop', wait: 3000 },
      { name: 'product', url: null, fromShopLink: '/product/', wait: 2600 },
    ],
    mobile: [{ name: 'home-mobile', url: '/', wait: 3500 }],
  },
  // ---- BimHR (local dev; live Supabase demo data) ----
  bimhr: {
    base: 'http://localhost:3002',
    out: 'bimhr',
    shots: [
      { name: 'landing', url: 'https://bimhrsolutions.com', wait: 4000 },
      { name: 'landing-sandbox', url: 'https://bimhrsolutions.com', wait: 4000, scroll: 0.55 },
      { name: 'dashboard', url: '/dashboard/owner', auth: 'bimhr', wait: 5000 },
      { name: 'payroll-wizard', url: '/dashboard/hr/payroll/wizard', auth: 'bimhr', wait: 5000 },
      { name: 'analytics', url: '/dashboard/analytics', auth: 'bimhr', wait: 5000 },
    ],
    mobile: [{ name: 'landing-mobile', url: 'https://bimhrsolutions.com', wait: 4000 }],
  },
};

const AUTH = {
  'kerri-admin': {
    // Visit /login, submit admin password from the project .env, land on /admin.
    loginUrl: 'http://localhost:3000/login',
    envFile: "C:/projects/Kerri's Closet/.env",
    passwordKey: 'ADMIN_PASSWORD',
    steps: [
      { type: 'fill', sel: 'input[type="password"]', env: true },
      { type: 'click', sel: 'button[type="submit"]' },
      { type: 'waitfor', urlIncludes: '/admin' },
      { type: 'wait', ms: 1500 },
    ],
  },
  bimhr: {
    loginUrl: 'http://localhost:3002/login',
    envFile: null, // creds passed via BIMHR_EMAIL / BIMHR_PASSWORD process env
    steps: [
      { type: 'fill', sel: 'input[type="email"]', value: process.env.BIMHR_EMAIL },
      { type: 'fill', sel: 'input[type="password"]', value: process.env.BIMHR_PASSWORD },
      { type: 'click', sel: 'button[type="submit"]' },
      { type: 'wait', ms: 4000 },
    ],
  },
};

async function runShot(page, ctx, shot, jobBase) {
  const raw = shot.url ?? shot.resolvedUrl;
  const url = /^https?:\/\//.test(raw) ? raw : jobBase + raw;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  if (shot.scroll) {
    await page.evaluate((f) => window.scrollTo(0, document.body.scrollHeight * f), shot.scroll);
  }
  await page.evaluate(() => document.fonts.ready).catch(() => {});
  await page.waitForTimeout(shot.wait ?? 2000);

  // Force the compositor to actually paint before capturing; blank frames
  // happen on Windows headless when the screenshot races the first paint.
  const forcePaint = () =>
    page.evaluate(() => new Promise((r) => window.requestAnimationFrame(() => window.requestAnimationFrame(r)))).catch(() => {});

  let buf;
  for (let attempt = 0; attempt < 4; attempt++) {
    await forcePaint();
    buf = await page.screenshot({ fullPage: false });
    // A 2880x1800 @2x capture of real content is never this small.
    if (buf.length > 80_000) break;
    await page.evaluate(() => window.scrollBy(0, 1)).catch(() => {});
    await page.waitForTimeout(1200);
  }
  const { writeFileSync } = await import('fs');
  writeFileSync(ctx.path, buf);
  console.log('saved', ctx.path, Math.round(buf.length / 1024) + 'KB');
}

async function run() {
  const jobName = process.argv[2];
  const job = JOBS[jobName];
  if (!job) { console.error('unknown job:', jobName); process.exit(1); }

  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    // Headless GPU rasterization intermittently returns blank frames on this
    // machine; force software rendering so heavy photo pages always capture.
    args: ['--disable-gpu', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });

  // Desktop shots
  const dir = join(ROOT, job.out);
  mkdirSync(dir, { recursive: true });
  const dsf2 = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };

  const loadEnvPw = (a) => loadEnv(a.envFile)[a.passwordKey];

  async function doAuth(page, a) {
    for (let attempt = 0; attempt < 3; attempt++) {
      await page.goto(a.loginUrl, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
      await page.waitForTimeout(2500); // let React hydrate before touching inputs
      for (const step of a.steps) {
        if (step.type === 'fill') {
          const val = step.env ? loadEnvPw(a) : step.value;
          await page.fill(step.sel, val ?? '');
        } else if (step.type === 'click') {
          await page.click(step.sel);
        } else if (step.type === 'wait') {
          await page.waitForTimeout(step.ms);
        } else if (step.type === 'waitfor') {
          await page.waitForURL((u) => u.toString().includes(step.urlIncludes), { timeout: 20000 }).catch(() => {});
        }
      }
      await page.waitForTimeout(1000);
      if (!page.url().includes('/login')) return true;
      console.warn(`auth attempt ${attempt + 1} failed (still on login)`);
    }
    return false;
  }

  // Authenticated shots run in a fresh context: the storefront registers a
  // service worker that interferes with hydration on shared-context logins.
  const publicShots = job.shots.filter((s) => !s.auth);
  const authShots = job.shots.filter((s) => s.auth);

  let page = await browser.newPage(dsf2);
  for (const shot of publicShots) {
    if (!shot.url && shot.fromShopLink) {
      // resolve the first matching link on the base page and shoot it
      await page.goto(job.base + '/shop', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
      await page.waitForTimeout(shot.wait ?? 2000);
      const href = await page.getAttribute(`a[href*="${shot.fromShopLink}"]`, 'href').catch(() => null);
      if (!href) { console.error('no link found for', shot.fromShopLink); continue; }
      shot.resolvedUrl = href.startsWith('http') ? href : job.base + href;
    }
    await runShot(page, { path: join(dir, `${shot.name}.png`) }, shot, job.base);
  }

  if (authShots.length) {
    const ctx = await browser.newContext(dsf2);
    page = await ctx.newPage();
    const a = AUTH[authShots[0].auth];
    const ok = await doAuth(page, a);
    if (!ok) console.error('giving up on auth for', authShots[0].auth);
    for (const shot of authShots) {
      await runShot(page, { path: join(dir, `${shot.name}.png`) }, shot, job.base);
    }
    await ctx.close();
  }

  // Mobile shots
  if (job.mobile?.length) {
    page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    for (const shot of job.mobile) {
      await runShot(page, { path: join(dir, `${shot.name}.png`) }, shot, job.base);
    }
  }

  await browser.close();
  console.log('done:', jobName);
}

run().catch((e) => { console.error(e); process.exit(1); });
