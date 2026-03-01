const RECAPTCHA_READY_TIMEOUT_MS = 10_000;

type RecaptchaExecute = (siteKey: string, options: { action: string }) => Promise<string>;

type RecaptchaApi = {
  ready?: (cb: () => void) => void;
  execute?: RecaptchaExecute;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

function waitForRecaptchaApi(timeoutMs: number): Promise<RecaptchaApi> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      const grecaptcha = window.grecaptcha;
      if (grecaptcha?.ready && grecaptcha?.execute) {
        resolve(grecaptcha);
        return;
      }

      if (Date.now() - start >= timeoutMs) {
        reject(new Error('reCAPTCHA is not ready.'));
        return;
      }

      window.setTimeout(check, 100);
    };

    check();
  });
}

export async function executeRecaptchaV3(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    throw new Error('Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY.');
  }

  const grecaptcha = await waitForRecaptchaApi(RECAPTCHA_READY_TIMEOUT_MS);

  return new Promise((resolve, reject) => {
    grecaptcha.ready?.(async () => {
      try {
        const token = await grecaptcha.execute?.(siteKey, { action });
        if (!token) {
          reject(new Error('Failed to get reCAPTCHA token.'));
          return;
        }
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  });
}
