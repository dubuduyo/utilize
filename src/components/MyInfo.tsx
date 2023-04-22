'use client';
import { HomeUser } from '@/model/user';
import Link from 'next/link';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function MyInfo() {
  const { data, isLoading: loading, error } = useSWR<HomeUser>('/api/me');
  const apikey = data?.userkey;

  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {!apikey && <p>{`You don't have API Key`}</p>}
      {apikey && <p>{apikey}</p>}
    </section>
  );
}
