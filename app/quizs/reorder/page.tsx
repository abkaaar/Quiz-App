"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, RefreshCw, Check } from 'lucide-react';

// Dummy quiz data
const dummyQuizData = {
  title: "Historical Events Sequence",
  description: "Arrange these historical events in chronological order, from earliest to latest.",
  questions: [
    {
      id: 1,
      title: "American Revolution Timeline",
      correctSequence: [
        "Boston Tea Party (1773)",
        "Declaration of Independence (1776)",
        "Battle of Yorktown (1781)",
        "U.S. Constitution adopted (1788)",
        "George Washington becomes first president (1789)"
      ],
      explanation: "The American Revolution began with resistance to British taxation, leading to the Declaration of Independence, the Revolutionary War, and finally the establishment of the new government."
    },
    {
      id: 2,
      title: "Space Exploration Milestones",
      correctSequence: [
        "First satellite in orbit - Sputnik 1 (1957)",
        "First human in space - Yuri Gagarin (1961)",
        "First moon landing - Apollo 11 (1969)",
        "First space station - Salyut 1 (1971)",
        "First reusable spacecraft - Space Shuttle (1981)"
      ],
      explanation: "The Space Race began with satellite launches, followed by human spaceflight, then lunar exploration, space stations, and finally reusable spacecraft technology."
    }
  ]
};

const SequenceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  useEffect(() => {
    // Initialize with shuffled sequence
    if (dummyQuizData.questions.length > 0) {
      const shuffled = [...dummyQuizData.questions[currentQuestion].correctSequence]
        .sort(() => Math.random() - 0.5);
      setUserSequence(shuffled);
    }
  }, [currentQuestion]);

interface MoveItemParams {
    index: number;
    direction: 'up' | 'down';
}

const moveItem = (index: MoveItemParams['index'], direction: MoveItemParams['direction']) => {
    if (showExplanation) return;

    const newSequence = [...userSequence];
    if (direction === 'up' && index > 0) {
        [newSequence[index], newSequence[index - 1]] = [newSequence[index - 1], newSequence[index]];
    } else if (direction === 'down' && index < userSequence.length - 1) {
        [newSequence[index], newSequence[index + 1]] = [newSequence[index + 1], newSequence[index]];
    }
    setUserSequence(newSequence);
};

  const checkAnswer = () => {
    const currentQ = dummyQuizData.questions[currentQuestion];
    
    // Check if sequences match exactly
    const isCorrect = currentQ.correctSequence.every(
      (item, index) => item === userSequence[index]
    );
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < dummyQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setQuizCompleted(false);
    const shuffled = [...dummyQuizData.questions[0].correctSequence]
      .sort(() => Math.random() - 0.5);
    setUserSequence(shuffled);
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
              <div className="text-xl font-medium text-center py-4">{currentQ.title}</div>
              
              <div className="space-y-2">
                {userSequence.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center p-3 border rounded-lg ${
                      showExplanation ? 
                        (item === currentQ.correctSequence[index] ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') 
                        : 'bg-white'
                    }`}
                  >
                    <div className="mr-2 w-6 text-center font-bold">{index + 1}</div>
                    <div className="flex-grow">{item}</div>
                    {!showExplanation && (
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => moveItem(index, 'up')} 
                          disabled={index === 0 || showExplanation}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={() => moveItem(index, 'down')} 
                          disabled={index === userSequence.length - 1 || showExplanation}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
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
                disabled={showExplanation}
              >
                Check Answer
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!showExplanation}
              >
                {currentQuestion < dummyQuizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </CardFooter>
          </>
        ) : (
          <CardHeader>
            <CardTitle>Quiz Completed!</CardTitle>
            <CardDescription>Your score: {score}/{dummyQuizData.questions.length}</CardDescription>
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

export default SequenceQuiz;
