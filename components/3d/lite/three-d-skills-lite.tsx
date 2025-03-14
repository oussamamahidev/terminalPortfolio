"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMobile } from "@/hooks/use-mobile"

export default function ThreeDSkillsLite() {
  const mountRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    if (!mountRef.current) return

    // Performance optimized scene setup
    const scene = new THREE.Scene()

    // Camera with wider field of view for mobile
    const camera = new THREE.PerspectiveCamera(isMobile ? 75 : 60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 20

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

    // Skill categories with terminal theme colors
    const skillCategories = [
      {
        name: "Frontend",
        color: 0x89b4fa, // Terminal blue
        skills: ["React.js", "Next.js", "Tailwind CSS", "HTML/CSS", "JavaScript"],
      },
      {
        name: "Backend",
        color: 0xa6e3a1, // Terminal green
        skills: ["Spring Boot", "Node.js", "Express.js", "PHP"],
      },
      {
        name: "Databases",
        color: 0xf9e2af, // Terminal yellow
        skills: ["MongoDB", "PostgreSQL", "MySQL", "Oracle"],
      },
      {
        name: "DevOps",
        color: 0xf38ba8, // Terminal red
        skills: ["Docker", "Git", "Linux", "CI/CD"],
      },
    ]

    // Create skill visualization with modern shapes
    const skillGroups: THREE.Group[] = []

    skillCategories.forEach((category, categoryIndex) => {
      const categoryGroup = new THREE.Group()

      // Position category in a circle
      const categoryAngle = (categoryIndex / skillCategories.length) * Math.PI * 2
      const categoryRadius = 10
      const categoryX = Math.cos(categoryAngle) * categoryRadius
      const categoryY = Math.sin(categoryAngle) * categoryRadius

      categoryGroup.position.set(categoryX, categoryY, 0)

      // Create skills for this category
      category.skills.forEach((skill, skillIndex) => {
        // Calculate positioning for skills
        const skillCount = category.skills.length
        const skillAngle = (skillIndex / skillCount) * Math.PI * 2
        const skillRadius = 3
        const skillX = Math.cos(skillAngle) * skillRadius
        const skillY = Math.sin(skillAngle) * skillRadius

        // Create modern skill shape
        let skillGeometry: THREE.BufferGeometry

        if (skillIndex % 3 === 0) {
          skillGeometry = new THREE.OctahedronGeometry(0.8, 0)
        } else if (skillIndex % 3 === 1) {
          skillGeometry = new THREE.TorusGeometry(0.5, 0.2, 8, 16)
        } else {
          skillGeometry = new THREE.IcosahedronGeometry(0.6, 0)
        }

        const skillMaterial = new THREE.MeshBasicMaterial({
          color: category.color,
          wireframe: true,
        })

        const skillMesh = new THREE.Mesh(skillGeometry, skillMaterial)
        skillMesh.position.set(skillX, skillY, 0)
        categoryGroup.add(skillMesh)

        // Create simple connection line
        const lineMaterial = new THREE.LineBasicMaterial({
          color: category.color,
          transparent: true,
          opacity: 0.5,
        })

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(skillX, skillY, 0),
        ])

        const line = new THREE.Line(lineGeometry, lineMaterial)
        categoryGroup.add(line)
      })

      scene.add(categoryGroup)
      skillGroups.push(categoryGroup)
    })

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
      camera.position.x = Math.sin(elapsedTime * 0.1) * 20
      camera.position.z = Math.cos(elapsedTime * 0.1) * 20
      camera.lookAt(0, 0, 0)

      // Animate skill groups
      skillGroups.forEach((group, index) => {
        // Simple floating animation
        group.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.01

        // Slight rotation
        group.rotation.z = Math.sin(elapsedTime * 0.2 + index) * 0.1
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
      skillGroups.forEach((group) => {
        group.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (child.material instanceof THREE.Material) {
              child.material.dispose()
            }
          } else if (child instanceof THREE.Line) {
            child.geometry.dispose()
            if (child.material instanceof THREE.Material) {
              child.material.dispose()
            }
          }
        })
      })

      starsGeometry.dispose()
      if (starsMaterial instanceof THREE.Material) {
        starsMaterial.dispose()
      }
    }
  }, [isMobile])

  return <div ref={mountRef} className="absolute inset-0 -z-10" />
}

