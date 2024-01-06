import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';

var fish1,fish2,fish3,fish4,fish5;
let mixer, mixer2, mixer3, mixer4, mixer5;
const mixers = [];
let clock = new THREE.Clock();
// obtain window size
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// renderer definition
const canvas = document.getElementById('canvas')
let renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(windowWidth, windowHeight);

// creating scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const ambientlight = new THREE.AmbientLight();
scene.add(ambientlight);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-90, 12, -134);
camera.lookAt(scene.position);



const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)

controls.addEventListener("change", event => {  
    // console.log( controls.object.position ); 
})

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
	gltf.scene.position.y -= 5;
	// console.log(gltf.scene.position)
	scene.add(gltf.scene);
	camera.lookAt(gltf.scene.position)
}, function (xhr) {
	console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
}, function (error) {
	console.log(error);
});

// fish models
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


// animation(to be added)
function animate() {
	requestAnimationFrame( animate );
    controls.update()
	renderer.render( scene, camera );
	const delta = clock.getDelta();
	for ( const mixer of mixers ) mixer.update( delta );
}
animate();