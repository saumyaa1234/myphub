import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

// Types
type Flashcard = {
  id: number;
  deckId: number;
  question: string;
  answer: string;
  mastery: number;
};

type FlashcardDeck = {
  id: number;
  title: string;
  subject: string;
  description: string;
  cardCount: number;
  mastery: number;
};

// Subject options (same as in Resources.tsx)
const subjects = [
  "Mathematics",
  "Sciences",
  "Language & Literature",
  "Language Acquisition",
  "Individuals & Societies",
  "Arts",
  "Physical Education",
  "Design"
];

// Form schemas
const deckSchema = z.object({
  title: z.string().min(1, "Deck title is required"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
});

const flashcardSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

export default function Flashcards() {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);
  const [isNewDeckDialogOpen, setIsNewDeckDialogOpen] = useState(false);
  const [isNewCardDialogOpen, setIsNewCardDialogOpen] = useState(false);
  
  // Fetch flashcard decks
  const { data: decks = [], isLoading: isLoadingDecks } = useQuery({
    queryKey: ['/api/flashcard-decks'],
  });
  
  // Fetch flashcards for selected deck
  const { data: flashcards = [], isLoading: isLoadingCards } = useQuery({
    queryKey: ['/api/flashcards', selectedDeckId],
    enabled: !!selectedDeckId,
  });
  
  // Setup forms
  const deckForm = useForm<z.infer<typeof deckSchema>>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      title: "",
      subject: "",
      description: "",
    },
  });
  
  const flashcardForm = useForm<z.infer<typeof flashcardSchema>>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });
  
  // Create deck mutation
  const createDeckMutation = useMutation({
    mutationFn: (data: z.infer<typeof deckSchema>) => 
      apiRequest("POST", "/api/flashcard-decks", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['/api/flashcard-decks'] });
      toast({
        title: "Deck created",
        description: "Your flashcard deck has been created successfully.",
      });
      deckForm.reset();
      setIsNewDeckDialogOpen(false);
      
      // Select the newly created deck
      response.json().then(data => {
        setSelectedDeckId(data.id);
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating deck",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Create flashcard mutation
  const createFlashcardMutation = useMutation({
    mutationFn: (data: z.infer<typeof flashcardSchema> & { deckId: number }) => 
      apiRequest("POST", "/api/flashcards", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards', selectedDeckId] });
      queryClient.invalidateQueries({ queryKey: ['/api/flashcard-decks'] });
      toast({
        title: "Flashcard created",
        description: "Your flashcard has been added to the deck.",
      });
      flashcardForm.reset();
      setIsNewCardDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error creating flashcard",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Update flashcard mastery mutation
  const updateMasteryMutation = useMutation({
    mutationFn: ({ id, mastery }: { id: number, mastery: number }) => 
      apiRequest("PATCH", `/api/flashcards/${id}`, { mastery }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards', selectedDeckId] });
      queryClient.invalidateQueries({ queryKey: ['/api/flashcard-decks'] });
    },
    onError: (error) => {
      toast({
        title: "Error updating mastery",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Submit handlers
  const onSubmitDeck = (data: z.infer<typeof deckSchema>) => {
    createDeckMutation.mutate(data);
  };
  
  const onSubmitFlashcard = (data: z.infer<typeof flashcardSchema>) => {
    if (!selectedDeckId) {
      toast({
        title: "No deck selected",
        description: "Please select a deck before adding flashcards.",
        variant: "destructive",
      });
      return;
    }
    
    createFlashcardMutation.mutate({
      ...data,
      deckId: selectedDeckId,
    });
  };
  
  // Flashcard navigation handlers
  const goToNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    }, 300);
  };
  
  const goToPrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 300);
  };
  
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  const updateMastery = (level: number) => {
    if (flashcards.length === 0) return;
    
    const currentCard = flashcards[currentCardIndex];
    updateMasteryMutation.mutate({ 
      id: currentCard.id, 
      mastery: level 
    });
    
    // Automatically go to next card
    setTimeout(goToNextCard, 500);
  };
  
  // Filter decks by selected subject
  const filteredDecks = decks.filter((deck: FlashcardDeck) => 
    selectedSubject === "All Subjects" || deck.subject === selectedSubject
  );
  
  // Get current deck
  const currentDeck = decks.find((deck: FlashcardDeck) => deck.id === selectedDeckId);
  
  // Get current flashcard
  const currentCard = flashcards.length > 0 && currentCardIndex < flashcards.length
    ? flashcards[currentCardIndex]
    : null;
  
  return (
    <section className="mb-8">
      <Card>
        <CardContent className="p-5">
          <h2 className="font-heading font-bold text-xl text-gray-800 mb-6">Interactive Flashcards</h2>
          
          {/* Subject filters */}
          <div className="flex flex-wrap mb-6 gap-2">
            <Button 
              onClick={() => setSelectedSubject("All Subjects")}
              variant={selectedSubject === "All Subjects" ? "default" : "outline"}
              className="text-sm"
            >
              All Subjects
            </Button>
            
            {subjects.map((subject) => (
              <Button 
                key={subject} 
                onClick={() => setSelectedSubject(subject)}
                variant={selectedSubject === subject ? "default" : "outline"}
                className="text-sm"
              >
                {subject}
              </Button>
            ))}
          </div>
          
          {/* Flashcard preview and controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Flashcard Preview */}
            <div className="relative h-64 max-w-md mx-auto w-full">
              {currentCard ? (
                <>
                  <motion.div 
                    className={`absolute inset-0 bg-secondary text-white rounded-xl shadow-lg p-5 flex flex-col justify-center`}
                    initial={false}
                    animate={{
                      rotateY: isFlipped ? 180 : 0,
                      opacity: isFlipped ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-secondary">
                        {currentDeck?.subject || ""}
                      </span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-center mb-2">{currentCard.question}</h3>
                    <p className="text-sm text-center text-white text-opacity-80 mt-4">Click to reveal answer</p>
                  </motion.div>
                  
                  <motion.div 
                    className={`absolute inset-0 bg-white text-gray-800 rounded-xl shadow-lg p-5 flex flex-col justify-center`}
                    initial={false}
                    animate={{
                      rotateY: isFlipped ? 0 : -180,
                      opacity: isFlipped ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary bg-opacity-10 text-secondary">
                        {currentDeck?.subject || ""}
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed">{currentCard.answer}</p>
                    <p className="text-sm text-center text-gray-500 mt-4">Click to hide answer</p>
                  </motion.div>
                  
                  <button 
                    className="absolute inset-0 w-full h-full cursor-pointer z-10"
                    onClick={flipCard} 
                    aria-label="Flip flashcard"
                  ></button>
                </>
              ) : (
                <div className="absolute inset-0 bg-neutral-100 rounded-xl shadow-lg p-5 flex flex-col justify-center items-center">
                  {isLoadingCards ? (
                    <p className="text-gray-500">Loading flashcards...</p>
                  ) : !selectedDeckId ? (
                    <>
                      <Clock className="h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-500 mb-2">No deck selected</p>
                      <p className="text-sm text-gray-400 text-center">Select a deck to start reviewing flashcards</p>
                    </>
                  ) : (
                    <>
                      <Plus className="h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-500 mb-2">No flashcards yet</p>
                      <p className="text-sm text-gray-400 text-center">Add flashcards to start studying</p>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Flashcard Controls */}
            <div className="flex flex-col justify-center">
              {currentCard && (
                <>
                  <div className="mb-6">
                    <h3 className="font-heading font-semibold text-gray-700 mb-3">How well did you know this?</h3>
                    <div className="flex space-x-2">
                      <Button 
                        variant="destructive"
                        className="flex-1" 
                        onClick={() => updateMastery(0)}
                      >
                        Not at all
                      </Button>
                      <Button 
                        variant="default"
                        className="flex-1 bg-warning text-white hover:bg-warning/90" 
                        onClick={() => updateMastery(1)}
                      >
                        Somewhat
                      </Button>
                      <Button 
                        variant="default"
                        className="flex-1 bg-success text-white hover:bg-success/90" 
                        onClick={() => updateMastery(2)}
                      >
                        Very well
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full" 
                      onClick={goToPrevCard}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <span className="font-medium text-gray-700">
                      Card {currentCardIndex + 1} of {flashcards.length}
                    </span>
                    <Button 
                      size="icon" 
                      className="rounded-full" 
                      onClick={goToNextCard}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </>
              )}
              
              {selectedDeckId && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsNewCardDialogOpen(true)} 
                    className="gap-1"
                  >
                    <Plus size={16} />
                    Add Flashcard
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Create deck section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-semibold text-gray-700">Create Your Own Flashcards</h3>
              <Dialog open={isNewDeckDialogOpen} onOpenChange={setIsNewDeckDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <Plus size={16} />
                    New Deck
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Flashcard Deck</DialogTitle>
                  </DialogHeader>
                  <Form {...deckForm}>
                    <form onSubmit={deckForm.handleSubmit(onSubmitDeck)} className="space-y-4">
                      <FormField
                        control={deckForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deck Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Chemistry Basics" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={deckForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {subjects.map((subject) => (
                                  <SelectItem key={subject} value={subject}>
                                    {subject}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={deckForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={2} 
                                placeholder="Brief description of the flashcard deck..." 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={createDeckMutation.isPending}
                        >
                          Create Deck
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isNewCardDialogOpen} onOpenChange={setIsNewCardDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Flashcard</DialogTitle>
                  </DialogHeader>
                  <Form {...flashcardForm}>
                    <form onSubmit={flashcardForm.handleSubmit(onSubmitFlashcard)} className="space-y-4">
                      <FormField
                        control={flashcardForm.control}
                        name="question"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={3} 
                                placeholder="Enter the question or front side of the flashcard" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={flashcardForm.control}
                        name="answer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={3} 
                                placeholder="Enter the answer or back side of the flashcard" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={createFlashcardMutation.isPending}
                        >
                          Add Flashcard
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Deck list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {isLoadingDecks ? (
                <div className="col-span-full flex justify-center items-center h-40">
                  <p>Loading flashcard decks...</p>
                </div>
              ) : filteredDecks.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center h-40">
                  <Clock className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500">No flashcard decks found</p>
                  <p className="text-sm text-gray-400">Create your first deck to get started</p>
                </div>
              ) : (
                filteredDecks.map((deck: FlashcardDeck) => (
                  <div 
                    key={deck.id} 
                    className={`border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all cursor-pointer ${
                      selectedDeckId === deck.id ? 'border-primary border-2' : 'border-neutral-200'
                    }`}
                    onClick={() => setSelectedDeckId(deck.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-800">{deck.title}</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary bg-opacity-10 text-secondary">
                        {deck.subject}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{deck.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{deck.cardCount} cards</span>
                      <span className="text-primary font-medium">{deck.mastery}% mastered</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
