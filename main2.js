import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { color, depth, depthTexture, normalWorld, triplanarTexture, texture, viewportSharedTexture, mx_worley_noise_float, positionWorld, timerLocal, MeshStandardNodeMaterial, MeshBasicNodeMaterial } from 'three/nodes';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

var fish1, fish2, fish3, fish4, fish5;
// obtain window size
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// renderer definition
const canvas = document.getElementById('canvas')
// let renderer = new THREE.WebGLRenderer({ canvas: canvas });
// renderer.setSize(windowWidth, windowHeight);

var renderer = new WebGPURenderer( /*{ antialias: true }*/);
renderer.stencil = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// creating scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const ambientlight = new THREE.AmbientLight();
scene.add(ambientlight);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-90, 12, -134);
camera.lookAt(scene.position);

const loader = new GLTFLoader();
loader.load('./ruin_building.glb', function (gltf) {
  gltf.scene.traverse(function (child) {
    if ((child).isMesh) {
      const m = child
      m.receiveShadow = true
      m.castShadow = true
    }
    if ((child).isLight) {
      const l = child
      l.castShadow = true
      l.shadow.bias = -0.003
      l.shadow.mapSize.width = 2048
      l.shadow.mapSize.height = 2048
    }
  })
  gltf.scene.position.y -= 15;
  gltf.scene.position.x -= 80;
  gltf.scene.position.z = 0;
  // console.log(gltf.scene.position)
  scene.add(gltf.scene);
  camera.lookAt(gltf.scene.position)
}, function (xhr) {
  console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
}, function (error) {
  console.log(error);
});

// fish models
// loader = new GLTFLoader();
loader.load('/fish.glb', function (gltf) {
  fish1 = gltf.scene;
  fish1.scale.set(2.0, 2.0, 2.0);
  fish1.position.set(1.0, 1.0, 1.0)
  scene.add(fish1);

});
loader.load('/fish.glb', function (gltf) {
  fish2 = gltf.scene;
  fish2.scale.set(2.0, 2.0, 2.0);
  fish2.position.set(2.0, 1.0, 1.0)
  scene.add(fish2);
});
loader.load('/fish.glb', function (gltf) {
  fish3 = gltf.scene;
  fish3.scale.set(2.0, 2.0, 2.0);
  fish3.position.set(2.0, 2.0, 1.0)
  scene.add(fish3);
});

loader.load('/fish.glb', function (gltf) {
  fish4 = gltf.scene;
  fish4.scale.set(2.0, 2.0, 2.0);
  fish4.position.set(2.0, 1.0, 2.0)
  scene.add(fish4);
});

loader.load('/fish.glb', function (gltf) {
  fish5 = gltf.scene;
  fish5.scale.set(2.0, 2.0, 2.0);
  fish5.position.set(1.5, 1.5, 1.5)
  scene.add(fish5);

});

//mouse variable
var mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
  // Update the mouse variable
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);
  var dir = vector.sub(camera.position).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  // console.log(pos);
  fish1.position.copy(pos);
  pos.x += 0.5;
  pos.y += 0.5;
  fish2.position.copy(pos);
  pos.x += 0.5;
  fish3.position.copy(pos);
  pos.y += 0.5;
  fish4.position.copy(pos);
  pos.x += 0.5;
  pos.y += 0.5;
  fish5.position.copy(pos);

};


const sunLight = new THREE.DirectionalLight(0xFFE499, 5);
sunLight.castShadow = true;
sunLight.shadow.camera.near = .1;
sunLight.shadow.camera.far = 3;
sunLight.shadow.camera.right = 2;
sunLight.shadow.camera.left = - 2;
sunLight.shadow.camera.top = 2;
sunLight.shadow.camera.bottom = - 2;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.bias = - 0.001;
sunLight.position.set(1, 3, 1);

const waterAmbientLight = new THREE.HemisphereLight(0x333366, 0x74ccf4, 5);
const skyAmbientLight = new THREE.HemisphereLight(0x74ccf4, 0, 1);

scene.add(sunLight);
scene.add(skyAmbientLight);
scene.add(waterAmbientLight);


var clock = new THREE.Clock();
// objects

const textureLoader = new THREE.TextureLoader();
const iceDiffuse = textureLoader.load('./textures/water.jpg');
iceDiffuse.wrapS = THREE.RepeatWrapping;
iceDiffuse.wrapT = THREE.RepeatWrapping;
iceDiffuse.colorSpace = THREE.NoColorSpace;

const iceColorNode = triplanarTexture(texture(iceDiffuse));

const geometry = new THREE.IcosahedronGeometry(1, 3);
const material = new MeshStandardNodeMaterial({ colorNode: iceColorNode });

// water

const depthEffect = depthTexture().distance(depth).remapClamp(0, .05);

const timer = timerLocal(.8);
const floorUV = positionWorld.xzy;

const waterLayer0 = mx_worley_noise_float(floorUV.mul(4).add(timer));
const waterLayer1 = mx_worley_noise_float(floorUV.mul(2).add(timer));

const waterIntensity = waterLayer0.mul(waterLayer1).mul(1.4);
const waterColor = waterIntensity.mix(color(0x0f5e9c), color(0x74ccf4));
const viewportTexture = viewportSharedTexture();

const waterMaterial = new MeshBasicNodeMaterial();
waterMaterial.colorNode = waterColor;
waterMaterial.backdropNode = depthEffect.mul(3).min(1.4).mix(viewportTexture, viewportTexture.mul(color(0x74ccf4)));
waterMaterial.backdropAlphaNode = depthEffect.oneMinus();
waterMaterial.transparent = true;

const water = new THREE.Mesh(new THREE.BoxGeometry(200, .001, 200), waterMaterial);
water.position.set(0, .8, 0);
scene.add(water);

const gui = new GUI();
var floorPosition = new THREE.Vector3(0, 1, 0);
gui.add(floorPosition, 'y', 0, 2, .001).name('position');

// animation(to be added)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)

controls.addEventListener("change", event => {
  // console.log( controls.object.position ); 
})
function animate() {
  // requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();