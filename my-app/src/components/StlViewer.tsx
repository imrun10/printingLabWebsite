'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { blob } from 'stream/consumers';

interface StlFileReaderProps {
  file: File
  onData: (data: number[]) => void;

}

export default function StlViewer({ file, onData }: StlFileReaderProps ){
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [size, setSize] = useState<number[]>([0,0,0]);



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
          const material = new THREE.MeshBasicMaterial({ color: 0x484848 });
          // Make background white
          scene.background = new THREE.Color(0xffffff);

          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          meshRef.current = mesh;

          // Center the mesh
          geometry.center();

          const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
          camera.position.z = 100;

          const renderer = new THREE.WebGLRenderer();
          const light = new THREE.AmbientLight(0xFFFFFF); // Soft white light
          scene.add(light);
          const controls = new OrbitControls(camera, renderer.domElement);

          renderer.setSize(width, height);
          const boundingBox = new THREE.Box3().setFromObject(mesh);
          const size2 = boundingBox.getSize(new THREE.Vector3()); // Returns Vector3
          setSize(size2.toArray());
          containerRef.current?.appendChild(renderer.domElement);

          // Add XYZ Axis
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
      // Clean up previous mesh
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        meshRef.current.parent?.remove(meshRef.current);
        meshRef.current = null;
      }
    }
  }, [file, width, height]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} ></div>;
}