import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Search, Book, Pin, PinOff, PlusCircle, Save, Trash2, BookOpen, Edit, X } from "lucide-react";

// Types
type Subject = {
  id: number;
  name: string;
};

type Note = {
  id: number;
  subjectId: number;
  title: string;
  content: string;
  pinned: boolean;
  tags: string[];
  createdAt: string;
};

// Local storage keys
const NOTES_STORAGE_KEY = "myp_study_notes";
const PINNED_NOTES_KEY = "myp_pinned_notes";

// Component
export default function StudyNotes() {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  
  // Get subjects from API
  const { data: subjects = [] } = useQuery({
    queryKey: ['/api/subjects'],
  });
  
  // Initialize notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Error parsing saved notes:", error);
      }
    }
  }, []);
  
  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);
  
  // Note form schema
  const noteSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    subjectId: z.number().positive("Please select a subject"),
  });
  
  // Form for adding/editing notes
  const noteForm = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
      subjectId: 0,
    },
  });
  
  // Reset form when editing state changes
  useEffect(() => {
    if (editingNote) {
      noteForm.reset({
        title: editingNote.title,
        content: editingNote.content,
        subjectId: editingNote.subjectId,
      });
      setCurrentTags(editingNote.tags || []);
    } else {
      noteForm.reset({
        title: "",
        content: "",
        subjectId: 0,
      });
      setCurrentTags([]);
    }
  }, [editingNote, noteForm]);
  
  // Filter notes based on active tab and search query
  const filteredNotes = notes.filter(note => {
    // First filter by tab
    if (activeTab === "pinned" && !note.pinned) return false;
    if (activeTab !== "all" && activeTab !== "pinned" && parseInt(activeTab) !== note.subjectId) return false;
    
    // Then filter by search query
    if (searchQuery === "") return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  });
  
  // Group notes by subject
  const groupedNotes: Record<string, Note[]> = {};
  filteredNotes.forEach(note => {
    const subjectId = note.subjectId.toString();
    if (!groupedNotes[subjectId]) {
      groupedNotes[subjectId] = [];
    }
    groupedNotes[subjectId].push(note);
  });
  
  // Add tag to current note
  const addTag = () => {
    if (tagInput.trim() === "") return;
    
    // Prevent duplicate tags
    if (currentTags.includes(tagInput.trim())) {
      toast({
        title: "Tag already exists",
        description: "This tag is already added to the note.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentTags(prev => [...prev, tagInput.trim()]);
    setTagInput("");
  };
  
  // Remove tag from current note
  const removeTag = (tag: string) => {
    setCurrentTags(prev => prev.filter(t => t !== tag));
  };
  
  // Save a new note or update existing one
  const saveNote = (data: z.infer<typeof noteSchema>) => {
    const timestamp = new Date().toISOString();
    
    if (editingNote) {
      // Update existing note
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id 
          ? { 
              ...note, 
              ...data, 
              tags: currentTags,
              createdAt: note.createdAt // Keep original timestamp
            } 
          : note
      ));
      
      toast({
        title: "Note updated",
        description: "Your study note has been updated successfully.",
      });
    } else {
      // Add new note
      const newNote: Note = {
        id: Date.now(), // Simple ID for local storage
        subjectId: data.subjectId,
        title: data.title,
        content: data.content,
        pinned: false,
        tags: currentTags,
        createdAt: timestamp,
      };
      
      setNotes(prev => [...prev, newNote]);
      
      toast({
        title: "Note saved",
        description: "Your study note has been saved successfully.",
      });
    }
    
    // Reset form and editing state
    noteForm.reset({
      title: "",
      content: "",
      subjectId: 0,
    });
    setCurrentTags([]);
    setEditingNote(null);
  };
  
  // Delete a note
  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    
    if (editingNote && editingNote.id === id) {
      setEditingNote(null);
    }
    
    toast({
      title: "Note deleted",
      description: "Your study note has been deleted.",
    });
  };
  
  // Toggle pin status of a note
  const togglePin = (id: number) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };
  
  // Find subject name by ID
  const getSubjectName = (id: number) => {
    return subjects.find((subject: Subject) => subject.id === id)?.name || "Unknown Subject";
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <section className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="font-heading font-bold text-xl text-gray-800 mb-2">Study Notes</h2>
            <p className="text-sm text-gray-600">
              Create, organize and find your study notes quickly by subject or using tags.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Note Editor */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="font-medium text-gray-700">
                {editingNote ? "Edit Note" : "Add New Note"}
              </h3>
              
              <Form {...noteForm}>
                <form onSubmit={noteForm.handleSubmit(saveNote)} className="space-y-4">
                  <FormField
                    control={noteForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Note title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={noteForm.control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={(value) => field.onChange(parseInt(value))}
                            value={field.value ? field.value.toString() : "0"}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Select a subject</SelectItem>
                              {subjects.map((subject: Subject) => (
                                <SelectItem key={subject.id} value={subject.id.toString()}>
                                  {subject.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={noteForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your notes here..." 
                            className="h-40 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel className="mb-2 block">Tags</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {currentTags.map(tag => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => removeTag(tag)}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex">
                      <Input 
                        placeholder="Add tag..." 
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={addTag}
                        className="ml-2"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="submit" 
                      className="flex items-center gap-1"
                    >
                      <Save className="h-4 w-4" />
                      {editingNote ? "Update Note" : "Save Note"}
                    </Button>
                    
                    {editingNote && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setEditingNote(null);
                          noteForm.reset({
                            title: "",
                            content: "",
                            subjectId: 0,
                          });
                          setCurrentTags([]);
                        }}
                      >
                        Cancel Editing
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
            
            {/* Notes List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
                  <Input 
                    placeholder="Search notes..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Tabs 
                  defaultValue="all" 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full sm:w-auto"
                >
                  <TabsList className="grid grid-cols-2 sm:grid-cols-3 w-full">
                    <TabsTrigger value="all" className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      All
                    </TabsTrigger>
                    <TabsTrigger value="pinned" className="flex items-center">
                      <Pin className="h-4 w-4 mr-2" />
                      Pinned
                    </TabsTrigger>
                    <TabsTrigger value="subjects" className="hidden sm:flex items-center">
                      <Book className="h-4 w-4 mr-2" />
                      By Subject
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {activeTab === "subjects" && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {subjects.map((subject: Subject) => (
                    <Badge 
                      key={subject.id} 
                      variant={activeTab === subject.id.toString() ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setActiveTab(subject.id.toString())}
                    >
                      {subject.name}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="bg-neutral-100 rounded-md p-3 min-h-[60vh] max-h-[70vh] overflow-y-auto">
                {filteredNotes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <Book className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-gray-500">No notes found</p>
                    <p className="text-sm text-gray-400">
                      {activeTab === "pinned" 
                        ? "You haven't pinned any notes yet" 
                        : searchQuery 
                          ? "No notes match your search" 
                          : "Start by creating your first note"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(groupedNotes).map(([subjectId, subjectNotes]) => (
                      <div key={subjectId} className="space-y-2">
                        {/* Subject heading - only show in All or Pinned tabs */}
                        {(activeTab === "all" || activeTab === "pinned") && (
                          <h3 className="font-medium text-sm text-gray-500 mt-4">
                            {getSubjectName(parseInt(subjectId))}
                          </h3>
                        )}
                        
                        {subjectNotes.map(note => (
                          <div 
                            key={note.id} 
                            className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium text-gray-800">{note.title}</h4>
                              <div className="flex items-center gap-2">
                                <button
                                  className={`text-gray-400 hover:${note.pinned ? 'text-gray-600' : 'text-amber-500'}`}
                                  onClick={() => togglePin(note.id)}
                                  title={note.pinned ? "Unpin note" : "Pin note"}
                                >
                                  {note.pinned ? (
                                    <PinOff className="h-4 w-4" />
                                  ) : (
                                    <Pin className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  className="text-gray-400 hover:text-primary"
                                  onClick={() => setEditingNote(note)}
                                  title="Edit note"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  className="text-gray-400 hover:text-destructive"
                                  onClick={() => deleteNote(note.id)}
                                  title="Delete note"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500 mb-2">
                              {formatDate(note.createdAt)}
                            </div>
                            
                            <div className="mb-3">
                              <p className="text-gray-700 text-sm whitespace-pre-line">
                                {note.content.length > 150 
                                  ? `${note.content.substring(0, 150)}...` 
                                  : note.content}
                              </p>
                            </div>
                            
                            {note.tags && note.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {note.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}