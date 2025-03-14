"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMobile } from "@/hooks/use-mobile";

export default function ThreeDProjectsLite() {
  const mountRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (!mountRef.current) return;

    // Performance optimized scene setup
    const scene = new THREE.Scene();

    // Camera with wider field of view for mobile
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 75 : 60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disable antialiasing on mobile
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Disable shadows for performance
    renderer.shadowMap.enabled = false;

    mountRef.current.appendChild(renderer.domElement);

    // Simple ambient light - no shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Single directional light - no shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Project data
    const projects = [
      {
        name: "E-Learning Application",
        color: 0xef4444, // Red
      },
      {
        name: "Intra-Enterprise Collaboration",
        color: 0xf59e0b, // Yellow
      },
      {
        name: "Amazon E-Commerce Clone",
        color: 0x10b981, // Green
      },
      {
        name: "3D Portfolio",
        color: 0x3b82f6, // Blue
      },
    ];

    // Create project objects with low-poly shapes
    const projectObjects: THREE.Mesh[] = [];

    projects.forEach((project, index) => {
      // Create low-poly project shape
      const geometry = new THREE.BoxGeometry(3, 3, 3);

      // Distort vertices for more interesting shape
      const positionAttribute = geometry.getAttribute("position");
      const vertex = new THREE.Vector3();

      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);

        // Simple noise effect
        const distortion =
          0.2 * Math.sin(vertex.x) * Math.sin(vertex.y) * Math.sin(vertex.z);
        vertex.multiplyScalar(1 + distortion);

        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      geometry.computeVertexNormals();

      // Simple material
      const material = new THREE.MeshStandardMaterial({
        color: project.color,
        flatShading: true,
        metalness: 0.2,
        roughness: 0.8,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Position in a circle
      const angle = (index / projects.length) * Math.PI * 2;
      const radius = 8;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = Math.sin(angle) * radius;

      scene.add(mesh);
      projectObjects.push(mesh);
    });

    // Add simple connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4b5563,
      transparent: true,
      opacity: 0.3,
    });

    for (let i = 0; i < projectObjects.length; i++) {
      const nextIndex = (i + 1) % projectObjects.length;

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        projectObjects[i].position,
        projectObjects[nextIndex].position,
      ]);

      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }

    // Animation loop
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate camera around the scene
      camera.position.x = Math.sin(elapsedTime * 0.2) * 15;
      camera.position.z = Math.cos(elapsedTime * 0.2) * 15;
      camera.lookAt(0, 0, 0);

      // Animate project objects
      projectObjects.forEach((object, index) => {
        // Rotate objects
        object.rotation.x = elapsedTime * 0.2;
        object.rotation.y = elapsedTime * 0.3;

        // Simple floating animation
        object.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.01;
      });

      // Render scene
      renderer.render(scene, camera);
    };

    animate();

    // Simple resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);

      if (mountRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of geometries and materials
      projectObjects.forEach((object) => {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      });
    };
  }, [isMobile]);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}
