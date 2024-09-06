import * as THREE from 'three';
import { GLTFLoader } from '/Addons/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x41739E);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const loader = new GLTFLoader();
let carp = null; // Initialize carp as null

loader.load(
    // resource URL
    'models/Fish_scene.glb',
    // called when the resource is loaded
    function (gltf) {
        carp = gltf.scene;
        carp.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    },
    // called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow mapping
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0x4B6AA6, 1); // Use DirectionalLight for shadows
light.position.set(50, 50, 50); // Set light position
light.castShadow = true; // Enable shadows for the light
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x4B6AA6, 1); // Add some ambient light
scene.add(ambientLight);

camera.position.z = -20;
camera.position.x = 62;
camera.position.y = 30;

camera.rotation.y = 89.5;

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

function animate() {
    if (carp) {
        carp.rotation.y += 0.001;
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
