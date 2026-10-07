// TeckHub360 OCR: receipts ride a conveyor through a laser scanner and come out
// as coded blocks (one model; used on the TeckHub360 page).
export default function buildOcr({ THREE, M, rbox, box, mesh }) {
  // extra materials live on M so ModelScene disposes them with the rest
  M.laser = M.laser || new THREE.MeshBasicMaterial({ color: 0xed001c, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide });
  M.laserEdge = M.laserEdge || new THREE.MeshBasicMaterial({ color: 0xff2a40 });

  const g = new THREE.Group();
  const LEN = 5.4;

  // conveyor
  const belt = new THREE.Group();
  belt.add(mesh(rbox(LEN, 0.1, 1.1, 0.04), M.dark, 0, -0.05, 0));
  [-0.6, 0.6].forEach((z) => belt.add(mesh(rbox(LEN + 0.1, 0.14, 0.08, 0.03), M.steel, 0, 0.0, z)));
  const rollers = [];
  for (let i = 0; i < 10; i++) {
    const r = mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.1, 20).rotateX(Math.PI / 2), M.graphite, -LEN / 2 + 0.3 + i * ((LEN - 0.6) / 9), -0.17, 0);
    belt.add(r);
    rollers.push(r);
  }
  g.add(belt);

  // scanner arch with laser curtain
  const arch = new THREE.Group();
  [-0.72, 0.72].forEach((z) => arch.add(mesh(rbox(0.22, 1.35, 0.2, 0.05), M.graphite, 0, 0.62, z)));
  arch.add(mesh(rbox(0.34, 0.26, 1.7, 0.06), M.slate, 0, 1.34, 0));
  arch.add(mesh(box(0.36, 0.04, 1.5), M.red, 0, 1.2, 0));
  const lamp = mesh(new THREE.SphereGeometry(0.06, 16, 12), M.red, 0.18, 1.34, 0.6);
  arch.add(lamp);
  const curtain = mesh(new THREE.PlaneGeometry(1.2, 1.15).rotateY(Math.PI / 2), M.laser, 0, 0.62, 0);
  arch.add(curtain);
  const sweep = mesh(box(0.03, 0.03, 1.2), M.laserEdge, 0, 0.6, 0);
  arch.add(sweep);
  g.add(arch);

  // items: receipts before the scanner, coded blocks after it
  const N = 5;
  const items = [];
  for (let i = 0; i < N; i++) {
    const item = new THREE.Group();
    const receipt = new THREE.Group();
    receipt.add(mesh(rbox(0.62, 0.025, 0.82, 0.02), M.soft));
    [0.26, 0.12, -0.02, -0.16].forEach((zz, j) => receipt.add(mesh(box(j % 2 ? 0.32 : 0.42, 0.01, 0.04), M.steel, -0.04, 0.02, zz)));
    receipt.add(mesh(box(0.2, 0.012, 0.05), M.red, 0.1, 0.02, -0.3));
    receipt.rotation.y = (i % 2 ? 0.12 : -0.1);
    item.add(receipt);

    const block = new THREE.Group();
    block.add(mesh(rbox(0.5, 0.36, 0.5, 0.07), i % 3 === 1 ? M.red : M.silver, 0, 0.18, 0));
    block.add(mesh(rbox(0.3, 0.02, 0.12, 0.01), i % 3 === 1 ? M.soft : M.red, 0, 0.37, 0.08));
    block.add(mesh(rbox(0.2, 0.02, 0.06, 0.01), M.graphite, -0.05, 0.37, -0.1));
    item.add(block);

    g.add(item);
    items.push({ item, receipt, block, off: i / N });
  }

  // stacked output tray
  const tray = mesh(rbox(0.9, 0.08, 1.0, 0.04), M.graphite, LEN / 2 + 0.55, -0.32, 0);
  g.add(tray);

  g.rotation.set(0.5, -0.55, 0);
  g.position.set(0, -0.35, 0);
  g.scale.setScalar(0.92);

  return [
    {
      group: g,
      update: (t) => {
        const speed = 0.11;
        items.forEach(({ item, receipt, block, off }) => {
          const u = (t * speed + off) % 1;
          const x = -LEN / 2 + 0.3 + u * (LEN - 0.6);
          item.position.set(x, 0.05, 0);
          // swap receipt → block as it crosses the laser, with a little pop
          const after = x > 0.05;
          receipt.visible = !after;
          block.visible = after;
          const pop = after ? Math.min((x - 0.05) / 0.35, 1) : 1;
          block.scale.setScalar(0.4 + 0.6 * (1 - Math.pow(1 - pop, 3)));
          // fade in/out at the belt ends
          const edge = Math.min(u / 0.06, (1 - u) / 0.06, 1);
          item.scale.setScalar(Math.max(edge, 0.001));
          receipt.position.y = Math.sin(t * 6 + off * 10) * 0.005;
        });
        rollers.forEach((r) => (r.rotation.y = -t * 3));
        sweep.position.y = 0.62 + Math.sin(t * 3.2) * 0.5;
        M.laser.opacity = 0.16 + 0.08 * Math.sin(t * 9);
        lamp.scale.setScalar(1 + 0.3 * Math.max(0, Math.sin(t * 6)));
      },
    },
  ];
}
