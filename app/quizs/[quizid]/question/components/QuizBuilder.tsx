"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  ArrowDownUp,
  CheckSquare,
  Square,
} from "lucide-react";
import { MultipleChoiceEditor } from "./MultipleChoiceEditor";
import { ImageBasedQuizEditor } from "./ImageBasedQuizEditor";
import { FillInTheBlanksEditor } from "./FilInTheBlanksEditor";
import { MatchingQuizEditor } from "./MatchingQuizEditor";
import { ReorderEditor } from "./ReorderEditor";
import { TrueFalseEditor } from "./TrueFalseEditor";

// Quiz Type Selector Component
const QuizTypeSelector: React.FC<{
  onSelectQuizType: (
    quizType:
      | "multiple-choice"
      | "image-based"
      | "reorder"
      | "fill-blanks"
      | "matching"
      | "true-false"
  ) => void;
}> = ({ onSelectQuizType }) => {
  const quizTypes: {
    id:
      | "multiple-choice"
      | "image-based"
      | "reorder"
      | "fill-blanks"
      | "matching"
      | "true-false";
    name: string;
    icon: React.ReactNode;
  }[] = [
    { id: "multiple-choice", name: "Multiple Choice", icon: "?" },
    {
      id: "image-based",
      name: "Image Based Quiz",
      icon: <ImageIcon className="h-4 w-4" />,
    },
    {
      id: "reorder",
      name: "Reorder the Sequence",
      icon: <ArrowDownUp className="h-4 w-4" />,
    },
    {
      id: "fill-blanks",
      name: "Fill in the Blanks",
      icon: <Square className="h-4 w-4" />,
    },
    { id: "matching", name: "Matching Quiz", icon: "M" },
    {
      id: "true-false",
      name: "True or False",
      icon: <CheckSquare className="h-4 w-4" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold text-purple-900 mb-4">
        Select Question Type
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {quizTypes.map((type) => (
          <button
            key={type.id}
            className="flex items-center p-3 border rounded-md hover:bg-purple-50 transition-colors"
            onClick={() => onSelectQuizType(type.id)}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded mr-2">
              {typeof type.icon === "string" ? type.icon : type.icon}
            </div>
            <span>{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const QuizBuilder = () => {
  const [selectedQuizType, setSelectedQuizType] = useState<
    | null
    | "multiple-choice"
    | "image-based"
    | "reorder"
    | "fill-blanks"
    | "matching"
    | "true-false"
  >(null);

  const renderQuizEditor = () => {
    const commonProps = {
      quizId: "dummyQuizId", 
      questionId: "dummyQuestionId", 
      onSave: () => console.log("Saving..."), // Implement actual save logic
      isSaving: false, // Update based on state
    };
    switch (selectedQuizType) {
      case "multiple-choice":
        return <MultipleChoiceEditor {...commonProps} />;
      case "image-based":
        return <ImageBasedQuizEditor {...commonProps} />;
      case "reorder":
        return <ReorderEditor {...commonProps} />;
      case "fill-blanks":
        return <FillInTheBlanksEditor {...commonProps} />;
      case "matching":
        return <MatchingQuizEditor {...commonProps} />;
      case "true-false":
        return <TrueFalseEditor {...commonProps} />;
      default:
        return (
          <QuizTypeSelector
            onSelectQuizType={(
              quizType:
                | "multiple-choice"
                | "image-based"
                | "reorder"
                | "fill-blanks"
                | "matching"
                | "true-false"
            ) => setSelectedQuizType(quizType)}
          />
        );
    }
  };

  return <div className="min-h-screen bg-gray-100">{renderQuizEditor()}</div>;
};

export default QuizBuilder;
