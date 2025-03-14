"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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
  ChevronDown,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import ThreeDBackgroundLite from "./three-d-background-lite";
import ThreeDSkillsLite from "./three-d-skills-lite";
import ThreeDProjectsLite from "./three-d-projects-lite";
import { useMobile } from "@/hooks/use-mobile";
import Image from "next/image";

export default function ThreeDPortfolioLite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTheme, setActiveTheme] = useState<
    "terminal" | "cyber" | "neon" | "retro"
  >("terminal");
  const [showThemes, setShowThemes] = useState(false);
  const [animateBackground, setAnimateBackground] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isMobile = useMobile();

  const sections = ["about", "skills", "projects", "contact"];

  const themes = {
    terminal: {
      primary: darkMode ? "var(--terminal-blue)" : "#1a73e8",
      secondary: darkMode ? "var(--terminal-green)" : "#34a853",
      accent: darkMode ? "var(--terminal-yellow)" : "#fbbc05",
      danger: darkMode ? "var(--terminal-red)" : "#ea4335",
      bg: darkMode
        ? "from-terminal-header-dark to-terminal-bg"
        : "from-gray-100 to-white",
      text: darkMode ? "text-terminal-text" : "text-gray-800",
      cardBg: darkMode ? "bg-terminal-header-light/30" : "bg-white",
      border: darkMode ? "border-terminal-border" : "border-gray-200",
      navBg: darkMode ? "bg-terminal-header/90" : "bg-white/90",
      controlBg: darkMode ? "bg-terminal-header/80" : "bg-white/80",
      hoverBg: darkMode
        ? "hover:bg-terminal-header-light"
        : "hover:bg-gray-100",
      textDim: darkMode ? "text-terminal-text-dim" : "text-gray-500",
      textBright: darkMode ? "text-terminal-text-bright" : "text-gray-900",
    },
    cyber: {
      primary: "#0ff",
      secondary: "#f0f",
      accent: "#ff0",
      danger: "#ff3860",
      bg: darkMode
        ? "from-blue-950 to-purple-950"
        : "from-blue-100 to-purple-100",
      text: darkMode ? "text-cyan-300" : "text-blue-900",
      cardBg: darkMode ? "bg-blue-900/30" : "bg-white",
      border: darkMode ? "border-blue-800" : "border-blue-200",
      navBg: darkMode ? "bg-blue-950/90" : "bg-white/90",
      controlBg: darkMode ? "bg-blue-900/80" : "bg-white/80",
      hoverBg: darkMode ? "hover:bg-blue-800" : "hover:bg-blue-50",
      textDim: darkMode ? "text-blue-400" : "text-blue-600",
      textBright: darkMode ? "text-cyan-300" : "text-blue-900",
    },
    neon: {
      primary: "#0f0",
      secondary: "#f0f",
      accent: "#ff0",
      danger: "#ff3860",
      bg: darkMode ? "from-gray-950 to-black" : "from-gray-100 to-white",
      text: darkMode ? "text-green-400" : "text-green-800",
      cardBg: darkMode ? "bg-gray-900/30" : "bg-white",
      border: darkMode ? "border-gray-800" : "border-gray-200",
      navBg: darkMode ? "bg-black/90" : "bg-white/90",
      controlBg: darkMode ? "bg-gray-900/80" : "bg-white/80",
      hoverBg: darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50",
      textDim: darkMode ? "text-green-600" : "text-green-600",
      textBright: darkMode ? "text-green-400" : "text-green-800",
    },
    retro: {
      primary: "#ff6b6b",
      secondary: "#4ecdc4",
      accent: "#ffd166",
      danger: "#ff3860",
      bg: darkMode
        ? "from-indigo-900 to-purple-900"
        : "from-orange-100 to-yellow-100",
      text: darkMode ? "text-orange-400" : "text-orange-900",
      cardBg: darkMode ? "bg-indigo-900/30" : "bg-white",
      border: darkMode ? "border-indigo-800" : "border-orange-200",
      navBg: darkMode ? "bg-indigo-950/90" : "bg-white/90",
      controlBg: darkMode ? "bg-indigo-900/80" : "bg-white/80",
      hoverBg: darkMode ? "hover:bg-indigo-800" : "hover:bg-orange-50",
      textDim: darkMode ? "text-indigo-400" : "text-orange-600",
      textBright: darkMode ? "text-orange-400" : "text-orange-900",
    },
  };

  const currentTheme = themes[activeTheme];

  // Project data with images
  const projects = [
    {
      id: 1,
      title: "E-Learning Application",
      description:
        "A comprehensive Learning Management System designed to enhance online education with features like course management, user authentication, and collaborative tools.",
      technologies: ["React", "Spring Boot", "PostgreSQL", "Microservices"],
      image: "/lms.png",
      color:
        activeTheme === "terminal"
          ? darkMode
            ? "var(--terminal-red)"
            : "#ea4335"
          : themes[activeTheme].danger,
      github: "https://github.com/oussamamahidev/LMSMicroservices",
      demo: "google.com",
    },
    {
      id: 2,
      title: "Intra-Enterprise Collaboration",
      description:
        "A web application for collaboration within companies, similar to Stack Overflow, featuring an announcement system, event organization, and blogs.",
      technologies: ["Next.js 14", "NextAuth", "MongoDB", "Tailwind CSS"],
      image: "/stackoverflow.png?height=300&width=600",
      color:
        activeTheme === "terminal"
          ? darkMode
            ? "var(--terminal-blue)"
            : "#1a73e8"
          : themes[activeTheme].primary,
      github: "https://github.com/oussamamahidev/stack_overflow",
      demo: "https://stack-overflow-unss.vercel.app/",
    },
    {
      id: 3,
      title: "Amazon E-Commerce Clone",
      description:
        "A full-stack e-commerce platform inspired by Amazon, featuring user authentication, product listings, a shopping cart, and a secure checkout process.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
      image: "/amazon.png?height=300&width=600",
      color:
        activeTheme === "terminal"
          ? darkMode
            ? "var(--terminal-green)"
            : "#34a853"
          : themes[activeTheme].secondary,
      github: "https://github.com/oussamamahidev/amazon",
      demo: "https://amazon-clone-demo.vercel.app",
    },
  ];

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowScrollTop(contentRef.current.scrollTop > 200);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      return () => contentElement.removeEventListener("scroll", handleScroll);
    }
  }, [activeSection]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Reset scroll position when changing sections
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    // Add some haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // Add some haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const changeTheme = (theme: "terminal" | "cyber" | "neon" | "retro") => {
    setActiveTheme(theme);
    setShowThemes(false);
    // Add some haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-screen overflow-hidden relative bg-gradient-to-b ${currentTheme.bg} transition-colors duration-500`}
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
                    i % 3 === 0
                      ? currentTheme.primary
                      : i % 3 === 1
                      ? currentTheme.secondary
                      : currentTheme.accent,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${
                    Math.random() * 10 + 10
                  }s linear infinite`,
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
            className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${currentTheme.cardBg} backdrop-blur-md p-6 md:p-8 rounded-xl ${currentTheme.border} max-w-md md:max-w-2xl relative shadow-2xl mx-auto my-4`}
              style={{
                boxShadow: `0 0 20px ${currentTheme.primary}, 0 0 40px ${currentTheme.secondary}`,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 ${currentTheme.textDim} ${currentTheme.hoverBg}`}
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
                <h2
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: currentTheme.primary }}
                >
                  Welcome to My Interactive Portfolio
                </h2>
              </div>

              <div className="space-y-4">
                <p className={`${currentTheme.textBright}`}>
                  This is a fun, modern and interactive version of my portfolio
                  with cool features:
                </p>

                <div className="space-y-2">
                  <h3
                    className="font-bold flex items-center gap-2"
                    style={{ color: currentTheme.accent }}
                  >
                    <span
                      className="inline-flex h-6 w-6 rounded-full items-center justify-center text-sm"
                      style={{ backgroundColor: `${currentTheme.accent}30` }}
                    >
                      <Zap
                        className="h-4 w-4"
                        style={{ color: currentTheme.accent }}
                      />
                    </span>
                    Cool Features
                  </h3>
                  <ul
                    className={`list-disc list-inside space-y-1 ${currentTheme.textDim} ml-8`}
                  >
                    <li>Theme switcher - Try different color schemes!</li>
                    <li>Dark/Light mode toggle</li>
                    <li>Interactive 3D backgrounds for each section</li>
                    <li>Animated UI elements and transitions</li>
                    <li>Responsive design for all devices</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3
                    className="font-bold flex items-center gap-2"
                    style={{ color: currentTheme.secondary }}
                  >
                    <span
                      className="inline-flex h-6 w-6 rounded-full items-center justify-center text-sm"
                      style={{ backgroundColor: `${currentTheme.secondary}30` }}
                    >
                      <Rocket
                        className="h-4 w-4"
                        style={{ color: currentTheme.secondary }}
                      />
                    </span>
                    Navigation
                  </h3>
                  <ul
                    className={`list-disc list-inside space-y-1 ${currentTheme.textDim} ml-8`}
                  >
                    <li>Use the fun navigation bar at the bottom</li>
                    <li>Each section has unique interactive elements</li>
                    <li>Try the theme switcher in the top-right corner</li>
                    <li>Toggle dark/light mode for different vibes</li>
                    <li>Scroll through content when it exceeds the screen</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  className="px-6 py-2 md:px-8 md:py-6 rounded-xl font-bold text-base md:text-lg text-black"
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
                className={`${currentTheme.controlBg} backdrop-blur-sm border-terminal-blue ${currentTheme.hoverBg}`}
                onClick={() => changeTheme("terminal")}
                style={{
                  boxShadow:
                    activeTheme === "terminal"
                      ? "0 0 10px var(--terminal-blue)"
                      : "none",
                }}
              >
                <span className="w-4 h-4 rounded-full bg-terminal-blue" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`${currentTheme.controlBg} backdrop-blur-sm border-cyan-500 ${currentTheme.hoverBg}`}
                onClick={() => changeTheme("cyber")}
                style={{
                  boxShadow: activeTheme === "cyber" ? "0 0 10px #0ff" : "none",
                }}
              >
                <span className="w-4 h-4 rounded-full bg-cyan-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`${currentTheme.controlBg} backdrop-blur-sm border-green-500 ${currentTheme.hoverBg}`}
                onClick={() => changeTheme("neon")}
                style={{
                  boxShadow: activeTheme === "neon" ? "0 0 10px #0f0" : "none",
                }}
              >
                <span className="w-4 h-4 rounded-full bg-green-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`${currentTheme.controlBg} backdrop-blur-sm border-orange-500 ${currentTheme.hoverBg}`}
                onClick={() => changeTheme("retro")}
                style={{
                  boxShadow:
                    activeTheme === "retro" ? "0 0 10px #ff6b6b" : "none",
                }}
              >
                <span className="w-4 h-4 rounded-full bg-orange-400" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          size="icon"
          className={`${currentTheme.controlBg} backdrop-blur-sm ${currentTheme.border} ${currentTheme.hoverBg}`}
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
          className={`${currentTheme.controlBg} backdrop-blur-sm ${currentTheme.border} ${currentTheme.hoverBg}`}
          onClick={() => setShowThemes(!showThemes)}
          style={{ boxShadow: `0 0 5px ${currentTheme.primary}` }}
        >
          <Palette
            className="h-5 w-5"
            style={{ color: currentTheme.primary }}
          />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={`${currentTheme.controlBg} backdrop-blur-sm ${currentTheme.border} ${currentTheme.hoverBg}`}
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
              <Link
                href="https://github.com/oussamamahidev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className={`${currentTheme.controlBg} backdrop-blur-sm ${currentTheme.border} ${currentTheme.hoverBg}`}
                  style={{ boxShadow: `0 0 5px ${currentTheme.secondary}` }}
                >
                  <Github
                    className="h-5 w-5"
                    style={{ color: currentTheme.secondary }}
                  />
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
                  className={`${currentTheme.controlBg} backdrop-blur-sm ${currentTheme.border} ${currentTheme.hoverBg}`}
                  style={{ boxShadow: `0 0 5px ${currentTheme.secondary}` }}
                >
                  <Linkedin
                    className="h-5 w-5"
                    style={{ color: currentTheme.secondary }}
                  />
                </Button>
              </Link>
              <Link href="mailto:mahioussama523@gmail.com">
                <Button
                  variant="outline"
                  size="icon"
                  className={`${currentTheme.controlBg} backdrop-blur-sm ${currentTheme.border} ${currentTheme.hoverBg}`}
                  style={{ boxShadow: `0 0 5px ${currentTheme.secondary}` }}
                >
                  <Mail
                    className="h-5 w-5"
                    style={{ color: currentTheme.secondary }}
                  />
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          size="icon"
          className={`${currentTheme.controlBg} backdrop-blur-sm ${currentTheme.border} ${currentTheme.hoverBg}`}
          onClick={() => setShowSocials(!showSocials)}
          style={{ boxShadow: `0 0 5px ${currentTheme.secondary}` }}
        >
          {showSocials ? (
            <X className="h-5 w-5" style={{ color: currentTheme.secondary }} />
          ) : (
            <Heart
              className="h-5 w-5"
              style={{ color: currentTheme.secondary }}
            />
          )}
        </Button>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 z-30"
          >
            <Button
              variant="outline"
              size="icon"
              className={`${currentTheme.controlBg} backdrop-blur-sm ${currentTheme.border} ${currentTheme.hoverBg} rounded-full`}
              onClick={scrollToTop}
              style={{ boxShadow: `0 0 5px ${currentTheme.primary}` }}
            >
              <ArrowUp
                className="h-5 w-5"
                style={{ color: currentTheme.primary }}
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - Now with scrolling */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`${currentTheme.cardBg} backdrop-blur-md rounded-xl ${currentTheme.border} w-full max-w-md md:max-w-lg lg:max-w-xl shadow-xl pointer-events-auto max-h-[70vh] md:max-h-[75vh] flex flex-col`}
            style={{
              boxShadow: `0 0 20px ${currentTheme.primary}40, 0 0 40px ${currentTheme.secondary}20`,
            }}
          >
            {/* Section header - fixed */}
            <div
              className={`p-4 md:p-6 border-b ${currentTheme.border} flex items-center gap-3`}
            >
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentTheme.primary }}
              >
                {activeSection === "about" && (
                  <Code className="h-5 w-5 text-black" />
                )}
                {activeSection === "skills" && (
                  <BarChart3 className="h-5 w-5 text-black" />
                )}
                {activeSection === "projects" && (
                  <Briefcase className="h-5 w-5 text-black" />
                )}
                {activeSection === "contact" && (
                  <Mail className="h-5 w-5 text-black" />
                )}
              </div>
              <h2
                className="text-xl font-bold"
                style={{ color: currentTheme.primary }}
              >
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h2>

              {/* Scroll indicator */}
              <div className="ml-auto">
                <ChevronDown
                  className="h-5 w-5 animate-bounce"
                  style={{ color: currentTheme.primary }}
                />
              </div>
            </div>

            {/* Scrollable content */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 pt-2 md:pt-4 scrollbar-hide"
            >
              {activeSection === "about" && (
                <div className="space-y-4">
                  <p
                    className={`${currentTheme.textBright} mb-4 leading-relaxed`}
                  >
                    I am Oussama Mahi, a software engineering student and
                    full-stack developer with a passion for building innovative
                    web applications.
                  </p>

                  <div
                    className={`${currentTheme.cardBg} p-4 rounded-lg mb-4 ${currentTheme.border} hover:border-blue-400 transition-colors group`}
                  >
                    <h3
                      className="font-medium mb-2 group-hover:translate-x-1 transition-transform"
                      style={{ color: currentTheme.accent }}
                    >
                      Education
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 group/item hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <div
                          className="h-8 w-8 mt-1 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTheme.primary}30`,
                          }}
                        >
                          <Rocket
                            className="h-4 w-4"
                            style={{ color: currentTheme.primary }}
                          />
                        </div>
                        <div>
                          <p
                            className={`${currentTheme.textBright} group-hover/item:translate-x-1 transition-transform`}
                          >
                            Software Engineering and Integration of Computer
                            Systems
                          </p>
                          <p className={`text-sm ${currentTheme.textDim}`}>
                            ENSIAS - Ongoing (2027)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 group/item hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <div
                          className="h-8 w-8 mt-1 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTheme.secondary}30`,
                          }}
                        >
                          <Zap
                            className="h-4 w-4"
                            style={{ color: currentTheme.secondary }}
                          />
                        </div>
                        <div>
                          <p
                            className={`${currentTheme.textBright} group-hover/item:translate-x-1 transition-transform`}
                          >
                            Bachelor in Mathematics and Computer Science
                          </p>
                          <p className={`text-sm ${currentTheme.textDim}`}>
                            Faculty of Sciences, Fez (2020-2024)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${currentTheme.cardBg} p-4 rounded-lg ${currentTheme.border} hover:border-blue-400 transition-colors`}
                  >
                    <h3
                      className="font-medium mb-2"
                      style={{ color: currentTheme.accent }}
                    >
                      Personal Info
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className={`flex items-center gap-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg ${currentTheme.hoverBg} transition-colors`}
                      >
                        <div
                          className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTheme.accent}30`,
                          }}
                        >
                          <MapPin
                            className="h-3 w-3"
                            style={{ color: currentTheme.accent }}
                          />
                        </div>
                        <span className={`text-sm ${currentTheme.text}`}>
                          Fez, Morocco
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg ${currentTheme.hoverBg} transition-colors`}
                      >
                        <div
                          className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTheme.primary}30`,
                          }}
                        >
                          <Briefcase
                            className="h-3 w-3"
                            style={{ color: currentTheme.primary }}
                          />
                        </div>
                        <span className={`text-sm ${currentTheme.text}`}>
                          Full-Stack Developer
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg ${currentTheme.hoverBg} transition-colors`}
                      >
                        <div
                          className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTheme.accent}30`,
                          }}
                        >
                          <Coffee
                            className="h-3 w-3"
                            style={{ color: currentTheme.accent }}
                          />
                        </div>
                        <span className={`text-sm ${currentTheme.text}`}>
                          Coffee Lover
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg ${currentTheme.hoverBg} transition-colors`}
                      >
                        <div
                          className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTheme.accent}30`,
                          }}
                        >
                          <Music
                            className="h-3 w-3"
                            style={{ color: currentTheme.accent }}
                          />
                        </div>
                        <span className={`text-sm ${currentTheme.text}`}>
                          Music Enthusiast
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "skills" && (
                <div className="space-y-4">
                  <div
                    className={`${currentTheme.cardBg} p-4 rounded-lg ${currentTheme.border} hover:border-blue-400 transition-colors group`}
                  >
                    <h3
                      className="font-medium mb-3 group-hover:translate-x-1 transition-transform"
                      style={{ color: currentTheme.primary }}
                    >
                      Frontend
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { name: "React.js", level: 90 },
                        { name: "Next.js", level: 85 },
                        { name: "Tailwind CSS", level: 90 },
                        { name: "HTML/CSS", level: 95 },
                        { name: "JavaScript", level: 90 },
                        { name: "TypeScript", level: 80 },
                      ].map((skill) => (
                        <div key={skill.name} className="group/item">
                          <div className="flex justify-between mb-1">
                            <span
                              className={`${currentTheme.textBright} group-hover/item:translate-x-1 transition-transform text-sm`}
                            >
                              {skill.name}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: currentTheme.primary }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: currentTheme.primary }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`${currentTheme.cardBg} p-4 rounded-lg ${currentTheme.border} hover:border-blue-400 transition-colors group`}
                  >
                    <h3
                      className="font-medium mb-3 group-hover:translate-x-1 transition-transform"
                      style={{ color: currentTheme.secondary }}
                    >
                      Backend
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { name: "Spring Boot", level: 80 },
                        { name: "Node.js", level: 75 },
                        { name: "Express.js", level: 70 },
                        { name: "PHP", level: 60 },
                        { name: "Python", level: 65 },
                        { name: "GraphQL", level: 60 },
                      ].map((skill) => (
                        <div key={skill.name} className="group/item">
                          <div className="flex justify-between mb-1">
                            <span
                              className={`${currentTheme.textBright} group-hover/item:translate-x-1 transition-transform text-sm`}
                            >
                              {skill.name}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: currentTheme.secondary }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.4 }}
                              className="h-2 rounded-full"
                              style={{
                                backgroundColor: currentTheme.secondary,
                              }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`${currentTheme.cardBg} p-4 rounded-lg ${currentTheme.border} hover:border-blue-400 transition-colors group`}
                  >
                    <h3
                      className="font-medium mb-3 group-hover:translate-x-1 transition-transform"
                      style={{ color: currentTheme.accent }}
                    >
                      Databases & DevOps
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { name: "MongoDB", level: 85 },
                        { name: "PostgreSQL", level: 70 },
                        { name: "MySQL", level: 75 },
                        { name: "Docker", level: 70 },
                        { name: "Git", level: 85 },
                        { name: "Linux", level: 75 },
                      ].map((skill) => (
                        <div key={skill.name} className="group/item">
                          <div className="flex justify-between mb-1">
                            <span
                              className={`${currentTheme.textBright} group-hover/item:translate-x-1 transition-transform text-sm`}
                            >
                              {skill.name}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: currentTheme.accent }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.6 }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: currentTheme.accent }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "projects" && (
                <div className="space-y-6">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.02 }}
                      className={`${currentTheme.cardBg} p-4 rounded-lg border-l-4 ${currentTheme.hoverBg} transition-colors`}
                      style={{ borderLeftColor: project.color }}
                    >
                      <h3
                        className="font-medium text-lg mb-2"
                        style={{ color: project.color }}
                      >
                        {project.title}
                      </h3>

                      {/* Project image with proper aspect ratio */}
                      <div className="mt-2 mb-3 rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 aspect-video relative">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <p
                        className={`${currentTheme.textDim} text-sm mt-1 mb-3`}
                      >
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2 mb-3">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded-full"
                            style={{
                              backgroundColor: `${project.color}20`,
                              color: project.color,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                          style={{ color: project.color }}
                        >
                          View Demo
                        </Link>
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors flex items-center gap-1"
                          style={{ color: project.color }}
                        >
                          <Github className="h-3 w-3" /> GitHub
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeSection === "contact" && (
                <div className="space-y-4">
                  <div
                    className={`${currentTheme.cardBg} p-4 rounded-lg ${currentTheme.border} hover:border-blue-400 transition-colors`}
                  >
                    <h3
                      className="font-medium mb-3"
                      style={{ color: currentTheme.accent }}
                    >
                      Contact Information
                    </h3>
                    <ul className="space-y-3">
                      <motion.li
                        whileHover={{ x: 5 }}
                        className={`flex items-center gap-3 bg-black/5 dark:bg-white/5 p-3 rounded-lg ${currentTheme.hoverBg} transition-colors`}
                      >
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTheme.primary}30`,
                          }}
                        >
                          <Mail
                            className="h-4 w-4"
                            style={{ color: currentTheme.primary }}
                          />
                        </div>
                        <div>
                          <p className={currentTheme.textBright}>Email</p>
                          <Link
                            href="mailto:mahioussama523@gmail.com"
                            className={`text-sm ${currentTheme.textDim} hover:${currentTheme.textBright} transition-colors`}
                          >
                            mahioussama523@gmail.com
                          </Link>
                        </div>
                      </motion.li>
                      <motion.li
                        whileHover={{ x: 5 }}
                        className={`flex items-center gap-3 bg-black/5 dark:bg-white/5 p-3 rounded-lg ${currentTheme.hoverBg} transition-colors`}
                      >
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTheme.secondary}30`,
                          }}
                        >
                          <Github
                            className="h-4 w-4"
                            style={{ color: currentTheme.secondary }}
                          />
                        </div>
                        <div>
                          <p className={currentTheme.textBright}>GitHub</p>
                          <Link
                            href="https://github.com/oussamamahidev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${currentTheme.textDim} hover:${currentTheme.textBright} transition-colors`}
                          >
                            github.com/oussamamahidev
                          </Link>
                        </div>
                      </motion.li>
                      <motion.li
                        whileHover={{ x: 5 }}
                        className={`flex items-center gap-3 bg-black/5 dark:bg-white/5 p-3 rounded-lg ${currentTheme.hoverBg} transition-colors`}
                      >
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${currentTheme.accent}30`,
                          }}
                        >
                          <Linkedin
                            className="h-4 w-4"
                            style={{ color: currentTheme.accent }}
                          />
                        </div>
                        <div>
                          <p className={currentTheme.textBright}>LinkedIn</p>
                          <Link
                            href="https://www.linkedin.com/in/oussama-mahi-32041b267/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${currentTheme.textDim} hover:${currentTheme.textBright} transition-colors`}
                          >
                            linkedin.com/in/oussama-mahi-32041b267
                          </Link>
                        </div>
                      </motion.li>
                    </ul>
                  </div>

                  <div
                    className={`${currentTheme.cardBg} p-4 rounded-lg ${currentTheme.border} hover:border-blue-400 transition-colors`}
                  >
                    <p
                      className={`text-center ${currentTheme.textBright} mb-3`}
                    >
                      Let s work together on your next project!
                    </p>
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
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-4 md:bottom-8 left-0 right-0 flex flex-col items-center pointer-events-auto z-50"
      >
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ y: 20, opacity: 0, height: 0 }}
              animate={{ y: 0, opacity: 1, height: "auto" }}
              exit={{ y: 20, opacity: 0, height: 0 }}
              className={`${currentTheme.navBg} backdrop-blur-md rounded-xl p-3 md:p-4 flex flex-col items-center shadow-xl ${currentTheme.border}`}
              style={{
                boxShadow: `0 0 20px ${currentTheme.primary}40, 0 0 40px ${currentTheme.secondary}20`,
              }}
            >
              <div className="flex space-x-1 md:space-x-2 mb-2 md:mb-4">
                {sections.map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSectionChange(section)}
                    className={`px-3 md:px-6 py-1.5 md:py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
                      activeSection === section
                        ? "text-black"
                        : `${currentTheme.cardBg} ${currentTheme.text} ${currentTheme.hoverBg} border ${currentTheme.border}`
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
                className={`mt-1 ${currentTheme.textDim} ${currentTheme.hoverBg}`}
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
              className={`${currentTheme.navBg} backdrop-blur-md rounded-full p-2 shadow-xl ${currentTheme.border} cursor-pointer ${currentTheme.hoverBg}`}
              onClick={() => setIsCollapsed(false)}
              style={{
                boxShadow: `0 0 10px ${currentTheme.primary}40`,
              }}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`${currentTheme.textDim} hover:${currentTheme.textBright}`}
              >
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

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
