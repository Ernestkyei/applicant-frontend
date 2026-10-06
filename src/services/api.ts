const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const TOKEN_KEY = "token";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const buildUrl = (
  endpoint: string,
  params?: Record<string, any>
): string => {
  let url = `${API_BASE}${endpoint}`;
  if (params && Object.keys(params).length) {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    if (query) url += `?${query}`;
  }
  return url;
};

type RequestOptions = {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
};

export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const {
    method = "GET",
    body,
    headers: customHeaders = {},
    params,
    signal,
    credentials = "include",
  } = options;

  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };

  const config: RequestInit = {
    method,
    headers,
    credentials,
    signal,
  };

  if (body !== undefined) {
    if (body instanceof FormData) {
      config.body = body;
      delete headers["Content-Type"];
    } else {
      config.body = JSON.stringify(body);
    }
  }

  let response: Response;
  try {
    response = await fetch(buildUrl(endpoint, params), config);
  } catch (err: any) {
    if (err.name === "AbortError") throw err;
    throw new ApiError(
      "Network error. Please check your connection.",
      0,
      null
    );
  }

  let data: any = null;
  const contentType = response.headers.get("content-type") || "";

  if (response.status !== 204) {
    if (contentType.includes("application/json")) {
      data = await response.json().catch(() => null);
    } else {
      data = await response.text().catch(() => null);
    }
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data as T;
};

export const api = {
  get: <T = any>(endpoint: string, options: RequestOptions = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(
    endpoint: string,
    body?: any,
    options: RequestOptions = {}
  ) => apiRequest<T>(endpoint, { ...options, method: "POST", body }),

  put: <T = any>(
    endpoint: string,
    body?: any,
    options: RequestOptions = {}
  ) => apiRequest<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T = any>(
    endpoint: string,
    body?: any,
    options: RequestOptions = {}
  ) => apiRequest<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T = any>(endpoint: string, options: RequestOptions = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};