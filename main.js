import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const ambientlight = new THREE.AmbientLight();
scene.add( ambientlight );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-90, 12, -134);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)

controls.addEventListener("change", event => {  
    // console.log( controls.object.position ); 
})

const loader = new GLTFLoader();
loader.load('./ruin_building.glb', function(gltf) {
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
	console.log(gltf.scene.position)
	scene.add(gltf.scene);
	camera.lookAt(gltf.scene.position)
}, function(xhr) {
	console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
}, function(error) {
	console.log(error);
})

const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
let water = new Water(
	waterGeometry,
	{
		textureWidth: 512,
		textureHeight: 512,
		waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	} ),
	sunDirection: new THREE.Vector3(),
	sunColor: 0xffffff,
	waterColor: 0x001e0f,
	distortionScale: 3.7,
	fog: scene.fog !== undefined
	}
);
water.rotation.x = - Math.PI / 2;
scene.add( water );


function animate() {
	requestAnimationFrame( animate );
    controls.update()
	renderer.render( scene, camera );
}

animate();