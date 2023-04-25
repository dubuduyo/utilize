import ChatPage from '@/components/ChatPage';
import Sidabar from '@/components/Sidabar';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="flex">
      <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
        <Sidabar />
      </div>
      <ChatPage />
    </div>
  );
}
