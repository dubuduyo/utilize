import { useCallback, useRef, useState } from 'react';
import SelectDropdown from './ui/SelectDropdown';

export default function NewRoom() {
  const [roomName, setRoomName] = useState('');
  const [roomMemberCount, setRoomMemberCount] = useState();
  const inputRef = useRef<HTMLInputElement>(null);

  const checkRoomNameLen = useCallback((roomName: string) => {
    const lenReg = /^(\w|\W){2,10}$/;

    if (!lenReg.test(roomName)) {
      return false;
    }

    return true;
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRoomName('');

    if (!roomName) {
      alert('방 이름을 입력해주세요.');
      return;
    }

    if (!checkRoomNameLen(roomName)) {
      alert('이름 형식이 올바르지 않습니다.');
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-3 border-t border-neutral-300"
    >
      <input
        className="w-full ml-2 border-none outline-none p-3"
        type="text"
        ref={inputRef}
        placeholder="2~10자리를 입력해주세요."
        required
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <SelectDropdown />
      <button>Post</button>
    </form>
  );
}
