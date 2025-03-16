import type React from "react";
import { JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Define your website metadata with personal branding focus
export const metadata: Metadata = {
  metadataBase: new URL("https://oussamamahi.me"),
  title: {
    default: "Oussama Mahi | Software Engineer & Developer Portfolio",
    template: "%s | Oussama Mahi",
  },
  description:
    "The terminal-inspired portfolio of Oussama Mahi, Software Engineer",
  keywords: [
    "Oussama Mahi",
    "software engineer",
    "web developer",
    "portfolio",
    "terminal",
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "frontend developer",
    "backend developer",
  ],
  authors: [
    {
      name: "OussamaEchchahid",
      url: "https://github.com/oussamamahi",
    },
  ],
  creator: "Oussama Mahi",
  publisher: "Oussama Mahi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oussamamahi.me",
    siteName: "Oussama Mahi - Software Engineer",
    title: "Oussama Mahi | Software Engineer",
    description:
      "Oussama Mahi is a passionate software engineering student with a strong interest in building real-world applications and solving complex problems. He has experience in full-stack development, DevOps, and system architecture, with a focus on creating efficient and scalable solutions. Always eager to learn and grow, oussama enjoys exploring new technologies and sharing knowledge with others.",
    images: [
      {
        url: "/oussama.jpeg",
        width: 1200,
        height: 630,
        alt: "Oussama Mahi - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oussama Mahi | Software Engineer",
    description:
      "Oussama Mahi is a passionate software engineering student with a strong interest in building real-world applications and solving complex problems. He has experience in full-stack development, DevOps, and system architecture, with a focus on creating efficient and scalable solutions. Always eager to learn and grow, oussama enjoys exploring new technologies and sharing knowledge with others.",
    creator: "@oussamamahi",
    images: ["/oussama.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/oussama16x16.jpg.png", sizes: "16x16", type: "image/png" },
      { url: "/oussama32x32.png", sizes: "32x32", type: "image/png" },
    ],
    // apple: [{ url: "/apple-touch-icon.png" }],
    // other: [
    //   {
    //     rel: "mask-icon",
    //     url: "/safari-pinned-tab.svg",
    //   },
    // ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://oussamamahi.me",
    languages: {
      "en-US": "https://oussamamahi.me",
    },
  },
  verification: {
    google: "kxkkRg7CVtHLYhTyoBwWjiDmupHOV6B9XdEvJ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Add structured data for personal identity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Oussama Mahi",
              url: "https://oussamamahi.me",
              image: "/oussama.jpeg",
              sameAs: [
                "https://www.https://www.linkedin.com/in/oussama-mahi-32041b267/",
              ],
              jobTitle: "Software Engineer",

              description:
                "Oussama Mahi is a passionate software engineering student with a strong interest in building real-world applications and solving complex problems. He has experience in full-stack development, DevOps, and system architecture, with a focus on creating efficient and scalable solutions. Always eager to learn and grow, oussama enjoys exploring new technologies and sharing knowledge with others.",
              knowsAbout: [
                "JavaScript",
                "React",
                "Next.js",
                "TypeScript",
                "Web Development",
                "Terminal Applications",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} font-mono bg-terminal-bg text-terminal-text`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
