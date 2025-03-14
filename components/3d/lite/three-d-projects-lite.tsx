"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMobile } from "@/hooks/use-mobile"

export default function ThreeDProjectsLite() {
  const mountRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    if (!mountRef.current) return

    // Performance optimized scene setup
    const scene = new THREE.Scene()

    // Camera with wider field of view for mobile
    const camera = new THREE.PerspectiveCamera(isMobile ? 75 : 60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 15

    // Renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disable antialiasing on mobile
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Disable shadows for performance
    renderer.shadowMap.enabled = false

    mountRef.current.appendChild(renderer.domElement)

    // Simple ambient light - no shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Single directional light - no shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Project data with terminal theme colors
    const projects = [
      {
        name: "E-Learning Application",
        color: 0xf38ba8, // Terminal red
      },
      {
        name: "Intra-Enterprise Collaboration",
        color: 0x89b4fa, // Terminal blue
      },
      {
        name: "Amazon E-Commerce Clone",
        color: 0xa6e3a1, // Terminal green
      },
      {
        name: "3D Portfolio",
        color: 0xf9e2af, // Terminal yellow
      },
    ]

    // Create project objects with modern wireframe shapes
    const projectObjects: THREE.Mesh[] = []

    projects.forEach((project, index) => {
      // Create modern project shape
      let geometry: THREE.BufferGeometry

      if (index % 4 === 0) {
        geometry = new THREE.TorusKnotGeometry(2, 0.5, 64, 8)
      } else if (index % 4 === 1) {
        geometry = new THREE.OctahedronGeometry(2, 1)
      } else if (index % 4 === 2) {
        geometry = new THREE.IcosahedronGeometry(2, 1)
      } else {
        geometry = new THREE.TorusGeometry(2, 0.5, 16, 32)
      }

      // Wireframe material for modern look
      const material = new THREE.MeshBasicMaterial({
        color: project.color,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      })

      const mesh = new THREE.Mesh(geometry, material)

      // Position in a circle
      const angle = (index / projects.length) * Math.PI * 2
      const radius = 8
      mesh.position.x = Math.cos(angle) * radius
      mesh.position.y = Math.sin(angle) * radius

      scene.add(mesh)
      projectObjects.push(mesh)
    })

    // Add connecting lines between projects
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xcdd6f4, // Terminal text color
      transparent: true,
      opacity: 0.2,
    })

    for (let i = 0; i < projectObjects.length; i++) {
      const nextIndex = (i + 1) % projectObjects.length

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        projectObjects[i].position,
        projectObjects[nextIndex].position,
      ])

      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
    }

    // Add stars for background
    const starsGeometry = new THREE.BufferGeometry()
    const starsVertices = []

    for (let i = 0; i < 1000; i++) {
      const radius = 50 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      starsVertices.push(x, y, z)
    }

    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: true,
    })

    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Animation loop
    const clock = new THREE.Clock()
    let frameId: number

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Rotate camera around the scene
      camera.position.x = Math.sin(elapsedTime * 0.2) * 15
      camera.position.z = Math.cos(elapsedTime * 0.2) * 15
      camera.lookAt(0, 0, 0)

      // Animate project objects
      projectObjects.forEach((object, index) => {
        // Rotate objects
        object.rotation.x = elapsedTime * 0.2
        object.rotation.y = elapsedTime * 0.3

        // Simple floating animation
        object.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.01
      })

      // Rotate stars
      stars.rotation.y = elapsedTime * 0.02

      // Render scene
      renderer.render(scene, camera)
    }

    animate()

    // Simple resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(frameId)

      if (mountRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      projectObjects.forEach((object) => {
        object.geometry.dispose()
        if (object.material instanceof THREE.Material) {
          object.material.dispose()
        }
      })

      starsGeometry.dispose()
      if (starsMaterial instanceof THREE.Material) {
        starsMaterial.dispose()
      }
    }
  }, [isMobile])

  return <div ref={mountRef} className="absolute inset-0 -z-10" />
}

