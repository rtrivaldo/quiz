'use client';

import decodeHTMLEntities from '@/lib/decodeHTMLEntities';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import shuffleArray from '@/lib/shuffleArray';

export default function QuizCard({
  question,
  choices,
  correctAnswer,
  totalQuestion,
  timerDuration = 3 * totalQuestion, // Default timer duration is 30 seconds for the entire quiz
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [totalWrongAnswers, setTotalWrongAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [timer, setTimer] = useState(timerDuration);
  const [isFinished, setIsFinished] = useState(false);

  // Save progress to localStorage
  const saveProgress = () => {
    const progress = {
      currentQuestion,
      totalScore,
      totalWrongAnswers,
      timer,
      lastUpdated: new Date().getTime(), // Save the current timestamp
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
  };

  // Load progress from localStorage and calculate time difference
  const loadProgress = () => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const {
        currentQuestion,
        totalScore,
        totalWrongAnswers,
        timer,
        lastUpdated,
      } = JSON.parse(savedProgress);

      const now = new Date().getTime();
      const timeElapsed = Math.floor((now - lastUpdated) / 1000); // Calculate elapsed time in seconds
      const newTimer = timer - timeElapsed;

      setCurrentQuestion(currentQuestion);
      setTotalScore(totalScore);
      setTotalWrongAnswers(totalWrongAnswers);
      setTimer(newTimer > 0 ? newTimer : 0);
    }
  };

  // Clear localStorage when quiz is finished
  const clearProgress = () => {
    localStorage.removeItem('quizProgress');
  };

  useEffect(() => {
    // Load progress when the component mounts
    loadProgress();

    // Shuffle choices when the component mounts
    const shuffled = choices.map(choiceSet => shuffleArray([...choiceSet]));
    setShuffledChoices(shuffled);
  }, [choices]);

  useEffect(() => {
    // Start timer countdown
    if (timer > 0 && !isFinished && currentQuestion <= totalQuestion) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
        saveProgress(); // Save progress on each timer update
      }, 1000);

      return () => clearInterval(interval); // Clear interval on component unmount
    } else if (timer === 0 || currentQuestion > totalQuestion) {
      setIsFinished(true);
      clearProgress(); // Clear progress when the quiz is finished
    }
  }, [timer, isFinished, totalQuestion, currentQuestion]);

  const handleAnswerClick = choice => {
    /* prevent user clicking more then once after question answered */
    if (selectedAnswer !== null) return;

    setSelectedAnswer(choice);
    if (choice === correctAnswer[currentQuestion - 1]) {
      setTotalScore(prevScore => prevScore + 1);
    } else {
      setTotalWrongAnswers(prevWrong => prevWrong + 1);
    }

    setTimeout(() => {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedAnswer(null);
    }, 500);
  };

  if (currentQuestion > totalQuestion || isFinished) {
    return (
      <div className='text-center'>
        <h1 className='text-3xl lg:text-4xl font-semibold'>
          Your Final Result!
        </h1>

        <div className='mt-6 grid grid-cols-2 gap-4 justify-center'>
          <div className='bg-zinc-200/50 py-6 md:py-8 flex flex-col justify-center items-center rounded-xl'>
            <p className='text-lg lg:text-xl font-semibold'>Correct Answer</p>
            <p className='mt-2 text-4xl lg:text-6xl font-semibold text-teal-600'>
              {totalScore}
            </p>
          </div>
          <div className='bg-zinc-200/50 py-6 md:py-8 flex flex-col justify-center items-center rounded-xl'>
            <p className='text-lg lg:text-xl font-semibold'>Incorrect Answer</p>
            <p className='mt-2 text-4xl lg:text-6xl font-semibold text-red-700'>
              {totalWrongAnswers}
            </p>
          </div>
          <div className='bg-zinc-200/50 py-6 md:py-8 flex flex-col justify-center items-center rounded-xl'>
            <p className='text-lg lg:text-xl font-semibold'>Total Answered</p>
            <p className='mt-2 text-4xl lg:text-6xl font-semibold'>
              {totalQuestion}
            </p>
          </div>
          <div className='bg-zinc-200/50 py-6 md:py-8 flex flex-col justify-center items-center rounded-xl'>
            <p className='text-lg lg:text-xl font-semibold'>Time Taken</p>
            <p className='mt-2 text-4xl lg:text-6xl font-semibold'>
              {timerDuration - timer}s
            </p>
          </div>
        </div>

        <Button asChild className='mt-6 w-full text-base' size='lg'>
          <Link href={'/'}>Attempt another quiz!</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className=''>
      <div className='flex items-center justify-between'>
        <p className='text-center font-medium'>Time left: {timer}s</p>
        <p className='text-center font-medium'>
          Question {currentQuestion} of {totalQuestion}
        </p>
      </div>

      <h1 className='mt-6 text-2xl text-center font-semibold'>
        {decodeHTMLEntities(question[currentQuestion - 1])}
      </h1>
      <div className='mt-6 flex flex-col gap-2'>
        {shuffledChoices[currentQuestion - 1]?.map((choice, index) => (
          <div
            key={index}
            className={`${
              selectedAnswer === choice
                ? choice === correctAnswer[currentQuestion - 1]
                  ? 'bg-teal-400'
                  : 'bg-red-400'
                : 'bg-zinc-200'
            } p-4 rounded-md font-semibold cursor-pointer`}
            onClick={() => handleAnswerClick(choice)}
          >
            {decodeHTMLEntities(choice)}
          </div>
        ))}
      </div>
    </div>
  );
}
