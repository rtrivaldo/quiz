'use client';

import decodeHTMLEntities from '@/lib/decodeHTMLEntities';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function QuizCard({
  question,
  choices,
  correctAnswer,
  totalQuestion,
  timerDuration = 30, // Set default timer duration to 30 seconds for the entire quiz
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [totalWrongAnswers, setTotalWrongAnswers] = useState(0); // New state for total wrong answers
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [timer, setTimer] = useState(timerDuration);
  const [isFinished, setIsFinished] = useState(false); // New state to check if quiz is finished

  // Function to shuffle an array
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  useEffect(() => {
    // Shuffle choices when the component mounts
    const shuffled = choices.map(choiceSet => shuffleArray([...choiceSet]));
    setShuffledChoices(shuffled);
  }, [choices]);

  useEffect(() => {
    // Start timer countdown for the entire quiz
    if (timer > 0 && !isFinished && currentQuestion <= totalQuestion) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval); // Clear interval on component unmount
    } else if (timer === 0 || currentQuestion > totalQuestion) {
      setIsFinished(true);
    }
  }, [timer, isFinished, totalQuestion]);

  const handleAnswerClick = choice => {
    // Prevent further clicks if already selected
    if (selectedAnswer !== null) return;

    setSelectedAnswer(choice);
    // Check if the selected answer is correct
    if (choice === correctAnswer[currentQuestion - 1]) {
      setTotalScore(totalScore + 1);
    } else {
      setTotalWrongAnswers(totalWrongAnswers + 1); // Increment wrong answers if the choice is incorrect
    }

    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }, 500);
  };

  // Check if all questions are answered or the quiz is finished
  if (currentQuestion > totalQuestion || isFinished) {
    return (
      <div className='text-center'>
        <h1 className='text-4xl font-semibold'>Your Final Result!</h1>

        <div className='mt-6 grid grid-cols-2 gap-4 justify-center'>
          <div className='bg-zinc-200/50  py-8 flex flex-col justify-center items-center rounded-xl'>
            <p className='text-xl font-semibold'>Correct Answer</p>
            <p className='mt-2 text-6xl font-semibold text-teal-700'>
              {totalScore}
            </p>
          </div>
          <div className='bg-zinc-200/50  py-6 flex flex-col justify-center items-center rounded-xl'>
            <p className='text-xl font-semibold'>Incorrect Answer</p>
            <p className='mt-2 text-6xl font-semibold text-teal-700'>
              {totalWrongAnswers}
            </p>
          </div>
          <div className='bg-zinc-200/50  py-6 flex flex-col justify-center items-center rounded-xl'>
            <p className='text-xl font-semibold'>Total Answered</p>
            <p className='mt-2 text-6xl font-semibold text-teal-700'>
              {totalQuestion}
            </p>
          </div>
          <div className='bg-zinc-200/50  py-6 flex flex-col justify-center items-center rounded-xl'>
            <p className='text-xl font-semibold'>Time Taken</p>
            <p className='mt-2 text-6xl font-semibold text-teal-700'>
              {timerDuration - timer}s
            </p>
          </div>
        </div>

        <Button asChild className='mt-2'>
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
                  ? 'bg-teal-400' // Correct answer selected
                  : 'bg-red-400' // Incorrect answer selected
                : 'bg-zinc-200' // Default background
            } p-4 rounded-md font-semibold cursor-pointer`}
            onClick={() => handleAnswerClick(choice)}
          >
            {choice}
          </div>
        ))}
      </div>
    </div>
  );
}
