import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const newImageUrl = '/logo.png';
const imageUrl = '/logo512.png';

export const RotatingSphere = () => {
  const containerRef = useRef(null);
  const requestRef = useRef();
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const textureRef = useRef(null);
  const [textureLoaded, setTextureLoaded] = useState(false); // State to track initial texture loading

  useEffect(() => {
    const container = containerRef.current;

    // Create a scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load the initial texture image
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      // Create a sphere
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      // Keep a reference to the texture so we can update it later
      textureRef.current = texture;
      setTextureLoaded(true); // Mark initial texture as loaded

      // Start the animation loop
      const animate = () => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestRef.current = requestAnimationFrame(animate);
      };
      animate();
    });

    // Clean up function to cancel the animation loop when the component unmounts
    return () => {
      cancelAnimationFrame(requestRef.current);
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    const updateTexture = (imageUrl) => {
      textureLoader.load(imageUrl, (texture) => {
        // When the new texture is loaded, update the material's map
        textureRef.current.map = texture;
        textureRef.current.needsUpdate = true;
        
        console.log("UPDATE: texture =", imageUrl);
        console.log(textureRef);
      });
    };
    
    // Set up interval to change texture when initial texture is loaded
    if (textureLoaded) {
      const interval = setInterval(() => {
        const imageSrc = textureRef.current.map;

        // Swap between the two images based on the current texture URL
          console.log("curr image src =", imageSrc, imageSrc === `http://localhost:3000${imageUrl}`);

        if (imageSrc === `http://localhost:3000${imageUrl}`) {
          updateTexture(newImageUrl);
        } else {
          updateTexture(imageUrl);
        }
      }, 5000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [textureLoaded]);

  return <div ref={containerRef} />;
};
