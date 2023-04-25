'use client';
import { FullPost } from '@/model/conversation';
import NewChat from './NewChat';
import useSWR from 'swr';

export default function Sidabar() {
  const { data, isLoading: loading } = useSWR<FullPost[]>('/api/conversations');
  console.log('data', data);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="rounded-lg px-5 py-3 border-gray-700 border flex items-center justify-center space-x-2 hover:bg-gray-700/70 cursor-pointer text-gray-300 transition-all duration-200 ease-out">
        <p>안녕 못해</p>
        <NewChat />
      </div>
      {data && (
        <ul>
          {data.map((conversation) => (
            <li key={conversation.id} className="mb-4">
              {conversation.roomname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
