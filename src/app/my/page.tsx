import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import APIKeyCheck from '@/components/APIKeyCheck';
import MyInfo from '@/components/MyInfo';

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4 min-w-0"></div>
      <MyInfo />
      <APIKeyCheck user={user} />
    </section>
  );
}
