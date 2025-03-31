"use client";
// import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';
// import QuizSettings from '@/components/quiz-settings';
// import { Separator } from '@/components/ui/separator';
// import Image from 'next/image';
// import React from 'react';

// const MultipleChoice = () => {
//   return (
//    <>
   
//     <Navbar />  
//       <div className='flex flex-col bg-gradient-to-br from-blue-50 to-white items-center justify-center min-h-screen'>  
      
//           <div className="bg-white p-3 shadow-md w-full md:w-[90%] lg:w-[70%] max-w-4xl md:rounded-lg">
//             <h1 className="text-2xl lg:text-4xl font-bold text-primary tracking-wider uppercase text-center py-2">
//               Multiple Choice Quiz
//             </h1>
//             <Separator />
//             <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:px-6 py-3 gap-4">
//               <div className="relative h-full">
//                 <Image
//                   src={"/hero.webp"}
//                   alt="hero-image"
//                   priority
//                   width={450}
//                   height={450}
//                   className="object-cover object-center mx-auto"
//                 />
//               </div>
//               <QuizSettings />
//             </div>
//           </div>
      

//       </div>        <Footer />
//    </> 
//   );
// }

// export default MultipleChoice;
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, RefreshCw } from 'lucide-react';

// Dummy quiz data
const dummyQuizData = {
  title: "World Geography Quiz",
  description: "Test your knowledge of world geography!",
  questions: [
    {
      id: 1,
      question: "Which country is home to the Great Barrier Reef?",
      options: ["Brazil", "Australia", "Thailand", "Mexico"],
      correctAnswer: "Australia",
      explanation: "The Great Barrier Reef is located off the coast of Queensland, Australia. It's the world's largest coral reef system."
    },
    {
      id: 2,
      question: "What is the capital city of Japan?",
      options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      correctAnswer: "Tokyo",
      explanation: "Tokyo is the capital and most populous city of Japan."
    },
    {
      id: 3,
      question: "Which mountain range separates Europe from Asia?",
      options: ["Alps", "Himalayas", "Andes", "Ural Mountains"],
      correctAnswer: "Ural Mountains",
      explanation: "The Ural Mountains form a natural boundary between Europe and Asia."
    },
    {
      id: 4,
      question: "Which of these countries is NOT in Africa?",
      options: ["Egypt", "Nigeria", "Bangladesh", "Kenya"],
      correctAnswer: "Bangladesh",
      explanation: "Bangladesh is located in South Asia, not in Africa."
    },
    {
      id: 5,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean",
      explanation: "The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth's surface."
    }
  ]
};

const MultipleChoiceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = () => {
    if (!selectedAnswer || showExplanation) return;
    
    setShowExplanation(true);
    
    if (selectedAnswer === dummyQuizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < dummyQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
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
              
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {currentQ.options.map((option) => (
                  <div key={option} className={`flex items-center space-x-2 border rounded-lg p-4 mb-3 ${
                    showExplanation && option === currentQ.correctAnswer ? 'bg-green-50 border-green-200' : 
                    (showExplanation && option === selectedAnswer && option !== currentQ.correctAnswer ? 'bg-red-50 border-red-200' : '')
                  }`}>
                    <RadioGroupItem 
                      value={option} 
                      id={option} 
                      disabled={showExplanation}
                    />
                    <Label 
                      htmlFor={option} 
                      className="flex-grow cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              {showExplanation && (
                <div className="p-4 rounded-lg mt-4 bg-blue-50 border border-blue-200">
                  <p className="font-medium mb-2">
                    {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : 'Incorrect!'}
                  </p>
                  <p>{currentQ.explanation}</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div>Score: {score}</div>
              <div>
                {!showExplanation ? (
                  <Button 
                    onClick={handleAnswer} 
                    disabled={!selectedAnswer}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    {currentQuestion < dummyQuizData.questions.length - 1 ? (
                      <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
                    ) : (
                      'Finish'
                    )}
                  </Button>
                )}
              </div>
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
                  ? "Excellent! You're a geography expert!" 
                  : (score / dummyQuizData.questions.length) >= 0.5 
                    ? "Good job! You know your geography!" 
                    : "Keep exploring to improve your geography knowledge!"}
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

export default MultipleChoiceQuiz;