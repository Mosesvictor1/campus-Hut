import { BLOG_BASE_URL, NEWS_BASE_URL } from "./constants";

interface BlogReqOpts {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string | null;
  body?: Record<string, any>;
}

export async function blogRequest<T = any>(
  path: string,
  { method = "GET", token, body }: BlogReqOpts = {}
): Promise<T> {
  if (method === "GET") {
    const qs = new URLSearchParams({
      ...(token ? { token } : {}),
      ...(body || {}),
    }).toString();
    const res = await fetch(`${BLOG_BASE_URL}/${path}${qs ? `?${qs}` : ""}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error || json.message || "Request failed");
    return json.data as T;
  }
  const res = await fetch(`${BLOG_BASE_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      ...(body || {}),
      token,
      ...(method !== "POST" ? { _method: method } : {}),
    }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || json.message || "Request failed");
  return json.data as T;
}

interface NewsReqOpts {
  method?: "GET" | "POST" | "PUT" | "DELETE";
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
    options.body = body;
  }
  const res = await fetch(`${NEWS_BASE_URL}/${path}`, options);
  if (!res.ok) throw new Error(`News API error: ${res.status}`);
  if (res.status === 204 || res.headers.get("content-length") === "0") return null;
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as any;
  }
}
