'use client';

import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import SelectDropdown from './ui/SelectDropdown';
import Button from './ui/Button';
import { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NewRoom() {
  const [roomName, setRoomName] = useState('');
  const [roomMemberCount, setRoomMemberCount] = React.useState<string[]>([]);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent<typeof roomMemberCount>) => {
    const {
      target: { value },
    } = event;
    setRoomMemberCount(typeof value === 'string' ? value.split(',') : value);
  };

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

    const formData = new FormData();
    formData.append('room name', inputRef.current?.value ?? '');
    formData.append('room member count', roomMemberCount.join(''));

    fetch('/api/conversations', { method: 'POST', body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err.toString()));
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
      <SelectDropdown value={roomMemberCount} onChangeValue={handleChange} />
      <Button text="Publish" onClick={() => {}} />
    </form>
  );
}
