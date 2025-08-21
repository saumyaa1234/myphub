
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, BookOpen, Globe, Users, Palette, Activity, Wrench } from "lucide-react";

type Subject = {
  id: string;
  name: string;
  key: string;
  icon: React.ComponentType<{ className?: string }>;
};

const subjects: Subject[] = [
  { id: '1', name: 'Mathematics', key: 'mathematics', icon: ({ className }) => <span className={className}>📐</span> },
  { id: '2', name: 'Sciences', key: 'sciences', icon: ({ className }) => <span className={className}>🔬</span> },
  { id: '3', name: 'Language & Literature', key: 'language', icon: BookOpen },
  { id: '4', name: 'Language Acquisition', key: 'acquisition', icon: Globe },
  { id: '5', name: 'Individuals & Societies', key: 'societies', icon: Users },
  { id: '6', name: 'Integrated Humanities', key: 'humanities', icon: ({ className }) => <span className={className}>🌍</span> },
  { id: '7', name: 'Interdisciplinary Unit', key: 'interdisciplinary', icon: ({ className }) => <span className={className}>🔗</span> },
  { id: '8', name: 'Arts', key: 'arts', icon: Palette },
  { id: '9', name: 'Physical Education', key: 'pe', icon: Activity },
  { id: '10', name: 'Design', key: 'design', icon: Wrench }
];

