import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { color, depth, depthTexture, normalWorld, triplanarTexture, texture, viewportSharedTexture, mx_worley_noise_float, positionWorld, timerLocal, MeshStandardNodeMaterial, MeshBasicNodeMaterial } from 'three/nodes';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

var fish1, fish2, fish3, fish4, fish5;
let mixer, mixer2, mixer3, mixer4, mixer5;
var fish6,fish7,fish8,fish9,fish10;
let mixer6, mixer7, mixer8, mixer9, mixer10;
var fish11,fish12,fish13,fish14,fish15;
let mixer11, mixer12, mixer13, mixer14, mixer15;
const mixers = [];
let clock = new THREE.Clock();
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

const gltfLoader = new GLTFLoader();
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish1 = gltf.scene;
	fish1.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer = new THREE.AnimationMixer(fish1);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.8;
            action.play();
        }
    }
    scene.add(fish1);
	mixers.push(mixer);
});

gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish2 = gltf.scene;
	fish2.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer2 = new THREE.AnimationMixer(fish2);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer2.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
			action.timeScale = 0.4;
            action.play();
        }
    }
    scene.add(fish2);
	mixers.push(mixer2);
});gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish3 = gltf.scene;
	fish3.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer3 = new THREE.AnimationMixer(fish3);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer3.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.play();
        }
    }
    scene.add(fish3);
	mixers.push(mixer3);
});gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish4 = gltf.scene;
	fish4.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer4 = new THREE.AnimationMixer(fish4);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer4.clipAction(animation);
            action.setLoop(THREE.LoopRepeat);
			action.timeScale = 0.7;
            action.play();
        }
    }
    scene.add(fish4);
	mixers.push(mixer4);
});gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish5 = gltf.scene;
	fish5.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer5 = new THREE.AnimationMixer(fish5);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer5.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
			action.timeScale = 0.6;
            action.play();
        }
    }
    scene.add(fish5);
	mixers.push(mixer5);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish6 = gltf.scene;
	fish6.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer6 = new THREE.AnimationMixer(fish6);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer6.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.45;
            action.play();
        }
    }
    scene.add(fish6);
	mixers.push(mixer6);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish7 = gltf.scene;
	fish7.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer7 = new THREE.AnimationMixer(fish7);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer7.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.86;
            action.play();
        }
    }
    scene.add(fish7);
	mixers.push(mixer7);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish8 = gltf.scene;
	fish8.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer8 = new THREE.AnimationMixer(fish8);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer8.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.28;
            action.play();
        }
    }
    scene.add(fish8);
	mixers.push(mixer8);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish9 = gltf.scene;
	fish9.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer9 = new THREE.AnimationMixer(fish9);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer9.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.73;
            action.play();
        }
    }
    scene.add(fish9);
	mixers.push(mixer9);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish10 = gltf.scene;
	fish10.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer10 = new THREE.AnimationMixer(fish10);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer10.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.54;
            action.play();
        }
    }
    scene.add(fish10);
	mixers.push(mixer10);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish11 = gltf.scene;
	fish11.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer11 = new THREE.AnimationMixer(fish11);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer11.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.61;
            action.play();
        }
    }
    scene.add(fish11);
	mixers.push(mixer11);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish12 = gltf.scene;
	fish12.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer12 = new THREE.AnimationMixer(fish12);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer12.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.43;
            action.play();
        }
    }
    scene.add(fish12);
	mixers.push(mixer12);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish13 = gltf.scene;
	fish13.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer13 = new THREE.AnimationMixer(fish13);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer13.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.58;
            action.play();
        }
    }
    scene.add(fish13);
	mixers.push(mixer13);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish14 = gltf.scene;
	fish14.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer14 = new THREE.AnimationMixer(fish14);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer14.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.84;
            action.play();
        }
    }
    scene.add(fish14);
	mixers.push(mixer14);
});
gltfLoader.load('fish.glb',function(data){
    const gltf = data;
    fish15 = gltf.scene;
	fish15.scale.set(2.0, 2.0, 2.0);
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        mixer15 = new THREE.AnimationMixer(fish15);
 
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
            let action = mixer15.clipAction(animation) ;
            action.setLoop(THREE.LoopRepeat);
            action.timeScale = 0.24;
            action.play();
        }
    }
    scene.add(fish15);
	mixers.push(mixer15);
});

