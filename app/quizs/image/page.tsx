"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, RefreshCw, X } from 'lucide-react';

// Dummy image quiz data
const dummyImageQuizData = {
  title: "Guess the Landmark",
  description: "Identify the landmark from the image and choose the correct answer.",
  questions: [
    {
      id: 1,
      imageUrl: "/tower.jpg",  // Image URL
      options: [
        "Eiffel Tower",
        "Statue of Liberty",
        "Great Wall of China",
        "Colosseum"
      ],
      correctAnswer: "Eiffel Tower",
      explanation: "The Eiffel Tower is a famous landmark located in Paris, France."
    },
    {
      id: 2,
      imageUrl: "/wall.jpg",  // Image URL
      options: [
        "Eiffel Tower",
        "Statue of Liberty",
        "Great Wall of China",
        "Colosseum"
      ],
      correctAnswer: "Great Wall of China",
      explanation: "The Great Wall of China is a series of fortifications made of various materials, and it is one of the longest structures ever built by humans."
    }
  ]
};

const ImageQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = dummyImageQuizData.questions[currentQuestion];

  const checkAnswer = () => {
    if (selectedOption === currentQ.correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < dummyImageQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setQuizCompleted(false);
    setSelectedOption(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        {!quizCompleted ? (
          <>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{dummyImageQuizData.title}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {currentQuestion + 1}/{dummyImageQuizData.questions.length}
                </Badge>
              </div>
              <CardDescription>{dummyImageQuizData.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-xl font-medium text-center py-4">Identify this Landmark</div>
              <div className="flex justify-center">
                <img 
                  src={currentQ.imageUrl} 
                  alt="Landmark" 
                  className="w-full max-w-md rounded-lg" 
                />
              </div>

              <div className="space-y-4 mt-6">
                {currentQ.options.map((option, index) => (
                  <Button 
                    key={index} 
                    onClick={() => setSelectedOption(option)} 
                    className={`w-full ${selectedOption === option ? 'bg-blue-500' : 'bg-blue-400'} ${showExplanation ? (option === currentQ.correctAnswer ? 'bg-green-500' : 'bg-red-500') : ''}`}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {showExplanation && (
                <div className="mt-4 p-4 border rounded-lg">
                  <p className="font-medium">Explanation:</p>
                  <p>{currentQ.explanation}</p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button 
                onClick={checkAnswer} 
                disabled={!selectedOption || showExplanation}
              >
                Check Answer
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!showExplanation}
              >
                {currentQuestion < dummyImageQuizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </CardFooter>
          </>
        ) : (
          <CardHeader>
            <CardTitle>Quiz Completed!</CardTitle>
            <CardDescription>Your score: {score}/{dummyImageQuizData.questions.length}</CardDescription>
            <CardFooter className="flex justify-center">
              <Button onClick={resetQuiz}>
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </CardFooter>
          </CardHeader>
        )}
      </Card>
    </div>
  );
};

export default ImageQuiz;