export default function SubjectTips() {
  const [activeSubject, setActiveSubject] = useState('mathematics');
  
  const renderMathContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Mathematics</h3>
          <p className="text-gray-600 mb-4">Mathematics in the MYP focuses on developing skills in four main criteria: Knowing and Understanding, Investigating Patterns, Communicating, and Applying Mathematics in Real-Life Contexts.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Practice regularly with progressive difficulty levels</li>
              <li>Focus on understanding concepts rather than memorizing formulas</li>
              <li>Create visual representations of problems when possible</li>
              <li>Work through examples step-by-step before attempting similar problems</li>
              <li>Form study groups to discuss different approaches to problem-solving</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Applying Algebra to Word Problems
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Many students struggle with translating word problems into algebraic expressions.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Break down the problem into known and unknown quantities. Assign variables to the unknowns, then use the relationships described in the problem to form equations. Practice with simpler problems first, then gradually increase complexity.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Understanding Geometric Proofs
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Geometric proofs require logical thinking and sequential reasoning that can be challenging.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Start by clearly identifying what is given and what needs to be proven. Draw diagrams and label all parts. Break down the proof into smaller steps, and identify which theorems or postulates apply at each step.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Exam Preparation Tips
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Review past tests and identify patterns in question types
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Practice with timed conditions to improve speed and accuracy
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Create a formula sheet for quick memorization
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Work through practice problems from different sources
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-accent bg-opacity-10 border-b border-neutral-200 font-medium text-accent">
            Recommended Resources
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  Haese Mathematics for MYP
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  Khan Academy Mathematics
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Wrench className="h-5 w-5 text-gray-400 mr-2" />
                  GeoGebra Interactive Tools
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderSciencesContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Sciences</h3>
          <p className="text-gray-600 mb-4">Sciences in the MYP encourages students to investigate issues through research, observation and experimentation, working independently and collaboratively.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Create concept maps to visualize relationships between scientific concepts</li>
              <li>Connect theoretical knowledge with practical applications</li>
              <li>Focus on understanding the scientific method and experimental design</li>
              <li>Memorize key terminology and use it correctly in explanations</li>
              <li>Review diagrams and practice drawing them from memory</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Balancing Chemical Equations
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Students often struggle with ensuring mass conservation in chemical reactions.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Count the atoms of each element on both sides of the equation. Start with the most complex molecules, and use coefficients (not subscripts) to balance the equation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Exam Preparation Tips
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Create summary sheets with key formulas and definitions
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Practice drawing and labeling diagrams
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Work through past paper questions under timed conditions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguageContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Language & Literature</h3>
          <p className="text-gray-600 mb-4">Language & Literature in MYP develops critical thinking about texts, contexts, and meanings. Focus on analyzing, organizing, producing, and presenting creative and analytical texts.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Read actively with annotation and note-taking strategies</li>
              <li>Practice close reading to analyze literary devices and techniques</li>
              <li>Create character maps and plot diagrams for complex texts</li>
              <li>Write regularly to develop voice and style</li>
              <li>Engage in discussions about themes and interpretations</li>
              <li>Keep a reading journal to track insights and connections</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Analyzing Literary Texts
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Students often struggle to identify and analyze literary devices and their effects.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Use the PEEL structure (Point, Evidence, Explain, Link). Start by identifying what the author is trying to convey, find specific textual evidence, explain how the device creates meaning, and link back to the overall theme or purpose.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Creative Writing Development
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Developing original voice and engaging storytelling can be challenging.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Read widely across different genres and styles. Practice writing exercises like character sketches, dialogue, and descriptive passages. Experiment with different narrative perspectives and structures. Get feedback from peers and teachers regularly.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Essay Structure and Arguments
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Organizing ideas coherently and developing strong arguments in essays.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Plan before writing using mind maps or outlines. Use topic sentences to introduce each paragraph's main idea. Support arguments with specific evidence and analysis. Practice transitions between paragraphs to improve flow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Assessment Criteria Tips
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Criterion A:</strong> Analyze how creators use language, structure, technique and style
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Criterion B:</strong> Organize opinions and ideas in a sustained, coherent way
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Criterion C:</strong> Use language to narrate, describe, analyze and persuade
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Criterion D:</strong> Use correct grammar, vocabulary and sentence structure
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-accent bg-opacity-10 border-b border-neutral-200 font-medium text-accent">
            Recommended Resources
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  Oxford MYP Language & Literature
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  SparkNotes Literature Guides
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Wrench className="h-5 w-5 text-gray-400 mr-2" />
                  Purdue OWL Writing Resources
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  Poetry Foundation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguageAcquisitionContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Language Acquisition</h3>
          <p className="text-gray-600 mb-4">Language Acquisition develops multilingual competence through listening, speaking, reading, writing, viewing and presenting in the target language.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Practice daily with authentic materials (news, videos, podcasts)</li>
              <li>Use spaced repetition for vocabulary learning</li>
              <li>Engage in conversation practice with native speakers</li>
              <li>Keep a language learning journal with new words and phrases</li>
              <li>Immerse yourself in the target culture through media</li>
              <li>Use language learning apps for consistent practice</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Speaking Confidence and Fluency
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Many students feel nervous about speaking and making mistakes.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Start with recorded practice sessions to build confidence. Focus on communication over perfection. Use phrases and expressions you know well. Practice with language exchange partners or conversation groups.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Grammar and Sentence Structure
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Understanding complex grammar rules and applying them correctly.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Learn grammar in context through examples. Practice with exercises that show patterns. Create your own example sentences. Use grammar in speaking and writing practice rather than just memorizing rules.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Language Skills Development
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Listen to podcasts and music in the target language daily
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Read news articles and short stories regularly
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Write journal entries and creative pieces
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Practice speaking through voice recordings
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-accent bg-opacity-10 border-b border-neutral-200 font-medium text-accent">
            Recommended Resources
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  Duolingo for daily practice
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  BBC Languages
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  HelloTalk Language Exchange
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHumanitiesContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Integrated Humanities</h3>
          <p className="text-gray-600 mb-4">Integrated Humanities combines history, geography, civics, and cultural studies to develop understanding of human experiences across time and space. This interdisciplinary approach helps students make connections between different aspects of human society.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Create concept maps linking historical events to geographic factors</li>
              <li>Use comparative timelines to understand cause and effect relationships</li>
              <li>Analyze primary sources from multiple perspectives and cultures</li>
              <li>Connect past events to current global issues and trends</li>
              <li>Practice interdisciplinary essay writing with evidence from multiple sources</li>
              <li>Engage in model United Nations or historical simulations</li>
              <li>Study case studies that demonstrate human-environment interactions</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Making Connections Across Disciplines
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Students often struggle to see the relationships between historical, geographical, and social concepts.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Use thematic approaches like "Migration and Settlement" or "Power and Governance" that naturally integrate multiple disciplines. Create visual organizers showing how geographic factors influenced historical events, and how both shape modern societies.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Analyzing Multiple Perspectives
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Understanding how different groups experienced the same historical events can be complex.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Use role-playing activities and perspective-taking exercises. Compare primary sources from different viewpoints on the same event. Practice empathy while maintaining critical analysis skills. Create "voices from the past" presentations.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Understanding Global Interconnections
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Grasping how local events connect to global patterns and systems.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Start with local examples and gradually expand to regional, national, and global scales. Use current events to illustrate how local actions have global consequences. Study migration patterns, trade routes, and cultural exchanges throughout history.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Interdisciplinary Skills
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Historical Thinking:</strong> Analyze causation, continuity, and change over time
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Geographic Analysis:</strong> Understand spatial relationships and human-environment interactions
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Civic Ideals:</strong> Examine democratic principles and citizenship responsibilities
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Cultural Understanding:</strong> Appreciate diversity and cultural exchange
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-amber-500/10 border-b border-neutral-200 font-medium text-amber-600">
            Assessment Focus Areas
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                Demonstrate understanding of key concepts across disciplines
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                Apply inquiry skills to investigate complex questions
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                Communicate findings using appropriate academic language
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                Think critically about sources and evidence
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-accent bg-opacity-10 border-b border-neutral-200 font-medium text-accent">
            Recommended Resources
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  National Geographic Education
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  BBC History and Geography
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  Stanford History Education Group
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  World History Encyclopedia
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  UNESCO World Heritage
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSocietiesContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Individuals & Societies</h3>
          <p className="text-gray-600 mb-4">This subject group develops understanding of human behavior, societies, and the relationships between people and their environment across time and space.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Create timelines to understand historical sequences and causation</li>
              <li>Use maps and atlases to understand geographical concepts</li>
              <li>Analyze primary and secondary sources critically</li>
              <li>Connect past events to current issues and trends</li>
              <li>Practice essay writing with clear arguments and evidence</li>
              <li>Engage in discussions about different perspectives and interpretations</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Analyzing Historical Sources
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Students often struggle to evaluate the reliability and usefulness of historical sources.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Use the OPVL method: Origin (who created it and when), Purpose (why was it created), Values (what makes it useful), and Limitations (what are its weaknesses). Consider the historical context and potential bias.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Understanding Geographic Processes
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Complex geographic concepts like climate change and urbanization can be difficult to grasp.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Use case studies to see how concepts apply in real places. Create diagrams and flowcharts to show processes. Connect local examples to global patterns. Use geographic tools like GIS when available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Research Skills
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Develop skills in finding and evaluating sources
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Practice note-taking and organizing information
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Learn to synthesize information from multiple sources
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Understand proper citation and referencing
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-accent bg-opacity-10 border-b border-neutral-200 font-medium text-accent">
            Recommended Resources
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  National Geographic Education
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  BBC History and Geography
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  TED-Ed Social Studies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArtsContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Arts</h3>
          <p className="text-gray-600 mb-4">Arts in MYP encourages creative expression through various media while developing critical thinking about artistic processes, cultural contexts, and aesthetic judgments.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Keep a visual arts journal with sketches, ideas, and reflections</li>
              <li>Study works by different artists and analyze their techniques</li>
              <li>Practice regularly with different media and techniques</li>
              <li>Document your creative process with photos and notes</li>
              <li>Participate in critiques to develop analytical skills</li>
              <li>Visit museums and galleries to see artworks in person</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Developing Personal Artistic Style
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Students often struggle to find their unique voice and style in their artwork.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Experiment with different techniques and media. Study artists you admire and try to understand what appeals to you. Keep creating regularly and reflect on your work. Don't be afraid to take risks and make mistakes.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Art Criticism and Analysis
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Writing about art and analyzing artworks can be challenging for visual learners.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Use structured frameworks like describing what you see, analyzing how elements are used, interpreting meaning, and evaluating effectiveness. Practice writing about artworks regularly and use specific art vocabulary.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Creative Process Tips
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Start with brainstorming and mind mapping ideas
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Create thumbnail sketches before final works
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Document your process with photos and notes
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Reflect on your work and learn from mistakes
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-accent bg-opacity-10 border-b border-neutral-200 font-medium text-accent">
            Recommended Resources
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Palette className="h-5 w-5 text-gray-400 mr-2" />
                  Google Arts & Culture
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  Metropolitan Museum Learning
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  YouTube Art Tutorials
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPEContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Physical Education</h3>
          <p className="text-gray-600 mb-4">Physical Education develops knowledge, skills and understanding necessary for students to lead healthy, active lives and become responsible, caring and collaborative members of society.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Keep a fitness journal tracking activities and progress</li>
              <li>Learn about anatomy and physiology through practical application</li>
              <li>Analyze sports techniques through video and observation</li>
              <li>Understand rules and strategies of different sports and games</li>
              <li>Practice goal setting and reflection on physical activities</li>
              <li>Study health and nutrition principles</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Understanding Exercise Physiology
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">The science behind exercise and fitness can be complex to understand.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Connect theoretical concepts to personal experience. Monitor your own heart rate, breathing, and energy levels during different activities. Use diagrams and models to understand body systems.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Skill Development and Technique
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Improving physical skills and mastering proper technique requires consistent practice.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Break complex skills into smaller components. Practice regularly with focus on proper form. Use video analysis to compare your technique with expert examples. Get feedback from teachers and peers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Health & Fitness Tips
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Set SMART fitness goals and track progress
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Include variety in your exercise routine
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Focus on proper nutrition and hydration
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                Get adequate rest and recovery time
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-accent bg-opacity-10 border-b border-neutral-200 font-medium text-accent">
            Recommended Resources
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Activity className="h-5 w-5 text-gray-400 mr-2" />
                  PE Central Activities
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  Sports Science Hub
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  Fitness Apps and Trackers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInterdisciplinaryContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Interdisciplinary Units</h3>
          <p className="text-gray-600 mb-4">Interdisciplinary units in MYP connect learning across subject groups to explore global contexts and real-world issues. These units help students see the connections between different areas of knowledge and develop transferable skills.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Create concept maps showing connections between different subjects</li>
              <li>Use global contexts to frame your understanding of topics</li>
              <li>Practice synthesis by combining knowledge from multiple disciplines</li>
              <li>Develop inquiry questions that span across subject areas</li>
              <li>Apply ATL (Approaches to Learning) skills consistently</li>
              <li>Reflect on how different perspectives contribute to understanding</li>
              <li>Connect learning to real-world issues and current events</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Making Connections Between Subjects
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Students often struggle to see how different subjects relate to each other in meaningful ways.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Start with a central theme or global context. Use graphic organizers to map out how different subjects contribute unique perspectives. Practice explaining connections in your own words and look for patterns across disciplines.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Synthesizing Information from Multiple Sources
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Combining knowledge from different subjects into a coherent understanding can be challenging.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Practice creating summaries that integrate multiple perspectives. Use structured frameworks like comparing and contrasting, or cause and effect analysis. Work in groups where each person can contribute expertise from different subjects.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Understanding Global Contexts
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Applying learning to global contexts and real-world situations requires broad understanding.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Stay informed about current events and global issues. Practice analyzing how local actions connect to global impacts. Use case studies from different regions and cultures to understand diverse perspectives on similar issues.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Global Contexts in MYP
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Identities & Relationships:</strong> Who we are and how we connect
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Orientation in Time & Space:</strong> Where and when we are
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Personal & Cultural Expression:</strong> How we express ourselves
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Scientific & Technical Innovation:</strong> How we adapt and change
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Globalization & Sustainability:</strong> How we share the planet
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Fairness & Development:</strong> How we organize ourselves
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-amber-500/10 border-b border-neutral-200 font-medium text-amber-600">
            ATL Skills Development
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                Thinking Skills: Critical and creative thinking
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                Research Skills: Information and media literacy
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                Communication Skills: Reading, writing, speaking, listening
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                Social Skills: Collaboration and conflict resolution
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                Self-Management: Time management and emotional intelligence
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-accent bg-opacity-10 border-b border-neutral-200 font-medium text-accent">
            Recommended Resources
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  United Nations Global Goals
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  TED-Ed Interdisciplinary Videos
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  Global Issues Network
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  National Geographic Education
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDesignContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Key Concepts in Design</h3>
          <p className="text-gray-600 mb-4">Design develops practical and creative thinking skills to solve design problems. Students learn to apply the design cycle: inquiring and analyzing, developing ideas, creating solutions, and evaluating.</p>
          
          <div className="bg-neutral-100 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Effective Study Techniques</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Follow the design cycle systematically for all projects</li>
              <li>Keep a detailed design journal with sketches and ideas</li>
              <li>Research existing solutions before developing your own</li>
              <li>Create multiple prototypes and test iteratively</li>
              <li>Document your design process with photos and reflections</li>
              <li>Learn from failure and use it to improve your designs</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-heading font-semibold text-gray-700 mb-3">Common Challenges & Solutions</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Understanding the Design Brief
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Students sometimes struggle to clearly identify the problem and requirements.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Break down the design brief into specific questions: Who is the user? What problem needs solving? What are the constraints? Create a clear problem statement before starting to design.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 font-medium text-gray-700">
                Challenge: Moving from Idea to Prototype
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-3">Translating creative ideas into working prototypes can be challenging.</p>
                <div className="bg-primary bg-opacity-5 border-l-4 border-primary p-3">
                  <h5 className="font-medium text-primary mb-1">Solution Approach:</h5>
                  <p className="text-gray-600">Start with simple materials and low-fidelity prototypes. Focus on testing key functions first. Use rapid prototyping techniques and be prepared to iterate based on testing results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-secondary bg-opacity-10 border-b border-neutral-200 font-medium text-secondary">
            Design Cycle Steps
          </div>
          <div className="p-4">
            <ul className="space-y-3 text-gray-600">
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Inquire & Analyze:</strong> Research the problem and existing solutions
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Develop Ideas:</strong> Generate and select design solutions
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Create Solution:</strong> Build and justify your prototype
                </div>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                <div>
                  <strong>Evaluate:</strong> Test effectiveness and suggest improvements
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-accent bg-opacity-10 border-b border-neutral-200 font-medium text-accent">
            Recommended Resources
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Wrench className="h-5 w-5 text-gray-400 mr-2" />
                  Autodesk Design Academy
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  Design Thinking Resources
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  Tinkercad for 3D Design
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderTabContent = (subjectKey: string) => {
    switch(subjectKey) {
      case 'mathematics':
        return renderMathContent();
      case 'sciences':
        return renderSciencesContent();
      case 'language':
        return renderLanguageContent();
      case 'acquisition':
        return renderLanguageAcquisitionContent();
      case 'societies':
        return renderSocietiesContent();
      case 'humanities':
        return renderHumanitiesContent();
      case 'interdisciplinary':
        return renderInterdisciplinaryContent();
      case 'arts':
        return renderArtsContent();
      case 'pe':
        return renderPEContent();
      case 'design':
        return renderDesignContent();
      default:
        return (
          <div className="p-8 text-center">
            <h3 className="font-heading font-semibold text-gray-700 mb-3">Content Coming Soon</h3>
            <p className="text-gray-600">We're currently working on adding tips and resources for this subject.</p>
          </div>
        );
    }
  };
  
  return (
    <section className="mb-8">
      <Card>
        <CardContent className="p-5">
          <h2 className="font-heading font-bold text-xl text-gray-800 mb-6">Subject-Specific Tips</h2>
          
          <div className="mb-6 overflow-x-auto">
            <Tabs value={activeSubject} onValueChange={setActiveSubject}>
              <TabsList className="mb-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-1 w-full h-auto">
                {subjects.map(subject => {
                  const IconComponent = subject.icon;
                  return (
                    <TabsTrigger key={subject.id} value={subject.key} className="whitespace-nowrap flex items-center gap-1 text-xs p-2 h-auto">
                      <IconComponent className="h-3 w-3" />
                      <span className="hidden sm:inline">{subject.name}</span>
                      <span className="sm:hidden">{subject.name.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {subjects.map(subject => (
                <TabsContent key={subject.id} value={subject.key}>
                  {renderTabContent(subject.key)}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
