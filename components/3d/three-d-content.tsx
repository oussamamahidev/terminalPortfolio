"use client"

import { motion, AnimatePresence } from "framer-motion"

interface ThreeDContentProps {
  activeSection: string
  viewMode: "cube" | "projects" | "skills"
}

export default function ThreeDContent({ activeSection, viewMode }: ThreeDContentProps) {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  // Only show content overlay in cube mode
  if (viewMode !== "cube") {
    return null
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
          transition={{ duration: 0.5 }}
          className="bg-terminal-header-dark/80 backdrop-blur-md p-6 rounded-lg border border-terminal-border"
        >
          {activeSection === "about" && (
            <div>
              <h2 className="text-xl font-bold text-terminal-green mb-4">About Me</h2>
              <p className="text-terminal-text mb-3">
                I am Oussama Mahi, a software engineering student and full-stack developer with a passion for
                building innovative web applications.
              </p>
              <p className="text-terminal-text-dim">
                Currently pursuing a degree in Engineering Cycle: Data Science and Software Engineering (D2S) at the Faculty
                of Sciences and Techniques, Mohammedia.
              </p>
            </div>
          )}

          {activeSection === "skills" && (
            <div>
              <h2 className="text-xl font-bold text-terminal-green mb-4">Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-terminal-yellow mb-2">Frontend</h3>
                  <ul className="list-disc list-inside text-terminal-text-dim">
                    <li>React.js</li>
                    <li>Next.js</li>
                    <li>Tailwind CSS</li>
                    <li>HTML/CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-terminal-yellow mb-2">Backend</h3>
                  <ul className="list-disc list-inside text-terminal-text-dim">
                    <li>Spring Boot</li>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>MongoDB</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === "projects" && (
            <div>
              <h2 className="text-xl font-bold text-terminal-green mb-4">Projects</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-terminal-yellow">E-Learning Application for the SMI Platform</h3>
                  <p className="text-terminal-text-dim text-sm">
                  A Learning Management System designed to enhance online education by providing features such as course management, user authentication, and collaborative tools.
                  </p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">Intra-Enterprise Collaboration System</h3>
                  <p className="text-terminal-text-dim text-sm">
                    A web application for collaboration within companies, similar to Stack Overflow.
                  </p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">Amazon E-Commerce Clonee</h3>
                  <p className="text-terminal-text-dim text-sm">
                  A full-stack e-commerce platform inspired by Amazon, featuring user authentication, product listings, a shopping cart, and a secure checkout process.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div>
              <h2 className="text-xl font-bold text-terminal-green mb-4">Contact Me</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-terminal-yellow">Email</h3>
                  <p className="text-terminal-text-dim">mahioussama523@gmail.com</p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">GitHub</h3>
                  <p className="text-terminal-text-dim">https://github.com/oussamamahidev</p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">LinkedIn</h3>
                  <p className="text-terminal-text-dim">https://www.linkedin.com/in/oussama-mahi-32041b267/</p>
                </div>
                <div>
                  <h3 className="text-terminal-yellow">Location</h3>
                  <p className="text-terminal-text-dim">Fez, Morocco</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

