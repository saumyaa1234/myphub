import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertSubjectSchema, insertStudyBlockSchema, insertStudyGoalSchema, insertCasActivitySchema, insertResourceSchema, insertFlashcardDeckSchema, insertFlashcardSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // User routes
  app.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      res.status(201).json({ id: newUser.id, username: newUser.username });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });
  
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      res.status(200).json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });
  
  // Subject routes
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getSubjects();
      res.status(200).json(subjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve subjects" });
    }
  });
  
  app.post("/api/subjects", async (req, res) => {
    try {
      const subjectData = insertSubjectSchema.parse(req.body);
      const newSubject = await storage.createSubject(subjectData);
      res.status(201).json(newSubject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subject data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create subject" });
    }
  });
  
  app.delete("/api/subjects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteSubject(id);
      
      if (!success) {
        return res.status(404).json({ message: "Subject not found" });
      }
      
      res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete subject" });
    }
  });
  
  // Study block routes
  app.get("/api/study-blocks", async (req, res) => {
    try {
      const studyBlocks = await storage.getStudyBlocks();
      res.status(200).json(studyBlocks);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve study blocks" });
    }
  });
  
  app.post("/api/study-blocks", async (req, res) => {
    try {
      const blockData = insertStudyBlockSchema.parse(req.body);
      const newBlock = await storage.createStudyBlock(blockData);
      res.status(201).json(newBlock);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid study block data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create study block" });
    }
  });
  
  // Available time blocks
  app.post("/api/time-blocks", async (req, res) => {
    try {
      const { day, hours, duration, startTime, subjectId, note } = req.body;
      
      // Create a proper study block from the time block data
      const studyBlockData = {
        day,
        duration: duration || hours, // Use provided duration or hours as-is
        startTime: startTime || "09:00", // Default start time
        subjectId: subjectId || null,
        note: note || `Study session on ${day}`,
        userId: null // Not using user authentication in this version
      };
      
      // Log the study block data to help with debugging
      console.log("Creating study block:", studyBlockData);
      
      // Save as an actual study block
      const newBlock = await storage.createStudyBlock(studyBlockData);
      
      // Return the created block
      res.status(201).json(newBlock);
    } catch (error) {
      console.error("Error creating time block:", error);
      res.status(500).json({ message: "Failed to save time block" });
    }
  });
  
  // Generate timetable
  app.post("/api/generate-timetable", async (req, res) => {
    try {
      const { subjects, timeBlocks } = req.body;
      if (!subjects || !timeBlocks || !Array.isArray(subjects) || !Array.isArray(timeBlocks)) {
        return res.status(400).json({ message: "Invalid input data" });
      }

      // Get all available subjects
      const availableSubjects = await storage.getSubjects();
      const subjectMap = new Map(availableSubjects.map(s => [s.id, s]));
      
      // Assign subjects to time blocks based on hours per week
      const assignedBlocks = timeBlocks.map(block => {
        const subjectsToAssign = subjects
          .map(id => subjectMap.get(id))
          .filter(Boolean)
          .sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        const blocks = [];
        let remainingHours = block.hours;
        let currentTime = block.startTime || "09:00";

        for (const subject of subjectsToAssign) {
          if (remainingHours <= 0) break;
          
          const duration = Math.min(remainingHours, Math.ceil(subject.hoursPerWeek / timeBlocks.length));
          if (duration > 0) {
            blocks.push({
              subjectId: subject.id,
              day: block.day,
              startTime: currentTime,
              duration,
              note: `${subject.name} study session`
            });
            remainingHours -= duration;
            
            // Update current time
            const [hours, minutes] = currentTime.split(':').map(Number);
            const newTime = new Date();
            newTime.setHours(hours, minutes + duration * 60);
            currentTime = newTime.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);
          }
        }

        return {
          day: block.day,
          hours: block.hours,
          blocks
        };
      });

      // Save the generated blocks
      for (const block of assignedBlocks) {
        for (const studyBlock of block.blocks) {
          await storage.createStudyBlock(studyBlock);
        }
      }

      res.status(200).json(assignedBlocks);
    } catch (error) {
      console.error("Timetable generation error:", error);
      res.status(500).json({ message: "Failed to generate timetable" });
    }
  });
  
  // Study goals routes
  app.get("/api/study-goals", async (req, res) => {
    try {
      const weekStartDate = req.query.weekStartDate as string;
      const goals = await storage.getStudyGoals(weekStartDate);
      res.status(200).json(goals);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve study goals" });
    }
  });
  
  app.post("/api/study-goals", async (req, res) => {
    try {
      const goalData = insertStudyGoalSchema.parse(req.body);
      const newGoal = await storage.createStudyGoal(goalData);
      res.status(201).json(newGoal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid study goal data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create study goal" });
    }
  });
  
  app.patch("/api/study-goals/:id/complete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { completed } = req.body;
      
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ message: "Invalid data format: 'completed' must be a boolean" });
      }
      
      const goal = await storage.updateStudyGoalCompletion(id, completed);
      
      if (!goal) {
        return res.status(404).json({ message: "Study goal not found" });
      }
      
      res.status(200).json(goal);
    } catch (error) {
      res.status(500).json({ message: "Failed to update study goal completion status" });
    }
  });
  
  // CAS activities routes
  app.get("/api/cas-activities", async (req, res) => {
    try {
      const activities = await storage.getCasActivities();
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve CAS activities" });
    }
  });
  
  app.post("/api/cas-activities", async (req, res) => {
    try {
      const activityData = insertCasActivitySchema.parse(req.body);
      const newActivity = await storage.createCasActivity(activityData);
      res.status(201).json(newActivity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid CAS activity data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create CAS activity" });
    }
  });
  
  // Resources routes
  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getResources();
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve resources" });
    }
  });
  
  app.post("/api/resources", async (req, res) => {
    try {
      const resourceData = insertResourceSchema.parse(req.body);
      const newResource = await storage.createResource(resourceData);
      res.status(201).json(newResource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid resource data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create resource" });
    }
  });
  
  // Flashcard decks routes
  app.get("/api/flashcard-decks", async (req, res) => {
    try {
      const decks = await storage.getFlashcardDecks();
      res.status(200).json(decks);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve flashcard decks" });
    }
  });
  
  app.post("/api/flashcard-decks", async (req, res) => {
    try {
      const deckData = insertFlashcardDeckSchema.parse(req.body);
      const newDeck = await storage.createFlashcardDeck(deckData);
      res.status(201).json(newDeck);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid flashcard deck data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create flashcard deck" });
    }
  });
  
  // Flashcards routes
  app.get("/api/flashcards", async (req, res) => {
    try {
      const deckId = req.query.deckId ? parseInt(req.query.deckId as string) : undefined;
      const flashcards = await storage.getFlashcards(deckId);
      res.status(200).json(flashcards);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve flashcards" });
    }
  });
  
  app.post("/api/flashcards", async (req, res) => {
    try {
      const flashcardData = insertFlashcardSchema.parse(req.body);
      const newFlashcard = await storage.createFlashcard(flashcardData);
      
      // Update the card count in the deck
      if (typeof flashcardData.deckId === 'number') {
        await storage.updateFlashcardDeckCount(flashcardData.deckId);
      }
      
      res.status(201).json(newFlashcard);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid flashcard data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create flashcard" });
    }
  });
  
  app.patch("/api/flashcards/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { mastery } = req.body;
      
      if (typeof mastery !== 'number' || mastery < 0 || mastery > 2) {
        return res.status(400).json({ message: "Invalid mastery level" });
      }
      
      const updatedFlashcard = await storage.updateFlashcardMastery(id, mastery);
      
      if (!updatedFlashcard) {
        return res.status(404).json({ message: "Flashcard not found" });
      }
      
      res.status(200).json(updatedFlashcard);
    } catch (error) {
      res.status(500).json({ message: "Failed to update flashcard mastery" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
