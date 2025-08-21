import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Study timetable related schemas
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  hoursPerWeek: integer("hours_per_week").notNull().default(1),
});

export const insertSubjectSchema = createInsertSchema(subjects).pick({
  userId: true,
  name: true,
  hoursPerWeek: true,
});

export type InsertSubject = z.infer<typeof insertSubjectSchema>;
export type Subject = typeof subjects.$inferSelect;

export const studyBlocks = pgTable("study_blocks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  subjectId: integer("subject_id").references(() => subjects.id),
  day: text("day").notNull(), // Monday, Tuesday, etc.
  startTime: text("start_time").notNull(), // HH:MM format
  duration: integer("duration").notNull(), // in minutes
  note: text("note"),
});

export const insertStudyBlockSchema = createInsertSchema(studyBlocks).pick({
  userId: true,
  subjectId: true,
  day: true,
  startTime: true,
  duration: true,
  note: true,
});

export type InsertStudyBlock = z.infer<typeof insertStudyBlockSchema>;
export type StudyBlock = typeof studyBlocks.$inferSelect;

// Study goal related schemas
export const studyGoals = pgTable("study_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  subjectId: integer("subject_id").references(() => subjects.id),
  description: text("description").notNull(),
  weekStartDate: text("week_start_date").notNull(), // YYYY-MM-DD format
  completed: boolean("completed").default(false),
});

export const insertStudyGoalSchema = createInsertSchema(studyGoals).pick({
  userId: true,
  subjectId: true,
  description: true,
  weekStartDate: true,
  completed: true,
});

export type InsertStudyGoal = z.infer<typeof insertStudyGoalSchema>;
export type StudyGoal = typeof studyGoals.$inferSelect;

// CAS project related schemas
export const casActivities = pgTable("cas_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  type: text("type").notNull(), // Creativity, Activity, Service, or Multiple
  description: text("description").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  hours: integer("hours").notNull(),
  status: text("status").notNull().default("ongoing"), // ongoing, completed
  learningOutcomes: json("learning_outcomes").notNull(), // Array of selected learning outcomes
});

export const insertCasActivitySchema = createInsertSchema(casActivities).pick({
  userId: true,
  title: true,
  type: true,
  description: true,
  startDate: true,
  endDate: true,
  hours: true,
  status: true,
  learningOutcomes: true,
});

export type InsertCasActivity = z.infer<typeof insertCasActivitySchema>;
export type CasActivity = typeof casActivities.$inferSelect;

// Resources related schemas
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // past paper, notes, other
  subject: text("subject").notNull(),
  fileUrl: text("file_url"),
  uploadedBy: integer("uploaded_by").references(() => users.id),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  type: true,
  subject: true,
  fileUrl: true,
  uploadedBy: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

// Flashcards related schemas
export const flashcardDecks = pgTable("flashcard_decks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  description: text("description"),
  cardCount: integer("card_count").notNull().default(0),
  mastery: integer("mastery").notNull().default(0), // percentage mastered
});

export const insertFlashcardDeckSchema = createInsertSchema(flashcardDecks).pick({
  userId: true,
  title: true,
  subject: true,
  description: true,
});

export type InsertFlashcardDeck = z.infer<typeof insertFlashcardDeckSchema>;
export type FlashcardDeck = typeof flashcardDecks.$inferSelect;

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id").references(() => flashcardDecks.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  mastery: integer("mastery").notNull().default(0), // 0: Not at all, 1: Somewhat, 2: Very well
});

export const insertFlashcardSchema = createInsertSchema(flashcards).pick({
  deckId: true,
  question: true,
  answer: true,
});

export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;
export type Flashcard = typeof flashcards.$inferSelect;
