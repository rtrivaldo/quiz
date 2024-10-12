# Quiz Generator

## Overview

Quiz Generator is an interactive web application built with Next.js, utilizing
Clerk Auth for authentication, Shadcn for UI components, and the Open Trivia
Database (API) to fetch quiz questions. The application allows users to create
customizable quizzes, where they can select the quiz category, type, difficulty,
and the total number of questions.

## Features

- Customizable Quiz Options:
  - Choose quiz category
  - Select quiz type (multiple choice, true/false)
  - Set the difficulty level (easy, medium, hard)
  - Specify the total number of questions
- Progress Saving:
  - Automatically saves the current quiz progress in local storage, ensuring
    that users can resume their quizzes even after closing the browser.
- Authentication:
  - Secure user login and registration via Clerk Auth.

## Live Demo

The Quiz Generator is deployed and hosted on Vercel. You can explore the live
version of the project using the following link:

[Live Demo](https://quiz-indol-iota.vercel.app/)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quiz-generator.git
   cd quiz-generator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory and add the necessary
     environment variables for Clerk and any other configurations.
4. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Sign in or create an account using Clerk Auth.
2. Customize your quiz by selecting the desired category, type, difficulty, and
   number of questions.
3. Start the quiz and track your progress.
4. If you need to close the browser, your current progress will be saved
   automatically.

## Technologies Used

- Next.js: A React framework for building server-side rendered applications.
- Clerk Auth: User authentication service.
- Shadcn: A component library for building beautiful UIs.
- Open Trivia Database: API for fetching quiz questions.
