'use client';

import { useEffect, useRef } from 'react';
import buildSolutions from './models/solutions';
import buildProcess from './models/process';

const SETS = { solutions: buildSolutions, process: buildProcess };

/**
 * Small 3D stage that shows one model per item of a set. The active model
 * springs in while the others spin out; each idles with its own motion and
 * tilts toward the pointer. Neutral graphite/silver with a single red accent.
 */
export default function ModelScene({ set, active = 0, className = '', zoom = 7 }) {
  const mountRef = useRef(null);
  const activeRef = useRef(active);
  const kickRef = useRef(() => {});

  useEffect(() => {
    activeRef.current = active;
    kickRef.current();
  }, [active]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    Promise.all([
      import('three'),
      import('three/addons/geometries/RoundedBoxGeometry.js'),
      import('three/addons/environments/RoomEnvironment.js'),
    ]).then(([THREE, { RoundedBoxGeometry }, { RoomEnvironment }]) => {
      if (disposed) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      scene.environmentIntensity = 0.45;

      const camera = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 50);
      camera.position.set(0, 0, zoom);

      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(-3, 4, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xbfc0d8, 1.4);
      rim.position.set(4, 2, -4);
      scene.add(rim);
      const accent = new THREE.PointLight(0xed001c, 6, 8, 2);
      accent.position.set(2.5, -1.5, 2);
      scene.add(accent);

      // ---- shared kit handed to the model builders -------------------------
      const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.35, ...o });
      const M = {
        dark: std('#1c1b26'),
        graphite: std('#2b2a37'),
        slate: std('#3c3b4a'),
        steel: std('#6e6d7e', { metalness: 0.8, roughness: 0.3 }),
        silver: std('#cfced9', { metalness: 0.6, roughness: 0.28 }),
        soft: std('#d9d8e2', { metalness: 0.05, roughness: 0.75 }),
        red: std('#ed001c', { metalness: 0.3, roughness: 0.35, emissive: '#ed001c', emissiveIntensity: 0.25 }),
        glass: new THREE.MeshPhysicalMaterial({ color: '#ffffff', transparent: true, opacity: 0.16, roughness: 0.05, metalness: 0 }),
        line: new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28 }),
      };
      const kit = {
        THREE,
        M,
        rbox: (w, h, d, r = 0.06) => new RoundedBoxGeometry(w, h, d, 4, r),
        box: (w, h, d) => new THREE.BoxGeometry(w, h, d),
        mesh: (geo, mat, x = 0, y = 0, z = 0) => {
          const m = new THREE.Mesh(geo, mat);
          m.position.set(x, y, z);
          return m;
        },
      };

      const stage = new THREE.Group();
      scene.add(stage);
      const models = SETS[set](kit);
      models.forEach((m, i) => {
        m.p = i === activeRef.current ? 1 : 0;
        m.baseRot = m.group.rotation.clone();
        m.basePos = m.group.position.clone();
        m.baseScale = m.group.scale.x;
        stage.add(m.group);
      });

      // ---- interaction / loop ----------------------------------------------
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const host = mount.parentElement;
      const onMove = (e) => {
        const r = mount.getBoundingClientRect();
        pointer.tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
        pointer.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      };
      const onLeave = () => ((pointer.tx = 0), (pointer.ty = 0));
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);

      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        // keep models fully in frame on narrow stages
        camera.position.z = w / h < 1.4 ? zoom * (1.4 / (w / h)) : zoom;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      let visible = false;
      const clock = new THREE.Clock();
      let raf = 0;
      const ease = (x) => 1 - Math.pow(1 - x, 3);

      const render = (snap = false) => {
        const t = reduced ? 0 : clock.getElapsedTime();
        pointer.x += (pointer.tx - pointer.x) * 0.06;
        pointer.y += (pointer.ty - pointer.y) * 0.06;
        stage.rotation.y = pointer.x * 0.25;
        stage.rotation.x = pointer.y * 0.15;
        models.forEach((m, i) => {
          const target = i === activeRef.current ? 1 : 0;
          m.p = snap ? target : m.p + (target - m.p) * 0.09;
          const e = ease(Math.min(Math.max(m.p, 0), 1));
          m.group.visible = m.p > 0.01;
          if (!m.group.visible) return;
          m.group.scale.setScalar(m.baseScale * (0.4 + 0.6 * e));
          m.group.rotation.set(m.baseRot.x, m.baseRot.y + (1 - e) * (target ? -1.4 : 1.4), m.baseRot.z);
          m.group.position.set(m.basePos.x, m.basePos.y + (1 - e) * (target ? -0.6 : 0.6), m.basePos.z);
          m.update(t);
        });
        // fade with per-object material clones, only while a model transitions
        models.forEach((m) => {
          const fading = m.p > 0.01 && m.p < 0.99;
          m.group.traverse((o) => {
            if (!o.isMesh && !o.isLine) return;
            if (fading && !o.userData.cloned) {
              o.userData.orig = o.material;
              o.userData.baseOpacity = o.material.opacity;
              o.material = o.material.clone();
              o.material.transparent = true;
              o.userData.cloned = true;
            }
            if (o.userData.cloned) {
              if (fading) o.material.opacity = o.userData.baseOpacity * ease(m.p);
              else {
                o.material.dispose();
                o.material = o.userData.orig;
                o.userData.cloned = false;
              }
            }
          });
        });
        renderer.render(scene, camera);
      };

      const loop = () => {
        cancelAnimationFrame(raf);
        if (!visible || disposed) return;
        render();
        raf = requestAnimationFrame(loop);
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduced) loop();
        else if (visible) render(true);
      });
      io.observe(mount);
      kickRef.current = () => reduced && render(true);
      requestAnimationFrame(() => mount.classList.add('is-ready'));

      cleanup = () => {
        cancelAnimationFrame(raf);
        host.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', onLeave);
        ro.disconnect();
        io.disconnect();
        kickRef.current = () => {};
        scene.traverse((o) => {
          o.geometry?.dispose();
          if (o.userData.cloned) o.material.dispose();
        });
        Object.values(M).forEach((m) => m.dispose());
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [set, zoom]);

  return <div ref={mountRef} className={`model-scene ${className}`} aria-hidden="true" />;
}
