'use client';

import { useEffect, useRef } from 'react';
import { snoise } from './noise';

/**
 * Inner-page header background: an undulating grid of glowing points that
 * ripples away from the pointer.
 */
export default function WaveScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (disposed) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.set(0, 3.2, 8);
      camera.lookAt(0, 0, -2);

      const cols = window.innerWidth < 768 ? 90 : 160;
      const rows = 60;
      const count = cols * rows;
      const pos = new Float32Array(count * 3);
      let k = 0;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          pos[k++] = (i / (cols - 1) - 0.5) * 26;
          pos[k++] = 0;
          pos[k++] = (j / (rows - 1) - 0.5) * 14 - 2;
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPx: { value: renderer.getPixelRatio() },
      };
      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: /* glsl */ `
          ${snoise}
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uPx;
          varying float vH;
          varying float vDepth;
          void main(){
            vec3 p = position;
            float n = snoise(vec3(p.x * 0.15, p.z * 0.2, uTime * 0.18));
            float d = distance(p.xz, uMouse * vec2(10.0, 5.0));
            float ripple = sin(d * 1.6 - uTime * 3.0) * exp(-d * 0.35) * 0.45;
            p.y = n * 1.1 + ripple;
            vH = p.y;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vDepth = -mv.z;
            gl_PointSize = uPx * 2.6 * (8.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          varying float vH;
          varying float vDepth;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float h = smoothstep(-0.8, 1.0, vH);
            vec3 col = vec3(0.45 + h * 0.5);
            float fade = smoothstep(18.0, 6.0, vDepth);
            gl_FragColor = vec4(col, smoothstep(0.5, 0.1, d) * fade * (0.35 + h * 0.45));
          }`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e) => {
        const r = mount.getBoundingClientRect();
        mouse.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouse.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      const resize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      let visible = true;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduced) loop();
      });
      io.observe(mount);

      const clock = new THREE.Clock();
      let raf = 0;
      const render = () => {
        uniforms.uTime.value = clock.getElapsedTime();
        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;
        uniforms.uMouse.value.set(mouse.x, mouse.y);
        camera.position.x = mouse.x * 0.6;
        camera.lookAt(0, 0, -2);
        renderer.render(scene, camera);
      };
      const loop = () => {
        cancelAnimationFrame(raf);
        if (!visible || disposed) return;
        render();
        raf = requestAnimationFrame(loop);
      };
      if (reduced) render();
      else loop();
      requestAnimationFrame(() => mount.classList.add('is-ready'));

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onMove);
        ro.disconnect();
        io.disconnect();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className="wave-canvas" aria-hidden="true" />;
}
