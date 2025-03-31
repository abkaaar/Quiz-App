"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, RefreshCw } from 'lucide-react';

// Dummy quiz data
const dummyQuizData = {
  title: "English Grammar Fill-in-the-Blanks",
  description: "Complete the sentences with the correct words!",
  questions: [
    {
      id: 1,
      question: "The sun ____ in the east and sets in the west.",
      answer: "rises",
      caseSensitive: false,
      acceptableAnswers: ["rises", "rise"],
      explanation: "The sun rises in the east and sets in the west. This is a simple present tense fact."
    },
    {
      id: 2,
      question: "Please remember to ____ off the lights when you leave the room.",
      answer: "turn",
      caseSensitive: false,
      acceptableAnswers: ["turn", "switch"],
      explanation: "We use 'turn off' or 'switch off' when talking about lights."
    },
    {
      id: 3,
      question: "Marie Curie was the first person to win Nobel Prizes in two different ____ fields.",
      answer: "scientific",
      caseSensitive: false,
      acceptableAnswers: ["scientific", "science"],
      explanation: "Marie Curie won Nobel Prizes in Physics and Chemistry, which are scientific fields."
    },
    {
      id: 4,
      question: "Water ____ at 100 degrees Celsius at standard atmospheric pressure.",
      answer: "boils",
      caseSensitive: false,
      acceptableAnswers: ["boils", "boil"],
      explanation: "Water boils at 100 degrees Celsius at standard atmospheric pressure."
    },
    {
      id: 5,
      question: "The Great Wall of China is the only human-made structure visible from ____ with the naked eye.",
      answer: "space",
      caseSensitive: false,
      acceptableAnswers: ["space", "orbit"],
      explanation: "Although it's a common myth, some say the Great Wall of China can be seen from space or orbit."
    }
  ]
};

const FillInTheBlanksQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = () => {
    if (!userAnswer || showExplanation) return;
    
    const currentQ = dummyQuizData.questions[currentQuestion];
    let correct = false;
    
    // Check if answer is in acceptable answers list
    if (currentQ.caseSensitive) {
      correct = currentQ.acceptableAnswers.includes(userAnswer);
    } else {
      correct = currentQ.acceptableAnswers.some(ans => 
        ans.toLowerCase() === userAnswer.toLowerCase()
      );
    }
    
    if (correct) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < dummyQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setShowExplanation(false);
      setIsCorrect(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer("");
    setShowExplanation(false);
    setIsCorrect(false);
    setQuizCompleted(false);
  };

  const formatQuestion = (questionText: string) => {
    return questionText.split("____").map((part, index) => (
      index === 0 ? part : (
        <>
          <span key="blank" className="inline-block w-24 mx-1 border-b-2 border-gray-400"></span>
          {part}
        </>
      )
    ));
  };

  const currentQ = dummyQuizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / dummyQuizData.questions.length) * 100;
  
  // Split the question text around the blank
  const questionParts = currentQ.question.split("____");

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
              <div className="text-xl font-medium text-center py-4">
                {questionParts[0]}
                <span className={`inline-block min-w-24 mx-1 px-2 border-b-2 ${showExplanation ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-400'}`}>
                  {showExplanation ? userAnswer || '\u00A0' : '\u00A0'}
                </span>
                {questionParts[1]}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here"
                  disabled={showExplanation}
                  className="flex-grow"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAnswer();
                    }
                  }}
                />
                {!showExplanation && (
                  <Button onClick={handleAnswer} disabled={!userAnswer}>
                    Submit
                  </Button>
                )}
              </div>
              
              {showExplanation && (
                <div className={`p-4 rounded-lg mt-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="font-medium mb-2">
                    {isCorrect ? 'Correct!' : `Incorrect! The answer is "${currentQ.answer}".`}
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
                  ? "Excellent! Your vocabulary is impressive!" 
                  : (score / dummyQuizData.questions.length) >= 0.5 
                    ? "Good job! You have a solid understanding!" 
                    : "Keep practicing to build your vocabulary!"}
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

export default FillInTheBlanksQuiz;