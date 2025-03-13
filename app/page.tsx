import Terminal from "@/components/terminal/terminal"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Oussama Mahi | Software Engineer & Developer Portfolio",
  description:
  "Oussama Mahi is a passionate software engineering student with a strong interest in building real-world applications and solving complex problems. He has experience in full-stack development, DevOps, and system architecture, with a focus on creating efficient and scalable solutions. Always eager to learn and grow, oussama enjoys exploring new technologies and sharing knowledge with others.",
  alternates: {
    canonical: "https://oussamamahi.me",
  },
}

export default function Home() {
    // Prepare JSON-LD schema data for personal portfolio
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: "Oussama Mahi - Software Engineer Portfolio",
      dateCreated: "2025-03-01T00:00:00Z", 
      dateModified: new Date().toISOString(),
      mainEntity: {
        "@type": "Person",
        name: "Oussama Mahi",
        url: "https://oussamamahi.me",
        image: "/oussama.jpeg",
        sameAs: [
          "https://github.com/oussamamahi",
          "https://www.https://www.linkedin.com/in/oussama-mahi-32041b267//",
        ],
        jobTitle: "Software Engineer",
        description:
        "Oussama Mahi is a passionate software engineering student with a strong interest in building real-world applications and solving complex problems. He has experience in full-stack development, DevOps, and system architecture, with a focus on creating efficient and scalable solutions. Always eager to learn and grow, oussama enjoys exploring new technologies and sharing knowledge with others.",
        knowsAbout: ["JavaScript", "React", "Next.js", "TypeScript", "Web Development", "Terminal Applications"],
        nationality: "Moroccan",
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: "Morocco",
          },
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "faculty of science and technology Mohammedia", 
        },
        workLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Fes",
            addressRegion: "Fes-Meknes",
            addressCountry: "Morocco",
          },
        },
      },
    }
  
  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-text">
      <Terminal />
    </main>
  )
}

