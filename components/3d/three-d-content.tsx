"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Calendar, Code, Briefcase } from "lucide-react"
import Link from "next/link"

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
          className="bg-terminal-header-dark/90 backdrop-blur-md p-6 rounded-xl border border-terminal-border shadow-xl"
        >
          {activeSection === "about" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-terminal-blue flex items-center justify-center">
                  <Code className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-xl font-bold text-terminal-blue">About Me</h2>
              </div>

              <p className="text-terminal-text-bright mb-4 leading-relaxed">
                I am Oussama Mahi, a software engineering student and full-stack developer with a passion for building
                innovative web applications.
              </p>

              <div className="bg-terminal-header p-4 rounded-lg mb-4">
                <h3 className="text-terminal-yellow font-medium mb-2">Education</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-1 text-terminal-text-dim" />
                    <div>
                      <p className="text-terminal-text-bright">
                        Software Engineering and Integration of Computer Systems
                      </p>
                      <p className="text-sm text-terminal-text-dim">ENSIAS - Ongoing (2027)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-1 text-terminal-text-dim" />
                    <div>
                      <p className="text-terminal-text-bright">Bachelor in Mathematics and Computer Science</p>
                      <p className="text-sm text-terminal-text-dim">Faculty of Sciences, Fez (2020-2024)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-terminal-header p-4 rounded-lg">
                <h3 className="text-terminal-yellow font-medium mb-2">Personal Info</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-terminal-text-dim" />
                    <span className="text-sm">Fez, Morocco</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-terminal-text-dim" />
                    <span className="text-sm">Full-Stack Developer</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "skills" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-terminal-green flex items-center justify-center">
                  <Code className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-xl font-bold text-terminal-green">Skills</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-terminal-header p-3 rounded-lg">
                  <h3 className="text-terminal-blue mb-2 font-medium">Frontend</h3>
                  <ul className="space-y-2">
                    {[
                      { name: "React.js", level: 90 },
                      { name: "Next.js", level: 85 },
                      { name: "Tailwind CSS", level: 90 },
                    ].map((skill) => (
                      <li key={skill.name} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span className="text-xs text-terminal-blue">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-terminal-bg rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-terminal-blue"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-terminal-header p-3 rounded-lg">
                  <h3 className="text-terminal-green mb-2 font-medium">Backend</h3>
                  <ul className="space-y-2">
                    {[
                      { name: "Spring Boot", level: 80 },
                      { name: "Node.js", level: 75 },
                      { name: "Express.js", level: 70 },
                    ].map((skill) => (
                      <li key={skill.name} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span className="text-xs text-terminal-green">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-terminal-bg rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-terminal-green"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-terminal-header p-3 rounded-lg">
                  <h3 className="text-terminal-yellow mb-2 font-medium">Databases</h3>
                  <ul className="space-y-2">
                    {[
                      { name: "MongoDB", level: 85 },
                      { name: "PostgreSQL", level: 70 },
                      { name: "MySQL", level: 75 },
                    ].map((skill) => (
                      <li key={skill.name} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span className="text-xs text-terminal-yellow">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-terminal-bg rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-terminal-yellow"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-terminal-header p-3 rounded-lg">
                  <h3 className="text-terminal-red mb-2 font-medium">DevOps</h3>
                  <ul className="space-y-2">
                    {[
                      { name: "Docker", level: 70 },
                      { name: "Git", level: 85 },
                      { name: "Linux", level: 75 },
                    ].map((skill) => (
                      <li key={skill.name} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span className="text-xs text-terminal-red">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-terminal-bg rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-terminal-red"
                            style={{ width: `${skill.level}%` }}
                          ></div>
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
                <div className="h-10 w-10 rounded-full bg-terminal-yellow flex items-center justify-center">
                  <Code className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-xl font-bold text-terminal-yellow">Projects</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-terminal-header p-4 rounded-lg border-l-4 border-terminal-green">
                  <h3 className="text-terminal-green font-medium">E-Learning Application</h3>
                  <p className="text-terminal-text-dim text-sm mt-1 mb-2">
                    A Learning Management System designed to enhance online education by providing features such as
                    course management, user authentication, and collaborative tools.
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {["React", "Spring Boot", "PostgreSQL", "Microservices"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-full bg-terminal-green/20 text-terminal-green"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-terminal-header p-4 rounded-lg border-l-4 border-terminal-blue">
                  <h3 className="text-terminal-blue font-medium">Intra-Enterprise Collaboration System</h3>
                  <p className="text-terminal-text-dim text-sm mt-1 mb-2">
                    A web application for collaboration within companies, similar to Stack Overflow, featuring an
                    announcement system, event organization, and blogs.
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {["Next.js 14", "NextAuth", "MongoDB"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-full bg-terminal-blue/20 text-terminal-blue"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-terminal-header p-4 rounded-lg border-l-4 border-terminal-yellow">
                  <h3 className="text-terminal-yellow font-medium">Amazon E-Commerce Clone</h3>
                  <p className="text-terminal-text-dim text-sm mt-1 mb-2">
                    A full-stack e-commerce platform inspired by Amazon, featuring user authentication, product
                    listings, a shopping cart, and a secure checkout process.
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {["HTML", "CSS", "JavaScript", "Node.js", "Express.js"].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-full bg-terminal-yellow/20 text-terminal-yellow"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-terminal-red flex items-center justify-center">
                  <Mail className="h-5 w-5 text-black" />
                </div>
                <h2 className="text-xl font-bold text-terminal-red">Contact Me</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-terminal-header p-4 rounded-lg">
                  <h3 className="text-terminal-yellow font-medium mb-2">Contact Information</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-terminal-blue" />
                      <div>
                        <p className="text-terminal-text-bright">Email</p>
                        <Link
                          href="mailto:mahioussama523@gmail.com"
                          className="text-sm text-terminal-text-dim hover:text-terminal-blue transition-colors"
                        >
                          mahioussama523@gmail.com
                        </Link>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <Github className="h-5 w-5 text-terminal-purple" />
                      <div>
                        <p className="text-terminal-text-bright">GitHub</p>
                        <Link
                          href="https://github.com/oussamamahidev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-terminal-text-dim hover:text-terminal-purple transition-colors"
                        >
                          github.com/oussamamahidev
                        </Link>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-terminal-blue" />
                      <div>
                        <p className="text-terminal-text-bright">LinkedIn</p>
                        <Link
                          href="https://www.linkedin.com/in/oussama-mahi-32041b267/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-terminal-text-dim hover:text-terminal-blue transition-colors"
                        >
                          linkedin.com/in/oussama-mahi-32041b267
                        </Link>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-terminal-red" />
                      <div>
                        <p className="text-terminal-text-bright">Location</p>
                        <p className="text-sm text-terminal-text-dim">Fez, Morocco</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-terminal-header p-4 rounded-lg">
                  <p className="text-center text-terminal-text-bright">Lets work together on your next project!</p>
                  <div className="flex justify-center mt-3">
                    <Link href="mailto:mahioussama523@gmail.com">
                      <button className="px-4 py-2 bg-terminal-red text-white rounded-lg hover:bg-terminal-red/80 transition-colors">
                        Get In Touch
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

