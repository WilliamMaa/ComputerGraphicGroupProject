import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';

var fish1,fish2,fish3,fish4,fish5;
let mixer, mixer2, mixer3, mixer4, mixer5;
var fish6,fish7,fish8,fish9,fish10;
let mixer6, mixer7, mixer8, mixer9, mixer10;
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


// animation(to be added)
function animate() {
	requestAnimationFrame( animate );
    controls.update()
	renderer.render( scene, camera );
	const delta = clock.getDelta();
	for ( const mixer of mixers ) mixer.update( delta );
}
animate();

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
	var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	
    var originalx=pos.x;
	if(pos.y>-20)pos.y = -20;
    if(pos.x<-0)pos.x = -0;
    if(pos.y<-60)pos.y = -60;
    if(pos.x>100)pos.x = 100;
    var oy2=pos.y;
    var ox =pos.x;
    pos.y+=Math.sin(count*0.15);
    pos.x+=Math.sin(count*0.1+0.2);
    count++;
	fish1.position.copy(pos);
    if(pos.x<originalx)fish1.rotation.set(0,330,0);
    else if(pos.x>originalx)fish1.rotation.set(0,0,0);

	pos.x+=10.5;
    pos.x+=Math.sin(count*0.1);
    pos.y=oy2+Math.sin(count*0.15+0.3)*2;
    pos.y-=8.9;
	fish2.position.copy(pos);
    if(pos.x<originalx)fish2.rotation.set(0,330,0);
    else if(pos.x>originalx)fish2.rotation.set(0,0,0);

	pos.x+=3.5;
    pos.y=oy2+Math.sin(count*0.15+0.7);
    pos.y+=1;
	fish3.position.copy(pos);
    if(pos.x<originalx)fish3.rotation.set(0,330,0);
    else if(pos.x>originalx)fish3.rotation.set(0,0,0);

	pos.x-=10;
    pos.y=oy2+Math.sin(count*0.15+0.5)*1.7;
    pos.y-=4.9;
    if(pos.x<originalx)fish4.rotation.set(0,330,0);
    else if(pos.x>originalx)fish4.rotation.set(0,0,0);
	fish4.position.copy(pos);

	pos.x-=6.5;
    pos.y=oy2+Math.cos(count*0.1+0.32);
    pos.y-=7.9;
    if(pos.x<originalx)fish5.rotation.set(0,330,0);
    else if(pos.x>originalx)fish5.rotation.set(0,0,0);
	fish5.position.copy(pos);
    
    pos.x=ox;
    pos.y=oy2;

    pos.x+=Math.cos(count*0.1+0.2);
    pos.x-=5.5;
    pos.y+=Math.cos(count*0.1);
    if(pos.x<originalx)fish6.rotation.set(0,330,0);
    else if(pos.x>originalx)fish6.rotation.set(0,0,0);
    fish6.position.copy(pos);

    pos.x-=2.5;
    pos.y=oy2+Math.cos(count*0.11+0.4)*2.6;
    pos.y-=3.9;
    if(pos.x<originalx)fish7.rotation.set(0,330,0);
    else if(pos.x>originalx)fish7.rotation.set(0,0,0);
    fish7.position.copy(pos);

    pos.x-=5.5;
    pos.x+=Math.sin(count*0.1+0.9);
    pos.y=oy2+Math.cos(count*0.1+0.8);
    pos.y-=1.9;
    if(pos.x<originalx)fish8.rotation.set(0,330,0);
    else if(pos.x>originalx)fish8.rotation.set(0,0,0);
    fish8.position.copy(pos);

    pos.x-=7.5;
    pos.y=oy2+Math.cos(count*0.13+0.6);
    pos.y-=9.9;
    if(pos.x<originalx)fish9.rotation.set(0,330,0);
    else if(pos.x>originalx)fish9.rotation.set(0,0,0);
    fish9.position.copy(pos);

    pos.x-=5.5;
    pos.x+=Math.sin(count*0.1+0.2)*1.8;
    pos.y=oy2+Math.cos(count*0.1+0.1)*1.9;
    pos.y+=2.9;
    if(pos.x<originalx)fish10.rotation.set(0,330,0);
    else if(pos.x>originalx)fish10.rotation.set(0,0,0);
    fish10.position.copy(pos);
};
