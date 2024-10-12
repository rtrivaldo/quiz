'use client';

import { Combobox } from '@/components/combobox/combobox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function GenerateQuizCard() {
  const [difficultyValue, setDifficultyValue] = useState('any');
  const [categoryValue, setCategoryValue] = useState('any');
  const [typeValue, setTypeValue] = useState('any');
  const [numQuestionsValue, setNumQuestionsValue] = useState(10);

  const handleDifficultyChange = selectedValue => {
    setDifficultyValue(selectedValue);
  };

  const handleCategoryChange = selectedValue => {
    setCategoryValue(selectedValue);
  };

  const handleTypeChange = selectedValue => {
    setTypeValue(selectedValue);
  };

  const handlenumQuestionsChange = value => {
    setNumQuestionsValue(value);
  };

  return (
    <div className='sm:p-6 rounded-xl sm:border border-zinc-900/10 sm :shadow-md w-full md:w-4/5 lg:w-auto'>
      <h1 className='text-2xl font-medium text-center'>Generate Quiz Now!</h1>

      <div className='mt-6 flex flex-col lg:flex-row gap-2 lg:gap-4'>
        <div className=''>
          <p className='font-medium'>Difficulty</p>
          <Combobox
            options={difficulty}
            placeholder='Select Difficulty'
            defaultValue='any'
            className='mt-2 w-full min-w-[200px]'
            onChange={handleDifficultyChange}
          />
        </div>

        <div className=''>
          <p className='font-medium'>Category</p>
          <Combobox
            options={category}
            placeholder='Select Category'
            defaultValue='any'
            className='mt-2 w-full min-w-[320px]'
            onChange={handleCategoryChange}
          />
        </div>

        <div className=''>
          <p className='font-medium'>Type</p>
          <Combobox
            options={type}
            placeholder='Select Type'
            defaultValue='any'
            className='mt-2 w-full min-w-[200px]'
            onChange={handleTypeChange}
          />
        </div>
      </div>

      <div className='mt-2 lg:mt-4'>
        <p className='font-medium'>Number of Questions</p>
        <input
          type='number'
          name='questions'
          id='questions'
          defaultValue={10}
          className='border border-zinc-200 shadow-sm rounded-md bg-zinc-100 outline-none px-3 py-2 font-semibold mt-2 w-full'
          onChange={e => handlenumQuestionsChange(e.target.value)}
        />
      </div>

      <Button className='mt-6 w-full text-base' asChild size='lg'>
        <Link
          href={{
            pathname: '/quiz',
            query: {
              difficulty: difficultyValue,
              category: categoryValue,
              type: typeValue,
              question: numQuestionsValue,
            },
          }}
        >
          Start Quiz
        </Link>
      </Button>
    </div>
  );
}

const difficulty = [
  {
    value: 'any',
    label: 'Any Difficulty',
  },
  {
    value: 'easy',
    label: 'Easy',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'hard',
    label: 'Hard',
  },
];

const category = [
  {
    value: 'any',
    label: 'Any Category',
  },
  {
    value: '9',
    label: 'General Knowledge',
  },
  {
    value: '10',
    label: 'Entertainment: Books',
  },
  {
    value: '11',
    label: 'Entertainment: Film',
  },
  {
    value: '12',
    label: 'Entertainment: Music',
  },
  {
    value: '13',
    label: 'Entertainment: Musicals & Theatres',
  },
  {
    value: '14',
    label: 'Entertainment: Television',
  },
  {
    value: '15',
    label: 'Entertainment: Video Games',
  },
  {
    value: '16',
    label: 'Entertainment: Board Games',
  },
  {
    value: '17',
    label: 'Science & Nature',
  },
  {
    value: '18',
    label: 'Science: Computers',
  },
  {
    value: '19',
    label: 'Science: Mathematics',
  },
  {
    value: '20',
    label: 'Mythology',
  },
  {
    value: '21',
    label: 'Sports',
  },
  {
    value: '22',
    label: 'Geography',
  },
  {
    value: '23',
    label: 'History',
  },
  {
    value: '24',
    label: 'Politics',
  },
  {
    value: '25',
    label: 'Art',
  },
  {
    value: '26',
    label: 'Celebrities',
  },
  {
    value: '27',
    label: 'Animals',
  },
  {
    value: '28',
    label: 'Vehicles',
  },
  {
    value: '29',
    label: 'Entertainment: Comics',
  },
  {
    value: '30',
    label: 'Science: Gadgets',
  },
  {
    value: '31',
    label: 'Entertainment: Japanese Anime & Manga',
  },
  {
    value: '32',
    label: 'Entertainment: Cartoon & Animations',
  },
];

const type = [
  {
    value: 'any',
    label: 'Any Type',
  },
  {
    value: 'multiple',
    label: 'Multiple Choices',
  },
  {
    value: 'boolean',
    label: 'True / False',
  },
];
