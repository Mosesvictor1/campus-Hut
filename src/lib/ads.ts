export type AdsRecord = Record<string, unknown>;
export type AdsValue = string | number | boolean;

function asRecord(value: unknown): AdsRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as AdsRecord) : null;
}

export function unwrapList(value: unknown, keys: string[] = []): AdsRecord[] {
  const source = asRecord(value);
  const root = source?.data ?? value;
  if (Array.isArray(root)) return root.filter((item): item is AdsRecord => Boolean(asRecord(item))).map((item) => asRecord(item) as AdsRecord);
  const record = asRecord(root);
  if (!record) return [];

  const targetKeys = [...keys, "advertisers", "campaigns", "content", "items"];

  for (const key of targetKeys) {
    if (Array.isArray(record[key])) {
      return (record[key] as unknown[]).filter((item): item is AdsRecord => Boolean(asRecord(item))).map((item) => asRecord(item) as AdsRecord);
    }
  }

  for (const objKey of Object.keys(record)) {
    const sub = asRecord(record[objKey]);
    if (sub) {
      for (const key of targetKeys) {
        if (Array.isArray(sub[key])) {
          return (sub[key] as unknown[]).filter((item): item is AdsRecord => Boolean(asRecord(item))).map((item) => asRecord(item) as AdsRecord);
        }
      }
    }
  }

  return [];
}

export function unwrapObject(value: unknown): AdsRecord {
  const source = asRecord(value);
  if (!source) return {};
  if (source.companyName || source.title || source.campaignTitle) return source;

  const candidates = ["data", "advertiser", "Advertiser", "campaign", "Campaign", "dashboard", "Dashboard", "analytics", "Analytics"];
  for (const key of candidates) {
    if (source[key]) {
      if (Array.isArray(source[key]) && source[key].length > 0) {
        const item = asRecord(source[key][0]);
        if (item) return item;
      }
      const rec = asRecord(source[key]);
      if (rec) return rec;
    }
  }

  for (const key of Object.keys(source)) {
    if (["status", "Status", "message", "Message"].includes(key)) continue;
    if (Array.isArray(source[key]) && source[key].length > 0) {
      const item = asRecord(source[key][0]);
      if (item) return item;
    }
    const sub = asRecord(source[key]);
    if (sub) return sub;
  }
  return source;
}

export function firstValue(item: AdsRecord, ...keys: string[]): AdsValue | "" {
  const value = keys.map((key) => item[key]).find((candidate): candidate is AdsValue => (typeof candidate === "string" || typeof candidate === "number" || typeof candidate === "boolean") && candidate !== "");
  return value ?? "";
}

export function formatMetric(value: AdsValue | "") {
  const number = Number(value);
  return Number.isFinite(number) ? new Intl.NumberFormat().format(number) : "0";
}

export function formatDate(value: AdsValue | "") {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}