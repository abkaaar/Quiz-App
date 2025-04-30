"use client"

import React, { useState } from 'react';
import { 
  ChevronDown, 
  GripVertical, 
  Edit, 
  Trash, 
  Check, 
  X, 
  Copy, 
  Clock, 
  Award, 
  Sparkles
} from 'lucide-react';

const QuestionComponent = () => {
  // Sample questions data
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'fill-in-blank',
      questionText: 'What is the first step in creating a budget?',
      timeLimit: '1 minutes',
      points: '1 point',
      answer: 'Assess your income and expenses.',
      isCorrect: true
    },
    {
      id: 2,
      type: 'multiple-choice',
      questionText: 'If you save $100 a month for a year, how much will you have saved?',
      timeLimit: '30 seconds',
      points: '1 point',
      choices: [
        { text: '$1200', isCorrect: true },
        { text: '$800', isCorrect: false },
        { text: '$600', isCorrect: false },
        { text: '$1500', isCorrect: false }
      ]
    }
  ]);

  return (
    <div className="flex flex-col gap-4">
      {questions.map((question) => (
        <div key={question.id} className="border rounded-lg shadow-sm bg-white">
          {/* Question header */}
          <div className="flex items-center p-4 border-b">
            <button className="p-2 hover:bg-gray-100 rounded">
              <GripVertical className="h-4 w-4 text-gray-500" />
            </button>
            
            <div className="flex items-center ml-2">
              {question.type === 'fill-in-blank' ? (
                <span className="flex px-3 py-1 border rounded-md text-sm">
                  <span className="mr-1">1.</span> Fill in the Blank
                </span>
              ) : (
                <span className="flex px-3 py-1 border rounded-md text-sm">
                  <Check className="h-4 w-4 mr-1" /> 
                  <span className="mr-1">2.</span> Multiple Choice
                </span>
              )}
            </div>
            
            {/* Time dropdown */}
            <div className="ml-4 relative">
              <button className="flex items-center px-3 py-1 border rounded-md text-sm">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                {question.timeLimit}
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            {/* Points dropdown */}
            <div className="ml-2 relative">
              <button className="flex items-center px-3 py-1 border rounded-md text-sm">
                <Award className="h-4 w-4 mr-1 text-gray-500" />
                {question.points}
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            {/* Spacer */}
            <div className="flex-grow"></div>
            
            {/* AI button */}
            <button className="flex items-center px-3 py-1 border rounded-md text-sm ml-2">
              <Sparkles className="h-4 w-4 mr-1" />
              AI
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            
            {/* Action buttons */}
            <button className="p-2 ml-2 hover:bg-gray-100 rounded">
              <Copy className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 ml-1 hover:bg-gray-100 rounded">
              <Edit className="h-4 w-4 text-gray-600" /> 
            </button>
            <button className="p-2 ml-1 hover:bg-gray-100 rounded">
              <Trash className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          {/* Question content */}
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">{question.questionText}</h3>
            
            {question.type === 'fill-in-blank' ? (
              <div>
                <p className="text-gray-600 mb-2">Answer</p>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <p>{question.answer}</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Answer choices</p>
                <div className="grid grid-cols-2 gap-4">
                  {question.choices?.map((choice, index) => (
                    <div key={index} className="flex items-center">
                      {choice.isCorrect ? (
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <p>{choice.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionComponent;