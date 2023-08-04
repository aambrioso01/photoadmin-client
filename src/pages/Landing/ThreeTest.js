import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeTest = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Example image URLs
    const imageUrl = 'https://img.freepik.com/free-vector/hand-drawn-wavy-pattern-design_23-2149647918.jpg';
    const newImageUrl = 'https://i.stack.imgur.com/TcxRo.jpg';

    // Create a texture and apply it to the material
    const texture = new THREE.TextureLoader().load(imageUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Example geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Create a mesh with the material and geometry
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Position the camera
    camera.position.z = 3;

    // Example render function
    const render = () => {
      renderer.render(scene, camera);
    };

    // Example animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Example texture update
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(newImageUrl, function (newTexture) {
        material.map = newTexture;
        render(); // Re-render the scene when the new texture is loaded and applied
      });

      // Rotate the mesh
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

      render();
    };

    // Initialize the animation loop
    animate();

    // Clean up Three.js objects on unmount
    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={sceneRef} />;
};
