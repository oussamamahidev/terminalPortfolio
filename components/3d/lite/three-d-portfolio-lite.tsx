"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Info,
  X,
  Github,
  Linkedin,
  Mail,
  Code,
  Briefcase,
  BarChart3,
  ChevronUp,
  Moon,
  Sun,
  Sparkles,
  Rocket,
  Zap,
  Heart,
  Coffee,
  Music,
  Palette,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import ThreeDBackgroundLite from "./three-d-background-lite"
import ThreeDSkillsLite from "./three-d-skills-lite"
import ThreeDProjectsLite from "./three-d-projects-lite"
import { useMobile } from "@/hooks/use-mobile"

export default function ThreeDPortfolioLite() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("about")
  const [showTutorial, setShowTutorial] = useState(false)
  const [showSocials, setShowSocials] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [activeTheme, setActiveTheme] = useState<"cyber" | "neon" | "pastel" | "retro">("cyber")
  const [showThemes, setShowThemes] = useState(false)
  const [animateBackground, setAnimateBackground] = useState(true)
  const isMobile = useMobile()

  const sections = ["about", "skills", "projects", "contact"]

  const themes = {
    cyber: {
      primary: "#0ff",
      secondary: "#f0f",
      accent: "#ff0",
      bg: "from-blue-950 to-purple-950",
      text: "text-cyan-300",
    },
    neon: {
      primary: "#0f0",
      secondary: "#f0f",
      accent: "#ff0",
      bg: "from-gray-950 to-black",
      text: "text-green-400",
    },
    pastel: {
      primary: "#ffafcc",
      secondary: "#a2d2ff",
      accent: "#ffc8dd",
      bg: "from-indigo-200 to-purple-200",
      text: "text-indigo-800",
    },
    retro: {
      primary: "#ff6b6b",
      secondary: "#4ecdc4",
      accent: "#ffd166",
      bg: "from-indigo-900 to-purple-900",
      text: "text-orange-400",
    },
  }

  const currentTheme = themes[activeTheme]

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    // Add some haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    // Add some haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const changeTheme = (theme: "cyber" | "neon" | "pastel" | "retro") => {
    setActiveTheme(theme)
    setShowThemes(false)
    // Add some haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-screen overflow-hidden relative bg-gradient-to-b ${darkMode ? currentTheme.bg : "from-blue-100 to-purple-100"} transition-colors duration-500`}
    >
      {/* 3D Background - Performance Optimized */}
      <div className="absolute inset-0 z-0">
        {activeSection === "skills" ? (
          <ThreeDSkillsLite />
        ) : activeSection === "projects" ? (
          <ThreeDProjectsLite />
        ) : (
          <ThreeDBackgroundLite activeSection={activeSection} />
        )}

        {/* Animated particles overlay */}
        {animateBackground && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  backgroundColor:
                    i % 3 === 0 ? currentTheme.primary : i % 3 === 1 ? currentTheme.secondary : currentTheme.accent,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Tutorial overlay */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900/90 backdrop-blur-md p-8 rounded-xl border border-gray-700 max-w-2xl relative shadow-2xl"
              style={{
                boxShadow: `0 0 20px ${currentTheme.primary}, 0 0 40px ${currentTheme.secondary}`,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => setShowTutorial(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  <Sparkles className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: currentTheme.primary }}>
                  Welcome to My Interactive Portfolio
                </h2>
              </div>

              <div className="space-y-4 text-white">
                <p className="text-gray-300">
                  This is a fun, modern and interactive version of my portfolio with cool features:
                </p>

                <div className="space-y-2">
                  <h3 className="font-bold flex items-center gap-2" style={{ color: currentTheme.accent }}>
                    <span
                      className="inline-flex h-6 w-6 rounded-full items-center justify-center text-sm"
                      style={{ backgroundColor: `${currentTheme.accent}30` }}
                    >
                      <Zap className="h-4 w-4" style={{ color: currentTheme.accent }} />
                    </span>
                    Cool Features
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 ml-8">
                    <li>Theme switcher - Try different color schemes!</li>
                    <li>Dark/Light mode toggle</li>
                    <li>Interactive 3D backgrounds for each section</li>
                    <li>Animated UI elements and transitions</li>
                    <li>Responsive design for all devices</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold flex items-center gap-2" style={{ color: currentTheme.secondary }}>
                    <span
                      className="inline-flex h-6 w-6 rounded-full items-center justify-center text-sm"
                      style={{ backgroundColor: `${currentTheme.secondary}30` }}
                    >
                      <Rocket className="h-4 w-4" style={{ color: currentTheme.secondary }} />
                    </span>
                    Navigation
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 ml-8">
                    <li>Use the fun navigation bar at the bottom</li>
                    <li>Each section has unique interactive elements</li>
                    <li>Try the theme switcher in the top-right corner</li>
                    <li>Toggle dark/light mode for different vibes</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  className="px-8 py-6 rounded-xl font-bold text-lg text-black"
                  style={{
                    backgroundColor: currentTheme.primary,
                    boxShadow: `0 0 10px ${currentTheme.primary}`,
                  }}
                  onClick={() => setShowTutorial(false)}
                >
                  Lets Explore!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme and mode controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <AnimatePresence>
          {showThemes && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2"
            >
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-900/80 backdrop-blur-sm border-cyan-500 hover:bg-gray-800 hover:border-cyan-400"
                onClick={() => changeTheme("cyber")}
                style={{ boxShadow: activeTheme === "cyber" ? "0 0 10px #0ff" : "none" }}
              >
                <span className="w-4 h-4 rounded-full bg-cyan-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-900/80 backdrop-blur-sm border-green-500 hover:bg-gray-800 hover:border-green-400"
                onClick={() => changeTheme("neon")}
                style={{ boxShadow: activeTheme === "neon" ? "0 0 10px #0f0" : "none" }}
              >
                <span className="w-4 h-4 rounded-full bg-green-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-900/80 backdrop-blur-sm border-pink-300 hover:bg-gray-800 hover:border-pink-200"
                onClick={() => changeTheme("pastel")}
                style={{ boxShadow: activeTheme === "pastel" ? "0 0 10px #ffafcc" : "none" }}
              >
                <span className="w-4 h-4 rounded-full bg-pink-300" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-gray-900/80 backdrop-blur-sm border-orange-500 hover:bg-gray-800 hover:border-orange-400"
                onClick={() => changeTheme("retro")}
                style={{ boxShadow: activeTheme === "retro" ? "0 0 10px #ff6b6b" : "none" }}
              >
                <span className="w-4 h-4 rounded-full bg-orange-400" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800 hover:border-gray-600"
          onClick={toggleTheme}
          style={{ boxShadow: `0 0 5px ${currentTheme.primary}` }}
        >
          {darkMode ? (
            <Sun className="h-5 w-5" style={{ color: currentTheme.primary }} />
          ) : (
            <Moon className="h-5 w-5" style={{ color: currentTheme.primary }} />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800 hover:border-gray-600"
          onClick={() => setShowThemes(!showThemes)}
          style={{ boxShadow: `0 0 5px ${currentTheme.primary}` }}
        >
          <Palette className="h-5 w-5" style={{ color: currentTheme.primary }} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800 hover:border-gray-600"
          onClick={() => setShowTutorial(true)}
          style={{ boxShadow: `0 0 5px ${currentTheme.primary}` }}
        >
          <Info className="h-5 w-5" style={{ color: currentTheme.primary }} />
        </Button>
      </div>

      {/* Social links */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <AnimatePresence>
          {showSocials && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2"
            >
              <Link href="https://github.com/oussamamahidev" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                  style={{ boxShadow: `0 0 5px ${currentTheme.secondary}` }}
                >
                  <Github className="h-5 w-5" style={{ color: currentTheme.secondary }} />
                </Button>
              </Link>
              <Link
                href="https://www.linkedin.com/in/oussama-mahi-32041b267/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                  style={{ boxShadow: `0 0 5px ${currentTheme.secondary}` }}
                >
                  <Linkedin className="h-5 w-5" style={{ color: currentTheme.secondary }} />
                </Button>
              </Link>
              <Link href="mailto:mahioussama523@gmail.com">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                  style={{ boxShadow: `0 0 5px ${currentTheme.secondary}` }}
                >
                  <Mail className="h-5 w-5" style={{ color: currentTheme.secondary }} />
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800 hover:border-gray-600"
          onClick={() => setShowSocials(!showSocials)}
          style={{ boxShadow: `0 0 5px ${currentTheme.secondary}` }}
        >
          {showSocials ? (
            <X className="h-5 w-5" style={{ color: currentTheme.secondary }} />
          ) : (
            <Heart className="h-5 w-5" style={{ color: currentTheme.secondary }} />
          )}
        </Button>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl border border-gray-700 max-w-md w-full shadow-xl"
            style={{
              boxShadow: `0 0 20px ${currentTheme.primary}40, 0 0 40px ${currentTheme.secondary}20`,
            }}
          >
            {activeSection === "about" && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    <Code className="h-5 w-5 text-black" />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: currentTheme.primary }}>
                    About Me
                  </h2>
                </div>

                <p className="text-white mb-4 leading-relaxed">
                  I am Oussama Mahi, a software engineering student and full-stack developer with a passion for building
                  innovative web applications.
                </p>

                <div className="bg-gray-800/80 p-4 rounded-lg mb-4 border border-gray-700 hover:border-gray-600 transition-colors group">
                  <h3
                    className="font-medium mb-2 group-hover:translate-x-1 transition-transform"
                    style={{ color: currentTheme.accent }}
                  >
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 group/item hover:bg-gray-800/50 p-2 rounded-lg transition-colors">
                      <div
                        className="h-8 w-8 mt-1 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${currentTheme.primary}30` }}
                      >
                        <Rocket className="h-4 w-4" style={{ color: currentTheme.primary }} />
                      </div>
                      <div>
                        <p className="text-white group-hover/item:translate-x-1 transition-transform">
                          Software Engineering and Integration of Computer Systems
                        </p>
                        <p className="text-sm text-gray-400">ENSIAS - Ongoing (2027)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group/item hover:bg-gray-800/50 p-2 rounded-lg transition-colors">
                      <div
                        className="h-8 w-8 mt-1 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${currentTheme.secondary}30` }}
                      >
                        <Zap className="h-4 w-4" style={{ color: currentTheme.secondary }} />
                      </div>
                      <div>
                        <p className="text-white group-hover/item:translate-x-1 transition-transform">
                          Bachelor in Mathematics and Computer Science
                        </p>
                        <p className="text-sm text-gray-400">Faculty of Sciences, Fez (2020-2024)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                  <h3 className="font-medium mb-2" style={{ color: currentTheme.accent }}>
                    Personal Info
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                      <div
                        className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${currentTheme.accent}30` }}
                      >
                        <MapPin className="h-3 w-3" style={{ color: currentTheme.accent }} />
                      </div>
                      <span className="text-sm text-gray-300">Fez, Morocco</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                      <div
                        className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${currentTheme.primary}30` }}
                      >
                        <Briefcase className="h-3 w-3" style={{ color: currentTheme.primary }} />
                      </div>
                      <span className="text-sm text-gray-300">Full-Stack Developer</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                      <div
                        className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${currentTheme.accent}30` }}
                      >
                        <Coffee className="h-3 w-3" style={{ color: currentTheme.accent }} />
                      </div>
                      <span className="text-sm text-gray-300">Coffee Lover</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                      <div
                        className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${currentTheme.accent}30` }}
                      >
                        <Music className="h-3 w-3" style={{ color: currentTheme.accent }} />
                      </div>
                      <span className="text-sm text-gray-300">Music Enthusiast</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "skills" && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    <BarChart3 className="h-5 w-5 text-black" />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: currentTheme.primary }}>
                    Skills
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
                    <h3
                      className="font-medium mb-3 group-hover:translate-x-1 transition-transform"
                      style={{ color: currentTheme.primary }}
                    >
                      Frontend
                    </h3>
                    <ul className="space-y-3">
                      {[
                        { name: "React.js", level: 90 },
                        { name: "Next.js", level: 85 },
                        { name: "Tailwind CSS", level: 90 },
                      ].map((skill) => (
                        <li key={skill.name} className="group/item">
                          <div className="flex justify-between mb-1">
                            <span className="text-white group-hover/item:translate-x-1 transition-transform">
                              {skill.name}
                            </span>
                            <span className="text-xs" style={{ color: currentTheme.primary }}>
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: currentTheme.primary }}
                            ></motion.div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
                    <h3
                      className="font-medium mb-3 group-hover:translate-x-1 transition-transform"
                      style={{ color: currentTheme.secondary }}
                    >
                      Backend
                    </h3>
                    <ul className="space-y-3">
                      {[
                        { name: "Spring Boot", level: 80 },
                        { name: "Node.js", level: 75 },
                        { name: "Express.js", level: 70 },
                      ].map((skill) => (
                        <li key={skill.name} className="group/item">
                          <div className="flex justify-between mb-1">
                            <span className="text-white group-hover/item:translate-x-1 transition-transform">
                              {skill.name}
                            </span>
                            <span className="text-xs" style={{ color: currentTheme.secondary }}>
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.4 }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: currentTheme.secondary }}
                            ></motion.div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
                    <h3
                      className="font-medium mb-3 group-hover:translate-x-1 transition-transform"
                      style={{ color: currentTheme.accent }}
                    >
                      Databases
                    </h3>
                    <ul className="space-y-3">
                      {[
                        { name: "MongoDB", level: 85 },
                        { name: "PostgreSQL", level: 70 },
                        { name: "MySQL", level: 75 },
                      ].map((skill) => (
                        <li key={skill.name} className="group/item">
                          <div className="flex justify-between mb-1">
                            <span className="text-white group-hover/item:translate-x-1 transition-transform">
                              {skill.name}
                            </span>
                            <span className="text-xs" style={{ color: currentTheme.accent }}>
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.6 }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: currentTheme.accent }}
                            ></motion.div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "projects" && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    <Briefcase className="h-5 w-5 text-black" />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: currentTheme.primary }}>
                    Projects
                  </h2>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/80 p-4 rounded-lg border-l-4 border-gray-700 hover:bg-gray-800/90 transition-colors"
                    style={{ borderLeftColor: currentTheme.primary }}
                  >
                    <h3 className="font-medium" style={{ color: currentTheme.primary }}>
                      E-Learning Application
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 mb-2">
                      A Learning Management System designed to enhance online education by providing features such as
                      course management, user authentication, and collaborative tools.
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {["React", "Spring Boot", "PostgreSQL"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{
                            backgroundColor: `${currentTheme.primary}20`,
                            color: currentTheme.primary,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href="#"
                        className="text-xs px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        View Demo
                      </Link>
                      <Link
                        href="#"
                        className="text-xs px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        GitHub
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/80 p-4 rounded-lg border-l-4 border-gray-700 hover:bg-gray-800/90 transition-colors"
                    style={{ borderLeftColor: currentTheme.secondary }}
                  >
                    <h3 className="font-medium" style={{ color: currentTheme.secondary }}>
                      Intra-Enterprise Collaboration
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 mb-2">
                      A web application for collaboration within companies, similar to Stack Overflow, featuring an
                      announcement system, event organization, and blogs.
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {["Next.js 14", "NextAuth", "MongoDB"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{
                            backgroundColor: `${currentTheme.secondary}20`,
                            color: currentTheme.secondary,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href="#"
                        className="text-xs px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        View Demo
                      </Link>
                      <Link
                        href="#"
                        className="text-xs px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        GitHub
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/80 p-4 rounded-lg border-l-4 border-gray-700 hover:bg-gray-800/90 transition-colors"
                    style={{ borderLeftColor: currentTheme.accent }}
                  >
                    <h3 className="font-medium" style={{ color: currentTheme.accent }}>
                      Amazon E-Commerce Clone
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 mb-2">
                      A full-stack e-commerce platform inspired by Amazon, featuring user authentication, product
                      listings, a shopping cart, and a secure checkout process.
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {["HTML", "CSS", "JavaScript", "Node.js"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{
                            backgroundColor: `${currentTheme.accent}20`,
                            color: currentTheme.accent,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href="#"
                        className="text-xs px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        View Demo
                      </Link>
                      <Link
                        href="#"
                        className="text-xs px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      >
                        GitHub
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {activeSection === "contact" && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: currentTheme.primary }}>
                    Contact Me
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    <h3 className="font-medium mb-3" style={{ color: currentTheme.accent }}>
                      Contact Information
                    </h3>
                    <ul className="space-y-3">
                      <motion.li
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${currentTheme.primary}30` }}
                        >
                          <Mail className="h-4 w-4" style={{ color: currentTheme.primary }} />
                        </div>
                        <div>
                          <p className="text-white">Email</p>
                          <Link
                            href="mailto:mahioussama523@gmail.com"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            mahioussama523@gmail.com
                          </Link>
                        </div>
                      </motion.li>
                      <motion.li
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${currentTheme.secondary}30` }}
                        >
                          <Github className="h-4 w-4" style={{ color: currentTheme.secondary }} />
                        </div>
                        <div>
                          <p className="text-white">GitHub</p>
                          <Link
                            href="https://github.com/oussamamahidev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            github.com/oussamamahidev
                          </Link>
                        </div>
                      </motion.li>
                      <motion.li
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${currentTheme.accent}30` }}
                        >
                          <Linkedin className="h-4 w-4" style={{ color: currentTheme.accent }} />
                        </div>
                        <div>
                          <p className="text-white">LinkedIn</p>
                          <Link
                            href="https://www.linkedin.com/in/oussama-mahi-32041b267/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            linkedin.com/in/oussama-mahi-32041b267
                          </Link>
                        </div>
                      </motion.li>
                    </ul>
                  </div>

                  <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    <p className="text-center text-white mb-3">Let s work together on your next project!</p>
                    <div className="flex justify-center mt-3">
                      <Link href="mailto:mahioussama523@gmail.com">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-lg text-black font-medium"
                          style={{
                            backgroundColor: currentTheme.primary,
                            boxShadow: `0 0 10px ${currentTheme.primary}`,
                          }}
                        >
                          Get In Touch
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-auto z-50"
      >
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ y: 20, opacity: 0, height: 0 }}
              animate={{ y: 0, opacity: 1, height: "auto" }}
              exit={{ y: 20, opacity: 0, height: 0 }}
              className="bg-gray-900/90 backdrop-blur-md rounded-xl p-4 flex flex-col items-center shadow-xl border border-gray-800"
              style={{
                boxShadow: `0 0 20px ${currentTheme.primary}40, 0 0 40px ${currentTheme.secondary}20`,
              }}
            >
              <div className="flex space-x-2 mb-4">
                {sections.map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSectionChange(section)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeSection === section
                        ? "text-black"
                        : "bg-gray-800 text-gray-300 hover:text-white border border-gray-700"
                    }`}
                    style={
                      activeSection === section
                        ? {
                            backgroundColor: currentTheme.primary,
                            boxShadow: `0 0 10px ${currentTheme.primary}`,
                          }
                        : {}
                    }
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.button>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(true)}
                className="mt-2 text-gray-400 hover:text-white"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-900/90 backdrop-blur-md rounded-full p-2 shadow-xl border border-gray-800 cursor-pointer hover:bg-gray-800"
              onClick={() => setIsCollapsed(false)}
              style={{
                boxShadow: `0 0 10px ${currentTheme.primary}40`,
              }}
            >
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ChevronUp className="h-4 w-4 rotate-180" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  )
}

