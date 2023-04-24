'use client';
import NewChat from './NewChat';
import useSWR from 'swr';

export default function Sidabar() {
  const { data, isLoading: loading } = useSWR();

  return (
    <div className="p-2 flex flex-col h-screen">
      <p>안녕 못해</p>
      <NewChat />
    </div>
  );
}
