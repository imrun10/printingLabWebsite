'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { useThree } from 'react-three-fiber';


export default function StlViewer({file}: {file: File | null}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);

    useEffect(() => {
        if (file) {
          const reader = new FileReader();
          reader.onload = function () {
            const data = reader.result as ArrayBuffer;
            if (typeof window !== 'undefined') {
              const scene = new THREE.Scene();
            
              const loader = new STLLoader();
              const geometry = loader.parse(data);
              const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
              const mesh = new THREE.Mesh(geometry, material);
              scene.add(mesh);
              meshRef.current = mesh;
    
              const camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                10000
              );
              camera.position.z = 1000;
    
              const renderer = new THREE.WebGLRenderer();
              renderer.setSize(window.innerWidth, window.innerHeight);
              containerRef.current?.appendChild(renderer.domElement);
    
              const renderScene = () => {
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
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
      }, [file]);

      return (<div ref={containerRef} />);
}