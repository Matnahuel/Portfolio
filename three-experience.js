import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- Three.js Experience ---

// 1. Setup
const container = document.getElementById('three-container');
if (!container) {
    console.error('Container for three.js not found.');
} else {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 2. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 4. Create Project Planes
    const textureLoader = new THREE.TextureLoader();
    const projectsToDisplay = [
        {
            name: 'WalMAt',
            image: './assets/img/Carrusel/WalMAt/1.png',
        },
        {
            name: 'AntiSocial',
            image: './assets/img/Carrusel/AntiSocial/1.png',
        }
    ];
     
    const projectMeshes = [];

    projectsToDisplay.forEach((project, index) => {
        const texture = textureLoader.load(project.image);
        const geometry = new THREE.PlaneGeometry(3, 1.7);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            roughness: 0.7,
            metalness: 0.1
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(index % 2 === 0 ? -2.5 : 2.5, 0, 0);
        mesh.userData.name = project.name;
        scene.add(mesh);
        projectMeshes.push(mesh);
    });

    // 5. Raycasting for Clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onProjectClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(projectMeshes);
        if (intersects.length > 0) {
            const clickedObjectName = intersects[0].object.userData.name;
            console.log('Clicked on project:', clickedObjectName);
        }
    }
    window.addEventListener('click', onProjectClick);

    // 6. Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 7. Animation Loop
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.05 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}