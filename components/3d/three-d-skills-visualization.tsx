"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { motion, AnimatePresence } from "framer-motion";

export default function ThreeDSkillsVisualization() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const skillCategories = [
    {
      name: "Frontend",
      color: "#89b4fa", // Blue
      skills: [
        { name: "React.js", level: 0.9 },
        { name: "Next.js", level: 0.85 },
        { name: "Tailwind CSS", level: 0.9 },
        { name: "HTML/CSS", level: 0.95 },
        { name: "JavaScript", level: 0.9 },
      ],
    },
    {
      name: "Backend",
      color: "#a6e3a1", // Green
      skills: [
        { name: "Spring Boot", level: 0.8 },
        { name: "Node.js", level: 0.75 },
        { name: "Express.js", level: 0.7 },
        { name: "PHP", level: 0.6 },
      ],
    },
    {
      name: "Databases",
      color: "#f9e2af", // Yellow
      skills: [
        { name: "MongoDB", level: 0.85 },
        { name: "PostgreSQL", level: 0.7 },
        { name: "MySQL", level: 0.75 },
        { name: "Oracle", level: 0.6 },
      ],
    },
    {
      name: "DevOps",
      color: "#f38ba8", // Red
      skills: [
        { name: "Docker", level: 0.7 },
        { name: "Git", level: 0.85 },
        { name: "Linux", level: 0.75 },
      ],
    },
    {
      name: "Languages",
      color: "#cba6f7", // Purple
      skills: [
        { name: "Java", level: 0.85 },
        { name: "C/C++", level: 0.7 },
        { name: "TypeScript", level: 0.8 },
      ],
    },
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#0f0f1a");

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    // Renderer setup with improved settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Controls with improved settings
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.maxDistance = 60;
    controls.minDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Add point lights for better illumination
    const pointLight1 = new THREE.PointLight(0x89b4fa, 1, 50);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa6e3a1, 1, 50);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    // Create skill visualization
    const skillGroups: THREE.Group[] = [];
    const skillObjects: { mesh: THREE.Mesh; name: string; category: string }[] =
      [];

    // Create a central sphere with improved materials
    const centralGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const centralMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.0,
    });
    const centralSphere = new THREE.Mesh(centralGeometry, centralMaterial);
    centralSphere.castShadow = true;
    centralSphere.receiveShadow = true;
    scene.add(centralSphere);

    // Add pulsing animation to central sphere
    const centralGlow = new THREE.PointLight(0xffffff, 1.5, 10);
    centralSphere.add(centralGlow);

    // Create skill categories with improved positioning
    skillCategories.forEach((category, categoryIndex) => {
      const categoryGroup = new THREE.Group();

      // Position category in a circle around the center with better distribution
      const categoryAngle =
        (categoryIndex / skillCategories.length) * Math.PI * 2;
      const categoryRadius = 12;
      const categoryX = Math.cos(categoryAngle) * categoryRadius;
      const categoryY = Math.sin(categoryAngle) * categoryRadius;

      categoryGroup.position.set(categoryX, categoryY, 0);

      // Create category label with improved visuals
      const categoryLabelCanvas = document.createElement("canvas");
      categoryLabelCanvas.width = 512;
      categoryLabelCanvas.height = 256;
      const categoryContext = categoryLabelCanvas.getContext("2d");

      if (categoryContext) {
        // Create gradient background
        const gradient = categoryContext.createLinearGradient(
          0,
          0,
          0,
          categoryLabelCanvas.height
        );
        gradient.addColorStop(0, "rgba(15, 15, 26, 0.8)");
        gradient.addColorStop(1, "rgba(15, 15, 26, 0.4)");
        categoryContext.fillStyle = gradient;
        categoryContext.fillRect(
          0,
          0,
          categoryLabelCanvas.width,
          categoryLabelCanvas.height
        );

        // Add subtle pattern
        categoryContext.fillStyle = "rgba(255, 255, 255, 0.05)";
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * categoryLabelCanvas.width;
          const y = Math.random() * categoryLabelCanvas.height;
          const size = Math.random() * 5 + 1;
          categoryContext.beginPath();
          categoryContext.arc(x, y, size, 0, Math.PI * 2);
          categoryContext.fill();
        }

        // Draw text with shadow
        categoryContext.shadowColor = "rgba(0, 0, 0, 0.5)";
        categoryContext.shadowBlur = 10;
        categoryContext.shadowOffsetX = 2;
        categoryContext.shadowOffsetY = 2;
        categoryContext.font = "bold 48px JetBrains Mono, monospace";
        categoryContext.textAlign = "center";
        categoryContext.textBaseline = "middle";
        categoryContext.fillStyle = category.color;
        categoryContext.fillText(
          category.name,
          categoryLabelCanvas.width / 2,
          categoryLabelCanvas.height / 2
        );

        // Add subtle border
        categoryContext.strokeStyle = `${category.color}44`;
        categoryContext.lineWidth = 4;
        categoryContext.strokeRect(
          10,
          10,
          categoryLabelCanvas.width - 20,
          categoryLabelCanvas.height - 20
        );

        const categoryTexture = new THREE.CanvasTexture(categoryLabelCanvas);
        categoryTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const categoryLabelMaterial = new THREE.MeshBasicMaterial({
          map: categoryTexture,
          transparent: true,
          side: THREE.DoubleSide,
        });

        const categoryLabelGeometry = new THREE.PlaneGeometry(5, 2.5);
        const categoryLabel = new THREE.Mesh(
          categoryLabelGeometry,
          categoryLabelMaterial
        );
        categoryLabel.position.set(0, 4, 0);
        categoryLabel.userData = { type: "category", name: category.name };
        categoryGroup.add(categoryLabel);
      }

      // Create skills for this category with improved layout
      category.skills.forEach((skill, skillIndex) => {
        // Calculate better positioning for skills
        const skillCount = category.skills.length;
        const skillAngle = (skillIndex / skillCount) * Math.PI * 2;
        const skillRadius = 4.5;
        const skillX = Math.cos(skillAngle) * skillRadius;
        const skillY = Math.sin(skillAngle) * skillRadius;

        // Create skill sphere with improved materials
        const skillGeometry = new THREE.SphereGeometry(
          skill.level * 0.9,
          32,
          32
        );
        const skillMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(category.color),
          metalness: 0.3,
          roughness: 0.4,
          emissive: new THREE.Color(category.color),
          emissiveIntensity: 0.2,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
          envMapIntensity: 0.8,
        });

        const skillMesh = new THREE.Mesh(skillGeometry, skillMaterial);
        skillMesh.position.set(skillX, skillY, 0);
        skillMesh.castShadow = true;
        skillMesh.receiveShadow = true;
        skillMesh.name = `skill-${category.name}-${skill.name}`;
        skillMesh.userData = {
          type: "skill",
          name: skill.name,
          category: category.name,
          level: skill.level,
        };
        categoryGroup.add(skillMesh);

        // Add to skill objects array for raycasting
        skillObjects.push({
          mesh: skillMesh,
          name: skill.name,
          category: category.name,
        });

        // Create skill label with improved visuals
        const skillLabelCanvas = document.createElement("canvas");
        skillLabelCanvas.width = 256;
        skillLabelCanvas.height = 128;
        const skillContext = skillLabelCanvas.getContext("2d");

        if (skillContext) {
          // Create background with gradient
          const gradient = skillContext.createLinearGradient(
            0,
            0,
            0,
            skillLabelCanvas.height
          );
          gradient.addColorStop(0, "rgba(15, 15, 26, 0.7)");
          gradient.addColorStop(1, "rgba(15, 15, 26, 0.3)");
          skillContext.fillStyle = gradient;
          skillContext.fillRect(
            0,
            0,
            skillLabelCanvas.width,
            skillLabelCanvas.height
          );

          // Draw text with shadow
          skillContext.shadowColor = "rgba(0, 0, 0, 0.5)";
          skillContext.shadowBlur = 5;
          skillContext.shadowOffsetX = 1;
          skillContext.shadowOffsetY = 1;
          skillContext.font = "bold 24px JetBrains Mono, monospace";
          skillContext.textAlign = "center";
          skillContext.textBaseline = "middle";
          skillContext.fillStyle = "white";
          skillContext.fillText(
            skill.name,
            skillLabelCanvas.width / 2,
            skillLabelCanvas.height / 2
          );

          // Add proficiency indicator
          skillContext.fillStyle = category.color;
          skillContext.fillRect(
            skillLabelCanvas.width / 2 - 50,
            skillLabelCanvas.height - 20,
            skill.level * 100,
            6
          );

          // Add border
          skillContext.strokeStyle = "rgba(255, 255, 255, 0.1)";
          skillContext.lineWidth = 2;
          skillContext.strokeRect(
            5,
            5,
            skillLabelCanvas.width - 10,
            skillLabelCanvas.height - 10
          );

          const skillTexture = new THREE.CanvasTexture(skillLabelCanvas);
          skillTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

          const skillLabelMaterial = new THREE.MeshBasicMaterial({
            map: skillTexture,
            transparent: true,
            side: THREE.DoubleSide,
            depthTest: false,
          });

          const skillLabelGeometry = new THREE.PlaneGeometry(2.5, 1.25);
          const skillLabel = new THREE.Mesh(
            skillLabelGeometry,
            skillLabelMaterial
          );
          skillLabel.position.set(skillX, skillY - 1.5, 0);
          categoryGroup.add(skillLabel);
        }

        // Create connection line to category center with improved visuals
        const lineMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(category.color),
          transparent: true,
          opacity: 0.5,
          linewidth: 2,
        });

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(skillX, skillY, 0),
        ]);

        const line = new THREE.Line(lineGeometry, lineMaterial);
        categoryGroup.add(line);
      });

      // Create connection line to central sphere with improved visuals
      const connectionMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(category.color),
        transparent: true,
        opacity: 0.4,
        linewidth: 3,
      });

      const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-categoryX, -categoryY, 0),
      ]);

      const connection = new THREE.Line(connectionGeometry, connectionMaterial);
      categoryGroup.add(connection);

      scene.add(categoryGroup);
      skillGroups.push(categoryGroup);
    });

    // Add particle system for background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a sphere of particles
      const radius = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);

      scaleArray[i / 3] = Math.random();
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "scale",
      new THREE.BufferAttribute(scaleArray, 1)
    );

    // Create shader material for particles with improved effects
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x89b4fa) },
      },
      vertexShader: `
        attribute float scale;
        uniform float time;
        
        void main() {
          vec3 pos = position;
          
          // Add subtle movement
          float noise = sin(pos.x * 0.05 + time) * cos(pos.z * 0.05 + time) * sin(pos.y * 0.05 + time);
          pos.x += noise * 0.3;
          pos.y += noise * 0.3;
          pos.z += noise * 0.3;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = scale * 2.5 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        
        void main() {
          // Create circular particles with soft edges
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Add glow effect
          float intensity = 1.0 - dist * 2.0;
          gl_FragColor = vec4(color, intensity * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Improved raycaster for interaction
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.1;
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the raycaster
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with all objects
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const object = intersects[0].object;

        // Check if we're hovering over a skill
        if (object.userData && object.userData.type === "skill") {
          setHoveredSkill(object.userData.name);
          setHoveredCategory(object.userData.category);
          document.body.style.cursor = "pointer";
        }
        // Check if we're hovering over a category
        else if (object.userData && object.userData.type === "category") {
          setHoveredCategory(object.userData.name);
          setHoveredSkill(null);
          document.body.style.cursor = "pointer";
        } else {
          setHoveredSkill(null);
          setHoveredCategory(null);
          document.body.style.cursor = "auto";
        }
      } else {
        setHoveredSkill(null);
        setHoveredCategory(null);
        document.body.style.cursor = "auto";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop with improved effects
    const clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate central sphere
      centralSphere.rotation.y = elapsedTime * 0.2;
      centralSphere.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      // Pulse central glow
      centralGlow.intensity = 1.5 + Math.sin(elapsedTime * 2) * 0.5;

      // Animate skill groups
      skillGroups.forEach((group, index) => {
        // Gentle floating animation
        group.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.003;

        // Slight rotation
        group.rotation.z = Math.sin(elapsedTime * 0.2 + index) * 0.05;

        // Highlight group if its category is hovered
        if (hoveredCategory === skillCategories[index].name) {
          group.scale.setScalar(1.05 + Math.sin(elapsedTime * 3) * 0.02);
        } else {
          group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      });

      // Highlight hovered skill with improved effects
      skillObjects.forEach((obj) => {
        if (obj.name === hoveredSkill) {
          obj.mesh.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
          if (obj.mesh.material instanceof THREE.MeshPhysicalMaterial) {
            obj.mesh.material.emissiveIntensity =
              0.5 + Math.sin(elapsedTime * 5) * 0.2;
          }
        } else if (obj.category === hoveredCategory && !hoveredSkill) {
          obj.mesh.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
          if (obj.mesh.material instanceof THREE.MeshPhysicalMaterial) {
            obj.mesh.material.emissiveIntensity = 0.3;
          }
        } else {
          obj.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          if (obj.mesh.material instanceof THREE.MeshPhysicalMaterial) {
            obj.mesh.material.emissiveIntensity = 0.2;
          }
        }
      });

      // Update particle shader time
      if (particles.material instanceof THREE.ShaderMaterial) {
        particles.material.uniforms.time.value = elapsedTime;
      }

      // Slowly rotate particles
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize with improved responsiveness
    const handleResize = () => {
      if (!mountRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }

      if (mountRef.current && rendererRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      // Dispose of geometries and materials to prevent memory leaks
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();

            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }

      // Reset cursor
      document.body.style.cursor = "auto";
    };
  }, [skillCategories, hoveredSkill, hoveredCategory]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      {/* Skill info overlay with improved design */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-terminal-header-dark/90 backdrop-blur-md p-4 rounded-lg border border-terminal-border shadow-xl"
          >
            <h3
              className="text-xl font-bold mb-2"
              style={{
                color:
                  skillCategories.find((c) => c.name === hoveredCategory)
                    ?.color || "#ffffff",
              }}
            >
              {hoveredSkill}
            </h3>

            {skillCategories
              .flatMap((category) =>
                category.skills.filter((skill) => skill.name === hoveredSkill)
              )
              .map((skill, index) => (
                <div key={index} className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-terminal-text-dim">
                      Proficiency
                    </span>
                    <span className="text-sm font-medium">
                      {Math.round(skill.level * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-terminal-header rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${skill.level * 100}%`,
                        backgroundColor:
                          skillCategories.find(
                            (c) => c.name === hoveredCategory
                          )?.color || "#ffffff",
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-terminal-text-dim">
                    Category:{" "}
                    <span
                      className="font-medium"
                      style={{
                        color:
                          skillCategories.find(
                            (c) => c.name === hoveredCategory
                          )?.color || "#ffffff",
                      }}
                    >
                      {hoveredCategory}
                    </span>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category info overlay */}
      <AnimatePresence>
        {hoveredCategory && !hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-terminal-header-dark/90 backdrop-blur-md p-4 rounded-lg border border-terminal-border shadow-xl"
          >
            <h3
              className="text-xl font-bold mb-2"
              style={{
                color:
                  skillCategories.find((c) => c.name === hoveredCategory)
                    ?.color || "#ffffff",
              }}
            >
              {hoveredCategory}
            </h3>

            <div className="mt-1">
              <p className="text-sm text-terminal-text-dim mb-2">
                Skills in this category:
              </p>
              <div className="flex flex-wrap gap-2">
                {skillCategories
                  .find((c) => c.name === hoveredCategory)
                  ?.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-md bg-terminal-header"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 bg-terminal-header-dark/80 backdrop-blur-md px-3 py-2 rounded-lg text-xs text-terminal-text-dim">
        Drag to rotate • Scroll to zoom • Hover over skills for details
      </div>
    </div>
  );
}
