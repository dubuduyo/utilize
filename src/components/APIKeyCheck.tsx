'use client';
import { useState } from 'react';
import { HomeUser } from '@/model/user';
import useSWR from 'swr';

export default function APIKeyCheck() {
  const [apiKey, setApiKey] = useState<string>('');
  const [error, setError] = useState<string | boolean>(false);

  const handleLogin = async () => {
    setError(false);
    const _result = await fetch('/api/key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: apiKey,
      }),
    });

    const _data = await _result.json();
    console.log('# check : ', _data);
    if (_data.result === 'success') {
      console.log('success');
      sessionStorage.setItem('apiKey', apiKey);
      // handleFetchApi();
    } else {
      console.log('fail');
      setError('KEY가 올바르지 않습니다.');
    }
  };

  return (
    <div>
      <input
        type={'password'}
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
