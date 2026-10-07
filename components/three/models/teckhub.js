// TeckHub360 accents that float around the HTML dashboard on the home page:
// receipts being OCR-scanned, a reports donut, a security shield and orbiting data nodes.
export default function buildTeckhub({ THREE, M, rbox, box, mesh }) {
  const g = new THREE.Group();

  // ---- receipts with a scanning beam (top-left) --------------------------
  const receipts = new THREE.Group();
  const sheets = [];
  for (let i = 0; i < 3; i++) {
    const s = mesh(rbox(0.86, 1.15, 0.025, 0.03), M.soft, i * 0.07, -i * 0.07, -i * 0.09);
    s.add(mesh(box(0.5, 0.06, 0.01), M.steel, -0.1, 0.42, 0.016));
    [0.22, 0.08, -0.06, -0.2].forEach((y, j) => s.add(mesh(box(j % 2 ? 0.46 : 0.6, 0.035, 0.01), M.steel, j % 2 ? -0.08 : -0.01, y, 0.016)));
    s.add(mesh(box(0.28, 0.06, 0.01), M.red, 0.16, -0.42, 0.016));
    s.rotation.z = (i - 1) * 0.06;
    receipts.add(s);
    sheets.push(s);
  }
  const beam = mesh(box(1.05, 0.03, 0.04), M.red, 0, 0, 0.06);
  const glow = mesh(box(1.05, 0.22, 0.005), M.glass, 0, -0.1, 0.05);
  receipts.add(beam, glow);
  receipts.position.set(-2.62, 0.5, 0.6);
  receipts.scale.setScalar(0.7);
  receipts.rotation.set(0.1, 0.45, 0.05);
  g.add(receipts);

  // ---- reports donut (top-right) -----------------------------------------
  const donut = new THREE.Group();
  const arcs = [
    [0, 1.25, M.red],
    [1.32, 2.3, M.silver],
    [3.7, 2.45, M.steel],
  ];
  arcs.forEach(([start, len, mat]) => {
    const a = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.13, 20, 80, len), mat);
    a.rotation.z = start;
    donut.add(a);
  });
  donut.add(mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.06, 48).rotateX(Math.PI / 2), M.graphite));
  donut.position.set(2.5, 1.9, 0.4);
  donut.scale.setScalar(0.6);
  donut.rotation.set(-0.35, -0.5, 0);
  g.add(donut);

  // ---- security shield with check (bottom-right) -------------------------
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.62);
  shape.bezierCurveTo(0.22, 0.5, 0.42, 0.48, 0.5, 0.46);
  shape.bezierCurveTo(0.5, 0.0, 0.42, -0.42, 0, -0.66);
  shape.bezierCurveTo(-0.42, -0.42, -0.5, 0.0, -0.5, 0.46);
  shape.bezierCurveTo(-0.42, 0.48, -0.22, 0.5, 0, 0.62);
  const shieldGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 4, curveSegments: 32 });
  shieldGeo.center();
  const shield = new THREE.Group();
  shield.add(new THREE.Mesh(shieldGeo, M.graphite));
  const check = new THREE.Group();
  const c1 = mesh(rbox(0.24, 0.08, 0.06, 0.03), M.red, -0.11, -0.06, 0);
  c1.rotation.z = -0.8;
  const c2 = mesh(rbox(0.46, 0.08, 0.06, 0.03), M.red, 0.08, 0.04, 0);
  c2.rotation.z = 0.9;
  check.add(c1, c2);
  check.position.z = 0.13;
  shield.add(check);
  shield.position.set(2.58, -1.55, 0.7);
  shield.scale.setScalar(0.62);
  g.add(shield);

  // ---- data nodes circling the portal's outline (never over its content) -----------------------------
  const orbit = new THREE.Group();
  const curve = new THREE.EllipseCurve(0, 0, 2.75, 2.1, 0, Math.PI * 2);
  orbit.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(curve.getPoints(160)), M.line));
  const nodes = [];
  for (let i = 0; i < 6; i++) {
    const n = mesh(i === 0 ? new THREE.SphereGeometry(0.09, 20, 16) : rbox(0.13, 0.13, 0.13, 0.03), i === 0 ? M.red : M.silver);
    orbit.add(n);
    nodes.push({ n, off: i / 6 });
  }
  orbit.rotation.set(0.12, 0.08, 0);
  orbit.position.set(0.1, -0.05, -0.3);
  g.add(orbit);

  return [
    {
      group: g,
      update: (t) => {
        // scan beam sweeps the front receipt; the stack breathes
        const sweep = Math.sin(t * 1.6);
        beam.position.y = sweep * 0.5;
        glow.position.y = sweep * 0.5 - 0.1 * Math.sign(Math.cos(t * 1.6));
        sheets.forEach((s, i) => (s.position.y = -i * 0.07 + Math.sin(t * 1.1 + i * 0.7) * 0.03));
        receipts.position.y = 0.5 + Math.sin(t * 0.8) * 0.06;

        donut.rotation.z = t * 0.35;
        donut.position.y = 1.9 + Math.sin(t * 0.9 + 1) * 0.07;

        shield.rotation.y = Math.sin(t * 0.7) * 0.45;
        shield.position.y = -1.55 + Math.sin(t * 0.9 + 2) * 0.07;

        nodes.forEach(({ n, off }) => {
          const p = curve.getPoint((t * 0.05 + off) % 1);
          n.position.set(p.x, p.y, 0);
          n.rotation.set(t, t * 0.7, 0);
        });
      },
    },
  ];
}
