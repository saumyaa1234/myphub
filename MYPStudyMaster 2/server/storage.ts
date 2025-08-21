import { 
  users, 
  type User, 
  type InsertUser, 
  subjects, 
  type Subject, 
  type InsertSubject, 
  studyBlocks, 
  type StudyBlock, 
  type InsertStudyBlock,
  studyGoals,
  type StudyGoal,
  type InsertStudyGoal,
  casActivities, 
  type CasActivity, 
  type InsertCasActivity, 
  resources, 
  type Resource, 
  type InsertResource, 
  flashcardDecks, 
  type FlashcardDeck, 
  type InsertFlashcardDeck, 
  flashcards, 
  type Flashcard, 
  type InsertFlashcard
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subject operations
  getSubjects(): Promise<Subject[]>;
  getSubject(id: number): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;
  deleteSubject(id: number): Promise<boolean>;
  
  // Study block operations
  getStudyBlocks(): Promise<any[]>; // Using any[] for the timetable format
  createStudyBlock(studyBlock: InsertStudyBlock): Promise<StudyBlock>;
  generateStudyTimetable(): Promise<any[]>; // Using any[] for the timetable format
  
  // Study goal operations
  getStudyGoals(weekStartDate?: string): Promise<StudyGoal[]>;
  createStudyGoal(goal: InsertStudyGoal): Promise<StudyGoal>;
  updateStudyGoalCompletion(id: number, completed: boolean): Promise<StudyGoal | undefined>;
  
  // CAS activity operations
  getCasActivities(): Promise<CasActivity[]>;
  createCasActivity(activity: InsertCasActivity): Promise<CasActivity>;
  
  // Resource operations
  getResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Flashcard deck operations
  getFlashcardDecks(): Promise<FlashcardDeck[]>;
  createFlashcardDeck(deck: InsertFlashcardDeck): Promise<FlashcardDeck>;
  updateFlashcardDeckCount(deckId: number): Promise<FlashcardDeck | undefined>;
  
  // Flashcard operations
  getFlashcards(deckId?: number): Promise<Flashcard[]>;
  createFlashcard(flashcard: InsertFlashcard): Promise<Flashcard>;
  updateFlashcardMastery(id: number, mastery: number): Promise<Flashcard | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subjects: Map<number, Subject>;
  private studyBlocks: Map<number, StudyBlock>;
  private studyGoals: Map<number, StudyGoal>;
  private casActivities: Map<number, CasActivity>;
  private resources: Map<number, Resource>;
  private flashcardDecks: Map<number, FlashcardDeck>;
  private flashcards: Map<number, Flashcard>;
  
  private currentUserId: number;
  private currentSubjectId: number;
  private currentStudyBlockId: number;
  private currentStudyGoalId: number;
  private currentCasActivityId: number;
  private currentResourceId: number;
  private currentFlashcardDeckId: number;
  private currentFlashcardId: number;

  constructor() {
    this.users = new Map();
    this.subjects = new Map();
    this.studyBlocks = new Map();
    this.studyGoals = new Map();
    this.casActivities = new Map();
    this.resources = new Map();
    this.flashcardDecks = new Map();
    this.flashcards = new Map();
    
    this.currentUserId = 1;
    this.currentSubjectId = 1;
    this.currentStudyBlockId = 1;
    this.currentStudyGoalId = 1;
    this.currentCasActivityId = 1;
    this.currentResourceId = 1;
    this.currentFlashcardDeckId = 1;
    this.currentFlashcardId = 1;
    
    // Add some initial data
    this.initializeData();
  }
  
  // Study goal operations
  async getStudyGoals(weekStartDate?: string): Promise<StudyGoal[]> {
    const allGoals = Array.from(this.studyGoals.values());
    
    if (weekStartDate) {
      return allGoals.filter(goal => goal.weekStartDate === weekStartDate);
    }
    
    return allGoals;
  }
  
  async createStudyGoal(goal: InsertStudyGoal): Promise<StudyGoal> {
    const id = this.currentStudyGoalId++;
    const studyGoal: StudyGoal = { 
      id,
      userId: goal.userId || null,
      subjectId: goal.subjectId || null,
      description: goal.description,
      weekStartDate: goal.weekStartDate,
      completed: goal.completed !== undefined ? goal.completed : false
    };
    this.studyGoals.set(id, studyGoal);
    return studyGoal;
  }
  
  async updateStudyGoalCompletion(id: number, completed: boolean): Promise<StudyGoal | undefined> {
    const goal = this.studyGoals.get(id);
    
    if (!goal) {
      return undefined;
    }
    
    goal.completed = completed;
    this.studyGoals.set(id, goal);
    return goal;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Subject operations
  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }
  
  async getSubject(id: number): Promise<Subject | undefined> {
    return this.subjects.get(id);
  }
  
  async createSubject(insertSubject: InsertSubject): Promise<Subject> {
    const id = this.currentSubjectId++;
    const subject: Subject = { 
      id,
      name: insertSubject.name,
      userId: insertSubject.userId || null,
      hoursPerWeek: insertSubject.hoursPerWeek || 0
    };
    this.subjects.set(id, subject);
    return subject;
  }
  
  async deleteSubject(id: number): Promise<boolean> {
    return this.subjects.delete(id);
  }
  
  // Study block operations
  async getStudyBlocks(): Promise<any[]> {
    // Group study blocks by day and process into a suitable format for the frontend
    const blocks = Array.from(this.studyBlocks.values());
    
    // Create a map of days to their blocks
    const dayMap: Record<string, any> = {};
    
    blocks.forEach(block => {
      if (!dayMap[block.day]) {
        dayMap[block.day] = {
          day: block.day,
          hours: 0,
          blocks: []
        };
      }
      
      // Add the block to the appropriate day
      dayMap[block.day].blocks.push(block);
      
      // We expect duration to be in hours directly, no need to convert
      dayMap[block.day].hours += block.duration || 1;
    });
    
    return Object.values(dayMap);
  }
  
  async createStudyBlock(insertStudyBlock: InsertStudyBlock): Promise<StudyBlock> {
    const id = this.currentStudyBlockId++;
    const studyBlock: StudyBlock = { 
      id,
      userId: insertStudyBlock.userId || null,
      subjectId: insertStudyBlock.subjectId || null,
      day: insertStudyBlock.day,
      startTime: insertStudyBlock.startTime,
      duration: insertStudyBlock.duration,
      note: insertStudyBlock.note || null
    };
    this.studyBlocks.set(id, studyBlock);
    return studyBlock;
  }
  
  async generateStudyTimetable(): Promise<any[]> {
    // Simply return the existing study blocks without adding any new random blocks
    // or modifying existing ones
    return this.getStudyBlocks();
  }
  
  // CAS activity operations
  async getCasActivities(): Promise<CasActivity[]> {
    return Array.from(this.casActivities.values());
  }
  
  async createCasActivity(insertActivity: InsertCasActivity): Promise<CasActivity> {
    const id = this.currentCasActivityId++;
    const activity: CasActivity = { 
      id,
      userId: insertActivity.userId || null,
      title: insertActivity.title,
      type: insertActivity.type,
      description: insertActivity.description,
      startDate: insertActivity.startDate,
      endDate: insertActivity.endDate || null,
      hours: insertActivity.hours,
      status: insertActivity.status || "ongoing",
      learningOutcomes: insertActivity.learningOutcomes
    };
    this.casActivities.set(id, activity);
    return activity;
  }
  
  // Resource operations
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }
  
  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentResourceId++;
    const resource: Resource = { 
      id,
      title: insertResource.title,
      description: insertResource.description || null,
      type: insertResource.type,
      subject: insertResource.subject,
      fileUrl: insertResource.fileUrl || null,
      uploadedBy: insertResource.uploadedBy || null,
      uploadedAt: new Date() as unknown as Date
    };
    this.resources.set(id, resource);
    return resource;
  }
  
  // Flashcard deck operations
  async getFlashcardDecks(): Promise<FlashcardDeck[]> {
    return Array.from(this.flashcardDecks.values());
  }
  
  async createFlashcardDeck(insertDeck: InsertFlashcardDeck): Promise<FlashcardDeck> {
    const id = this.currentFlashcardDeckId++;
    const deck: FlashcardDeck = { 
      id,
      userId: insertDeck.userId || null,
      title: insertDeck.title,
      subject: insertDeck.subject,
      description: insertDeck.description || null,
      cardCount: 0,
      mastery: 0 
    };
    this.flashcardDecks.set(id, deck);
    return deck;
  }
  
  async updateFlashcardDeckCount(deckId: number): Promise<FlashcardDeck | undefined> {
    const deck = this.flashcardDecks.get(deckId);
    if (!deck) {
      return undefined;
    }
    
    // Count flashcards in this deck
    const deckFlashcards = Array.from(this.flashcards.values()).filter(card => card.deckId === deckId);
    
    // Update card count
    deck.cardCount = deckFlashcards.length;
    
    // Calculate mastery percentage
    if (deckFlashcards.length > 0) {
      const totalMastery = deckFlashcards.reduce((sum, card) => sum + card.mastery, 0);
      const maxPossibleMastery = deckFlashcards.length * 2; // 2 is the max mastery per card
      deck.mastery = Math.round((totalMastery / maxPossibleMastery) * 100);
    } else {
      deck.mastery = 0;
    }
    
    this.flashcardDecks.set(deckId, deck);
    return deck;
  }
  
  // Flashcard operations
  async getFlashcards(deckId?: number): Promise<Flashcard[]> {
    const allFlashcards = Array.from(this.flashcards.values());
    
    if (deckId !== undefined) {
      return allFlashcards.filter(card => card.deckId === deckId);
    }
    
    return allFlashcards;
  }
  
  async createFlashcard(insertFlashcard: InsertFlashcard): Promise<Flashcard> {
    const id = this.currentFlashcardId++;
    const flashcard: Flashcard = { 
      id,
      deckId: insertFlashcard.deckId || null,
      question: insertFlashcard.question,
      answer: insertFlashcard.answer,
      mastery: 0 
    };
    this.flashcards.set(id, flashcard);
    return flashcard;
  }
  
  async updateFlashcardMastery(id: number, mastery: number): Promise<Flashcard | undefined> {
    const flashcard = this.flashcards.get(id);
    
    if (!flashcard) {
      return undefined;
    }
    
    flashcard.mastery = mastery;
    this.flashcards.set(id, flashcard);
    
    // Update the deck mastery percentage if deckId is not null
    if (flashcard.deckId !== null) {
      await this.updateFlashcardDeckCount(flashcard.deckId as number);
    }
    
    return flashcard;
  }
  
  // Initialize with minimal data
  private initializeData() {
    // Create a demo user
    this.createUser({
      username: "demo",
      password: "password"
    });
    
    // We're leaving this empty for now to prevent any sample data generation
    // This ensures the user sees only what they create
  }
}

export const storage = new MemStorage();
