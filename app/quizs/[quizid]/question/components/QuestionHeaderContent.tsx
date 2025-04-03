import { ChevronLeft, ChevronDown, Award, Clock, Tag, Save, LightbulbIcon, ImageIcon, Mic, Video } from "lucide-react";

// Common Question Editor Header Component
interface QuestionEditorHeaderProps {
    questionType: string;
    icon: React.ReactNode;
  }
  
 export const QuestionEditorHeader = ({ questionType, icon }: QuestionEditorHeaderProps) => {
    return (
      <>
        {/* Header */}
        <div className="bg-white p-2 border-b flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-2 p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="relative inline-block">
              <button className="flex items-center bg-white border rounded-md px-3 py-1 text-sm">
                <span className="flex items-center justify-center w-6 h-6 bg-teal-500 text-white rounded mr-2">
                  {icon}
                </span>
                {questionType}
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="mr-2">
              <button className="flex items-center bg-white border rounded-md px-3 py-1 text-sm">
                <Award className="mr-1 h-4 w-4" />
                1 point
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="mr-2">
              <button className="flex items-center bg-white border rounded-md px-3 py-1 text-sm">
                <Clock className="mr-1 h-4 w-4" />
                30 seconds
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="mr-2">
              <button className="flex items-center bg-white border rounded-md px-3 py-1 text-sm">
                <Tag className="mr-1 h-4 w-4" />
                Tag topics
              </button>
            </div>
            
            <button className="bg-purple-600 text-white flex items-center px-4 py-1 rounded-md text-sm">
              <Save className="mr-1 h-4 w-4" />
              Save question
            </button>
          </div>
        </div>
        
        {/* Text formatting toolbar */}
        <div className="bg-white p-1 border-b flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded font-bold text-lg">A</button>
          <button className="p-2 hover:bg-gray-100 rounded font-bold">B</button>
          <button className="p-2 hover:bg-gray-100 rounded italic">I</button>
          <button className="p-2 hover:bg-gray-100 rounded underline">U</button>
          <button className="p-2 hover:bg-gray-100 rounded">S</button>
          <button className="p-2 hover:bg-gray-100 rounded">x¹</button>
          <button className="p-2 hover:bg-gray-100 rounded">xₙ</button>
          <button className="p-2 hover:bg-gray-100 rounded">Σ</button>
          <div className="h-6 mx-2 border-r"></div>
          <button className="flex items-center p-2 hover:bg-gray-100 rounded text-sm">
            f(x) Insert equation
          </button>
          
          <div className="flex-grow"></div>
          
          <button className="flex items-center p-2 hover:bg-gray-100 rounded text-sm">
            <LightbulbIcon className="mr-1 h-4 w-4" />
            Add answer explanation
          </button>
        </div>
      </>
    );
  };
  
  // Common Question Content Area
export const QuestionContentArea = () => (
    <div className="bg-purple-900 rounded-lg p-4 min-h-64 relative">
      {/* Media buttons */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <button className="p-2 bg-purple-800 rounded-md hover:bg-purple-700">
          <ImageIcon className="h-5 w-5 text-white" />
        </button>
        <button className="p-2 bg-purple-800 rounded-md hover:bg-purple-700 relative">
          <Mic className="h-5 w-5 text-white" />
          <span className="absolute -top-1 -right-1 bg-amber-400 text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
        </button>
        <button className="p-2 bg-purple-800 rounded-md hover:bg-purple-700 relative">
          <Video className="h-5 w-5 text-white" />
          <span className="absolute -top-1 -right-1 bg-amber-400 text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
        </button>
      </div>
      
      {/* Question text placeholder */}
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-2xl opacity-60">Type question here</p>
      </div>
    </div>
  );
  
  // Help Button
 export const HelpButton = () => (
    <div className="fixed bottom-4 right-4">
      <button className="bg-purple-800 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">
        ?
      </button>
    </div>
  );