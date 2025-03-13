"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageLayout from "./page-layout"
import { CodeBlock } from "../syntax-highlight"
import { Github } from "lucide-react"

export default function ProjectsContent() {
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      id: "LMS",
      name: "E-Learning Application for the SMI Platform",
      description:
            "A Learning Management System designed to enhance online education by providing features such as course management, user authentication, and collaborative tools.",
      technologies: [
        "Next",
        "Spring Boot",
        "Spring Cloud",
        "Microservices",
        "PostgreSQL",
        "RabbitMQ",
        "Docker"
      ],
      github: "https://github.com/oussamamahidev/LMSMicroservices",
      codeSnippet: `
// Project architecture - Microservices implementation

//ApiGateway
@SpringBootApplication
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

}

@SpringBootApplication
public class UserProgressServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserProgressServiceApplication.class, args);
	}
	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/courses-by-user/{userId}")
    public ResponseEntity<?> getCourses(@PathVariable String userId) {
        return courseService.findCoursesByUserId(userId);
    }

    @GetMapping("/v2")
    public ResponseEntity<?> getCourses(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String categoryId
    ) {
        if (title == null && categoryId == null) {
            return (ResponseEntity<?>) courseService.getAllCourses();
        }

        if (title != null && categoryId != null) {
            return courseService.findPublishedCoursesWithTitleContainingAndCategoryId(title, categoryId);
        } else if (title != null) {
            return courseService.findPublishedCoursesWithTitleContaining(title);
        } else {
            return courseService.findPublishedCoursesWithCategoryId(categoryId);
        }
    }

    @GetMapping("/get-course-chapter/{courseId}")
    public ResponseEntity<?> getCourseAndChapter(@PathVariable String courseId) {
        ResponseEntity<?> course = courseService.getCourseAndChapter(courseId);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/get-course-with-published-chapters/{courseId}")
    public ResponseEntity<?> getCourseWithPublishedChapters(@PathVariable String courseId) {
        ResponseEntity<?> course = courseService.getCourseWithPublishedChapters(courseId);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<?> getCourse(@PathVariable String courseId) {
        ResponseEntity<?> course = courseService.getCourse(courseId);
        return ResponseEntity.ok(course);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> createCourse(@RequestBody CreateCourseRequest request, @PathVariable String userId){
        ResponseEntity<?> course = courseService.createCourse(request, userId);
        return ResponseEntity.ok(course);
    }

    @PatchMapping("/{courseId}/{userId}")
    public ResponseEntity<?> updateCourse(@PathVariable String courseId, @PathVariable String userId, @RequestBody UpdateCourseRequest request) {
        try {
            return courseService.updateCourse(courseId, userId, request);
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        } catch (CourseNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Error");
        }
    }

    @DeleteMapping("/{courseId}/{userId}")
    public ResponseEntity<?> deleteCourse(@PathVariable String courseId, @PathVariable String userId) {
        try {
            courseService.deleteCourse(courseId, userId);
            return ResponseEntity.ok().build();
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        } catch (CourseNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Error");
        }
    }

    @PatchMapping("/{courseId}/{userId}/publish")
    public ResponseEntity<?> publishCourse(@PathVariable String courseId, @PathVariable String userId) {
            courseService.publishCourse(courseId, userId);
            return ResponseEntity.ok("Course published successfully");
    }

    @PatchMapping("/{courseId}/{userId}/unpublish")
    public ResponseEntity<?> unPublishCourse(@PathVariable String courseId, @PathVariable String userId) {
        try {
            courseService.unPublishCourse(courseId, userId);
            return ResponseEntity.ok("Course Unpublished successfully");
        } catch (CourseNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}
}`,
      language: "java",
    },
    {
      id: "intra-enterprise",
      name: "Intra-Enterprise Collaboration System",
      description:
        "A web application for collaboration within companies, similar to Stack Overflow, featuring an announcement system, event organization, and blogs for internal communication.",
      technologies: ["Next.js 14", "NextAuth", "MongoDB"],
      github: "https://github.com/oussamamahidev/stack_overflow",
      codeSnippet: `
// Authentication implementation with NextAuth
import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  }
});`,
      language: "javascript",
    },
    {
      id: "Amazon E-Commerce Clone",
      name: "Amazon E-Commerce Clone",
      description:
        "A full-stack e-commerce platform inspired by Amazon, featuring user authentication, product listings, a shopping cart, and a secure checkout process.",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
      github: "https://github.com/oussamamahidev/amazon",
      codeSnippet: `
      // Amazon E-Commerce Clone - Basic Setup with Node.js and Express.js
      
      // Server setup
      const express = require('express');
      const app = express();
      const port = 3000;
      
      // Middleware to parse request bodies
      app.use(express.json());
      
      // Product route - Fetch all products
      app.get('/api/products', (req, res) => {
          const products = [
              { id: 1, name: 'Product 1', price: 199.99 },
              { id: 2, name: 'Product 2', price: 299.99 },
              { id: 3, name: 'Product 3', price: 399.99 },
          ];
          res.json(products);
      });
      
      // Product route - Get product by ID
      app.get('/api/products/:id', (req, res) => {
          const productId = req.params.id;
          const product = { id: productId, name: 'Product "$"{productId}', price: 199.99 };
          res.json(product);
      });
      
      // Cart route - Add product to cart
      app.post('/api/cart', (req, res) => {
          const { productId, quantity } = req.body;
          if (!productId || !quantity) {
              return res.status(400).json({ message: 'Product ID and quantity are required' });
          }
          res.json({ message: 'Product added to cart', productId, quantity });
      });
      
      // Checkout route - Proceed to checkout
      app.post('/api/checkout', (req, res) => {
          const { cartItems } = req.body;
          if (!cartItems || cartItems.length === 0) {
              return res.status(400).json({ message: 'No items in the cart' });
          }
          res.json({ message: 'Checkout successful', cartItems });
      });
      
      // Start the server
      app.listen(port, () => {
          console.log(\`Amazon E-Commerce Clone running on http://localhost:\'$'{port}\`);
      });
      `,
      language: "Javascript",
    },
  ]


  const handleNext = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const project = projects[activeProject]

  return (
    <PageLayout title="Projects">
      <div className="flex overflow-x-auto mb-4 pb-2 space-x-2 scrollbar-hide">
        {projects.map((p, index) => (
          <button
            key={p.id}
            className={`px-3 py-1 whitespace-nowrap rounded text-sm ${
              index === activeProject
                ? "bg-terminal-header-light text-terminal-yellow"
                : "text-terminal-text-dim hover:text-terminal-text"
            }`}
            onClick={() => setActiveProject(index)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <motion.div
        key={project.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="border border-terminal-border rounded-md bg-terminal-code/20 p-4"
      >
        <div className="mb-4">
          <h3 className="text-lg font-bold text-terminal-yellow mb-2">{project.name}</h3>
          <p className="text-terminal-text mb-3">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs rounded bg-terminal-header-light text-terminal-text-bright">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-3 mb-6">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-terminal-green hover:underline"
            >
              <Github className="w-4 h-4 mr-1" /> GitHub
            </a>

  
          </div>
        </div>

        <div className="bg-terminal-code rounded mb-3">
          <div className="px-3 py-1 bg-terminal-header-dark text-terminal-text-dim text-sm">
            {project.id}.{project.language}
          </div>
          <CodeBlock language={project.language} showLineNumbers={true}>
            {project.codeSnippet}
          </CodeBlock>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            className="px-3 py-1 rounded text-sm text-terminal-text-dim hover:text-terminal-text hover:bg-terminal-header-light"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 rounded text-sm text-terminal-text-dim hover:text-terminal-text hover:bg-terminal-header-light"
          >
            Next →
          </button>
        </div>
      </motion.div>
    </PageLayout>
  )
}

