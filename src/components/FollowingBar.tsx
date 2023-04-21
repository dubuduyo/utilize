'use client';
import Link from 'next/link';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR('/api/me');
  console.log(data);
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      <p>안녕~</p>
    </section>
  );
}
