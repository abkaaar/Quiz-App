import { ArrowDownUp, Trash, ImageIcon, Plus } from "lucide-react";
import { useState } from "react";
import { QuestionEditorHeader, QuestionContentArea, HelpButton } from "./QuestionHeaderContent";


interface ReorderEditorProps {
  quizId: string;
  questionId: string;
  onSave: () => void;
  isSaving: boolean;
}

export const ReorderEditor: React.FC<ReorderEditorProps> = (
  {
    quizId,
    questionId,
    onSave,
    isSaving
  }
) => {
  const [items, setItems] = useState([
    { id: 1, text: "Type answer here", color: "bg-blue-500", order: 1 },
    { id: 2, text: "Type answer here", color: "bg-teal-500", order: 2 },
    { id: 3, text: "Type answer here", color: "bg-amber-500", order: 3 },
    { id: 4, text: "Type answer here", color: "bg-rose-500", order: 4 },
    { id: 5, text: "Type answer here", color: "bg-purple-500", order: 5 }
  ]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <QuestionEditorHeader questionType="Reorder" icon={<ArrowDownUp className="h-3 w-3" />} />
      
      {/* Question content area */}
      <div className="max-w-5xl mx-auto mt-4">
        <QuestionContentArea />
        
        {/* Answer options */}
        <div className="grid grid-cols-1 gap-3 mt-4">
          {items.map(item => (
            <div 
              key={item.id} 
              className={`${item.color} text-white rounded-lg p-4 relative flex items-center`}
            >
              <div className="absolute top-2 right-2 flex space-x-1">
                <button className="p-1 bg-white bg-opacity-10 rounded hover:bg-opacity-20">
                  <Trash className="h-4 w-4 text-white" />
                </button>
                <button className="p-1 bg-white bg-opacity-10 rounded hover:bg-opacity-20">
                  <ImageIcon className="h-4 w-4 text-white" />
                </button>
              </div>
              
              <div className="flex-grow flex items-center justify-center">
                <p className="text-white text-xl opacity-60">{item.text}</p>
              </div>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 px-4 py-1 rounded-full text-white">
                {item.order}
              </div>
            </div>
          ))}
        </div>
        
        {/* Ordering controls */}
        <div className="flex justify-center mt-4 gap-2">
          <button className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-800">
            Ascending order
          </button>
          <button className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-800">
            Descending order
          </button>
        </div>
        
        {/* Add option button */}
        <div className="flex justify-center mt-4">
          <button className="bg-purple-900 text-white rounded-full p-2 hover:bg-purple-800">
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <HelpButton />
    </div>
  );
};