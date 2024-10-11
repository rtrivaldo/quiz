import GenerateQuizCard from '@/components/generateQuizCard/generateQuizCard';
import Navbar from '@/components/navbar/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />

      <div className='h-screen flex justify-center items-center'>
        <GenerateQuizCard />
      </div>
    </main>
  );
}
