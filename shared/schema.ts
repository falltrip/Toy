import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Project table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // app, game, image, video, etc
  tag: text("tag"), // Optional tag for categorization
  thumbnail: text("thumbnail").notNull(), // URL to thumbnail image
  url: text("url").notNull(), // URL to project
  videoLength: text("video_length"), // For video projects only (format: MM:SS)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Project Schema
export const insertProjectSchema = createInsertSchema(projects, {
  title: (schema) => schema.title.min(1, "Title is required"),
  description: (schema) => schema.description.min(1, "Description is required"),
  category: (schema) => schema.category.min(1, "Category is required"),
  thumbnail: (schema) => schema.thumbnail.min(1, "Thumbnail URL is required"),
  url: (schema) => schema.url.min(1, "Project URL is required"),
  videoLength: (schema) =>
    schema.videoLength
      .regex(/^\d{2}:\d{2}$/, "Video length must be in MM:SS format")
      .optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// User Schema
export const insertUserSchema = createInsertSchema(users, {
  username: (schema) =>
    schema.username.min(3, "Username must be at least 3 characters"),
  password: (schema) =>
    schema.password.min(6, "Password must be at least 6 characters"),
}).pick({
  username: true,
  password: true,
});

// Types
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
