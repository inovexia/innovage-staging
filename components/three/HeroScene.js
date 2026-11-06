'use client';

import { useEffect, useRef } from 'react';
import { createRenderer, isLightTheme, whenPageIsIdle, watchTheme } from './webgl';

/**
 * Home hero backdrop: an orbiting particle ring around the banner image,
 * and a drifting star field.
 * Reacts to the pointer and scroll; pauses when off-screen.
 */
export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    const cancelIdle = whenPageIsIdle(() => import('three').then((THREE) => {
      if (disposed) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isSmall = window.innerWidth < 768;

      const renderer = createRenderer(THREE, { antialias: false, alpha: true });
      if (!renderer) return; // no WebGL: the banner image still shows, just without the particles
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 7);

      const root = new THREE.Group();
      scene.add(root);

      const uniforms = { uTime: { value: 0 }, uLight: { value: isLightTheme() ? 1 : 0 } };

      // --- Orbit ring of particles -----------------------------------------
      const ringCount = isSmall ? 900 : 1800;
      const ringPos = new Float32Array(ringCount * 3);
      const ringSeed = new Float32Array(ringCount);
      for (let i = 0; i < ringCount; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 2.7 + Math.random() * 1.1 + (Math.random() < 0.2 ? Math.random() * 1.2 : 0);
        ringPos[i * 3] = Math.cos(a) * r;
        ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
        ringPos[i * 3 + 2] = Math.sin(a) * r;
        ringSeed[i] = Math.random();
      }
      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
      ringGeo.setAttribute('aSeed', new THREE.BufferAttribute(ringSeed, 1));
      const pointMat = (size) =>
        new THREE.ShaderMaterial({
          uniforms: { uTime: uniforms.uTime, uLight: uniforms.uLight, uSize: { value: size * renderer.getPixelRatio() } },
          vertexShader: /* glsl */ `
            attribute float aSeed;
            uniform float uTime;
            uniform float uSize;
            varying float vSeed;
            void main(){
              vSeed = aSeed;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = uSize * (0.4 + aSeed) * (6.0 / -mv.z);
              gl_Position = projectionMatrix * mv;
            }`,
          fragmentShader: /* glsl */ `
            uniform float uTime;
            uniform float uLight;
            varying float vSeed;
            void main(){
              float d = length(gl_PointCoord - 0.5);
              if (d > 0.5) discard;
              float a = smoothstep(0.5, 0.0, d);
              float tw = 0.55 + 0.45 * sin(uTime * 2.0 + vSeed * 40.0);
              // neutral particles, with a rare brand-red accent
              // light theme: dark ink particles instead of glowing ones
              vec3 ink = mix(vec3(0.85 + vSeed * 0.15), vec3(0.1 + vSeed * 0.2), uLight);
              vec3 col = vSeed > 0.94 ? vec3(0.93, 0.0, 0.11) : ink;
              gl_FragColor = vec4(col, a * tw * 0.7);
            }`,
          transparent: true,
          depthWrite: false,
          blending: uniforms.uLight.value ? THREE.NormalBlending : THREE.AdditiveBlending,
        });
      const ring = new THREE.Points(ringGeo, pointMat(3.2));
      ring.rotation.x = 0.35;
      ring.rotation.z = -0.2;
      root.add(ring);

      // --- Star field ------------------------------------------------------
      const starCount = isSmall ? 600 : 1400;
      const starPos = new Float32Array(starCount * 3);
      const starSeed = new Float32Array(starCount);
      for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 30;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
        starPos[i * 3 + 2] = -Math.random() * 18 - 2;
        starSeed[i] = Math.random();
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      starGeo.setAttribute('aSeed', new THREE.BufferAttribute(starSeed, 1));
      const stars = new THREE.Points(starGeo, pointMat(2.2));
      scene.add(stars);

      // --- Layout: keep the ring centred on the banner image -----------------
      const layout = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        const halfH = Math.tan((camera.fov * Math.PI) / 360) * 7;
        const halfW = halfH * camera.aspect;
        const box = mount.parentElement.querySelector('.hero-visual').getBoundingClientRect();
        const area = mount.getBoundingClientRect();
        root.position.set(
          ((box.left + box.width / 2 - area.left) / w - 0.5) * 2 * halfW,
          (0.5 - (box.top + box.height / 2 - area.top) / h) * 2 * halfH,
          0
        );
        root.scale.setScalar(w > 960 ? 0.82 : Math.min((2 * halfW) / 3.7, 0.9));
      };
      layout();

      // --- Interaction ------------------------------------------------------
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e) => {
        pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      };
      let scrollP = 0;
      const onScroll = () => {
        scrollP = Math.min(window.scrollY / window.innerHeight, 1);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      const ro = new ResizeObserver(layout);
      ro.observe(mount);

      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced) loop();
      });
      io.observe(mount);

      const clock = new THREE.Clock();
      let raf = 0;
      const render = () => {
        const t = clock.getElapsedTime();
        uniforms.uTime.value = t;
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;

        ring.rotation.y = t * 0.08;
        stars.rotation.y = t * 0.004;
        root.rotation.x = pointer.y * 0.25 + scrollP * 0.4;
        root.rotation.y = pointer.x * 0.35;
        camera.position.x = pointer.x * 0.35;
        camera.position.y = -pointer.y * 0.25;
        camera.position.z = 7 + scrollP * 2.5;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      const loop = () => {
        cancelAnimationFrame(raf);
        if (!visible || disposed) return;
        render();
        raf = requestAnimationFrame(loop);
      };
      // additive glow vanishes on a light page, so switch blending with the theme
      const unwatchTheme = watchTheme((light) => {
        uniforms.uLight.value = light ? 1 : 0;
        for (const m of [ring.material, stars.material]) {
          m.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
          m.needsUpdate = true;
        }
        if (reduced) render();
      });

      if (reduced) render();
      else loop();
      requestAnimationFrame(() => mount.classList.add('is-ready'));

      cleanup = () => {
        unwatchTheme();
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('scroll', onScroll);
        ro.disconnect();
        io.disconnect();
        scene.traverse((o) => {
          o.geometry?.dispose();
          o.material?.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    }));

    return () => {
      disposed = true;
      cancelIdle();
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />;
}
