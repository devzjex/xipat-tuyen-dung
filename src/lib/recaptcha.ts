const GOOGLE_RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MIN_RECAPTCHA_SCORE = 0.5;

type VerifyRecaptchaParams = {
  token: string;
  expectedAction: string;
  remoteIp?: string;
};

type VerifyRecaptchaResult = {
  ok: boolean;
  score?: number;
  action?: string;
  errorCodes?: string[];
};

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
};

export async function verifyRecaptchaToken({
  token,
  expectedAction,
  remoteIp,
}: VerifyRecaptchaParams): Promise<VerifyRecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { ok: false, errorCodes: ['missing-input-secret'] };
  }

  const formData = new URLSearchParams();
  formData.set('secret', secret);
  formData.set('response', token);
  if (remoteIp) {
    formData.set('remoteip', remoteIp);
  }

  const response = await fetch(GOOGLE_RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
    cache: 'no-store',
  });

  if (!response.ok) {
    return { ok: false, errorCodes: ['recaptcha-unavailable'] };
  }

  const data = (await response.json()) as RecaptchaVerifyResponse;
  const actionMatches = !data.action || data.action === expectedAction;
  const score = data.score ?? 0;
  const scoreAccepted = score >= MIN_RECAPTCHA_SCORE;
  const ok = Boolean(data.success) && actionMatches && scoreAccepted;

  return {
    ok,
    score: data.score,
    action: data.action,
    errorCodes: data['error-codes'],
  };
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!forwardedFor) {
    return undefined;
  }
  return forwardedFor.split(',')[0]?.trim() || undefined;
}
