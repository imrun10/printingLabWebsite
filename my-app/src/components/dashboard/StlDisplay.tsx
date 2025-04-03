import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface STLViewerProps {
    file: File;
}

const StlDisplay: React.FC<STLViewerProps> = ({ file }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create scene
        const scene = new THREE.Scene();

        // Create camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);

        // Create renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(900, 600); // Decreased size by 25 percent
        renderer.setClearColor(0xffffff); // Light grey background
        containerRef.current.appendChild(renderer.domElement);

        // Add orbital controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.rotateSpeed = 0.35;

        // Load STL file
        const loader = new STLLoader();
        loader.load(URL.createObjectURL(file), (geometry) => {
            const material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 200 }); // Darker grey material
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        });

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 0, 1);
        scene.add(directionalLight);

        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            // Clean up
            while (containerRef.current?.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild);
            }
        };
    }, [file]);

    return <div ref={containerRef} style={{ width: '900px', height: '600px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }} />;
};

export default StlDisplay;
