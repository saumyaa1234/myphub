import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, FileText, Video, Link2, Globe } from "lucide-react";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("all");
  
  // MYP Resource data
  const resources = [
    {
      id: 1,
      title: "MYP Mathematics Guide",
      description: "Comprehensive guide covering all MYP mathematics topics with practice questions and solutions.",
      type: "guide",
      subject: "Mathematics",
      url: "https://www.ibo.org/programmes/middle-years-programme/curriculum/mathematics/",
      rating: 5
    },
    {
      id: 2,
      title: "MYP Sciences Interactive Resources",
      description: "Interactive simulations and experiments for biology, chemistry and physics concepts.",
      type: "interactive",
      subject: "Sciences",
      url: "https://phet.colorado.edu/",
      rating: 4
    },
    {
      id: 3,
      title: "MYP Language & Literature Analysis",
      description: "Literary analysis techniques and practice exercises for MYP Language and Literature.",
      type: "notes",
      subject: "Language & Literature",
      url: "https://www.litcharts.com/",
      rating: 5
    },
    {
      id: 4,
      title: "MYP Individuals & Societies Resources",
      description: "History, geography and economics resources tailored for MYP students.",
      type: "notes",
      subject: "Individuals & Societies",
      url: "https://www.worldhistory.org/",
      rating: 4
    },
    {
      id: 5,
      title: "MYP Design Video Tutorials",
      description: "Step-by-step video tutorials for design cycle, product development and digital design.",
      type: "video",
      subject: "Design",
      url: "https://www.youtube.com/playlist?list=PLvgpzZkLbpV8o8DmHwJdVCwOH-SDd_29f",
      rating: 4
    },
    {
      id: 6,
      title: "MYP Physical Education Resources",
      description: "Guides for physical activities, sports techniques and health education materials.",
      type: "guide",
      subject: "Physical Education",
      url: "https://www.sportsengine.com/article/health/pe-activities-middle-school-students",
      rating: 3
    },
    {
      id: 7,
      title: "MYP Arts Teaching Materials",
      description: "Music, visual arts and performing arts teaching resources with examples and projects.",
      type: "guide",
      subject: "Arts",
      url: "https://www.teacherplanet.com/content/arts",
      rating: 4
    },
    {
      id: 8,
      title: "MYP Language Acquisition Materials",
      description: "Language learning resources for French, Spanish, and other second languages.",
      type: "interactive",
      subject: "Language Acquisition",
      url: "https://www.duolingo.com/",
      rating: 5
    },
    {
      id: 9,
      title: "MYP Personal Project Examples",
      description: "Sample personal projects with exemplars and planning documents.",
      type: "guide",
      subject: "Personal Project",
      url: "https://www.thinkib.net/myp/page/21557/personal-project",
      rating: 5
    },
    {
      id: 10,
      title: "MYP Interdisciplinary Teaching Resources",
      description: "Materials for interdisciplinary units and cross-subject learning activities.",
      type: "notes",
      subject: "Interdisciplinary",
      url: "https://www.edutopia.org/topic/integrated-studies",
      rating: 4
    }
  ];

  const filteredResources = activeTab === "all" 
    ? resources 
    : resources.filter(resource => resource.type === activeTab);
  
  // Render resource card with appropriate icon
  const renderResourceIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-5 w-5 text-primary" />;
      case "notes":
        return <FileText className="h-5 w-5 text-amber-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "interactive":
        return <Globe className="h-5 w-5 text-green-500" />;
      default:
        return <Link2 className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  // Function to get badge colors based on subject
  const getBadgeStyle = (subject: string) => {
    const subjectStyles: { [key: string]: string } = {
      "Mathematics": "bg-blue-100 text-blue-800 hover:bg-blue-200",
      "Sciences": "bg-green-100 text-green-800 hover:bg-green-200",
      "Language & Literature": "bg-purple-100 text-purple-800 hover:bg-purple-200",
      "Individuals & Societies": "bg-amber-100 text-amber-800 hover:bg-amber-200",
      "Design": "bg-gray-100 text-gray-800 hover:bg-gray-200", 
      "Physical Education": "bg-red-100 text-red-800 hover:bg-red-200",
      "Arts": "bg-pink-100 text-pink-800 hover:bg-pink-200",
      "Language Acquisition": "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      "Personal Project": "bg-teal-100 text-teal-800 hover:bg-teal-200",
      "Interdisciplinary": "bg-orange-100 text-orange-800 hover:bg-orange-200"
    };
    
    return subjectStyles[subject] || "bg-primary/10 text-primary hover:bg-primary/20";
  };

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">MYP Study Resources</h1>
        <p className="text-muted-foreground max-w-3xl">
          A curated collection of the best MYP study materials, notes, and resources to help you succeed in your studies.
        </p>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 mb-2">
                    {renderResourceIcon(resource.type)}
                    <Badge className={getBadgeStyle(resource.subject)} variant="outline">
                      {resource.subject}
                    </Badge>
                  </div>
                  <div className="flex">
                    {[...Array(resource.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary inline-flex items-center hover:underline"
                >
                  Visit Resource
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Resource Recommendations</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Top MYP Study Sites</h3>
              <ul className="space-y-2 ml-5 list-disc">
                <li>
                  <a href="https://www.thinkib.net/myp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    ThinkIB MYP Resources
                  </a>
                  <p className="text-sm text-muted-foreground">Comprehensive subject guides and practice materials.</p>
                </li>
                <li>
                  <a href="https://www.kognity.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Kognity
                  </a>
                  <p className="text-sm text-muted-foreground">Interactive digital textbooks for all MYP subjects.</p>
                </li>
                <li>
                  <a href="https://www.managebac.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    ManageBac
                  </a>
                  <p className="text-sm text-muted-foreground">The IB's platform for curriculum planning and assessment.</p>
                </li>
                <li>
                  <a href="https://www.revision-village.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Revision Village
                  </a>
                  <p className="text-sm text-muted-foreground">Math practice questions and video solutions.</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Most Recommended MYP Books</h3>
              <ul className="space-y-2 ml-5 list-disc">
                <li>
                  <span className="font-medium">Oxford IB MYP Series</span>
                  <p className="text-sm text-muted-foreground">Textbooks for all MYP subjects with practice questions.</p>
                </li>
                <li>
                  <span className="font-medium">Hodder Education MYP by Concept Series</span>
                  <p className="text-sm text-muted-foreground">Concept-based learning materials with assessment support.</p>
                </li>
                <li>
                  <span className="font-medium">Pearson MYP Mathematics Series</span>
                  <p className="text-sm text-muted-foreground">Mathematics resources from standard to extended.</p>
                </li>
                <li>
                  <span className="font-medium">MYP Sciences: A Concept-Based Approach</span>
                  <p className="text-sm text-muted-foreground">Integrated approach to biology, chemistry and physics.</p>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}