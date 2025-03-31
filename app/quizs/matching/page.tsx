"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowRight, RefreshCw } from 'lucide-react';

// Dummy quiz data
const dummyQuizData = {
  title: "Match Countries to Capitals",
  description: "Match each country with its capital city!",
  pairs: [
    { id: 1, left: "France", right: "Paris" },
    { id: 2, left: "Japan", right: "Tokyo" },
    { id: 3, left: "Egypt", right: "Cairo" },
    { id: 4, left: "Brazil", right: "Brasília" },
    { id: 5, left: "Canada", right: "Ottawa" }
  ]
};

const MatchingQuiz = () => {
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Shuffle the right side options for display
  const [shuffledRightOptions, setShuffledRightOptions] = useState<string[]>([]);
  
  useEffect(() => {
    const shuffled = [...dummyQuizData.pairs]
      .map(item => item.right)
      .sort(() => Math.random() - 0.5);
    setShuffledRightOptions(shuffled);
  }, []);

interface Match {
    [key: string]: string;
}

const handleMatch = (leftItem: string, rightValue: string) => {
    setMatches((prevMatches: Match) => ({
        ...prevMatches,
        [leftItem]: rightValue
    }));
};

  const handleSubmit = () => {
    if (Object.keys(matches).length < dummyQuizData.pairs.length) return;
    
    let correctCount = 0;
    dummyQuizData.pairs.forEach(pair => {
      if (matches[pair.left] === pair.right) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResults(true);
  };

  const handleFinish = () => {
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setScore(0);
    setMatches({});
    setShowResults(false);
    setQuizCompleted(false);
    
    // Reshuffle the right options
    const shuffled = [...dummyQuizData.pairs]
      .map(item => item.right)
      .sort(() => Math.random() - 0.5);
    setShuffledRightOptions(shuffled);
  };

  const allMatched = Object.keys(matches).length === dummyQuizData.pairs.length;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        {!quizCompleted ? (
          <>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{dummyQuizData.title}</CardTitle>
                {showResults && (
                  <Badge variant="outline" className="ml-2">
                    Score: {score}/{dummyQuizData.pairs.length}
                  </Badge>
                )}
              </div>
              <CardDescription>{dummyQuizData.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {dummyQuizData.pairs.map((pair) => (
                <div key={pair.id} className="grid grid-cols-5 items-center gap-4">
                  <div className="col-span-2 font-medium text-right">
                    {pair.left}
                  </div>
                  
                  <div className="flex justify-center">
                    <div className={`w-8 h-0.5 ${
                      showResults 
                        ? (matches[pair.left] === pair.right ? 'bg-green-500' : 'bg-red-500')
                        : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="col-span-2">
                  <Select
  value={matches[pair.left] || ""}
  onValueChange={(value) => handleMatch(pair.left, value)}
  disabled={showResults}
>
  <SelectTrigger
    className={`w-full ${showResults && matches[pair.left] === pair.right ? 'border-green-500 bg-green-50' : showResults ? 'border-red-500 bg-red-50' : ''}`}
  >
    <SelectValue placeholder="Select match" />
  </SelectTrigger>
  <SelectContent>
    {matches[pair.left] === "" ? (
      <SelectItem value="">Select a capital</SelectItem>
    ) : null}
    {shuffledRightOptions.map((rightOption) => (
      <SelectItem key={rightOption} value={rightOption}>
        {rightOption}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

                    
                    {showResults && (
                      <div className={`mt-1 text-sm ${
                        matches[pair.left] === pair.right ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {matches[pair.left] !== pair.right && `Correct: ${pair.right}`}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
            
            <CardFooter className="flex justify-end">
              {!showResults ? (
                <Button onClick={handleSubmit} disabled={!allMatched}>
                  Submit Answers
                </Button>
              ) : (
                <Button onClick={handleFinish}>
                  Finish
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
              <div className="text-5xl font-bold mb-4">{score}/{dummyQuizData.pairs.length}</div>
              <p className="text-xl mb-6">
                {(score / dummyQuizData.pairs.length) >= 0.8 
                  ? "Excellent! You know your world capitals!" 
                  : (score / dummyQuizData.pairs.length) >= 0.5 
                    ? "Good job! You have a solid knowledge of world capitals!" 
                    : "Keep learning about world capitals!"}
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

export default MatchingQuiz;