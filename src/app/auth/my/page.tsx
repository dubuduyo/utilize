import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  return <section className="flex justify-center mt-24"></section>;
}
