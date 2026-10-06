// One model per item in `solutions` (lib/data.js), same order.
export default function buildSolutions({ THREE, M, rbox, box, mesh }) {
  const models = [];

  // ---- 01 Custom Software: layered dashboard -----------------------------
  {
    const g = new THREE.Group();
    const panels = [];
    ['dark', 'graphite', 'slate'].forEach((k, i) => {
      const p = mesh(rbox(2.7, 1.75, 0.08, 0.08), M[k], (i - 1) * 0.38, (i - 1) * 0.26, (i - 1) * 0.42);
      g.add(p);
      panels.push(p);
    });
    const front = panels[2];
    front.add(mesh(box(2.3, 0.1, 0.03), M.soft, 0, 0.66, 0.05));
    front.add(mesh(box(0.5, 0.1, 0.03), M.steel, -0.9, 0.46, 0.05));
    const bars = [];
    [0.5, 0.8, 0.62, 1.0, 0.72].forEach((h, i) => {
      const geo = box(0.2, 1, 0.06);
      geo.translate(0, 0.5, 0);
      const b = mesh(geo, i === 3 ? M.red : M.silver, -1.0 + i * 0.3, -0.68, 0.06);
      b.userData.h = h;
      front.add(b);
      bars.push(b);
    });
    front.add(mesh(new THREE.TorusGeometry(0.3, 0.07, 16, 48), M.steel, 0.78, 0.0, 0.06));
    const arc = mesh(new THREE.TorusGeometry(0.3, 0.075, 16, 48, Math.PI * 1.25), M.red, 0.78, 0.0, 0.08);
    front.add(arc);
    [0.6, 0.45, 0.52].forEach((w, i) => front.add(mesh(box(w, 0.05, 0.02), M.steel, 0.78 - (0.6 - w) / 2, -0.5 - i * 0.12, 0.05)));
    g.rotation.set(-0.32, 0.55, 0.04);
    models.push({
      group: g,
      update: (t) => {
        panels.forEach((p, i) => (p.position.y = (i - 1) * 0.26 + Math.sin(t * 1.1 + i) * 0.05));
        bars.forEach((b, i) => (b.scale.y = b.userData.h * (0.75 + 0.25 * Math.sin(t * 1.6 + i * 0.9))));
        arc.rotation.z = -t * 0.6;
      },
    });
  }

  // ---- 02 Business Automation: meshing gears ------------------------------
  {
    const g = new THREE.Group();
    const tooth = 0.13;
    const gearGeo = (r, teeth) => {
      const s = new THREE.Shape();
      const steps = teeth * 4;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const rr = i % 4 === 1 || i % 4 === 2 ? r + tooth : r;
        const x = Math.cos(a) * rr;
        const y = Math.sin(a) * rr;
        i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
      }
      const hole = new THREE.Path();
      hole.absarc(0, 0, r * 0.32, 0, Math.PI * 2, true);
      s.holes.push(hole);
      const geo = new THREE.ExtrudeGeometry(s, { depth: 0.26, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.025, bevelSegments: 2, curveSegments: 24 });
      geo.center();
      return geo;
    };
    const spec = [
      { r: 1.0, n: 16, mat: M.steel, x: -0.55, y: 0.15 },
      { r: 0.62, n: 10, mat: M.silver },
      { r: 0.44, n: 7, mat: M.red },
    ];
    const gears = spec.map((s) => {
      const m = mesh(gearGeo(s.r, s.n), s.mat);
      m.add(mesh(new THREE.CylinderGeometry(s.r * 0.2, s.r * 0.2, 0.4, 24).rotateX(Math.PI / 2), M.dark));
      g.add(m);
      return m;
    });
    // place gears 2 and 3 tangent to their neighbours
    const d1 = spec[0].r + spec[1].r + tooth;
    const a1 = -0.55;
    gears[0].position.set(spec[0].x, spec[0].y, 0);
    gears[1].position.set(spec[0].x + Math.cos(a1) * d1, spec[0].y + Math.sin(a1) * d1, 0.02);
    const d2 = spec[1].r + spec[2].r + tooth;
    const a2 = 0.75;
    gears[2].position.set(gears[1].position.x + Math.cos(a2) * d2, gears[1].position.y + Math.sin(a2) * d2, -0.02);
    g.position.set(-0.15, 0, 0);
    g.rotation.set(-0.45, 0.35, 0);
    models.push({
      group: g,
      update: (t) => {
        const w = t * 0.45;
        gears[0].rotation.z = w;
        gears[1].rotation.z = -w * (16 / 10) + 0.16;
        gears[2].rotation.z = w * (16 / 7) + 0.3;
      },
    });
  }

  // ---- 03 Web Applications: browser + globe -------------------------------
  {
    const g = new THREE.Group();
    const win = new THREE.Group();
    win.add(mesh(rbox(2.8, 1.9, 0.1, 0.09), M.graphite));
    win.add(mesh(rbox(2.8, 0.26, 0.13, 0.06), M.slate, 0, 0.82, 0));
    [M.red, M.steel, M.steel].forEach((m, i) => win.add(mesh(new THREE.SphereGeometry(0.045, 16, 12), m, -1.22 + i * 0.14, 0.82, 0.08)));
    win.add(mesh(box(1.3, 0.09, 0.02), M.steel, 0.2, 0.82, 0.07));
    win.add(mesh(box(1.4, 0.55, 0.03), M.slate, -0.55, 0.28, 0.06));
    win.add(mesh(box(0.45, 0.12, 0.03), M.red, -0.97, -0.15, 0.07));
    [1.3, 1.0, 1.15].forEach((w, i) => win.add(mesh(box(w, 0.06, 0.02), M.steel, -1.25 + w / 2, -0.42 - i * 0.14, 0.06)));
    g.add(win);

    const globe = new THREE.Group();
    globe.add(mesh(new THREE.SphereGeometry(0.72, 48, 32), M.dark));
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.76, 3)), M.line);
    globe.add(wire);
    const orbit = new THREE.Group();
    orbit.rotation.set(0.9, 0, 0.3);
    orbit.add(new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.008, 8, 96), M.steel));
    const node = mesh(new THREE.SphereGeometry(0.075, 20, 16), M.red, 1.0, 0, 0);
    orbit.add(node);
    globe.add(orbit);
    globe.position.set(1.15, -0.45, 0.9);
    g.add(globe);
    g.position.set(-0.3, 0.1, 0);
    g.rotation.set(-0.12, -0.45, 0);
    models.push({
      group: g,
      update: (t) => {
        wire.rotation.y = t * 0.35;
        const a = t * 1.2;
        node.position.set(Math.cos(a), Math.sin(a), 0);
        win.position.y = Math.sin(t * 0.9) * 0.05;
        globe.position.y = -0.45 + Math.sin(t * 0.9 + 1.5) * 0.08;
      },
    });
  }

  // ---- 04 Enterprise Systems: server rack + connected nodes ---------------
  {
    const g = new THREE.Group();
    const rack = new THREE.Group();
    [-0.46, 0, 0.46].forEach((y, i) => {
      const unit = mesh(rbox(1.5, 0.38, 1.1, 0.05), M.graphite, 0, y, 0);
      [-0.08, 0.04].forEach((dy) => unit.add(mesh(box(0.75, 0.03, 0.01), M.steel, -0.22, dy, 0.556)));
      unit.add(mesh(new THREE.SphereGeometry(0.04, 16, 12), i === 1 ? M.red : M.silver, 0.55, 0, 0.56));
      rack.add(unit);
    });
    g.add(rack);
    const ring = new THREE.Group();
    const nodes = [];
    const n = 6;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const p = new THREE.Vector3(Math.cos(a) * 2.0, Math.sin(a * 2) * 0.35, Math.sin(a) * 2.0);
      ring.add(mesh(rbox(0.3, 0.3, 0.3, 0.06), i === 0 ? M.red : M.silver, p.x, p.y, p.z));
      ring.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), p]), M.line));
      const pulse = mesh(new THREE.SphereGeometry(0.035, 12, 8), M.soft);
      ring.add(pulse);
      nodes.push({ p, pulse, off: i / n });
    }
    g.add(ring);
    g.rotation.set(0.32, 0, 0);
    g.scale.setScalar(0.92);
    models.push({
      group: g,
      update: (t) => {
        ring.rotation.y = t * 0.25;
        rack.rotation.y = -0.5 + Math.sin(t * 0.4) * 0.15;
        nodes.forEach(({ p, pulse, off }) => pulse.position.copy(p).multiplyScalar((t * 0.45 + off) % 1));
      },
    });
  }

  // ---- 05 SaaS Platforms: cloud over multi-tenant tiers -------------------
  {
    const g = new THREE.Group();
    const cloud = new THREE.Group();
    [
      [-0.62, 0, 0, 0.5],
      [0, 0.22, 0, 0.66],
      [0.62, 0.02, 0, 0.48],
      [0.3, -0.16, 0.3, 0.42],
      [-0.28, -0.16, 0.3, 0.42],
    ].forEach(([x, y, z, r]) => cloud.add(mesh(new THREE.SphereGeometry(r, 40, 28), M.soft, x, y, z)));
    cloud.scale.set(1, 0.85, 0.8);
    cloud.position.y = 0.8;
    g.add(cloud);
    const tiers = [];
    [-0.3, -0.62, -0.94].forEach((y, i) => {
      const tier = mesh(new THREE.CylinderGeometry(1.25 - i * 0.08, 1.25 - i * 0.08, 0.14, 64), i === 1 ? M.slate : M.graphite, 0, y, 0);
      tier.add(mesh(new THREE.TorusGeometry(1.25 - i * 0.08, 0.012, 8, 96).rotateX(Math.PI / 2), i === 0 ? M.red : M.steel, 0, 0.075, 0));
      g.add(tier);
      tiers.push(tier);
    });
    const orbit = new THREE.Group();
    orbit.position.y = -0.62;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      orbit.add(mesh(rbox(0.2, 0.2, 0.2, 0.04), i === 2 ? M.red : M.silver, Math.cos(a) * 1.7, 0, Math.sin(a) * 1.7));
    }
    g.add(orbit);
    // cloud-to-platform link
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.45, 0), new THREE.Vector3(0, -0.25, 0)]), M.line));
    g.rotation.set(0.28, 0, 0);
    models.push({
      group: g,
      update: (t) => {
        cloud.position.y = 0.8 + Math.sin(t * 1.0) * 0.07;
        tiers.forEach((tr, i) => (tr.rotation.y = t * (0.2 + i * 0.1) * (i % 2 ? -1 : 1)));
        orbit.rotation.y = t * 0.5;
      },
    });
  }

  return models;
}
