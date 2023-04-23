import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { addApiKey } from '@/service/user';
import { error } from 'console';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import stringify from '../../../../node_modules/next-auth/node_modules/uuid/dist/esm-node/stringify';

export async function GET(request: Request) {
  return new Response('Hello');
}

export async function POST(request: Request) {
  const req = await request.json();
  const key: string = req.apiKey;

  if (!key) {
    return new Response(
      JSON.stringify({
        error: {
          message: `API Key missing`,
        },
      })
    );
  }

  try {
    const openai = new OpenAIApi(
      new Configuration({
        apiKey: key,
      })
    );
    const data = await openai.listModels();
    return new Response(
      JSON.stringify({
        result: 'success',
      })
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: {
          message: `API failed`,
        },
      })
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { id, apiKey } = await request.json();

  if (!id || apiKey) {
    return new Response('Bad Request', { status: 400 });
  }

  const requestapi = addApiKey;

  return requestapi(user.id, apiKey).then((res) => NextRequest.json(res)).catch;
}
