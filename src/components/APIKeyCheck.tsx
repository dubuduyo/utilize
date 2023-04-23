'use client';
import { useState } from 'react';
import { AuthUser, HomeUser } from '@/model/user';
import useSWR from 'swr';
import { addApiKey } from '@/service/user';
import { useSession } from 'next-auth/react';

type Props = {
  user: HomeUser;
};

export default function APIKeyCheck({ user }: Props) {
  const { id, userkey } = user;
  const { data: session } = useSession();
  const userInfo = session?.user;
  const [apiKey, setApiKey] = useState<string>('');
  const [error, setError] = useState<string | boolean>(false);

  const handleLogin = async () => {
    setError(false);
    const result = await fetch('/api/key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: apiKey,
      }),
    });

    const data = await result.json();
    console.log(data);
    if (data.result === 'success') {
      console.log('success');
      sessionStorage.setItem('apiKey', apiKey);
      addApiKey(id, apiKey)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      console.log('fail');
      setError('KEY 틀림');
    }
  };

  return (
    <div>
      <input
        type="text"
        height={48}
        width={'100%'}
        value={apiKey}
        onChange={(e) => {
          setError(false);
          setApiKey(e.target.value);
        }}
      ></input>
      <button onClick={handleLogin}>클릭</button>
    </div>
  );
}
