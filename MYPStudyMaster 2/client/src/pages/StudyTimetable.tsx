import { Card, CardContent } from "@/components/ui/card";

export default function StudyTimetable() {
  return (
    <section className="mb-8">
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Interactive Study Timetable
          </h2>

          <div className="w-full border rounded-lg overflow-hidden bg-gray-50">
            {/* Clickable Screenshot Preview */}
            <div className="relative group cursor-pointer" onClick={() => window.open('https://mypprotips.my.canva.site/tips-for-managing-myp-projects-and-exam-preparation', '_blank')}>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Schedule Fixer</h3>
                <p className="text-blue-100 mb-6">Create, customize, and share your weekly schedule</p>
                
                {/* Mock Interface Preview */}
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/20 rounded p-3 text-left">
                      <div className="text-sm font-medium mb-2">Add New Schedule Item</div>
                      <div className="space-y-2">
                        <div className="bg-white/30 rounded h-8"></div>
                        <div className="flex gap-2">
                          <div className="bg-white/30 rounded h-8 flex-1"></div>
                          <div className="bg-white/30 rounded h-8 flex-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded p-3 text-left">
                      <div className="text-sm font-medium mb-2">Color Options</div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 bg-blue-400 rounded"></div>
                        <div className="w-6 h-6 bg-green-400 rounded"></div>
                        <div className="w-6 h-6 bg-purple-400 rounded"></div>
                        <div className="w-6 h-6 bg-red-400 rounded"></div>
                        <div className="w-6 h-6 bg-yellow-400 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 rounded p-3">
                    <div className="text-sm font-medium mb-3">Weekly Schedule</div>
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="bg-white/30 rounded p-2 text-center">
                          <div className="font-medium">{day}</div>
                          <div className="h-12 mt-1 bg-white/20 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white rounded-lg px-6 py-3 font-medium text-gray-800 shadow-lg">
                  Click to open Schedule Fixer Tool →
                </div>
              </div>
            </div>
            
            {/* Alternative Access Method */}
            <div className="p-4 bg-white border-t">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-sm text-gray-600">
                  <strong>Schedule Fixer:</strong> A comprehensive tool for creating and managing your weekly study schedule with color coding and customization options.
                </div>
                <a 
                  href="https://mypprotips.my.canva.site/tips-for-managing-myp-projects-and-exam-preparation" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Open Tool →
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
