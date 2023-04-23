import ChatPage from '@/components/ChatPage';
import Sidabar from '@/components/Sidabar';

export default function LobbyPage() {
  return (
    <div className="flex">
      <Sidabar />
      <ChatPage />
    </div>
  );
}
