import { SignedIn, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <div className='fixed inset-x-0 border-b border-b-zinc-900/10'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <h1 className='font-medium text-xl'>Quiz</h1>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: '35px',
                  height: '35px',
                },
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
}
