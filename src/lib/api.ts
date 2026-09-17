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

function isSuccessStatus(record: Record<string, unknown>): boolean {
  if (record.statusCodeValue !== undefined && record.statusCodeValue !== null) {
    const val = Number(record.statusCodeValue);
    if (!isNaN(val)) return val >= 200 && val < 300;
  }

  if (record.statusCode !== undefined && record.statusCode !== null) {
    const sc = String(record.statusCode).trim().toUpperCase();
    if (["OK", "CREATED", "ACCEPTED", "NO_CONTENT", "200", "201", "202", "204", "0"].includes(sc)) return true;
    const num = Number(record.statusCode);
    if (!isNaN(num)) return num >= 200 && num < 300;
  }

  const topStatus = record.Status ?? record.status;
  if (topStatus !== undefined && topStatus !== null) {
    const st = String(topStatus).trim().toUpperCase();
    if (["200", "201", "202", "204", "0", "OK", "SUCCESS", "CREATED"].includes(st)) return true;
    const num = Number(topStatus);
    if (!isNaN(num)) return num >= 200 && num < 300;
  }

  if (record.body && typeof record.body === "object") {
    const bodyObj = record.body as Record<string, unknown>;
    const bodyStatus = bodyObj.Status ?? bodyObj.status ?? bodyObj.statusCode;
    if (bodyStatus !== undefined && bodyStatus !== null) {
      const st = String(bodyStatus).trim().toUpperCase();
      if (["200", "201", "202", "204", "0", "OK", "SUCCESS", "CREATED"].includes(st)) return true;
      const num = Number(bodyStatus);
      if (!isNaN(num)) return num >= 200 && num < 300;
    }
  }

  return true;
}

function extractErrorMessage(record: Record<string, unknown>): string {
  const bodyObj = record.body && typeof record.body === "object" ? (record.body as Record<string, unknown>) : null;
  const msg =
    record.Message ||
    record.message ||
    record.error ||
    record.detail ||
    bodyObj?.Message ||
    bodyObj?.message ||
    bodyObj?.error ||
    bodyObj?.detail;

  if (msg) return String(msg);
  if (record.title && record.detail) return `${record.title}: ${record.detail}`;
  if (record.title) return String(record.title);

  const statusVal = record.Status ?? record.status ?? record.statusCode ?? record.statusCodeValue;
  return `Request failed with status ${statusVal ?? "unknown"}`;
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

  const res = await fetch(buildApiUrl(path), options);
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
    if (!isSuccessStatus(record)) {
      const errMsg = extractErrorMessage(record);
      throw new Error(errMsg);
    }
  }

  return parsed as T;
}

/** Ad management uses the same Spring Boot base URL as the news API. */
export function buildApiUrl(path: string): string {
  const cleanBase = NEWS_BASE_URL.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}

export async function adsRequest<T = any>(
  path: string,
  options: NewsReqOpts = {}
): Promise<T | null> {
  return newsRequest<T>(path, options);
}

export async function getAllCampaigns(): Promise<any> {
  return adsRequest("api/ad-campaigns/getAdminAllCampaign");
}

export async function getActiveCampaigns(placement?: string): Promise<any> {
  const query = placement ? `?placement=${encodeURIComponent(placement)}` : "";
  return adsRequest(`api/ad-campaigns/active${query}`);
}

export async function trackCampaignClick(id: string | number, payload: Record<string, any>): Promise<any> {
  return adsRequest(`api/ad-campaigns/${id}/click`, {
    method: "POST",
    body: payload,
  });
}

export async function createAdCampaign(payload: Record<string, any>, file?: File): Promise<any> {
  const jsonStr = JSON.stringify(payload);
  const url = `https://api.mycampushut.com/campusHutNews/api/ad-campaigns/createCampaign?request=${encodeURIComponent(jsonStr)}`;

  const body = new FormData();
  if (file) {
    body.append("images", file);
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      body,
    });
    const text = await res.text();
    console.log("Raw Response Status:", res.status);
    console.log("Raw Response Text:", text);

    if (!res.ok) throw new Error("API error: " + res.status + " " + text);

    let data;
    try {
      data = JSON.parse(text);
      console.log("Parsed JSON Response:", data);
    } catch (err) {
      throw new Error("Failed to parse JSON response");
    }

    if (data.Status && data.Status !== "200" && data.Status !== "0" && data.Status !== "SUCCESS" && data.statusCode !== "OK" && data.statusCode !== 200) {
      throw new Error(data.Message || data.message || "Failed to create campaign");
    }
    return data;
  } catch (err) {
    console.error("Campaign Creation Error:", err);
    throw err;
  }
}

export async function updateAdCampaign(id: string | number, payload: Record<string, any>, file?: File): Promise<any> {
  const campaignIdNum = Number(id);
  const fullPayload = {
    id: campaignIdNum,
    campaignId: campaignIdNum,
    ...payload,
  };
  const jsonStr = JSON.stringify(fullPayload);
  const path = `api/ad-campaigns/updateCampaign?campaignId=${encodeURIComponent(String(id))}&id=${encodeURIComponent(String(id))}&request=${encodeURIComponent(jsonStr)}`;

  if (file) {
    const formData = new FormData();
    formData.append("request", new Blob([jsonStr], { type: "application/json" }));
    formData.append("banner", file);
    formData.append("images", file);
    formData.append("file", file);
    return adsRequest(path, {
      method: "POST",
      body: formData,
      isFormData: true,
    });
  }

  return adsRequest(path, {
    method: "POST",
    body: fullPayload,
  });
}