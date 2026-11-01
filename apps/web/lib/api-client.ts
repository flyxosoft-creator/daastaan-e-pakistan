const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export class ApiError extends Error {
  statusCode: number;
  errors?: any[];

  constructor(message: string, statusCode: number, errors?: any[]) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // for HTTP-only cookies
  };

  try {
    const res = await fetch(url, config);
    const result = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage = result?.error?.message || result?.message || 'Network request failed';
      throw new ApiError(errorMessage, res.status, result?.error?.errors);
    }

    return (result?.data !== undefined ? result.data : result) as T;
  } catch (err: any) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(err.message || 'Unable to connect to server', 500);
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    fetcher<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    fetcher<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    fetcher<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetcher<T>(endpoint, { ...options, method: 'DELETE' }),
};

