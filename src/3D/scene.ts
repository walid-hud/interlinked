import * as THREE from 'three';
import fragmentShader from './shader.frag?raw';
import vertexShader from './shader.vert?raw';
import { $ } from '../utils';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }
});

const quad = new THREE.Mesh(geometry, material);
scene.add(quad);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const app = $<HTMLElement>('#scene');
if (app) {
    app.appendChild(renderer.domElement);
}

// Handle window resize
function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    material.uniforms.uResolution.value.set(width, height);
}

window.addEventListener('resize', handleResize);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    material.uniforms.uTime.value = performance.now() / 1000.0;
    
    renderer.render(scene, camera);
}


export {animate}