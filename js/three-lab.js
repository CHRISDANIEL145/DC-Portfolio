/* ================================================================
   THREE-LAB.JS — AI Laboratory Neural Network Particle System
================================================================ */

'use strict';

(function initLabScene() {

  const canvas = document.getElementById('lab-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // ---- Renderer ----
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  // ---- Scene ----
  const scene = new THREE.Scene();

  // ---- Camera ----
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.set(0, 0, 22);

  // ---- Nodes (neural network) ----
  const NODE_COUNT  = 55;
  const NODE_SPREAD = 14;
  const LINK_DIST   = 5.5;

  const nodeGeometry = new THREE.SphereGeometry(0.12, 8, 8);

  const nodeColors = [0xF75C1A, 0x00C896, 0xFFB800];
  const nodes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: nodeColors[i % 3],
      transparent: true,
      opacity: 0.75,
    });
    const mesh = new THREE.Mesh(nodeGeometry, mat);
    mesh.position.set(
      (Math.random() - 0.5) * NODE_SPREAD,
      (Math.random() - 0.5) * NODE_SPREAD * 0.6,
      (Math.random() - 0.5) * 6
    );
    // Store original position and phase offset
    mesh.userData = {
      ox: mesh.position.x,
      oy: mesh.position.y,
      oz: mesh.position.z,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.4,
      amplitude: 0.15 + Math.random() * 0.25,
    };
    scene.add(mesh);
    nodes.push(mesh);
  }

  // ---- Lines (connections) ----
  const linePoints = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = nodes[i].position.distanceTo(nodes[j].position);
      if (d < LINK_DIST) {
        linePoints.push(nodes[i].position.clone());
        linePoints.push(nodes[j].position.clone());
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xF75C1A,
    transparent: true,
    opacity: 0.07,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  // ---- Background Particles ----
  const PARTICLE_COUNT = 800;
  const pPositions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pPositions[i * 3]     = (Math.random() - 0.5) * 40;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xF75C1A, size: 0.05, transparent: true, opacity: 0.25, sizeAttenuation: true });
  const particleCloud = new THREE.Points(pGeo, pMat);
  scene.add(particleCloud);

  // ---- Mouse ----
  const mouse = { x: 0, y: 0 };
  const labSection = document.getElementById('lab');
  if (labSection) {
    labSection.addEventListener('mousemove', (e) => {
      const rect = labSection.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top ) / rect.height - 0.5) * 2;
    });
  }

  // ---- Resize ----
  function onResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', window.debounce(onResize, 100));

  // ---- Animate ----
  let frameId = null;
  let isVisible = false;

  // Only animate when section is visible
  const labObserver = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !frameId) animate();
    if (!isVisible && frameId) { cancelAnimationFrame(frameId); frameId = null; }
  }, { threshold: 0.05 });
  if (labSection) labObserver.observe(labSection);

  let lastTime = 0;
  function animate(timestamp = 0) {
    frameId = requestAnimationFrame(animate);
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    const t = timestamp / 1000;

    // Animate nodes
    nodes.forEach((node) => {
      const d = node.userData;
      node.position.x = d.ox + Math.sin(t * d.speed + d.phase) * d.amplitude;
      node.position.y = d.oy + Math.cos(t * d.speed * 0.7 + d.phase) * d.amplitude;
    });

    // Rebuild line positions dynamically
    const posArr = lineGeo.attributes.position;
    let idx = 0;
    for (let i = 0; i < nodes.length && idx < posArr.count; i++) {
      for (let j = i + 1; j < nodes.length && idx < posArr.count; j++) {
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < LINK_DIST) {
          posArr.setXYZ(idx++, nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
          if (idx < posArr.count)
            posArr.setXYZ(idx++, nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);
        }
      }
    }
    posArr.needsUpdate = true;

    // Camera gentle drift + mouse
    camera.position.x = window.lerp(camera.position.x, mouse.x * 1.5, 0.03);
    camera.position.y = window.lerp(camera.position.y, mouse.y * -1.0 + Math.sin(t * 0.3) * 0.5, 0.03);
    camera.lookAt(scene.position);

    // Rotate particle cloud slowly
    particleCloud.rotation.y = t * 0.05;
    particleCloud.rotation.x = t * 0.025;

    renderer.render(scene, camera);
  }

  // Kick off when visible
  labObserver.observe(canvas);

  console.log('[Portfolio] Lab 3D scene initialized');

})();
