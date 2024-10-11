import QuizCard from '@/components/quizCard/quizCard';

export default async function Quiz({ searchParams }) {
  const { difficulty, category, type, question } = searchParams;

  const response = await fetch(
    `https://opentdb.com/api.php?amount=${question}${
      category != 'any' ? `&category=${category}` : ''
    }${difficulty != 'any' ? `&difficulty=${difficulty}` : ''}${
      type != 'any' ? `&type=${type}` : ''
    }`
  );

  const quizes = await response.json();

  const questions = quizes.results.map(quiz => quiz.question);
  const choices = quizes.results.map(quiz => [
    ...quiz.incorrect_answers,
    quiz.correct_answer,
  ]);
  const correctAnswers = quizes.results.map(quiz => quiz.correct_answer);

  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <div className='w-full'>
        <div className='mt-2 max-w-screen-sm mx-auto'>
          <QuizCard
            question={questions}
            choices={choices}
            correctAnswer={correctAnswers}
            totalQuestion={question}
          />
        </div>
      </div>
    </div>
  );
}
