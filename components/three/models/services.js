import buildSolutions from './solutions';

// One model per service, in the same order as `services` (lib/data.js):
// website-design, website-development, app-development, custom-software,
// business-automation, saas-platforms, sitecare.
export default function buildServices(kit) {
  const { THREE, M, rbox, box, mesh } = kit;
  const models = [];

  // reuse three of the solution models; dispose the ones we don't need
  const sol = buildSolutions(kit);
  const reuse = { custom: sol[0], automation: sol[1], saas: sol[4] };
  [sol[2], sol[3]].forEach((m) => m.group.traverse((o) => o.geometry?.dispose()));

  // ---- Website Design: artboard, UI layers, pen tool, colour swatches -----
  {
    const g = new THREE.Group();
    const board = new THREE.Group();
    board.add(mesh(rbox(2.5, 1.75, 0.08, 0.08), M.graphite));
    board.add(mesh(box(2.2, 0.12, 0.02), M.steel, 0, 0.66, 0.05));
    board.add(mesh(box(1.2, 0.5, 0.02), M.slate, -0.45, 0.22, 0.05));
    board.add(mesh(rbox(0.46, 0.14, 0.03, 0.05), M.red, -0.82, -0.12, 0.06));
    [-0.75, 0, 0.75].forEach((x) => board.add(mesh(rbox(0.62, 0.38, 0.02, 0.04), M.soft, x, -0.55, 0.05)));
    board.add(mesh(box(0.7, 0.5, 0.02), M.steel, 0.65, 0.22, 0.05));
    g.add(board);

    // floating UI layers peeling off the artboard
    const layers = [];
    [
      [0.95, 0.75, 0.35, M.glass, 0.5],
      [0.7, 0.45, 0.6, M.soft, 0.2],
    ].forEach(([w, h, z, mat, y]) => {
      const l = mesh(rbox(w, h, 0.03, 0.05), mat, 0.95, y, z);
      g.add(l);
      layers.push(l);
    });

    // pen tool
    const pen = new THREE.Group();
    pen.add(mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.1, 32), M.silver, 0, 0.2, 0));
    pen.add(mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.16, 32), M.red, 0, -0.22, 0));
    pen.add(mesh(new THREE.ConeGeometry(0.09, 0.32, 32).rotateX(Math.PI), M.steel, 0, -0.46, 0));
    pen.position.set(1.55, 0.25, 0.8);
    pen.rotation.z = 0.55;
    g.add(pen);

    // bezier path with handles
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.1, -0.25, 0.25),
      new THREE.Vector3(-0.6, 0.6, 0.25),
      new THREE.Vector3(0.2, -0.9, 0.25),
      new THREE.Vector3(0.75, 0.1, 0.25)
    );
    g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.014, 6, false), M.red));
    [curve.v0, curve.v3].forEach((v) => g.add(mesh(rbox(0.09, 0.09, 0.09, 0.02), M.soft, v.x, v.y, v.z)));

    // colour swatches fanning open
    const fan = new THREE.Group();
    const swatches = [M.red, M.silver, M.slate, M.dark].map((mat, i) => {
      const s = mesh(rbox(0.32, 0.9, 0.03, 0.06), mat, 0, 0.4, i * 0.035);
      const pivot = new THREE.Group();
      pivot.add(s);
      fan.add(pivot);
      return pivot;
    });
    fan.position.set(-1.55, -0.85, 0.6);
    g.add(fan);

    g.rotation.set(-0.1, -0.35, 0);
    models.push({
      group: g,
      update: (t) => {
        board.position.y = Math.sin(t * 0.9) * 0.04;
        layers.forEach((l, i) => (l.position.z = (i ? 0.6 : 0.35) + Math.sin(t * 1.2 + i) * 0.08));
        pen.position.y = 0.25 + Math.sin(t * 1.4) * 0.12;
        pen.rotation.z = 0.55 + Math.sin(t * 1.4) * 0.1;
        const open = 0.5 + 0.5 * Math.sin(t * 0.9);
        swatches.forEach((p, i) => (p.rotation.z = -i * 0.32 * open));
      },
    });
  }

  // ---- Website Development: code editor + floating </> --------------------
  {
    const g = new THREE.Group();
    const editor = new THREE.Group();
    editor.add(mesh(rbox(2.7, 1.85, 0.1, 0.09), M.graphite));
    editor.add(mesh(rbox(2.7, 0.24, 0.12, 0.06), M.slate, 0, 0.8, 0));
    [M.red, M.steel, M.steel].forEach((m, i) => editor.add(mesh(new THREE.SphereGeometry(0.04, 16, 12), m, -1.18 + i * 0.13, 0.8, 0.07)));
    const lines = [];
    [
      [0, 0.9, M.red],
      [1, 1.3, M.silver],
      [2, 0.7, M.steel],
      [1, 1.0, M.silver],
      [2, 1.15, M.steel],
      [1, 0.55, M.red],
      [0, 0.8, M.silver],
    ].forEach(([indent, w, mat], i) => {
      const geo = box(w, 0.07, 0.02);
      geo.translate(w / 2, 0, 0);
      const l = mesh(geo, mat, -1.15 + indent * 0.2, 0.5 - i * 0.18, 0.06);
      editor.add(l);
      lines.push(l);
    });
    const cursor = mesh(box(0.035, 0.12, 0.02), M.red, 0, 0, 0.07);
    editor.add(cursor);
    g.add(editor);

    // </> glyph
    const glyph = new THREE.Group();
    const bar = (w, mat, x, y, rz) => {
      const b = mesh(rbox(w, 0.13, 0.13, 0.05), mat, x, y, 0);
      b.rotation.z = rz;
      glyph.add(b);
    };
    bar(0.42, M.silver, -0.52, 0.13, 0.75);
    bar(0.42, M.silver, -0.52, -0.13, -0.75);
    bar(0.42, M.silver, 0.52, 0.13, -0.75);
    bar(0.42, M.silver, 0.52, -0.13, 0.75);
    bar(0.75, M.red, 0, 0, 1.2);
    glyph.position.set(0.85, -0.55, 0.9);
    g.add(glyph);

    g.rotation.set(-0.08, -0.4, 0);
    models.push({
      group: g,
      update: (t) => {
        // lines type in one after another, then the cycle restarts
        const cyc = (t * 0.6) % (lines.length + 2);
        lines.forEach((l, i) => (l.scale.x = Math.min(Math.max(cyc - i, 0.001), 1)));
        const cur = Math.min(Math.floor(cyc), lines.length - 1);
        const ln = lines[cur];
        cursor.position.set(ln.position.x + ln.geometry.parameters.width * ln.scale.x + 0.05, ln.position.y, 0.07);
        cursor.visible = Math.sin(t * 8) > -0.2;
        glyph.rotation.y = Math.sin(t * 0.8) * 0.5;
        glyph.position.y = -0.55 + Math.sin(t * 1.1) * 0.08;
        editor.position.y = Math.sin(t * 0.9 + 1) * 0.04;
      },
    });
  }

  // ---- App Development: phones, app tiles, notification ------------------
  {
    const g = new THREE.Group();
    const phone = (mat) => {
      const p = new THREE.Group();
      p.add(mesh(rbox(1.0, 2.0, 0.12, 0.16), mat));
      p.add(mesh(rbox(0.9, 1.88, 0.02, 0.12), M.dark, 0, 0, 0.065));
      p.add(mesh(rbox(0.28, 0.06, 0.02, 0.03), M.graphite, 0, 0.86, 0.08));
      return p;
    };
    const back = phone(M.steel);
    back.position.set(0.75, 0.15, -0.5);
    back.rotation.set(0, -0.35, 0.12);
    g.add(back);

    const front = phone(M.silver);
    const tiles = [];
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++) {
        const tile = mesh(rbox(0.2, 0.2, 0.04, 0.05), (r + c) % 4 === 0 ? M.red : r === 2 && c === 1 ? M.soft : M.slate, -0.26 + c * 0.26, 0.42 - r * 0.28, 0.09);
        front.add(tile);
        tiles.push(tile);
      }
    front.add(mesh(rbox(0.7, 0.1, 0.03, 0.04), M.steel, 0, -0.6, 0.09));
    front.add(mesh(rbox(0.3, 0.04, 0.02, 0.02), M.soft, 0, -0.84, 0.09));
    front.position.set(-0.35, 0, 0.2);
    front.rotation.set(0, 0.25, -0.06);
    g.add(front);

    const note = new THREE.Group();
    note.add(mesh(rbox(1.0, 0.32, 0.06, 0.1), M.soft));
    note.add(mesh(new THREE.SphereGeometry(0.06, 16, 12), M.red, -0.36, 0, 0.04));
    note.add(mesh(box(0.5, 0.05, 0.01), M.steel, 0.1, 0.05, 0.035));
    note.add(mesh(box(0.35, 0.05, 0.01), M.steel, 0.02, -0.06, 0.035));
    note.position.set(-0.85, 0.9, 0.8);
    g.add(note);

    const orbit = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      orbit.add(mesh(rbox(0.16, 0.16, 0.16, 0.04), i === 0 ? M.red : M.silver, Math.cos(a) * 1.6, 0, Math.sin(a) * 1.6));
    }
    orbit.rotation.x = 0.35;
    g.add(orbit);

    models.push({
      group: g,
      update: (t) => {
        front.position.y = Math.sin(t * 0.9) * 0.06;
        back.position.y = 0.15 + Math.sin(t * 0.9 + 1.4) * 0.06;
        tiles.forEach((tile, i) => tile.scale.setScalar(1 + 0.18 * Math.max(0, Math.sin(t * 2 - i * 0.5))));
        const rise = (t * 0.35) % 1;
        note.position.y = 0.6 + rise * 0.6;
        note.scale.setScalar(Math.min(rise * 5, 1) * Math.min((1 - rise) * 5, 1) + 0.001);
        orbit.rotation.y = t * 0.4;
      },
    });
  }

  models.push(reuse.custom, reuse.automation, reuse.saas);

  // ---- Sitecare & Support: shield with a live heartbeat + monitors --------
  {
    const g = new THREE.Group();
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.0);
    shape.bezierCurveTo(0.35, 0.82, 0.68, 0.78, 0.82, 0.75);
    shape.bezierCurveTo(0.82, 0.0, 0.68, -0.68, 0, -1.08);
    shape.bezierCurveTo(-0.68, -0.68, -0.82, 0.0, -0.82, 0.75);
    shape.bezierCurveTo(-0.68, 0.78, -0.35, 0.82, 0, 1.0);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4, curveSegments: 40 });
    geo.center();
    const shield = new THREE.Group();
    shield.add(new THREE.Mesh(geo, M.graphite));
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.02, 8, 80), M.steel);
    rim.position.z = 0.16;
    shield.add(rim);

    // heartbeat line drawn progressively across the shield
    const pts = [
      [-0.62, 0], [-0.3, 0], [-0.2, 0.18], [-0.1, -0.32], [0.02, 0.48], [0.14, -0.12], [0.22, 0], [0.62, 0],
    ].map(([x, y]) => new THREE.Vector3(x, y, 0.17));
    const pulseCurve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1);
    const SEG = 160;
    const RAD = 8;
    const pulseGeo = new THREE.TubeGeometry(pulseCurve, SEG, 0.035, RAD, false);
    shield.add(new THREE.Mesh(pulseGeo, M.red));
    g.add(shield);

    // orbiting status nodes
    const ring = new THREE.Group();
    ring.add(new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.01, 8, 120), M.steel));
    const nodes = [M.red, M.silver, M.soft].map((mat, i) => {
      const n = mesh(rbox(0.22, 0.22, 0.22, 0.05), mat);
      ring.add(n);
      return { n, off: i / 3 };
    });
    ring.rotation.x = 1.15;
    g.add(ring);

    // uptime bars
    const bars = [];
    for (let i = 0; i < 6; i++) {
      const bgeo = box(0.12, 1, 0.12);
      bgeo.translate(0, 0.5, 0);
      const b = mesh(bgeo, i === 5 ? M.red : M.silver, 1.25 + i * 0.17, -1.0, -0.2);
      b.userData.h = 0.3 + ((i * 37) % 5) * 0.08;
      g.add(b);
      bars.push(b);
    }

    models.push({
      group: g,
      update: (t) => {
        const p = (t * 0.5) % 1.25; // draw, then hold briefly
        pulseGeo.setDrawRange(0, Math.floor(Math.min(p, 1) * SEG) * RAD * 6);
        shield.rotation.y = Math.sin(t * 0.6) * 0.35;
        shield.position.y = Math.sin(t * 0.9) * 0.06;
        nodes.forEach(({ n, off }) => {
          const a = (t * 0.35 + off) * Math.PI * 2;
          n.position.set(Math.cos(a) * 1.55, Math.sin(a) * 1.55, 0);
          n.rotation.set(t, t * 0.6, 0);
        });
        bars.forEach((b, i) => (b.scale.y = b.userData.h * (0.8 + 0.2 * Math.sin(t * 2 + i))));
      },
    });
  }

  return models;
}
