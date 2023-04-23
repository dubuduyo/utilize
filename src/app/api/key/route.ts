import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { addApiKey } from '@/service/user';
import { error } from 'console';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

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
