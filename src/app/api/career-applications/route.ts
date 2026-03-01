import { NextResponse } from 'next/server';
import { buildLetsmetrixFormData, postToLetsmetrixContactUs } from '@/lib/letsmetrix';
import { getClientIp, verifyRecaptchaToken } from '@/lib/recaptcha';

export async function POST(request: Request) {
  try {
    const incoming = await request.formData();

    const name = String(incoming.get('name') ?? '').trim();
    const email = String(incoming.get('email') ?? '').trim();
    const phone = String(incoming.get('phone') ?? '').trim();
    const portfolio = String(incoming.get('portfolio') ?? '').trim();
    const jobLetter = String(incoming.get('job_letter') ?? '').trim();
    const message = String(incoming.get('message') ?? '').trim();
    const cv = incoming.get('cv');
    const recaptchaToken = String(incoming.get('recaptchaToken') ?? '').trim();

    if (!name || !email || !phone || !jobLetter || !message || !(cv instanceof File) || !recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required form fields.',
        },
        { status: 400 },
      );
    }

    const recaptcha = await verifyRecaptchaToken({
      token: recaptchaToken,
      expectedAction: 'career_applications',
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

    const formData = buildLetsmetrixFormData({
      name,
      email,
      phone,
      portfolio,
      job_letter: jobLetter,
      message,
      cv,
    });

    const response = await postToLetsmetrixContactUs(formData);

    if (!response.logicalOk) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to submit career application.',
          details: response.data,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Career application sent successfully.',
        data: response.data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[API] /api/career-applications error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process career application right now.',
      },
      { status: 500 },
    );
  }
}
