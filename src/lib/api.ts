import { BLOG_BASE_URL, NEWS_BASE_URL } from "./constants";

interface BlogReqOpts {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string | null;
  body?: Record<string, any>;
}

/**
 * IMPORTANT — Google Apps Script routing constraint:
 *
 * Apps Script web apps only ever respond at the bare /exec URL.
 * Anything appended after /exec (e.g. /exec/auth/login) is NOT
 * routed by Apps Script and returns a 401/404 from Google's infra.
 *
 * Solution: the "path" is never appended to the URL.
 *   - GET  requests: path is sent as the "path" query parameter.
 *   - POST requests: path is sent as the "path" field in the JSON body.
 *
 * The backend Code.gs reads:
 *   GET  → e.parameter.path
 *   POST → JSON.parse(e.postData.contents).path
 */
export async function blogRequest<T = any>(
  path: string,
  { method = "GET", token, body }: BlogReqOpts = {}
): Promise<T> {
  if (method === "GET") {
    const params: Record<string, string> = { path }; // <-- path as query param
    if (token) params.token = token;

    // Merge any extra GET filter params (status, search, etc.)
    if (body) {
      Object.entries(body).forEach(([k, v]) => {
        if (v !== undefined && v !== null) params[k] = String(v);
      });
    }

    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${BLOG_BASE_URL}?${qs}`); // bare /exec, no path suffix
    const json = await res.json();
    if (!json.success) throw new Error(json.error || json.message || "Request failed");
    return json.data as T;
  }

  // POST / PUT / DELETE — all sent as HTTP POST to the bare /exec URL
  const res = await fetch(BLOG_BASE_URL, {             // bare /exec, no path suffix
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      path,                                            // <-- path in the body
      ...(body || {}),
      ...(token ? { token } : {}),
      ...(method !== "POST" ? { _method: method } : {}),
    }),
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.error || json.message || "Request failed");
  return json.data as T;
}

interface NewsReqOpts {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  isFormData?: boolean;
}

export async function newsRequest<T = any>(
  path: string,
  { method = "GET", body, isFormData = false }: NewsReqOpts = {}
): Promise<T | null> {
  const options: RequestInit = { method };

  if (body && !isFormData) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  } else if (body && isFormData) {
    // Let the browser set Content-Type + boundary automatically for FormData
    options.body = body;
  }

  const res = await fetch(`${NEWS_BASE_URL}/${path}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  if (res.status === 204 || res.headers.get("content-length") === "0") return null;

  const text = await res.text();
  if (!text) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return text as unknown as T;
  }

  if (parsed && typeof parsed === "object") {
    const record = parsed as Record<string, unknown>;
    const statusVal = record.Status ?? record.status ?? record.statusCode;
    if (statusVal !== undefined && statusVal !== null) {
      const statusStr = String(statusVal).trim();
      if (statusStr !== "200" && statusStr !== "201" && statusStr !== "0" && statusStr !== "204") {
        const errMsg = record.Message || record.message || record.error || `Request failed with status ${statusStr}`;
        throw new Error(String(errMsg));
      }
    }
  }

  return parsed as T;

}

/** Ad management uses the same Spring Boot base URL as the news API. */
export async function adsRequest<T = any>(
  path: string,
  options: NewsReqOpts = {}
): Promise<T | null> {
  return newsRequest<T>(path, options);
}