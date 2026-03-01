import { NextResponse } from 'next/server';
import { buildLetsmetrixFormData, postToLetsmetrixContactUs } from '@/lib/letsmetrix';
import { getClientIp, verifyRecaptchaToken } from '@/lib/recaptcha';

export async function POST(request: Request) {
  try {
    const incomingFormData = await request.formData();
    const payload = {
      name: incomingFormData.get('name')?.toString().trim() ?? '',
      email: incomingFormData.get('email')?.toString().trim() ?? '',
      phone: incomingFormData.get('phone')?.toString().trim() ?? '',
      message: incomingFormData.get('message')?.toString() ?? '',
    };
    const recaptchaToken = incomingFormData.get('recaptchaToken')?.toString().trim() ?? '';

    if (!payload.name || !payload.email || !payload.message || !recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields.',
        },
        { status: 400 },
      );
    }

    const recaptcha = await verifyRecaptchaToken({
      token: recaptchaToken,
      expectedAction: 'career_contacts',
      remoteIp: getClientIp(request),
    });

    if (!recaptcha.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'reCAPTCHA verification failed.',
          recaptcha,
        },
        { status: 403 },
      );
    }

    const upstreamFormData = buildLetsmetrixFormData({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
    });
    const upstreamResponse = await postToLetsmetrixContactUs(upstreamFormData);

    if (!upstreamResponse.logicalOk) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to submit contact to upstream service.',
          upstreamStatus: upstreamResponse.status,
          upstreamData: upstreamResponse.data,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Contact submitted successfully.',
        upstreamData: upstreamResponse.data,
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
