"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CodeBlock } from "../syntax-highlight";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("personal");

  const tabContent = {
    personal: `
/**
 * Personal Background
 * ------------------
 * I'm a software engineering student with a passion for building
 * efficient and reliable web applications. I enjoy tackling complex
 * problems and finding elegant solutions.
 * 
 * Outside of coding, I'm interested in:
 * - Computer Science
 * - Sports
 * - Poetry
 * - Novels
 */
`,
    education: `
/**
 * Education
 * ---------
 * Current:
 * - Program: Engineering Cycle: Data Science and Software Engineering (D2S)
 * - Institution: National Superior School of Computer Science and Systems Analysis (ENSIAS)
 * - Expected Graduation: 2027
 * 
 * Previous:
 * - Degree: Bachelor in Mathematics and Computer Science
 * - Institution: Faculty of Sciences, Fez
 * - Period: September 2020 - June 2024
 * - Grade: A
 */
`,
    experience: `
/**
 * Professional Experience
 * ----------------------
 * 
 * En cours
 */
`,
  };

  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-terminal-purple">About Me</h2>

      <div className="flex border-b border-terminal-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 mr-2 font-mono text-sm focus:outline-none ${
              activeTab === tab.id
                ? "text-terminal-yellow border-b-2 border-terminal-yellow"
                : "text-terminal-text-dim hover:text-terminal-text"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CodeBlock language="javascript" showLineNumbers={false}>
          {tabContent[activeTab as keyof typeof tabContent]}
        </CodeBlock>
      </motion.div>

      <div className="mt-4 border border-terminal-border rounded p-4 bg-terminal-code/30">
        <p className="text-terminal-text">
          Hello! I am Oussama Mahi, a passionate Software Engineer specializing
          in Backend Development. Currently, I am pursuing my engineering degree
          at ENSIAS, focusing on Data Science and Software Engineering (D2S).
          With a strong foundation in Mathematics and Computer Science, I thrive
          on solving complex problems and building efficient, scalable
          applications. I have experience working with Spring Boot, Node.js, and
          Next.js, and I am deeply interested in Cloud Computing, Microservices,
          and DevOps. My current focus is mastering CI/CD pipelines with
          Jenkins, Nexus, and Kubernetes, ensuring smooth and automated
          deployments. Beyond coding, I enjoy exploring new technologies,
          working on innovative projects, and continuously learning to refine my
          skills. Check out my portfolio to see my latest projects! Let’s
          connect and build something amazing together! 🚀
        </p>
        <p className="mt-2 text-terminal-text-dim">
          Type <span className="text-terminal-yellow">skills</span> to learn
          about my technical abilities.
        </p>
      </div>
    </div>
  );
}
