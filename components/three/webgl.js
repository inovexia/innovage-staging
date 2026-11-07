let warned = false;

// The animated backgrounds are decoration, so phones skip them and never download three.js.
export const isPhone = () => window.innerWidth < 768;

// Runs `cb` once the page has loaded and the browser has a free moment, so the 3D work
// never competes with the content. Returns a cancel function.
export function whenPageIsIdle(cb, delay = 1200) {
  let timer = 0;
  let idle = 0;
  const start = () => {
    timer = setTimeout(() => {
      if (window.requestIdleCallback) idle = window.requestIdleCallback(cb, { timeout: 2000 });
      else cb();
    }, delay);
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
  return () => {
    window.removeEventListener('load', start);
    clearTimeout(timer);
    if (idle) window.cancelIdleCallback(idle);
  };
}

// Lets the browser handle clicks and scrolling between the heavy steps of building a scene.
export const nextTask = () => new Promise((resolve) => setTimeout(resolve));

// three.js needs WebGL2 and logs a console error before throwing when it can't get a
// context. Some drivers (e.g. Firefox's ANGLE "EGL_NO_CONFIG") only reject particular
// attributes such as antialias or the high-performance GPU, so we request the context
// ourselves, retry with plainer settings, and hand the working context to three.
export function createRenderer(THREE, options = {}) {
  const attempts = [
    options,
    { ...options, antialias: false, powerPreference: 'default' },
    { ...options, antialias: false, alpha: false, powerPreference: 'low-power' },
  ];

  for (const attrs of attempts) {
    const canvas = document.createElement('canvas');
    let context = null;
    try {
      context = canvas.getContext('webgl2', {
        alpha: attrs.alpha ?? false,
        antialias: attrs.antialias ?? false,
        powerPreference: attrs.powerPreference ?? 'default',
        depth: true,
        stencil: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      context = null;
    }
    if (!context) continue;
    try {
      return new THREE.WebGLRenderer({ ...attrs, canvas, context });
    } catch {
      context.getExtension('WEBGL_lose_context')?.loseContext();
    }
  }

  if (!warned) {
    warned = true;
    console.warn('WebGL2 is unavailable in this browser, so the 3D scenes are skipped. Enable hardware acceleration to see them.');
  }
  return null;
}

export const isLightTheme = () => document.documentElement.dataset.theme === 'light';

// Calls back with `true` for light / `false` for dark whenever the site theme flips.
// Returns an unsubscribe function.
export function watchTheme(cb) {
  const mo = new MutationObserver(() => cb(isLightTheme()));
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => mo.disconnect();
}
