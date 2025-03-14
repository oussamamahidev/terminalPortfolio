"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMobile } from "@/hooks/use-mobile";

interface ThreeDBackgroundLiteProps {
  activeSection: string;
}

export default function ThreeDBackgroundLite({
  activeSection,
}: ThreeDBackgroundLiteProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (!mountRef.current) return;

    // Performance optimized scene setup
    const scene = new THREE.Scene();

    // Camera with moderate field of view
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: window.innerWidth > 768, // Only use antialiasing on larger screens
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

    // Create section-specific objects
    const sectionObjects = createSectionObjects(activeSection);
    scene.add(sectionObjects);

    // Add simple stars (reduced count for performance)
    const stars = createSimpleStars(window.innerWidth > 768 ? 1500 : 800);
    scene.add(stars);

    // Animation loop
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate objects
      sectionObjects.rotation.y = elapsedTime * 0.1;
      sectionObjects.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      // Animate stars
      if (stars.material instanceof THREE.PointsMaterial) {
        stars.rotation.y = elapsedTime * 0.02;
      }

      // Simple camera movement
      camera.position.y = Math.sin(elapsedTime * 0.2) * 0.5;
      camera.position.x = Math.sin(elapsedTime * 0.1) * 2;

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

      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else if (object.material) {
            object.material.dispose();
          }
        }
      });
    };

    // Helper function to create section-specific objects
    function createSectionObjects(section: string) {
      const group = new THREE.Group();

      // Color based on section
      let color: number;
      let geometry: THREE.BufferGeometry;

      switch (section) {
        case "about":
          color = 0x0ff; // Cyan
          geometry = new THREE.TorusKnotGeometry(5, 1.5, 100, 16);
          break;
        case "skills":
          color = 0x0f0; // Green
          geometry = new THREE.OctahedronGeometry(5, 2);
          break;
        case "projects":
          color = 0xff0; // Yellow
          geometry = new THREE.IcosahedronGeometry(5, 1);
          break;
        case "contact":
          color = 0xf0f; // Magenta
          geometry = new THREE.TorusGeometry(5, 1.5, 16, 50);
          break;
        default:
          color = 0x0ff; // Cyan
          geometry = new THREE.TorusKnotGeometry(5, 1.5, 100, 16);
          break;
      }

      // Create wireframe material for better performance and modern look
      const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });

      const mainObject = new THREE.Mesh(geometry, material);
      group.add(mainObject);

      // Add smaller orbiting objects
      const orbitCount = 8;
      for (let i = 0; i < orbitCount; i++) {
        const angle = (i / orbitCount) * Math.PI * 2;
        const radius = 8;

        // Create different shapes for variety
        let smallGeometry: THREE.BufferGeometry;

        if (i % 3 === 0) {
          smallGeometry = new THREE.TetrahedronGeometry(0.5, 0);
        } else if (i % 3 === 1) {
          smallGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        } else {
          smallGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        }

        const smallMaterial = new THREE.MeshBasicMaterial({
          color: color,
          wireframe: true,
        });

        const smallObject = new THREE.Mesh(smallGeometry, smallMaterial);
        smallObject.position.x = Math.cos(angle) * radius;
        smallObject.position.z = Math.sin(angle) * radius;

        group.add(smallObject);
      }

      return group;
    }

    // Helper function to create stars
    function createSimpleStars(count: number) {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let i = 0; i < count; i++) {
        // Create stars in a sphere around the scene
        const radius = 50 + Math.random() * 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        vertices.push(x, y, z);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      // Create point material with custom size
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: Math.random() * 0.5 + 0.1,
        sizeAttenuation: true,
      });

      return new THREE.Points(geometry, material);
    }
  }, [activeSection, isMobile]);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}
