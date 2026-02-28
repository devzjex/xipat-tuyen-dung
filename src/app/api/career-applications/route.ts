import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Temporary logging endpoint for career-application form integration.
    console.log('[API] /api/career-applications payload:', body);

    return NextResponse.json(
      {
        success: true,
        message: 'Application payload received and logged.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[API] /api/career-applications error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid payload.',
      },
      { status: 400 },
    );
  }
}
