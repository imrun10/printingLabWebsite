import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface StlFileReaderProps {
  file: File;
  onData: (data: number[]) => void;
  onCheck: (check: string) => void;
}

export default function StlViewer({ file, onData, onCheck }: StlFileReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [size, setSize] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setWidth(container.clientWidth);
      setHeight(container.clientHeight);
    }
  }, []);

  useEffect(() => {
    onData(size);
  }, [size]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const data = reader.result as ArrayBuffer;
        if (typeof window !== 'undefined') {
          const scene = new THREE.Scene();

          const loader = new STLLoader();
          const geometry = loader.parse(data);
          const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, specular: 0x555555, shininess: 30 });
          scene.background = new THREE.Color(0xffffff);

          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          meshRef.current = mesh;

          geometry.center();

          const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
          camera.position.z = 500;

          const renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(width, height);
          renderer.shadowMap.enabled = true;
          rendererRef.current = renderer;

          const light = new THREE.DirectionalLight(0xffffff, 1);
          light.position.set(1, 1, 1);
          scene.add(light);

          const ambientLight = new THREE.AmbientLight(0x404040);
          scene.add(ambientLight);

          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;

          containerRef.current?.appendChild(renderer.domElement);

          const boundingBox = new THREE.Box3().setFromObject(mesh);
          const objectSize = boundingBox.getSize(new THREE.Vector3());
          setSize(objectSize.toArray());

          // Add floor
          const floorGeometry = new THREE.PlaneGeometry(objectSize.x * 2, objectSize.y * 2, 1, 1);
          const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xdddddd, transparent: true, opacity: 0.3, side: THREE.DoubleSide, shadowSide: THREE.BackSide });
          const floor = new THREE.Mesh(floorGeometry, floorMaterial);
          floor.rotation.x = -Math.PI / 2;
          floor.position.y = -objectSize.y / 2 - 1; // Place the floor slightly below the object
          floor.receiveShadow = true;
          scene.add(floor);

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          const renderScene = () => {
            if (rendererRef.current) {
              rendererRef.current.setSize(width, height);
              rendererRef.current.render(scene, camera);
              requestAnimationFrame(renderScene);
            }
          };

          renderScene();
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        meshRef.current.parent?.remove(meshRef.current);
        meshRef.current = null;
      }
      if (rendererRef.current) {
        rendererRef.current.dispose(); // Dispose renderer
        rendererRef.current = null;
      }
    }
  }, [file, width, height]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
