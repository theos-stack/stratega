import type { GeneratePayload, GenerateResponse, HealthResponse } from '@/lib/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000';

let activeApiBaseUrl = API_BASE_URL;

export function getApiBaseUrl() {
  return activeApiBaseUrl;
}

export function buildDownloadUrl(downloadUrl: string) {
  if (downloadUrl.startsWith('http://') || downloadUrl.startsWith('https://')) {
    return downloadUrl;
  }

  return `${activeApiBaseUrl}${downloadUrl.startsWith('/') ? downloadUrl : `/${downloadUrl}`}`;
}

function getCandidateApiBaseUrls() {
  const candidates = [API_BASE_URL];

  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    for (const fallback of ['http://127.0.0.1:8000', 'http://127.0.0.1:8001']) {
      if (!candidates.includes(fallback)) {
        candidates.push(fallback);
      }
    }
  }

  return candidates;
}

async function fetchFromAvailableApi(
  path: string,
  init: RequestInit,
) {
  let lastError: unknown;

  for (const baseUrl of getCandidateApiBaseUrls()) {
    try {
      const response = await fetch(`${baseUrl}${path}`, init);
      activeApiBaseUrl = baseUrl;
      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Failed to fetch');
}

async function parseJsonSafely<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!text) {
    throw new Error('The server returned an empty response.');
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Expected JSON but received: ${text.slice(0, 200)}`);
  }
}

export async function checkBackendHealth(): Promise<HealthResponse> {
  const response = await fetchFromAvailableApi('/health', {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Backend health check failed with status ${response.status}.`);
  }

  return parseJsonSafely<HealthResponse>(response);
}

export async function generateCalendar(payload: GeneratePayload): Promise<GenerateResponse> {
  const response = await fetchFromAvailableApi('/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}.`);
  }

  return parseJsonSafely<GenerateResponse>(response);
}
