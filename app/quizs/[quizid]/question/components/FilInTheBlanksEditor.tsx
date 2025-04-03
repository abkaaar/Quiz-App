import { Square, Trash, Plus } from "lucide-react";
import { useState } from "react";
import { QuestionEditorHeader, QuestionContentArea, HelpButton } from "./QuestionHeaderContent";

interface FillInTheBlanksEditorProps {
  quizId: string;
  questionId: string;
  onSave: () => void;
  isSaving: boolean;
}


export const FillInTheBlanksEditor: React.FC<FillInTheBlanksEditorProps> = (
  {
    quizId,
    questionId,
    onSave,
    isSaving
  }
) => {
    const [blankOptions, setBlankOptions] = useState([
      { id: 1, text: "Type answer here" }
    ]);
  
    return (
      <div className="bg-gray-100 min-h-screen">
        <QuestionEditorHeader questionType="Fill in the Blank" icon={<Square className="h-3 w-3" />} />
        
        {/* Question content area */}
        <div className="max-w-5xl mx-auto mt-4">
          <QuestionContentArea />
          
          {/* Instructions */}
          <div className="bg-white rounded-lg p-4 mt-4">
            <p className="text-gray-700 mb-2 font-medium">Create blanks by typing [blank] in your question.</p>
            <p className="text-gray-500 text-sm">Example: The capital of France is [blank].</p>
          </div>
          
          {/* Answer options */}
          <div className="bg-white rounded-lg p-4 mt-4">
            <div className="mb-2 text-gray-700 font-medium">Accepted answers for blank #1:</div>
            
            {blankOptions.map(option => (
              <div key={option.id} className="flex items-center mb-2">
                <input 
                  type="text" 
                  value={option.text} 
                  onChange={(e) => {
                    const updatedOptions = [...blankOptions];
                    const index = updatedOptions.findIndex(o => o.id === option.id);
                    updatedOptions[index].text = e.target.value;
                    setBlankOptions(updatedOptions);
                  }}
                  className="flex-grow p-2 border rounded-lg"
                  placeholder="Type accepted answer here"
                />
                <button className="p-2 ml-2 bg-gray-100 rounded-md hover:bg-gray-200">
                  <Trash className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ))}
            
            <button 
              className="flex items-center text-purple-600 mt-2"
              onClick={() => setBlankOptions([...blankOptions, { id: blankOptions.length + 1, text: "" }])}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add another accepted answer
            </button>
          </div>
          
          {/* Student view preview */}
          <div className="bg-purple-900 text-white rounded-lg p-6 mt-4">
            <div className="mb-4 text-lg font-medium">Student view</div>
            <div className="flex items-center justify-center p-8">
              <p className="text-white text-xl">Type your answer in the boxes</p>
            </div>
          </div>
        </div>
        
        <HelpButton />
      </div>
    );
  };