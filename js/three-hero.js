/* ================================================================
   THREE-HERO.JS — 3D Digital Campus Scene
   Luxury warm architectural aesthetic. No cyberpunk, no neon.
================================================================ */

'use strict';

(function initHeroScene() {

  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // ---- Renderer ----
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // ---- Scene ----
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1A1410);
  scene.fog = new THREE.Fog(0x1A1410, 28, 80);

  // ---- Camera ----
  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
  camera.position.set(0, 6, 22);
  camera.lookAt(0, 2, 0);

  // ---- Lights ----
  // Ambient
  const ambient = new THREE.AmbientLight(0xFFF4E8, 0.6);
  scene.add(ambient);

  // Main directional (warm sun from upper right)
  const sun = new THREE.DirectionalLight(0xFFE4C4, 1.6);
  sun.position.set(12, 18, 10);
  sun.castShadow = true;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 80;
  sun.shadow.camera.left = -25;
  sun.shadow.camera.right = 25;
  sun.shadow.camera.top = 25;
  sun.shadow.camera.bottom = -25;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.bias = -0.001;
  scene.add(sun);

  // Fill light from left (cool blue-purple to contrast warmth)
  const fill = new THREE.DirectionalLight(0xC8D8FF, 0.4);
  fill.position.set(-14, 8, 6);
  scene.add(fill);

  // Primary accent point (orange)
  const pointOrange = new THREE.PointLight(0xF75C1A, 1.2, 20);
  pointOrange.position.set(-4, 4, 2);
  scene.add(pointOrange);

  // Secondary accent point (green)
  const pointGreen = new THREE.PointLight(0x00C896, 0.8, 18);
  pointGreen.position.set(6, 3, -3);
  scene.add(pointGreen);

  // ---- Ground ----
  const groundGeo = new THREE.PlaneGeometry(200, 200);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x1C1714,
    roughness: 0.95,
    metalness: 0.02,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.01;
  ground.receiveShadow = true;
  scene.add(ground);

  // Grid overlay on ground
  const gridHelper = new THREE.GridHelper(80, 40, 0x2E2620, 0x2A211D);
  gridHelper.position.y = 0.01;
  scene.add(gridHelper);

  // ---- Helper: create building ----
  function createBuilding(w, h, d, x, z, colorHex, roughness = 0.85) {
    const group = new THREE.Group();

    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness,
      metalness: 0.08,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = h / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Rooftop edge trim
    const trimGeo = new THREE.BoxGeometry(w + 0.08, 0.06, d + 0.08);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xC8B8A8,
      roughness: 0.9,
      metalness: 0.05,
    });
    const trim = new THREE.Mesh(trimGeo, trimMat);
    trim.position.y = h + 0.03;
    group.add(trim);

    // Window grid (emissive planes on facade)
    if (h > 1.5) {
      const rows = Math.max(2, Math.floor(h / 0.7));
      const cols = Math.max(2, Math.floor(w / 0.55));
      const wWin = 0.22;
      const hWin = 0.18;
      const winMat = new THREE.MeshStandardMaterial({
        color: 0xFFE8B0,
        emissive: 0xFFCC60,
        emissiveIntensity: Math.random() * 0.4 + 0.1,
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.85,
      });

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() < 0.35) continue; // some dark windows
          const winGeo = new THREE.PlaneGeometry(wWin, hWin);
          const win = new THREE.Mesh(winGeo, winMat.clone());
          const yPos = 0.5 + r * 0.65;
          const xPos = (c - (cols - 1) / 2) * 0.45;
          win.position.set(xPos, yPos, d / 2 + 0.02);
          group.add(win);
        }
      }
    }

    group.position.set(x, 0, z);
    return group;
  }

  // ---- City Buildings ----
  const buildingDefs = [
    // [w, h, d, x, z, color]
    [1.8, 7.5, 1.8,  -8,  -4, 0x3A3028],
    [2.2, 5.0, 2.0,  -5,  -3, 0x4A3E36],
    [1.5, 9.5, 1.5,  -2,  -5, 0x332B25],
    [2.5, 4.5, 2.5,   2,  -4, 0x42382E],
    [1.6, 8.0, 1.6,   6,  -3, 0x382F28],
    [2.0, 6.5, 2.0,   9,  -5, 0x3F342C],
    [1.4, 3.5, 1.4, -10,  -1, 0x4D4038],
    [3.0, 5.5, 2.2,  -6,  -7, 0x2E2620],
    [1.8, 11, 1.8,   0,  -7, 0x302820],  // tallest central building
    [2.2, 6.0, 2.2,   5,  -7, 0x3C322A],
    [1.6, 4.0, 1.6,  11,  -2, 0x463B32],
    [2.0, 7.0, 1.8,  -3,  -9, 0x34281F],
    [1.5, 5.5, 1.5,   3,  -9, 0x3E342C],
    [2.8, 3.0, 2.8, -12,  -4, 0x4A3E38],
    [1.4, 8.5, 1.4,  -9,  -8, 0x302822],
    [2.2, 4.5, 2.2,  12,  -6, 0x42382E],
    [1.8, 6.0, 1.6,   8,  -8, 0x38302A],
    [1.5, 3.5, 1.5,  -7,   0, 0x463C34],
    [2.0, 5.0, 2.0,   4,   0, 0x3C3028],
    [1.6, 7.0, 1.6,  -4,  -2, 0x34281E],
  ];

  const cityGroup = new THREE.Group();
  buildingDefs.forEach(([w, h, d, x, z, col]) => {
    cityGroup.add(createBuilding(w, h, d, x, z, col));
  });
  scene.add(cityGroup);

  // ---- Floating Data Nodes ----
  const nodeGroup = new THREE.Group();

  function createNode(radius, colorHex, x, y, z, emissiveIntensity = 0.6) {
    const geo = new THREE.SphereGeometry(radius, 16, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity,
      roughness: 0.15,
      metalness: 0.4,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    return mesh;
  }

  const nodePositions = [
    [0.18, 0xF75C1A, -3, 7, -2],
    [0.14, 0x00C896,  4, 5, -3],
    [0.22, 0xFFB800,  0, 9, -5],
    [0.12, 0xF75C1A,  6, 6, -4],
    [0.16, 0x00C896, -6, 8, -3],
    [0.10, 0xFFB800,  2, 4, -1],
    [0.20, 0xF75C1A, -2, 5, -6],
    [0.15, 0x00C896,  5, 8, -6],
    [0.13, 0xFFB800, -4, 6, -5],
    [0.18, 0xF75C1A,  1, 11,-6],
  ];

  const nodes = nodePositions.map(([r, c, x, y, z]) => {
    const node = createNode(r, c, x, y, z);
    nodeGroup.add(node);
    return node;
  });

  // Connections between nearby nodes
  const lineMat = new THREE.LineBasicMaterial({ color: 0xF75C1A, transparent: true, opacity: 0.18 });
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = nodes[i].position.distanceTo(nodes[j].position);
      if (d < 5) {
        const pts = [nodes[i].position.clone(), nodes[j].position.clone()];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        nodeGroup.add(new THREE.Line(lineGeo, lineMat));
      }
    }
  }
  scene.add(nodeGroup);

  // ---- Particle Field ----
  const particleCount = 1500;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = Math.random() * 25 + 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 5;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xFFE8D0,
    size: 0.06,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ---- Icosahedron accent (central landmark) ----
  const icoGeo = new THREE.IcosahedronGeometry(0.4, 1);
  const icoMat = new THREE.MeshStandardMaterial({
    color: 0xF75C1A,
    emissive: 0xF75C1A,
    emissiveIntensity: 0.5,
    roughness: 0.3,
    metalness: 0.6,
    wireframe: false,
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(0, 12.2, -7);
  scene.add(ico);

  // Wireframe shell around icosahedron
  const icoWireMat = new THREE.MeshBasicMaterial({ color: 0xF75C1A, wireframe: true, transparent: true, opacity: 0.25 });
  const icoWire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), icoWireMat);
  icoWire.position.copy(ico.position);
  scene.add(icoWire);

  // ---- Mouse Parallax State ----
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  document.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ---- Camera Animation Path ----
  // Camera slowly dolly-in over ~8s then hovers gently
  const CAM_START_Z  = 26;
  const CAM_END_Z    = 18;
  const CAM_START_Y  = 8;
  const CAM_END_Y    = 6;
  const INTRO_DURATION = 8000; // ms
  let startTime = null;
  let introComplete = false;

  // ---- Clock ----
  const clock = new THREE.Clock();

  // ---- Resize Handler ----
  function onResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', window.debounce(onResize, 100));

  // ---- Animate ----
  function animate(timestamp) {
    requestAnimationFrame(animate);

    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const t = Math.min(elapsed / INTRO_DURATION, 1);

    // Ease-out-cubic for intro
    const eased = 1 - Math.pow(1 - t, 3);

    // Mouse lerp
    mouse.x = window.lerp(mouse.x, mouse.targetX, 0.04);
    mouse.y = window.lerp(mouse.y, mouse.targetY, 0.04);

    // Camera position
    const camZ = window.lerp(CAM_START_Z, CAM_END_Z, eased);
    const camY = window.lerp(CAM_START_Y, CAM_END_Y, eased);
    camera.position.z = camZ + mouse.x * -0.6;
    camera.position.x = mouse.x * 1.5;
    camera.position.y = camY + mouse.y * -0.5;

    // Gentle hover after intro
    if (t >= 1) {
      const time = clock.getElapsedTime();
      camera.position.y = CAM_END_Y + Math.sin(time * 0.4) * 0.3 + mouse.y * -0.5;
      camera.position.x = Math.cos(time * 0.25) * 0.4 + mouse.x * 1.5;
    }

    camera.lookAt(0, 2, 0);

    // Animate floating nodes
    const t2 = clock.getElapsedTime();
    nodes.forEach((node, i) => {
      node.position.y = nodePositions[i][4] + Math.sin(t2 * 0.8 + i * 1.1) * 0.35;
    });

    // Rotate icosahedra
    ico.rotation.y     = t2 * 0.5;
    ico.rotation.x     = t2 * 0.3;
    icoWire.rotation.y = t2 * -0.35;
    icoWire.rotation.x = t2 * 0.2;

    // Gently drift particles
    particles.rotation.y = t2 * 0.015;

    // Pulse orange point light
    pointOrange.intensity = 1.2 + Math.sin(t2 * 2.5) * 0.2;

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
  console.log('[Portfolio] Hero 3D scene initialized');

})();
