import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var fish1,fish2,fish3,fish4,fish5;
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
camera.position.set(0, 2, 4);
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
    fish1 = gltf.scene;
    fish1.scale.set(2.0, 2.0, 2.0);
	fish1.position.set(1.0,1.0,1.0)
    scene.add(fish1);
	
});
loader.load('/fish.glb', function (gltf) {
    fish2 = gltf.scene;
    fish2.scale.set(2.0, 2.0, 2.0);
	fish2.position.set(2.0,1.0,1.0)
    scene.add(fish2);
});
loader.load('/fish.glb', function (gltf) {
    fish3 = gltf.scene;
    fish3.scale.set(2.0, 2.0, 2.0);
	fish3.position.set(2.0,2.0,1.0)
    scene.add(fish3);
});

loader.load('/fish.glb', function (gltf) {
    fish4 = gltf.scene;
    fish4.scale.set(2.0, 2.0, 2.0);
	fish4.position.set(2.0,1.0,2.0)
    scene.add(fish4);
});

loader.load('/fish.glb', function (gltf) {
    fish5 = gltf.scene;
    fish5.scale.set(2.0, 2.0, 2.0);
	fish5.position.set(1.5,1.5,1.5)
    scene.add(fish5);
	
});


// animation(to be added)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
//mouse variable
var mouse = {x: 0, y: 0};
document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {

    // Update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject( camera );
	var dir = vector.sub( camera.position ).normalize();
	var distance = - camera.position.z / dir.z;
	var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	console.log(pos);
	fish1.position.copy(pos);
	pos.x+=0.5;
	pos.y+=0.5;
	fish2.position.copy(pos);
	pos.x+=0.5;
	fish3.position.copy(pos);
	pos.y+=0.5;
	fish4.position.copy(pos);
	pos.x+=0.5;
	pos.y+=0.5;
	fish5.position.copy(pos);

};