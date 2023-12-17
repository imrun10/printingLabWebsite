'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface StlFileReaderProps {
  file: File;
  onData: (data: number[]) => void;
}

export default function StlViewer({ file, onData }: StlFileReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
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
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const data = reader.result as ArrayBuffer;
        if (typeof window !== 'undefined') {
          const scene = new THREE.Scene();

          const loader = new STLLoader();
          const geometry = loader.parse(data);
          const material = new THREE.MeshPhongMaterial({ color: 0x888888 }); // Change material to MeshPhongMaterial for better lighting and shadows
          scene.background = new THREE.Color(0xeeeeee); // Change background color to light gray

          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          meshRef.current = mesh;

          geometry.center();

          const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
          camera.position.z = 500; // Zoom out by setting a higher value

          const renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(width, height);
          renderer.shadowMap.enabled = true; // Enable shadows in the renderer

          const light = new THREE.DirectionalLight(0xffffff, 100);
          light.position.set(1, 1, 1);
          scene.add(light);

          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          renderer.shadowMap.enabled = true; // Enable shadows in the renderer

          const boundingBox = new THREE.Box3().setFromObject(mesh);
          const size2 = boundingBox.getSize(new THREE.Vector3());
          setSize(size2.toArray());
          containerRef.current?.appendChild(renderer.domElement);

          const axisLength = Math.max(size2.x, size2.y, size2.z) * 2;
          const axisHelper = new THREE.AxesHelper(axisLength);
          scene.add(axisHelper);

          const renderScene = () => {
            renderer.setSize(width, height);
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
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
    }
  }, [file, width, height]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}