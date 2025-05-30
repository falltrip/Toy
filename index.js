// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __dirname2 = path.dirname(fileURLToPath(import.meta.url));
var UPLOAD_DIR = path.join(__dirname2, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
var MemStorage = class {
  users;
  projects;
  userCurrentId;
  projectCurrentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.userCurrentId = 1;
    this.projectCurrentId = 1;
    this.addInitialProjects();
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Project methods
  async getAllProjects() {
    return Array.from(this.projects.values());
  }
  async getProject(id) {
    return this.projects.get(id);
  }
  async getProjectsByCategory(category) {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }
  async createProject(insertProject) {
    const id = this.projectCurrentId++;
    const now = /* @__PURE__ */ new Date();
    const project = {
      ...insertProject,
      id,
      createdAt: now,
      updatedAt: null
    };
    this.projects.set(id, project);
    return project;
  }
  async updateProject(id, updateData) {
    const project = this.projects.get(id);
    if (!project) return void 0;
    const updatedProject = {
      ...project,
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  async deleteProject(id) {
    return this.projects.delete(id);
  }
  // File handling
  async saveFile(file) {
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const writeStream = fs.createWriteStream(filePath);
    return new Promise((resolve, reject) => {
      writeStream.write(file.buffer);
      writeStream.end();
      writeStream.on("finish", () => {
        resolve(`/uploads/${fileName}`);
      });
      writeStream.on("error", (err) => {
        reject(err);
      });
    });
  }
  // Add initial projects for demo
  addInitialProjects() {
    const now = /* @__PURE__ */ new Date();
    this.projects.set(this.projectCurrentId++, {
      id: 1,
      title: "Neural Network Visualizer",
      description: "An interactive tool that allows users to build, train and visualize neural networks in real-time with intuitive controls.",
      category: "app",
      tag: "INTERACTIVE",
      thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      url: "https://example.com/neural-visualizer",
      videoLength: null,
      createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3),
      // 7 days ago
      updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1e3)
      // 2 days ago
    });
    this.projects.set(this.projectCurrentId++, {
      id: 2,
      title: "Waveform Generator",
      description: "Create unique audio visualizations from any sound input. Export as animated GIFs or videos with customizable colors and effects.",
      category: "app",
      tag: "AUDIO",
      thumbnail: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      url: "https://example.com/waveform-generator",
      videoLength: null,
      createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1e3),
      // 14 days ago
      updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1e3)
      // 3 days ago
    });
    this.projects.set(this.projectCurrentId++, {
      id: 3,
      title: "Code Synthesis",
      description: "Advanced code editor with AI-powered completion, syntax visualization, and collaborative features for programmers.",
      category: "app",
      tag: "PRODUCTIVITY",
      thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      url: "https://example.com/code-synthesis",
      videoLength: null,
      createdAt: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1e3),
      // 21 days ago
      updatedAt: null
    });
    this.projects.set(this.projectCurrentId++, {
      id: 4,
      title: "Neon Drifter",
      description: "Race through a cyberpunk cityscape on your hoverbike, avoiding obstacles and collecting energy cells to boost your speed.",
      category: "game",
      tag: "ARCADE",
      thumbnail: "https://pixabay.com/get/g3d904f34e3586629319e2366ba2f2143ce7cbeed93dcd778d33822399ae5414767a041a2ad38d3531f794e982f53aecbb3b60864a1b88ff7c5e5b116c6d9a7e7_1280.jpg",
      url: "https://example.com/neon-drifter",
      videoLength: null,
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1e3),
      // 5 days ago
      updatedAt: null
    });
    this.projects.set(this.projectCurrentId++, {
      id: 5,
      title: "Circuit Logic",
      description: "Connect circuits to solve increasingly complex energy flow puzzles. Features 50+ levels with unique mechanics and challenges.",
      category: "game",
      tag: "PUZZLE",
      thumbnail: "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      url: "https://example.com/circuit-logic",
      videoLength: null,
      createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1e3),
      // 12 days ago
      updatedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1e3)
      // 4 days ago
    });
    this.projects.set(this.projectCurrentId++, {
      id: 6,
      title: "Neural Dreams",
      description: "Generated using a custom GAN architecture trained on abstract digital art.",
      category: "image",
      tag: "GENERATIVE",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      url: "https://example.com/neural-dreams",
      videoLength: null,
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1e3),
      // 2 days ago
      updatedAt: null
    });
    this.projects.set(this.projectCurrentId++, {
      id: 7,
      title: "Geometric Fractals",
      description: "Recursive geometric patterns generated using custom WebGL shaders.",
      category: "image",
      tag: "PROCEDURAL",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      url: "https://example.com/geometric-fractals",
      videoLength: null,
      createdAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1e3),
      // 11 days ago
      updatedAt: null
    });
    this.projects.set(this.projectCurrentId++, {
      id: 8,
      title: "Motion Study 03",
      description: "Abstract visualization of data structures morphing and evolving through geometric transformations.",
      category: "video",
      tag: "ABSTRACT",
      thumbnail: "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      url: "https://example.com/motion-study-03",
      videoLength: "02:34",
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1e3),
      // 3 days ago
      updatedAt: null
    });
    this.projects.set(this.projectCurrentId++, {
      id: 9,
      title: "Digital Environment",
      description: "Walkthrough of a generated architectural space that responds to sound input and user interaction.",
      category: "video",
      tag: "ENVIRONMENT",
      thumbnail: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      url: "https://example.com/digital-environment",
      videoLength: "04:17",
      createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1e3),
      // 8 days ago
      updatedAt: null
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  // app, game, image, video, etc
  tag: text("tag"),
  // Optional tag for categorization
  thumbnail: text("thumbnail").notNull(),
  // URL to thumbnail image
  url: text("url").notNull(),
  // URL to project
  videoLength: text("video_length"),
  // For video projects only (format: MM:SS)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
});
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

