"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js"
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js"
import { FXAAShader } from "three/addons/shaders/FXAAShader.js"

interface ThreeDSceneProps {
  activeSection: string
  isRotating: boolean
}

export default function ThreeDScene({ activeSection, isRotating }: ThreeDSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const outlinePassRef = useRef<OutlinePass | null>(null)
  const frameIdRef = useRef<number | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const [hoveredFace, setHoveredFace] = useState<number | null>(null)

  // Setup the scene
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
    cameraRef.current = camera
    camera.position.z = 5
    camera.fov = 65 // Wider field of view for more immersive experience

    // Renderer setup with improved settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
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

    // Controls setup with improved settings
    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.enableZoom = true
    controls.minDistance = 3
    controls.maxDistance = 10
    controls.maxPolarAngle = Math.PI / 1.5
    controls.minPolarAngle = Math.PI / 4
    controls.autoRotate = isRotating
    controls.autoRotateSpeed = 0.5

    // Advanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    // Main directional light with shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.bias = -0.0001
    scene.add(directionalLight)

    // Add point lights for more dynamic lighting
    const pointLight1 = new THREE.PointLight(0x89b4fa, 1, 10)
    pointLight1.position.set(-2, 1, 4)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xa6e3a1, 0.8, 10)
    pointLight2.position.set(2, -1, 4)
    scene.add(pointLight2)

    // Create cube with improved materials
    const geometry = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1)
    geometry.computeVertexNormals() // Ensure proper normals for lighting

    // Create environment map for reflections
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256)
    cubeRenderTarget.texture.type = THREE.HalfFloatType
    const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget)
    scene.add(cubeCamera)

    // More sophisticated materials with environment mapping and physical properties
    const materials = [
      createFaceMaterial(0x89b4fa, "About", cubeRenderTarget.texture), // Blue
      createFaceMaterial(0xa6e3a1, "Skills", cubeRenderTarget.texture), // Green
      createFaceMaterial(0xf9e2af, "Projects", cubeRenderTarget.texture), // Yellow
      createFaceMaterial(0xf38ba8, "Contact", cubeRenderTarget.texture), // Red
      createFaceMaterial(0xcba6f7, "Top", cubeRenderTarget.texture), // Purple
      createFaceMaterial(0xcba6f7, "Bottom", cubeRenderTarget.texture), // Purple
    ]

    const cube = new THREE.Mesh(geometry, materials)
    cube.castShadow = true
    cube.receiveShadow = true
    cubeRef.current = cube
    scene.add(cube)

    // Update cube camera for reflections
    cubeCamera.position.copy(cube.position)
    cubeCamera.update(renderer, scene)

    // Add text labels to cube faces with improved visuals
    const faceLabels = addTextToFaces(scene)

    // Add particle system for background with improved visuals
    const particles = createParticleSystem()
    particlesRef.current = particles
    scene.add(particles)

    // Post-processing setup with improved effects
    const composer = new EffectComposer(renderer)
    composerRef.current = composer

    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    // Add FXAA anti-aliasing pass
    const fxaaPass = new ShaderPass(FXAAShader)
    const pixelRatio = renderer.getPixelRatio()
    fxaaPass.material.uniforms["resolution"].value.x = 1 / (window.innerWidth * pixelRatio)
    fxaaPass.material.uniforms["resolution"].value.y = 1 / (window.innerHeight * pixelRatio)
    composer.addPass(fxaaPass)

    // Add bloom effect with improved settings
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.4, // strength
      0.4, // radius
      0.85, // threshold
    )
    composer.addPass(bloomPass)

    // Add outline effect with improved settings
    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
    outlinePass.edgeStrength = 3
    outlinePass.edgeGlow = 1
    outlinePass.edgeThickness = 1
    outlinePass.pulsePeriod = 0
    outlinePass.visibleEdgeColor.set("#ffffff")
    outlinePass.hiddenEdgeColor.set("#190a05")
    outlinePassRef.current = outlinePass
    composer.addPass(outlinePass)

    // Raycaster for interactive elements with improved precision
    const raycaster = new THREE.Raycaster()
    raycaster.params.Line = { threshold: 0.1 }
    raycaster.params.Points = { threshold: 0.1 }
    const mouse = new THREE.Vector2()

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Update the raycaster
      raycaster.setFromCamera(mouse, camera)

      // Check for intersections with the cube faces
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const object = intersects[0].object

        // Check if we're hovering over a face label
        if (object.userData && typeof object.userData.faceIndex === "number") {
          setHoveredFace(object.userData.faceIndex)

          // Add outline effect
          if (outlinePassRef.current) {
            outlinePassRef.current.selectedObjects = [object]
          }

          // Change cursor
          document.body.style.cursor = "pointer"
        } else {
          setHoveredFace(null)

          // Remove outline effect
          if (outlinePassRef.current) {
            outlinePassRef.current.selectedObjects = []
          }

          // Reset cursor
          document.body.style.cursor = "auto"
        }
      } else {
        setHoveredFace(null)

        // Remove outline effect
        if (outlinePassRef.current) {
          outlinePassRef.current.selectedObjects = []
        }

        // Reset cursor
        document.body.style.cursor = "auto"
      }
    }

    const handleClick = (event: MouseEvent) => {
      // Only handle click if we're hovering over a face
      if (hoveredFace !== null) {
        // Map face index to section
        const sections = ["about", "skills", "projects", "contact"]
        if (hoveredFace >= 0 && hoveredFace < sections.length) {
          // Trigger section change
          const event = new CustomEvent("sectionChange", {
            detail: { section: sections[hoveredFace] },
          })
          window.dispatchEvent(event)
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
      if (controlsRef.current) {
        controlsRef.current.update()
      }

      // Auto-rotation
      if (isRotating && cubeRef.current) {
        cubeRef.current.rotation.y += 0.005
      }

      // Update particle shader time
      if (particlesRef.current && particlesRef.current.material instanceof THREE.ShaderMaterial) {
        particlesRef.current.material.uniforms.time.value = elapsedTime

        // Slowly rotate particles
        particlesRef.current.rotation.y += 0.0003
        particlesRef.current.rotation.x += 0.0001
      }

      // Animate face labels
      faceLabels.forEach((label) => {
        if (label.userData && typeof label.userData.faceIndex === "number") {
          if (label.userData.faceIndex === hoveredFace) {
            label.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
          } else {
            label.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
          }
        }
      })

      // Pulse point lights
      pointLight1.intensity = 1 + Math.sin(elapsedTime * 2) * 0.3
      pointLight2.intensity = 0.8 + Math.sin(elapsedTime * 2 + 1) * 0.2

      // Render with post-processing
      if (composerRef.current) {
        composerRef.current.render()
      } else if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    // Handle window resize with improved responsiveness
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current && composerRef.current) {
        const width = window.innerWidth
        const height = window.innerHeight

        // Update camera
        cameraRef.current.aspect = width / height
        cameraRef.current.updateProjectionMatrix()

        // Update renderer and composer
        rendererRef.current.setSize(width, height)
        composerRef.current.setSize(width, height)

        // Update FXAA pass
        const pixelRatio = rendererRef.current.getPixelRatio()
        const fxaaPass = composer.passes.find(
          (pass) => pass instanceof ShaderPass && pass.material.uniforms["resolution"],
        ) as ShaderPass
        if (fxaaPass) {
          fxaaPass.material.uniforms["resolution"].value.x = 1 / (width * pixelRatio)
          fxaaPass.material.uniforms["resolution"].value.y = 1 / (height * pixelRatio)
        }
      }
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
      if (cubeRef.current) {
        cubeRef.current.geometry.dispose()
        if (Array.isArray(cubeRef.current.material)) {
          cubeRef.current.material.forEach((material) => material.dispose())
        } else {
          cubeRef.current.material.dispose()
        }
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose()
        if (particlesRef.current.material instanceof THREE.Material) {
          particlesRef.current.material.dispose()
        }
      }

      // Dispose of render targets
      if (cubeRenderTarget) {
        cubeRenderTarget.dispose()
      }

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

    // Helper function to create face materials
    function createFaceMaterial(color: number, name: string, envMap: THREE.Texture) {
      return new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.3,
        roughness: 0.4,
        envMap: envMap,
        envMapIntensity: 0.5,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
        transmission: 0.05,
        ior: 1.5,
        reflectivity: 0.2,
        side: THREE.DoubleSide,
      })
    }

    // Helper function to add text to faces
    function addTextToFaces(scene: THREE.Scene) {
      const labels: THREE.Mesh[] = []

      // Add text to each face with improved visuals
      const addTextToFace = (text: string, position: THREE.Vector3, rotation: THREE.Euler, faceIndex: number) => {
        const canvas = document.createElement("canvas")
        canvas.width = 512
        canvas.height = 512
        const context = canvas.getContext("2d")

        if (context) {
          // Create gradient background
          const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, "rgba(15, 15, 26, 0.7)")
          gradient.addColorStop(1, "rgba(15, 15, 26, 0.3)")
          context.fillStyle = gradient
          context.fillRect(0, 0, canvas.width, canvas.height)

          // Add subtle pattern
          context.fillStyle = "rgba(255, 255, 255, 0.03)"
          for (let i = 0; i < 30; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const size = Math.random() * 5 + 1
            context.beginPath()
            context.arc(x, y, size, 0, Math.PI * 2)
            context.fill()
          }

          // Draw text with shadow
          context.shadowColor = "rgba(0, 0, 0, 0.5)"
          context.shadowBlur = 15
          context.shadowOffsetX = 5
          context.shadowOffsetY = 5
          context.font = "Bold 80px JetBrains Mono, monospace"
          context.textAlign = "center"
          context.textBaseline = "middle"

          // Create text gradient based on face
          const textGradient = context.createLinearGradient(
            canvas.width / 2 - 100,
            canvas.height / 2,
            canvas.width / 2 + 100,
            canvas.height / 2,
          )

          // Set gradient colors based on face
          switch (faceIndex) {
            case 0: // About
              textGradient.addColorStop(0, "#89b4fa")
              textGradient.addColorStop(1, "#b4befe")
              break
            case 1: // Skills
              textGradient.addColorStop(0, "#a6e3a1")
              textGradient.addColorStop(1, "#94e2d5")
              break
            case 2: // Projects
              textGradient.addColorStop(0, "#f9e2af")
              textGradient.addColorStop(1, "#fab387")
              break
            case 3: // Contact
              textGradient.addColorStop(0, "#f38ba8")
              textGradient.addColorStop(1, "#f5c2e7")
              break
            default:
              textGradient.addColorStop(0, "#cdd6f4")
              textGradient.addColorStop(1, "#a6adc8")
          }

          context.fillStyle = textGradient
          context.fillText(text, canvas.width / 2, canvas.height / 2)

          // Add subtle border
          context.strokeStyle = "rgba(255, 255, 255, 0.1)"
          context.lineWidth = 8
          context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

          // Add glow effect
          context.shadowColor = "rgba(255, 255, 255, 0.2)"
          context.shadowBlur = 20
          context.shadowOffsetX = 0
          context.shadowOffsetY = 0
          context.strokeStyle = "rgba(255, 255, 255, 0.1)"
          context.lineWidth = 2
          context.strokeText(text, canvas.width / 2, canvas.height / 2)

          const texture = new THREE.CanvasTexture(canvas)
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
          })

          const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), material)

          plane.position.copy(position)
          plane.rotation.copy(rotation)
          plane.userData = { faceIndex }

          // Add slight offset to prevent z-fighting
          const normal = new THREE.Vector3().copy(position).normalize()
          plane.position.add(normal.multiplyScalar(0.01))

          scene.add(plane)
          labels.push(plane)
        }
      }

      // Add text to each face with improved positioning
      addTextToFace("ABOUT", new THREE.Vector3(0, 0, 1.01), new THREE.Euler(0, 0, 0), 0)
      addTextToFace("SKILLS", new THREE.Vector3(1.01, 0, 0), new THREE.Euler(0, Math.PI / 2, 0), 1)
      addTextToFace("PROJECTS", new THREE.Vector3(0, 0, -1.01), new THREE.Euler(0, Math.PI, 0), 2)
      addTextToFace("CONTACT", new THREE.Vector3(-1.01, 0, 0), new THREE.Euler(0, -Math.PI / 2, 0), 3)

      return labels
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
  }, [isRotating, hoveredFace])

  // Update cube rotation based on active section
  useEffect(() => {
    if (!cubeRef.current || isRotating) return

    const targetRotation = {
      about: { y: 0 },
      skills: { y: Math.PI / 2 },
      projects: { y: Math.PI },
      contact: { y: -Math.PI / 2 },
    }[activeSection]

    // Animate to the target rotation with improved smoothness
    const animate = () => {
      if (!cubeRef.current || isRotating) return

      const cube = cubeRef.current
      const targetY = targetRotation?.y || 0
      const currentY = cube.rotation.y % (Math.PI * 2)

      // Calculate the shortest path to the target rotation
      let diff = targetY - currentY
      if (diff > Math.PI) diff -= Math.PI * 2
      if (diff < -Math.PI) diff += Math.PI * 2

      // Smoothly interpolate to the target rotation
      cube.rotation.y += diff * 0.05

      // Stop animating when close enough
      if (Math.abs(diff) > 0.01) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [activeSection, isRotating])

  return <div ref={mountRef} className="w-full h-full" />
}

