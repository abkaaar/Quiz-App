import { Trash, ImageIcon, Plus } from "lucide-react";
import { useState } from "react";
import {
  QuestionEditorHeader,
  QuestionContentArea,
  HelpButton,
} from "./QuestionHeaderContent";

interface MatchingQuizEditorProps {
  quizId: string;
  questionId: string;
  onSave: () => void;
  isSaving: boolean;
}

export const MatchingQuizEditor: React.FC<MatchingQuizEditorProps> = ({
  quizId,
  questionId,
  onSave,
  isSaving,
}) => {
  const [prompts, setPrompts] = useState([
    { id: 1, text: "Type prompt here", color: "bg-blue-500" },
    { id: 2, text: "Type prompt here", color: "bg-teal-500" },
    { id: 3, text: "Type prompt here", color: "bg-amber-500" },
    { id: 4, text: "Type prompt here", color: "bg-rose-500" },
    { id: 5, text: "Type prompt here", color: "bg-purple-500" },
  ]);

  const [responses, setResponses] = useState([
    { id: 1, text: "Type response here", color: "bg-blue-800" },
    { id: 2, text: "Type response here", color: "bg-teal-800" },
    { id: 3, text: "Type response here", color: "bg-amber-800" },
    { id: 4, text: "Type response here", color: "bg-rose-800" },
    { id: 5, text: "Type response here", color: "bg-purple-800" },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <QuestionEditorHeader questionType="Match" icon="M" />

      {/* Question content area */}
      <div className="max-w-5xl mx-auto mt-4">
        <QuestionContentArea />

        {/* Matching items */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* Left side - Prompts */}
          <div className="grid grid-cols-1 gap-3">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className={`${prompt.color} text-white rounded-lg p-4 relative flex items-center`}
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
                  <p className="text-white text-xl opacity-60">{prompt.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Responses */}
          <div className="grid grid-cols-1 gap-3">
            {responses.map((response) => (
              <div
                key={response.id}
                className={`${response.color} text-white rounded-lg p-4 relative flex items-center`}
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
                  <p className="text-white text-xl opacity-60">
                    {response.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
