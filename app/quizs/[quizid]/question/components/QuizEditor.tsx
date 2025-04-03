"use client";

import React, { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation"; // ✅ from next/navigation

import { MultipleChoiceEditor } from "./MultipleChoiceEditor";
import { ImageBasedQuizEditor } from "./ImageBasedQuizEditor";
import { ReorderEditor } from "./ReorderEditor";
import { MatchingQuizEditor } from "./MatchingQuizEditor";
import { TrueFalseEditor } from "./TrueFalseEditor";
import { FillInTheBlanksEditor } from "./FilInTheBlanksEditor";

interface EditorProps {
  quizId: string;
  questionId: string;
  onSave: () => void;
  isSaving: boolean;
}

const QuestionEditor = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const quizId = params.quizid as string;
  const questionId = params.questionid as string;
  const questionType = searchParams.get("type") as string;

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push(`/quizs/${quizId}`);
    }, 800);
  };

  const renderQuestionEditor = () => {
    if (!quizId || !questionId) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      );
    }

    const editorProps: EditorProps = {
      quizId,
      questionId,
      onSave: handleSave,
      isSaving,
    };

    switch (questionType) {
      case "multiple-choice":
        return <MultipleChoiceEditor {...editorProps} />;
      case "image-based":
        return <ImageBasedQuizEditor {...editorProps} />;
      case "reorder":
        return <ReorderEditor {...editorProps} />;
      case "fill-blanks":
        return <FillInTheBlanksEditor {...editorProps} />;
      case "matching":
        return <MatchingQuizEditor {...editorProps} />;
      case "true-false":
        return <TrueFalseEditor {...editorProps} />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Invalid question type or loading...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-2 bg-white border-b text-sm text-gray-500">
        <span className="mx-1">Quizs</span> / 
        <span className="mx-1">{quizId}</span> / 
        <span className="mx-1">Question</span> / 
        <span className="mx-1">{questionId}</span>
      </div>
      {renderQuestionEditor()}
    </div>
  );
};

export default QuestionEditor;
