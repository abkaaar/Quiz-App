import { CheckSquare, Check, X } from "lucide-react";
import { useState } from "react";
import { QuestionEditorHeader, QuestionContentArea, HelpButton } from "./QuestionHeaderContent";

interface TrueFalseEditorProps {
  quizId: string;
  questionId: string;
  onSave: () => void;
  isSaving: boolean;
}


export const TrueFalseEditor: React.FC<TrueFalseEditorProps> = () => {
  const [correctAnswer, setCorrectAnswer] = useState('true');

  return (
    <div className="bg-gray-100 min-h-screen">
      <QuestionEditorHeader questionType="True/False" icon={<CheckSquare className="h-3 w-3" />} />
      
      {/* Question content area */}
      <div className="max-w-5xl mx-auto mt-4">
        <QuestionContentArea />
        
        {/* Answer options */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div 
            className={`bg-green-600 text-white rounded-lg p-4 min-h-40 relative cursor-pointer ${correctAnswer === 'true' ? 'ring-4 ring-white' : ''}`}
            onClick={() => setCorrectAnswer('true')}
          >
            <div className="absolute top-2 right-2">
              {correctAnswer === 'true' && (
                <div className="p-1 bg-white rounded-full">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-white text-4xl font-bold mb-4">TRUE</div>
                <div className="flex justify-center">
                  <CheckSquare className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`bg-red-600 text-white rounded-lg p-4 min-h-40 relative cursor-pointer ${correctAnswer === 'false' ? 'ring-4 ring-white' : ''}`}
            onClick={() => setCorrectAnswer('false')}
          >
            <div className="absolute top-2 right-2">
              {correctAnswer === 'false' && (
                <div className="p-1 bg-white rounded-full">
                  <Check className="h-5 w-5 text-red-600" />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-white text-4xl font-bold mb-4">FALSE</div>
                <div className="flex justify-center">
                  <X className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <HelpButton />
    </div>
  );
};