//mouse variable
var mouse = { x: 0, y: 0 };
var count=0;
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
   console.log(pos);
  var originalx=pos.x;
  var rotation1 = 330;
  var rotation2 = 0;
  pos.z=pos.y;
	if(pos.y>0)pos.y = 0;
    if(pos.x<-50)pos.x = -50;
    if(pos.y<-5)pos.y = 0;
    if(pos.x>50)pos.x = 50;
    
    var oy2=pos.y;
    var ox =pos.x;
    pos.y+=Math.sin(count*0.15);
    pos.y-=2.7;
    pos.x+=Math.sin(count*0.1+0.2);
    count++;
    pos.z+=Math.sin(count*0.1)*5;
	fish1.position.copy(pos);
    rotation1+=Math.sin(count*0.1)*0.1;
    rotation2+=Math.sin(count*0.1)*0.1;
    if(pos.x<originalx)fish1.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish1.rotation.set(0,rotation2,0);

	pos.x+=10.5;
    pos.x+=Math.sin(count*0.1);
    pos.y=oy2+Math.sin(count*0.15+0.3)*2;
    pos.y-=8.9;
	fish2.position.copy(pos);
    if(pos.x<originalx)fish2.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish2.rotation.set(0,rotation2,0);

	pos.x+=3.5;
    pos.y=oy2+Math.sin(count*0.15+0.7);
    pos.y-=2.7;
	fish3.position.copy(pos);
    if(pos.x<originalx)fish3.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish3.rotation.set(0,rotation2,0);
    rotation1+=Math.sin(count*0.1)*0.1;
    rotation2+=Math.sin(count*0.1)*0.1;
	pos.x-=10;
    pos.y=oy2+Math.sin(count*0.15+0.5)*1.7;
    pos.y-=4.9;
    if(pos.x<originalx)fish4.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish4.rotation.set(0,rotation2,0);
	fish4.position.copy(pos);

	pos.x-=6.5;
    pos.y=oy2+Math.cos(count*0.1+0.32);
    pos.y-=7.9;
    if(pos.x<originalx)fish5.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish5.rotation.set(0,rotation2,0);
	fish5.position.copy(pos);
    
    pos.x=ox;
    pos.y=oy2;

    pos.x+=Math.cos(count*0.1+0.2);
    pos.x-=5.5;
    pos.y+=Math.cos(count*0.1);
    pos.y-=1.7;
    if(pos.x<originalx)fish6.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish6.rotation.set(0,rotation2,0);
    fish6.position.copy(pos);

    pos.x-=2.5;
    pos.y=oy2+Math.cos(count*0.11+0.4)*2.6;
    pos.y-=3.9;
    if(pos.x<originalx)fish7.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish7.rotation.set(0,rotation2,0);
    fish7.position.copy(pos);

    pos.x-=5.5;
    pos.x+=Math.sin(count*0.1+0.9);
    pos.y=oy2+Math.cos(count*0.1+0.8);
    pos.y-=1.9;
    if(pos.x<originalx)fish8.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish8.rotation.set(0,rotation2,0);
    fish8.position.copy(pos);

    rotation1+=Math.sin(count*0.1)*0.1;
    rotation2+=Math.cos(count*0.1)*0.1;

    pos.x-=2.5;
    pos.y=oy2+Math.cos(count*0.13+0.6);
    pos.y-=5.9;
    if(pos.x<originalx)fish9.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish9.rotation.set(0,rotation2,0);
    fish9.position.copy(pos);

    pos.x-=3.5;
    pos.x+=Math.sin(count*0.1+0.2)*1.5;
    pos.y=oy2+Math.cos(count*0.1+0.1)*0.7;
    pos.y-=1.9;
    if(pos.x<originalx)fish10.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish10.rotation.set(0,rotation2,0);
    fish10.position.copy(pos);

    pos.x+=20;
    pos.z-=8.5;
    pos.z+=Math.sin(count*0.1+0.2)*1.1;
    pos.y=oy2+Math.cos(count*0.1+0.1)*0.6;
    pos.y-=1.9;
    if(pos.x<originalx)fish11.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish11.rotation.set(0,rotation2,0);
    fish11.position.copy(pos);

    pos.x-=7.5;
    pos.x+=Math.sin(count*0.1+0.2)*1.2;
    pos.y=oy2+Math.cos(count*0.1+0.1)*0.7;
    pos.y-=3.9;
    if(pos.x<originalx)fish12.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish12.rotation.set(0,rotation2,0);
    fish12.position.copy(pos);

    pos.x-=3.5;
    pos.x+=Math.sin(count*0.1+0.2)*1.8;
    pos.y=oy2+Math.cos(count*0.1+0.1)*0.3;
    pos.y-=1.9;
    if(pos.x<originalx)fish13.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish13.rotation.set(0,rotation2,0);
    fish13.position.copy(pos);

    pos.z+=20;
    pos.x+=13.5;
    pos.x+=Math.sin(count*0.1+0.2)*0.7;
    pos.y=oy2+Math.cos(count*0.1+0.1)*0.7;
    pos.y-=1.9;
    if(pos.x<originalx)fish10.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish10.rotation.set(0,rotation2,0);
    fish14.position.copy(pos);

    pos.x-=3.5;
    pos.x+=Math.sin(count*0.1+0.2)*0.5;
    pos.y=oy2+Math.cos(count*0.1+0.1)*0.7;
    pos.y-=1.9;
    if(pos.x<originalx)fish15.rotation.set(0,rotation1,0);
    else if(pos.x>originalx)fish15.rotation.set(0,rotation2,0);
    fish15.position.copy(pos);

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

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)

controls.addEventListener("change", event => {
  // console.log( controls.object.position ); 
})
function animate() {
  //requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  const delta = clock.getDelta();
	for ( const mixer of mixers ) mixer.update( delta );
}
animate();