// server/routes.ts
import multer from "multer";
import path2 from "path";
import fs2 from "fs";
import { fileURLToPath as fileURLToPath2 } from "url";
import express from "express";
var __dirname3 = path2.dirname(fileURLToPath2(import.meta.url));
var UPLOAD_DIR2 = path2.join(__dirname3, "..", "uploads");
if (!fs2.existsSync(UPLOAD_DIR2)) {
  fs2.mkdirSync(UPLOAD_DIR2, { recursive: true });
}
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});
var serveStatic = (app2) => {
  app2.use("/uploads", express.static(UPLOAD_DIR2));
};
async function registerRoutes(app2) {
  const apiRouter = express.Router();
  app2.use("/api", apiRouter);
  serveStatic(app2);
  apiRouter.get("/projects", async (req, res) => {
    try {
      const projects2 = await storage.getAllProjects();
      res.json(projects2);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  apiRouter.get("/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });
  apiRouter.get("/projects/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const projects2 = await storage.getProjectsByCategory(category);
      res.json(projects2);
    } catch (error) {
      console.error("Error fetching projects by category:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  apiRouter.post("/projects", upload.single("thumbnail"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "Thumbnail image is required" });
      }
      const projectData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        tag: req.body.tag || null,
        url: req.body.url,
        videoLength: req.body.videoLength || null,
        thumbnail: ""
        // Will be set after file is saved
      };
      try {
        insertProjectSchema.parse(projectData);
      } catch (validationError) {
        return res.status(400).json({ message: "Invalid project data", error: validationError });
      }
      const fileUrl = await storage.saveFile(file);
      projectData.thumbnail = fileUrl;
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });
  apiRouter.patch("/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      const updatedProject = await storage.updateProject(id, req.body);
      res.json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });
  apiRouter.delete("/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      const success = await storage.deleteProject(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: "Failed to delete project" });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  apiRouter.use((err, req, res, next) => {
    console.error("API Error:", err);
    res.status(500).json({ message: err.message || "Internal server error" });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs3 from "fs";
import path4 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3 from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  root: path3.resolve(__dirname, "client"),
  // /client을 루트로 설정
  base: "/Toy/",
  // GitHub Pages 경로
  resolve: {
    alias: {
      "@": path3.resolve(__dirname, "client/src"),
      "@shared": path3.resolve(__dirname, "shared")
    }
  },
  build: {
    outDir: "../dist",
    // 루트의 dist 폴더로 출력
    emptyOutDir: true,
    // 이전 빌드 파일 제거
    rollupOptions: {
      input: path3.resolve(__dirname, "client/index.html")
      // 명시적으로 index.html 지정
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path4.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs3.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic2(app2) {
  const distPath = path4.resolve(import.meta.dirname, "public");
  if (!fs3.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path4.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic2(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
