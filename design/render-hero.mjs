// Renders design/hero-banner.html to public/images/hero-devices-banner.webp (homepage banner).
// Usage: node design/render-hero.mjs   (needs Microsoft Edge or Chrome installed)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
];
const browser = browsers.find(existsSync);
if (!browser) throw new Error('No Edge/Chrome found');

const src = pathToFileURL(resolve('design/hero-banner.html')).href;
const dir = mkdtempSync(join(tmpdir(), 'hero-'));
const shot = join(dir, 'shot.png');

execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--user-data-dir=${join(dir, 'profile')}`,
  '--force-device-scale-factor=2',
  '--window-size=1600,1000',
  '--default-background-color=00000000',
  `--screenshot=${shot}`,
  src,
], { stdio: 'ignore' });

const out = await sharp(shot)
  .trim({ threshold: 0 })
  .resize({ width: 2000, withoutEnlargement: true })
  .webp({ quality: 90, alphaQuality: 100, effort: 6 })
  .toFile('public/images/hero-devices-banner.webp');
console.log(out);
rmSync(dir, { recursive: true, force: true });
