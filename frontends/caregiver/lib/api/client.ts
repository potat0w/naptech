import { clearAccessToken, getAccessToken, setAccessToken } from "@/lib/auth/token";
import { API_URL } from "@/lib/api/config";

export class ApiError extends Error {
  code: string;
  fieldErrors?: Record<string, string>;

  constructor(message: string, code = "ERROR", fieldErrors?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

async function parseError(res: Response) {
  try {
    const data = await res.json();
    const err = data?.error;
    if (err?.message) {
      return new ApiError(err.message, err.code, err.fields);
    }
  } catch {
    /* ignore */
  }
  return new ApiError(res.statusText || "Request failed.");
}

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 204 || !res.ok) return null;
        const data = await res.json();
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          return data.accessToken as string;
        }
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
  formData?: FormData;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false, formData } = options;

  const headers: Record<string, string> = {};

  if (!formData && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const doFetch = (token?: string | null) =>
    fetch(`${API_URL}${path}`, {
      method,
      credentials: "include",
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData ?? (body !== undefined ? JSON.stringify(body) : undefined),
    });

  let token = auth ? getAccessToken() : null;
  let res = await doFetch(token);

  if (auth && res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      token = newToken;
      res = await doFetch(newToken);
    }
  }

  if (!res.ok) {
    throw await parseError(res);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
