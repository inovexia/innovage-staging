// One model per step in `process` (lib/data.js), same order.
export default function buildProcess({ THREE, M, rbox, box, mesh }) {
  const models = [];
  const cycle = (t, period, offset = 0) => ((t + offset) % period) / period; // 0..1 saw
  const easeOut = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

  // ---- 01 Discover: magnifier sweeping over documents ---------------------
  {
    const g = new THREE.Group();
    const docs = [];
    ['dark', 'graphite', 'slate'].forEach((k, i) => {
      const d = mesh(rbox(1.5, 1.95, 0.05, 0.06), M[k], (i - 1) * 0.55, 0, (i - 1) * 0.12);
      d.rotation.z = (i - 1) * -0.12;
      g.add(d);
      docs.push(d);
    });
    const front = docs[2];
    front.add(mesh(box(0.9, 0.09, 0.02), M.soft, -0.1, 0.7, 0.04));
    [1.1, 0.9, 1.05, 0.7, 0.95, 0.6].forEach((w, i) =>
      front.add(mesh(box(w, 0.05, 0.02), i === 2 ? M.red : M.steel, -0.55 + w / 2, 0.45 - i * 0.18, 0.04))
    );
    const lens = new THREE.Group();
    lens.add(new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.075, 24, 72), M.silver));
    lens.add(new THREE.Mesh(new THREE.CylinderGeometry(0.53, 0.53, 0.03, 48).rotateX(Math.PI / 2), M.glass));
    const handle = mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.95, 24), M.red, 0.78, -0.78, 0);
    handle.rotation.z = Math.PI / 4;
    lens.add(handle);
    lens.position.z = 0.75;
    g.add(lens);
    g.rotation.set(-0.15, 0.3, 0);
    models.push({
      group: g,
      update: (t) => {
        lens.position.x = Math.sin(t * 0.7) * 0.7 + 0.2;
        lens.position.y = Math.sin(t * 1.4) * 0.35 + 0.1;
        lens.rotation.z = Math.sin(t * 0.7) * 0.15;
      },
    });
  }

  // ---- 02 Define: self-ticking checklist ----------------------------------
  {
    const g = new THREE.Group();
    const board = mesh(rbox(2.0, 2.5, 0.1, 0.1), M.graphite);
    g.add(board);
    board.add(mesh(rbox(0.75, 0.24, 0.16, 0.06), M.steel, 0, 1.22, 0.02));
    const checks = [];
    for (let i = 0; i < 4; i++) {
      const y = 0.62 - i * 0.44;
      board.add(mesh(rbox(0.26, 0.26, 0.07, 0.04), M.slate, -0.62, y, 0.06));
      board.add(mesh(box(0.85, 0.07, 0.03), M.steel, 0.15, y + 0.04, 0.06));
      board.add(mesh(box(0.55, 0.05, 0.03), M.slate, 0.0, y - 0.08, 0.06));
      const check = new THREE.Group();
      const mat = i === 3 ? M.red : M.silver;
      const s = mesh(box(0.07, 0.17, 0.06), mat, -0.06, -0.02, 0);
      s.rotation.z = Math.PI / 4;
      const l = mesh(box(0.07, 0.32, 0.06), mat, 0.05, 0.04, 0);
      l.rotation.z = -Math.PI / 5;
      check.add(s, l);
      check.position.set(-0.62, y, 0.14);
      board.add(check);
      checks.push(check);
    }
    g.rotation.set(-0.18, -0.4, 0.05);
    models.push({
      group: g,
      update: (t) => {
        const c = cycle(t, 5.5) * 5.5; // seconds into the cycle
        checks.forEach((ch, i) => ch.scale.setScalar(Math.max(easeOut((c - 0.4 - i * 0.8) * 3), 0.001)));
        g.position.y = Math.sin(t * 0.9) * 0.06;
      },
    });
  }

  // ---- 03 Design: wireframe layout with UI layers floating in -------------
  {
    const g = new THREE.Group();
    g.add(mesh(rbox(2.8, 1.9, 0.06, 0.08), M.dark));
    const blocks = [
      [0, 0.68, 2.4, 0.18],
      [-0.5, 0.15, 1.4, 0.7],
      [0.82, 0.15, 0.75, 0.7],
      [-0.82, -0.55, 0.75, 0.42],
      [0, -0.55, 0.75, 0.42],
      [0.82, -0.55, 0.75, 0.42],
    ];
    const solids = [];
    blocks.forEach(([x, y, w, h], i) => {
      const wire = new THREE.LineSegments(new THREE.EdgesGeometry(box(w, h, 0.02)), M.line);
      wire.position.set(x, y, 0.6);
      g.add(wire);
      const s = mesh(rbox(w, h, 0.05, 0.03), i === 1 ? M.red : i % 2 ? M.slate : M.graphite, x, y, 0.06);
      g.add(s);
      solids.push(s);
    });
    const cursor = mesh(new THREE.ConeGeometry(0.09, 0.26, 3), M.soft);
    cursor.rotation.z = Math.PI / 5;
    g.add(cursor);
    g.rotation.set(-0.25, 0.5, 0);
    models.push({
      group: g,
      update: (t) => {
        solids.forEach((s, i) => (s.position.z = 0.06 + 0.5 * (0.5 + 0.5 * Math.sin(t * 1.3 + i * 1.05))));
        cursor.position.set(Math.cos(t * 0.8) * 0.9, Math.sin(t * 1.1) * 0.5, 0.95);
      },
    });
  }

  // ---- 04 Build: block tower assembling -----------------------------------
  {
    const g = new THREE.Group();
    const s = 0.46;
    const top = [];
    for (let y = 0; y < 3; y++) {
      for (let x = -1; x <= 1; x++) {
        for (let z = -1; z <= 1; z++) {
          const isRed = y === 2 && x === 0 && z === 0;
          const mat = isRed ? M.red : (x + y + z) % 2 ? M.slate : M.silver;
          const c = mesh(rbox(0.42, 0.42, 0.42, 0.05), mat, x * s, (y - 1) * s, z * s);
          g.add(c);
          if (y === 2) top.push({ c, base: c.position.y, i: top.length });
        }
      }
    }
    g.rotation.set(0.55, 0.78, 0);
    g.scale.setScalar(1.15);
    models.push({
      group: g,
      update: (t) => {
        top.forEach(({ c, base, i }) => {
          const k = cycle(t, 3.6, i * 0.22) * 2; // 0..2
          c.position.y = base + (k < 1 ? (1 - easeOut(k)) * 1.6 : 0);
        });
        g.rotation.y = 0.78 + Math.sin(t * 0.4) * 0.2;
      },
    });
  }

  // ---- 05 Validate: shield + check + scan ring ----------------------------
  {
    const g = new THREE.Group();
    const s = new THREE.Shape();
    s.moveTo(0, 1.1);
    s.quadraticCurveTo(0.55, 0.98, 0.95, 0.9);
    s.lineTo(0.95, 0.1);
    s.quadraticCurveTo(0.9, -0.72, 0, -1.15);
    s.quadraticCurveTo(-0.9, -0.72, -0.95, 0.1);
    s.lineTo(-0.95, 0.9);
    s.quadraticCurveTo(-0.55, 0.98, 0, 1.1);
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.24, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4, curveSegments: 32 });
    geo.center();
    const shield = new THREE.Group();
    shield.add(new THREE.Mesh(geo, M.steel));
    const short = mesh(box(0.17, 0.45, 0.14), M.red, -0.24, -0.08, 0.2);
    short.rotation.z = Math.PI / 4;
    const long = mesh(box(0.17, 0.9, 0.14), M.red, 0.16, 0.1, 0.2);
    long.rotation.z = -Math.PI / 5.2;
    shield.add(short, long);
    g.add(shield);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.012, 8, 128).rotateX(Math.PI / 2), M.silver);
    g.add(ring);
    models.push({
      group: g,
      update: (t) => {
        shield.rotation.y = Math.sin(t * 0.7) * 0.55;
        ring.position.y = Math.sin(t * 1.2) * 1.05;
        ring.scale.setScalar(1 - Math.abs(ring.position.y) * 0.25);
      },
    });
  }

  // ---- 06 Launch: rocket with exhaust -------------------------------------
  {
    const g = new THREE.Group();
    const rocket = new THREE.Group();
    rocket.add(mesh(new THREE.CylinderGeometry(0.32, 0.36, 1.3, 40), M.soft));
    rocket.add(mesh(new THREE.ConeGeometry(0.32, 0.65, 40), M.red, 0, 0.97, 0));
    rocket.add(mesh(new THREE.SphereGeometry(0.13, 24, 16), M.dark, 0, 0.22, 0.27));
    rocket.add(mesh(new THREE.TorusGeometry(0.13, 0.03, 12, 32), M.steel, 0, 0.22, 0.3));
    rocket.add(mesh(new THREE.CylinderGeometry(0.2, 0.27, 0.2, 32), M.graphite, 0, -0.75, 0));
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const fin = mesh(box(0.05, 0.5, 0.36), M.steel, Math.sin(a) * 0.4, -0.45, Math.cos(a) * 0.4);
      fin.rotation.y = a;
      rocket.add(fin);
    }
    g.add(rocket);
    const puffs = [];
    for (let i = 0; i < 14; i++) {
      const p = mesh(new THREE.SphereGeometry(0.16, 16, 12), M.slate);
      g.add(p);
      puffs.push({ p, off: i / 14, dx: (Math.random() - 0.5) * 0.5 });
    }
    g.rotation.set(0, 0, -0.45);
    g.position.set(0.1, 0.25, 0);
    models.push({
      group: g,
      update: (t) => {
        rocket.position.y = Math.sin(t * 2.2) * 0.06;
        rocket.rotation.y = t * 0.6;
        puffs.forEach(({ p, off, dx }) => {
          const k = cycle(t, 1.4, off * 1.4);
          p.position.set(dx * k, -0.95 - k * 1.3, 0);
          p.scale.setScalar(0.3 + k * 1.1);
          p.visible = k < 0.95;
        });
      },
    });
  }

  // ---- 07 Evolve: growth bars + rising arrow ------------------------------
  {
    const g = new THREE.Group();
    const bars = [];
    [0.45, 0.75, 1.05, 1.4, 1.8].forEach((h, i) => {
      const geo = rbox(0.36, 1, 0.36, 0.05);
      geo.translate(0, 0.5, 0);
      const b = mesh(geo, i === 4 ? M.red : i % 2 ? M.slate : M.silver, -1.0 + i * 0.5, -1.0, 0);
      b.userData.h = h;
      g.add(b);
      bars.push(b);
    });
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.3, -0.35, 0.45),
      new THREE.Vector3(-0.4, 0.0, 0.45),
      new THREE.Vector3(0.4, 0.45, 0.45),
      new THREE.Vector3(1.15, 1.15, 0.45),
    ]);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.04, 12), M.steel));
    const head = mesh(new THREE.ConeGeometry(0.13, 0.32, 24), M.red);
    const end = curve.getPoint(1);
    const dir = curve.getTangent(1);
    head.position.copy(end);
    head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    g.add(head);
    g.rotation.set(-0.1, -0.45, 0);
    models.push({
      group: g,
      update: (t) => {
        bars.forEach((b, i) => (b.scale.y = b.userData.h * (0.85 + 0.15 * Math.sin(t * 1.5 - i * 0.6))));
        g.position.y = Math.sin(t * 0.9) * 0.05;
      },
    });
  }

  return models;
}
