import * as THREE from "three";
import "./styles.css";

const container = document.getElementById("universe-container");
const simulationStatus = document.getElementById("simulation-status");
const objectCount = document.getElementById("object-count");
const loadingScreen = document.getElementById("loading-screen");

let scene;
let camera;
let renderer;
let clock;

const celestialObjects = [];

function initializeIsolume() {

  scene = new THREE.Scene();

  scene.background = new THREE.Color(0x020308);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    1000000
  );

  camera.position.set(0, 3, 12);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  renderer.outputColorSpace = THREE.SRGBColorSpace;

  container.appendChild(renderer.domElement);

  clock = new THREE.Clock();

  createStarField();

  simulationStatus.textContent = "Ready";

  objectCount.textContent = celestialObjects.length;

  window.addEventListener(
    "resize",
    handleResize
  );

  requestAnimationFrame(() => {
    loadingScreen.classList.add("hidden");
  });

  animate();
}


function createStarField() {

  const starCount = 5000;

  const positions = new Float32Array(
    starCount * 3
  );

  for (let i = 0; i < starCount; i++) {

    const radius =
      400 + Math.random() * 600;

    const theta =
      Math.random() * Math.PI * 2;

    const phi =
      Math.acos(
        2 * Math.random() - 1
      );

    positions[i * 3] =
      radius *
      Math.sin(phi) *
      Math.cos(theta);

    positions[i * 3 + 1] =
      radius *
      Math.cos(phi);

    positions[i * 3 + 2] =
      radius *
      Math.sin(phi) *
      Math.sin(theta);
  }

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );

  const material =
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      sizeAttenuation: false
    });

  const stars =
    new THREE.Points(
      geometry,
      material
    );

  scene.add(stars);
}


function handleResize() {

  camera.aspect =
    window.innerWidth /
    window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
}


function animate() {

  requestAnimationFrame(animate);

  const delta =
    clock.getDelta();

  // Physics will eventually run here.
  // Rendering will eventually be separated
  // from the simulation loop.

  renderer.render(
    scene,
    camera
  );
}


initializeIsolume();
