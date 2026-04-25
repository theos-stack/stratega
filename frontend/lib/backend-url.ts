const BACKEND_URL_ENV = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

function stripTrailingSlash(value: string) {
  return value.replace(/\/$/, '');
}

function getRuntimeLabel() {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

export function getBackendBaseUrl() {
  if (!BACKEND_URL_ENV) {
    throw new Error(
      `Missing NEXT_PUBLIC_API_BASE_URL in ${getRuntimeLabel()}. Set it to your backend origin, for example https://stratega.neurarank.uk.`,
    );
  }

  return stripTrailingSlash(BACKEND_URL_ENV);
}
