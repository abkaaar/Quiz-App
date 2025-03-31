"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRight, RefreshCw } from 'lucide-react';

// Dummy quiz data
const dummyQuizData = {
  title: "Science Facts: Truth or False",
  description: "Test your knowledge of scientific facts!",
  questions: [
    {
      id: 1,
      question: "The Sun is a planet.",
      answer: false,
      explanation: "The Sun is actually a star, not a planet."
    },
    {
      id: 2,
      question: "Water boils at 100 degrees Celsius at sea level.",
      answer: true,
      explanation: "Water does indeed boil at 100°C (212°F) at standard atmospheric pressure (sea level)."
    },
    {
      id: 3,
      question: "Humans have 8 fingers and 2 thumbs.",
      answer: true,
      explanation: "Anatomically, humans have 8 fingers and 2 thumbs across both hands."
    },
    {
      id: 4,
      question: "Mount Everest is the tallest mountain in the world.",
      answer: true,
      explanation: "Mount Everest is the tallest mountain above sea level, standing at 8,848.86 meters (29,031.7 feet)."
    },
    {
      id: 5,
      question: "Gravity is stronger on the moon than on Earth.",
      answer: false,
      explanation: "Gravity on the moon is approximately 1/6th of Earth's gravity."
    }
  ]
};

const TruthOrFalseQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  interface Question {
    id: number;
    question: string;
    answer: boolean;
    explanation: string;
  }

  interface QuizData {
    title: string;
    description: string;
    questions: Question[];
  }

  const handleAnswer = (answer: boolean): void => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    
    setSelectedAnswer(answer);
    
    if (answer === dummyQuizData.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < dummyQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const currentQ = dummyQuizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / dummyQuizData.questions.length) * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        {!quizCompleted ? (
          <>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{dummyQuizData.title}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {currentQuestion + 1}/{dummyQuizData.questions.length}
                </Badge>
              </div>
              <CardDescription>{dummyQuizData.description}</CardDescription>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-xl font-medium text-center py-4">{currentQ.question}</div>
              
              <div className="flex justify-center gap-4">
                <Button 
                  className={`w-32 h-14 text-lg ${
                    selectedAnswer === true ? 
                      (currentQ.answer === true ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700') : 
                      'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={() => handleAnswer(true)}
                  disabled={selectedAnswer !== null}
                >
                  <Check className="mr-2" /> True
                </Button>
                
                <Button 
                  className={`w-32 h-14 text-lg ${
                    selectedAnswer === false ? 
                      (currentQ.answer === false ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700') : 
                      'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={() => handleAnswer(false)}
                  disabled={selectedAnswer !== null}
                >
                  <X className="mr-2" /> False
                </Button>
              </div>
              
              {showExplanation && (
                <div className={`p-4 rounded-lg mt-4 ${selectedAnswer === currentQ.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="font-medium mb-2">
                    {selectedAnswer === currentQ.answer ? 'Correct!' : 'Incorrect!'}
                  </p>
                  <p>{currentQ.explanation}</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div>Score: {score}</div>
              {showExplanation && (
                <Button onClick={handleNext}>
                  {currentQuestion < dummyQuizData.questions.length - 1 ? (
                    <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
                  ) : (
                    'Finish'
                  )}
                </Button>
              )}
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Quiz Completed!</CardTitle>
              <CardDescription>Here's how you did</CardDescription>
            </CardHeader>
            
            <CardContent className="text-center py-6">
              <div className="text-5xl font-bold mb-4">{score}/{dummyQuizData.questions.length}</div>
              <p className="text-xl mb-6">
                {(score / dummyQuizData.questions.length) >= 0.8 
                  ? "Great job! You're a master!" 
                  : (score / dummyQuizData.questions.length) >= 0.5 
                    ? "Good effort! Keep learning!" 
                    : "Keep practicing to improve your score!"}
              </p>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <Button onClick={resetQuiz}>
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default TruthOrFalseQuiz;