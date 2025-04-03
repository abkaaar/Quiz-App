import { useState } from "react";
import { Check, ImageIcon, Square } from "lucide-react";
import { Inter } from "next/font/google";
import { QuestionEditorHeader, QuestionContentArea, HelpButton } from "./QuestionHeaderContent";

interface imageBasedQuizEditorProps {
  quizId: string;
  questionId: string;
  onSave: () => void;
  isSaving: boolean;
}

// 2. Image Based Quiz Editor Component
export const ImageBasedQuizEditor: React.FC<imageBasedQuizEditorProps> = (
  {
    quizId,
    questionId,
    onSave,
    isSaving
  }
) => {
    interface Answer {
      id: number;
      text: string;
      color: string;
      isCorrect: boolean;
      image: string | null;
    }
  
    const [answers, setAnswers] = useState<Answer[]>([
      { id: 1, text: "Type answer option here", color: "bg-blue-500", isCorrect: true, image: null },
      { id: 2, text: "Type answer option here", color: "bg-teal-500", isCorrect: false, image: null },
      { id: 3, text: "Type answer option here", color: "bg-amber-500", isCorrect: false, image: null },
      { id: 4, text: "Type answer option here", color: "bg-rose-500", isCorrect: false, image: null }
    ]);
  
    const toggleCorrect = (id: number): void => {
      setAnswers(answers.map((answer) => ({
        ...answer,
        isCorrect: answer.id === id
      })));
    };

    return (
      <div className="bg-gray-100 min-h-screen">
        <QuestionEditorHeader questionType="Image Based Quiz" icon={<ImageIcon className="h-3 w-3" />} />
        <div className="max-w-5xl mx-auto mt-4">
          <QuestionContentArea />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {answers.map(answer => (
              <div
                key={answer.id}
                className={`${answer.color} text-white rounded-lg p-4 relative flex items-center`}
              >
                <div className="absolute top-2 right-2">
                  <button
                    className="p-1 bg-white bg-opacity-10 rounded hover:bg-opacity-20"
                    onClick={() => toggleCorrect(answer.id)}
                  >
                    {answer.isCorrect ? <Check className="h-4 w-4 text-white" /> : <Square className="h-4 w-4 text-white" />}
                  </button>
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-white text-xl opacity-60">{answer.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <HelpButton />
      </div>
    );
};