import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[API] /api/career-contacts payload:', body);

    return NextResponse.json(
      {
        success: true,
        message: 'Career contact payload received and logged.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[API] /api/career-contacts error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid contact payload.',
      },
      { status: 400 },
    );
  }
}
