import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[API] /api/contact payload:', body);

    return NextResponse.json(
      {
        success: true,
        message: 'Contact payload received and logged.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[API] /api/contact error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid contact payload.',
      },
      { status: 400 },
    );
  }
}
