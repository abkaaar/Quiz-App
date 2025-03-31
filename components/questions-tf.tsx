"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import useModalStore from "@/hooks/useModalStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { toast } from "sonner";

type Props = {
  questions: {
    category: string;
    id: string;
    correctAnswer: string;
    question: string;
    type: "boolean"; // Ensures it's a true/false type question
  }[];
  limit: number;
  category: string;
};

const TrueFalseQuiz = ({ questions, limit, category }: Props) => {
  const [curr, setCurr] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const { onOpen } = useModalStore();
  const [key, setKey] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  const handleCheck = (answer: string, isTimeUp = false) => {
    setSelected(answer);
    if (answer === questions[curr].correctAnswer && !isTimeUp) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setCurr((curr) => curr + 1);
    setSelected(null);
    setKey((prevKey) => prevKey + 1);
  };

  const handleQuit = () => {
    onOpen("quitQuiz");
  };

  const handleShowResult = () => {
    onOpen("showResults", { score, limit });
  };

  const handleTimeUp = () => {
    handleCheck(questions[curr].correctAnswer, true);
    toast.info("You ran out of Time!");
  };

  useEffect(() => {
    setProgressValue((100 / limit) * (curr + 1));
  }, [curr, limit]);

  if (!questions || questions.length === 0) {
    return <Loader2 className="size-10 text-white animate-spin" />;
  }

  return (
    <div className="bg-white px-3 py-5 md:p-6 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl sm:rounded-lg">
      <Progress value={progressValue} />
      <div className="flex justify-between items-center h-20 text-sm md:text-base">
        <div className="space-y-1">
          <p>Category: {category}</p>
          <p>Score: {score}</p>
        </div>
        <CountdownCircleTimer
          key={key}
          isPlaying={!selected}
          duration={10}
          size={45}
          strokeWidth={4}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 5, 2, 0]}
          onComplete={handleTimeUp}
        >
          {({ remainingTime }) => <div className="text-center">{remainingTime}</div>}
        </CountdownCircleTimer>
      </div>
      <Separator />
      <div className="min-h-[50vh] py-4 xl:py-8 px-3 md:px-5 w-full">
        <h2 className="text-2xl text-center font-medium">{`Q${curr + 1}. ${
          questions[curr].question
        }`}</h2>
        <div className="py-4 md:py-5 xl:py-7 flex flex-col gap-y-3 md:gap-y-5">
          {["True", "False"].map((answer) => (
            <button
              key={answer}
              className={`option ${selected === answer ? "selected" : ""}`}
              disabled={!!selected}
              onClick={() => handleCheck(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
        <Separator />
        <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
          <Button
            disabled={!selected}
            onClick={() =>
              questions.length === curr + 1 ? handleShowResult() : handleNext()
            }
          >
            {questions.length - 1 !== curr ? "Next Question" : "Show Results"}
          </Button>
          <Button variant={"destructive"} onClick={handleQuit}>
            Quit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseQuiz;
