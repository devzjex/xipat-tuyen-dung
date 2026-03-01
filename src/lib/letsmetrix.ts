const LETSMETRIX_CONTACT_US_URL = process.env.LETSMETRIX_CONTACT_US_URL ?? '';

type LetsmetrixPayloadValue = string | Blob;

export function buildLetsmetrixFormData(payload: Record<string, LetsmetrixPayloadValue | null | undefined>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(payload)) {
    if (value === null || value === undefined) {
      continue;
    }
    formData.append(key, value);
  }

  return formData;
}

export async function postToLetsmetrixContactUs(formData: FormData) {
  const response = await fetch(LETSMETRIX_CONTACT_US_URL, {
    method: 'POST',
    body: formData,
    cache: 'no-store',
  });

  const raw = await response.text();
  let data: unknown = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = raw;
  }

  const upstreamStatus =
    data && typeof data === 'object' && 'status' in data
      ? String((data as { status?: unknown }).status ?? '').toLowerCase()
      : null;
  const logicalOk = response.ok && (upstreamStatus === null || upstreamStatus === 'success');

  return {
    ok: response.ok,
    logicalOk,
    status: response.status,
    data,
  };
}
