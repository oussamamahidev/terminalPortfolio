"use client";

import { useEffect, useRef, useState } from "react";
import ThreeDControls from "./three-d-controls";
import ThreeDContent from "./three-d-content";
import ThreeDProjectsShowcase from "./three-d-projects";
import ThreeDSkillsVisualization from "./three-d-skills-visualization";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Info, X, Github, Linkedin, Mail, Download } from "lucide-react";
import Link from "next/link";
import ThreeDScene from "./three-d-scence";

export default function ThreeDPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [isRotating, setIsRotating] = useState(true);
  const [viewMode, setViewMode] = useState<"cube" | "projects" | "skills">(
    "cube"
  );
  const [showTutorial, setShowTutorial] = useState(true);
  const [showSocials, setShowSocials] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sections = ["about", "skills", "projects", "contact"];

  useEffect(() => {
    // Auto-rotate through sections every 10 seconds if auto-rotation is enabled
    if (isRotating && viewMode === "cube") {
      const interval = setInterval(() => {
        const currentIndex = sections.indexOf(activeSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        setActiveSection(sections[nextIndex]);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [activeSection, isRotating, sections, viewMode]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);

    // If changing to projects or skills section and in cube mode,
    // consider switching to the dedicated view
    if (section === "projects" && viewMode === "cube") {
      setViewMode("projects");
    } else if (section === "skills" && viewMode === "cube") {
      setViewMode("skills");
    }
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  const handleViewModeChange = (mode: "cube" | "projects" | "skills") => {
    setViewMode(mode);

    // When switching to cube mode, set the active section accordingly
    if (mode === "cube") {
      if (viewMode === "projects") {
        setActiveSection("projects");
      } else if (viewMode === "skills") {
        setActiveSection("skills");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden relative bg-gradient-to-b from-terminal-bg to-terminal-header-dark"
    >
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
              className="bg-terminal-header-dark/90 backdrop-blur-md p-8 rounded-xl border border-terminal-border max-w-2xl relative shadow-2xl"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-terminal-text-dim hover:text-terminal-text"
                onClick={() => setShowTutorial(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-terminal-green flex items-center justify-center">
                  <Info className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-2xl font-bold text-terminal-green">
                  Welcome to 3D Portfolio
                </h2>
              </div>

              <div className="space-y-4 text-terminal-text">
                <p className="text-terminal-text-bright">
                  Navigate this immersive 3D experience to explore my portfolio:
                </p>

                <div className="space-y-2">
                  <h3 className="text-terminal-yellow font-bold flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 rounded-full bg-terminal-yellow/20 items-center justify-center text-sm">
                      1
                    </span>
                    Controls
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-terminal-text-dim ml-8">
                    <li>Drag to rotate the view</li>
                    <li>Scroll to zoom in/out</li>
                    <li>Click on sections to focus</li>
                    <li>Use the control panel at the bottom to navigate</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-terminal-blue font-bold flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 rounded-full bg-terminal-blue/20 items-center justify-center text-sm">
                      2
                    </span>
                    View Modes
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-terminal-text-dim ml-8">
                    <li>
                      <span className="text-terminal-blue">Cube View</span>:
                      Rotate between different sections
                    </li>
                    <li>
                      <span className="text-terminal-green">
                        Projects Gallery
                      </span>
                      : Interactive 3D showcase of my projects
                    </li>
                    <li>
                      <span className="text-terminal-purple">
                        Skills Visualization
                      </span>
                      : 3D representation of my skills
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-terminal-green font-bold flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 rounded-full bg-terminal-green/20 items-center justify-center text-sm">
                      3
                    </span>
                    Tips
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-terminal-text-dim ml-8">
                    <li>Click on project cards to see more details</li>
                    <li>Toggle auto-rotation for a guided tour</li>
                    <li>Press ESC to return to the main cube view</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  className="bg-terminal-green text-black hover:bg-terminal-green/90 px-8 py-6 rounded-xl font-bold text-lg"
                  onClick={() => setShowTutorial(false)}
                >
                  Start Exploring
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social links */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <AnimatePresence>
          {showSocials && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
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
                  className="bg-terminal-header-dark/80 backdrop-blur-sm hover:bg-terminal-header hover:text-terminal-green"
                >
                  <Github className="h-5 w-5" />
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
                  className="bg-terminal-header-dark/80 backdrop-blur-sm hover:bg-terminal-header hover:text-terminal-blue"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:mahioussama523@gmail.com">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-terminal-header-dark/80 backdrop-blur-sm hover:bg-terminal-header hover:text-terminal-yellow"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-terminal-header-dark/80 backdrop-blur-sm hover:bg-terminal-header hover:text-terminal-red"
                >
                  <Download className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          size="icon"
          className="bg-terminal-header-dark/80 backdrop-blur-sm hover:bg-terminal-header"
          onClick={() => setShowSocials(!showSocials)}
        >
          {showSocials ? (
            <X className="h-5 w-5" />
          ) : (
            <Info className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Help button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 left-4 z-10 bg-terminal-header-dark/80 backdrop-blur-sm hover:bg-terminal-header"
        onClick={() => setShowTutorial(true)}
      >
        <Info className="h-5 w-5" />
      </Button>

      {/* Main 3D content */}
      {viewMode === "cube" && (
        <ThreeDScene activeSection={activeSection} isRotating={isRotating} />
      )}

      {viewMode === "projects" && <ThreeDProjectsShowcase />}

      {viewMode === "skills" && <ThreeDSkillsVisualization />}

      {/* Overlay content */}
      <div className="absolute inset-0 pointer-events-none">
        <ThreeDContent activeSection={activeSection} viewMode={viewMode} />
      </div>

      {/* Controls */}
      <ThreeDControls
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isRotating={isRotating}
        onToggleRotation={toggleRotation}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />
    </div>
  );
}
