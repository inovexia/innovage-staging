let warned = false;

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
