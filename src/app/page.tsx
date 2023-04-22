import APIKeyCheck from '@/components/APIKeyCheck';
import MyInfo from '@/components/MyInfo';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const useruser = session?.user;

  if (!useruser) {
    redirect('/auth/signin');
  }

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4 min-w-0"></div>
      <MyInfo />
      <APIKeyCheck />
    </section>
  );
}
