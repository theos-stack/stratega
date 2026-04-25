import { getBackendBaseUrl } from '@/lib/backend-url';
import type { GeneratePayload, GenerateResponse, HealthResponse } from '@/lib/types';

const API_BASE_URL = getBackendBaseUrl();

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function buildDownloadUrl(downloadUrl: string) {
  if (downloadUrl.startsWith('http://') || downloadUrl.startsWith('https://')) {
    return downloadUrl;
  }

  return `${API_BASE_URL}${downloadUrl.startsWith('/') ? downloadUrl : `/${downloadUrl}`}`;
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
  const response = await fetch(`${API_BASE_URL}/health`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Backend health check failed with status ${response.status}.`);
  }

  return parseJsonSafely<HealthResponse>(response);
}

export async function generateCalendar(payload: GeneratePayload): Promise<GenerateResponse> {
  const response = await fetch(`${API_BASE_URL}/generate`, {
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
