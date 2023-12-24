import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// obtain window size
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// renderer definition
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(windowWidth, windowHeight);

// creating scene
const scene = new THREE.Scene();
// added blue background
//change as u like i guess?
scene.background = new THREE.Color('#00bfff');

// grids that represent ground plane
//DELETE WHEN DONE IF NECASSARY 
let gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

// camera
//change position to change view
const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
camera.position.set(5, 2, 0);
camera.lookAt(0, 0, 0);

// light
//add more light here? maybe?
//change position too so it looks good thx
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 20, 5);
scene.add(light);

// mouse orbiting controls
const controls = new OrbitControls(camera, renderer.domElement);

// fish models
const loader = new GLTFLoader();
loader.load('/fish.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(2.0, 2.0, 2.0);
	model.position.set(1.0,1.0,1.0)
    scene.add(model);
	
});
loader.load('/fish.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(2.0, 2.0, 2.0);
	model.position.set(2.0,1.0,1.0)
    scene.add(model);
});
loader.load('/fish.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(2.0, 2.0, 2.0);
	model.position.set(2.0,2.0,1.0)
    scene.add(model);
});

loader.load('/fish.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(2.0, 2.0, 2.0);
	model.position.set(2.0,1.0,2.0)
    scene.add(model);
});

loader.load('/fish.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(2.0, 2.0, 2.0);
	model.position.set(1.5,1.5,1.5)
    scene.add(model);
});


// animation(to be added)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
