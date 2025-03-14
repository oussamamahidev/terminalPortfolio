"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ThreeDProjectsShowcase() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const frameIdRef = useRef<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "E-Learning Application for the SMI Platform",
      description:
        "A comprehensive platform that facilitates collaboration between students and professors. Features include file sharing, online requests for recommendation letters, announcement boards, and blogs.",
      technologies: [
        "React",
        "Spring Boot",
        "Spring Security",
        "Spring Cloud",
        "Microservices",
        "PostgreSQL",
        "RabbitMQ",
      ],
      image: "/lms.png?height=300&width=600",
      color: "#f38ba8", // Red
      github: "https://github.com/oussamamahidev/lms-platform",
      demo: "https://lms-platform-demo.vercel.app",
      features: [
        "User authentication and authorization",
        "Course management system",
        "Real-time notifications",
        "File sharing and document management",
        "Discussion forums and messaging",
        "Gradebook and assessment tools",
      ],
    },
    {
      id: 2,
      title: "Intra-Enterprise Collaboration System",
      description:
        "A web application for collaboration within companies, similar to Stack Overflow, featuring an announcement system, event organization, and blogs for internal communication.",
      technologies: ["Next.js 14", "NextAuth", "MongoDB", "Tailwind CSS", "TypeScript"],
      image: "/placeholder.svg?height=300&width=600",
      color: "#fab387", // Orange
      github: "https://github.com/oussamamahidev/intra-collab",
      demo: "https://intra-collab-demo.vercel.app",
      features: [
        "Knowledge sharing platform",
        "Question and answer system",
        "Event management",
        "Company announcements",
        "Internal blogging platform",
        "User profiles and reputation system",
      ],
    },
    {
      id: 3,
      title: "Amazon E-Commerce Clone",
      description:
        "A full-stack e-commerce platform inspired by Amazon, featuring user authentication, product listings, a shopping cart, and a secure checkout process.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "Stripe API"],
      image: "/placeholder.svg?height=300&width=600",
      color: "#a6e3a1", // Green
      github: "https://github.com/oussamamahidev/amazon-clone",
      demo: "https://amazon-clone-demo.vercel.app",
      features: [
        "Product catalog with search and filtering",
        "User accounts and profiles",
        "Shopping cart functionality",
        "Secure payment processing",
        "Order tracking and history",
        "Product reviews and ratings",
      ],
    },
  ]

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Create a gradient background
    const bgTexture = createGradientTexture()
    scene.background = bgTexture

    // Camera setup with improved settings
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)
    camera.fov = 65

    // Renderer setup with improved settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    mountRef.current.appendChild(renderer.domElement)

    // Controls with improved settings
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.8
    controls.maxDistance = 20
    controls.minDistance = 5
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.enablePan = false

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

    // Add point lights for better illumination
    const pointLight1 = new THREE.PointLight(0x89b4fa, 1, 20)
    pointLight1.position.set(10, 5, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xa6e3a1, 1, 20)
    pointLight2.position.set(-10, -5, 10)
    scene.add(pointLight2)

    // Project cards with improved visuals
    const projectCards: THREE.Group[] = []
    const projectRadius = 7

    projects.forEach((project, index) => {
      // Create project card group
      const card = new THREE.Group()

      // Position in a circle
      const angle = (index / projects.length) * Math.PI * 2
      const x = Math.cos(angle) * projectRadius
      const z = Math.sin(angle) * projectRadius
      card.position.set(x, 0, z)

      // Make card face center
      card.lookAt(0, 0, 0)

      // Create card background with improved materials
      const cardGeometry = new THREE.PlaneGeometry(4, 2.5, 1, 1)
      cardGeometry.computeVertexNormals()

      const cardMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(project.color),
        metalness: 0.2,
        roughness: 0.5,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      })

      const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial)
      cardMesh.castShadow = true
      cardMesh.receiveShadow = true
      cardMesh.name = `project-${project.id}`
      card.add(cardMesh)

      // Create project title texture with improved visuals
      const canvas = document.createElement("canvas")
      canvas.width = 1024
      canvas.height = 512
      const context = canvas.getContext("2d")

      if (context) {
        // Background with gradient
        const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.8)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)")
        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Add subtle pattern
        context.fillStyle = "rgba(255, 255, 255, 0.03)"
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = Math.random() * 5 + 1
          context.beginPath()
          context.arc(x, y, size, 0, Math.PI * 2)
          context.fill()
        }

        // Add border
        context.strokeStyle = project.color + "66"
        context.lineWidth = 10
        context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

        // Title with shadow
        context.shadowColor = "rgba(0, 0, 0, 0.5)"
        context.shadowBlur = 15
        context.shadowOffsetX = 5
        context.shadowOffsetY = 5
        context.font = "bold 48px JetBrains Mono, monospace"
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = "white"

        // Wrap text if needed
        const words = project.title.split(" ")
        let line = ""
        const lines = []
        let y = canvas.height / 2 - 60

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " "
          const metrics = context.measureText(testLine)

          if (metrics.width > canvas.width - 80 && i > 0) {
            lines.push(line)
            line = words[i] + " "
          } else {
            line = testLine
          }
        }
        lines.push(line)

        // Adjust y position based on number of lines
        y = canvas.height / 2 - ((lines.length - 1) * 60) / 2

        // Draw each line
        lines.forEach((line) => {
          context.fillText(line.trim(), canvas.width / 2, y)
          y += 60
        })

        // Add technologies
        context.font = "20px JetBrains Mono, monospace"
        context.fillStyle = project.color
        context.shadowBlur = 5
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2

        const techText = project.technologies.slice(0, 3).join(" • ")
        context.fillText(techText, canvas.width / 2, canvas.height - 50)

        const texture = new THREE.CanvasTexture(canvas)
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

        const titleMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        })

        const titleGeometry = new THREE.PlaneGeometry(3.8, 2.3)
        const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial)
        titleMesh.position.z = 0.01
        card.add(titleMesh)
      }

      // Add card to scene
      scene.add(card)
      projectCards.push(card)

      // Add animation data
      card.userData = {
        originalPosition: card.position.clone(),
        originalRotation: card.rotation.clone(),
        id: project.id,
      }
    })

    // Add particle system for background
    const particles = createParticleSystem()
    scene.add(particles)

    // Raycaster for interaction with improved precision
    const raycaster = new THREE.Raycaster()
    raycaster.params.Line = { threshold: 0.1 }
    raycaster.params.Points = { threshold: 0.1 }
    const mouse = new THREE.Vector2()

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const object = intersects[0].object

        // Check if we're hovering over a project card
        if (object.name && object.name.startsWith("project-")) {
          document.body.style.cursor = "pointer"

          // Scale up the hovered card
          const projectId = Number.parseInt(object.name.split("-")[1])
          projectCards.forEach((card) => {
            if (card.userData.id === projectId) {
              card.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
            } else {
              card.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
            }
          })
        } else {
          document.body.style.cursor = "auto"

          // Reset all cards
          projectCards.forEach((card) => {
            card.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
          })
        }
      } else {
        document.body.style.cursor = "auto"

        // Reset all cards
        projectCards.forEach((card) => {
          card.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        })
      }
    }

    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const object = intersects[0].object

        // Check if we're clicking on a project card
        if (object.name && object.name.startsWith("project-")) {
          const projectId = Number.parseInt(object.name.split("-")[1])
          setSelectedProject(projectId)

          // Find the index of the selected project
          const projectIndex = projects.findIndex((p) => p.id === projectId)
          if (projectIndex !== -1) {
            setActiveProjectIndex(projectIndex)
          }
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    // Animation loop with improved effects
    const clock = new THREE.Clock()

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Update controls
      controls.update()

      // Animate project cards
      projectCards.forEach((card, index) => {
        // Skip animation if this card is selected
        if (selectedProject === card.userData.id) return

        // Floating animation
        card.position.y = Math.sin(elapsedTime * 0.5 + index) * 0.2

        // Slight rotation
        card.rotation.z = Math.sin(elapsedTime * 0.3 + index) * 0.05
      })

      // Animate particles
      if (particles.material instanceof THREE.ShaderMaterial) {
        particles.material.uniforms.time.value = elapsedTime
        particles.rotation.y = elapsedTime * 0.05
      }

      // Pulse point lights
      pointLight1.intensity = 1 + Math.sin(elapsedTime * 2) * 0.3
      pointLight2.intensity = 1 + Math.sin(elapsedTime * 2 + 1) * 0.3

      // Render
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize with improved responsiveness
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // Update camera
      camera.aspect = width / height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)

      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current)
      }

      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }

      // Dispose of geometries and materials
      projectCards.forEach((card) => {
        card.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      })

      // Dispose of particle system
      if (particles.geometry) particles.geometry.dispose()
      if (particles.material instanceof THREE.Material) particles.material.dispose()

      // Reset cursor
      document.body.style.cursor = "auto"
    }

    // Helper function to create a gradient background texture
    function createGradientTexture() {
      const canvas = document.createElement("canvas")
      canvas.width = 2
      canvas.height = 512
      const context = canvas.getContext("2d")

      if (context) {
        const gradient = context.createLinearGradient(0, 0, 0, 512)
        gradient.addColorStop(0, "#0f0f1a")
        gradient.addColorStop(1, "#1a1b2e")
        context.fillStyle = gradient
        context.fillRect(0, 0, 2, 512)

        const texture = new THREE.CanvasTexture(canvas)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(1, 1)

        return texture
      }

      return new THREE.Color("#0f0f1a")
    }

    // Helper function to create particle system
    function createParticleSystem() {
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 2000
      const posArray = new Float32Array(particlesCount * 3)
      const scaleArray = new Float32Array(particlesCount)
      const colorArray = new Float32Array(particlesCount * 3)

      // Create a color palette for particles
      const colors = [
        new THREE.Color(0x89b4fa), // Blue
        new THREE.Color(0xa6e3a1), // Green
        new THREE.Color(0xf9e2af), // Yellow
        new THREE.Color(0xf38ba8), // Red
        new THREE.Color(0xcba6f7), // Purple
      ]

      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Create a sphere of particles
        const radius = 20 + Math.random() * 30
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
        posArray[i + 2] = radius * Math.cos(phi)

        scaleArray[i / 3] = Math.random()

        // Assign random color from palette
        const color = colors[Math.floor(Math.random() * colors.length)]
        colorArray[i] = color.r
        colorArray[i + 1] = color.g
        colorArray[i + 2] = color.b
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
      particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))
      particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

      // Create shader material for particles with improved effects
      const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float scale;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          
          void main() {
            vColor = color;
            vec3 pos = position;
            
            // Add subtle movement
            float noise = sin(pos.x * 0.05 + time) * cos(pos.z * 0.05 + time) * sin(pos.y * 0.05 + time);
            pos.x += noise * 0.3;
            pos.y += noise * 0.3;
            pos.z += noise * 0.3;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = scale * 3.0 * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            // Create circular particles with soft edges
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            // Add glow effect
            float intensity = 1.0 - dist * 2.0;
            gl_FragColor = vec4(vColor, intensity * 0.7);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })

      return new THREE.Points(particlesGeometry, particlesMaterial)
    }
  }, [projects, selectedProject])

  // Navigation functions
  const nextProject = () => {
    const newIndex = (activeProjectIndex + 1) % projects.length
    setActiveProjectIndex(newIndex)
    setSelectedProject(projects[newIndex].id)
  }

  const prevProject = () => {
    const newIndex = (activeProjectIndex - 1 + projects.length) % projects.length
    setActiveProjectIndex(newIndex)
    setSelectedProject(projects[newIndex].id)
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      {/* Project detail overlay with improved design */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-terminal-header-dark/95 backdrop-blur-md p-6 rounded-xl border border-terminal-border max-w-3xl relative shadow-2xl"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-terminal-text-dim hover:text-terminal-text"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              {projects.find((p) => p.id === selectedProject) && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: projects.find((p) => p.id === selectedProject)?.color }}
                  >
                    {projects.find((p) => p.id === selectedProject)?.title}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <div className="rounded-lg overflow-hidden mb-4 border border-terminal-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={projects.find((p) => p.id === selectedProject)?.image || "/placeholder.svg"}
                          alt={projects.find((p) => p.id === selectedProject)?.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {projects
                          .find((p) => p.id === selectedProject)
                          ?.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs rounded-md"
                              style={{
                                backgroundColor: `${projects.find((p) => p.id === selectedProject)?.color}20`,
                                color: projects.find((p) => p.id === selectedProject)?.color,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href={projects.find((p) => p.id === selectedProject)?.github || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 hover:bg-terminal-header"
                          >
                            <Github className="h-4 w-4" /> GitHub
                          </Button>
                        </Link>
                        <Link
                          href={projects.find((p) => p.id === selectedProject)?.demo || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 hover:bg-terminal-header"
                          >
                            <ExternalLink className="h-4 w-4" /> Live Demo
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div>
                      <p className="text-terminal-text-bright mb-4">
                        {projects.find((p) => p.id === selectedProject)?.description}
                      </p>

                      <div
                        className="bg-terminal-header p-4 rounded-lg border-l-4"
                        style={{ borderColor: projects.find((p) => p.id === selectedProject)?.color }}
                      >
                        <h3
                          className="text-lg font-medium mb-2"
                          style={{ color: projects.find((p) => p.id === selectedProject)?.color }}
                        >
                          Key Features
                        </h3>
                        <ul className="space-y-1 text-sm text-terminal-text-dim">
                          {projects
                            .find((p) => p.id === selectedProject)
                            ?.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span
                                  className="inline-block w-2 h-2 rounded-full mt-1.5"
                                  style={{ backgroundColor: projects.find((p) => p.id === selectedProject)?.color }}
                                ></span>
                                {feature}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 border-t border-terminal-border pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevProject}
                      className="flex items-center gap-1 hover:bg-terminal-header"
                    >
                      <ArrowLeft className="h-4 w-4" /> Previous
                    </Button>

                    <div className="flex space-x-1">
                      {projects.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setActiveProjectIndex(index)
                            setSelectedProject(projects[index].id)
                          }}
                          className="w-2 h-2 rounded-full transition-colors"
                          style={{
                            backgroundColor:
                              index === activeProjectIndex ? projects[activeProjectIndex].color : "#4a4a5e",
                          }}
                          aria-label={`Go to project ${index + 1}`}
                        ></button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextProject}
                      className="flex items-center gap-1 hover:bg-terminal-header"
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

