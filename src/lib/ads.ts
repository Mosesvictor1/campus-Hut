export type AdsRecord = Record<string, unknown>;
export type AdsValue = string | number | boolean;

function asRecord(value: unknown): AdsRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as AdsRecord : null;
}

export function unwrapList(value: unknown, keys: string[] = []): AdsRecord[] {
  const source = asRecord(value);
  const root = source?.data ?? value;
  if (Array.isArray(root)) return root.filter((item): item is AdsRecord => Boolean(asRecord(item))).map((item) => asRecord(item) as AdsRecord);
  const record = asRecord(root);
  if (!record) return [];
  for (const key of keys) {
    if (Array.isArray(record[key])) return record[key].filter((item): item is AdsRecord => Boolean(asRecord(item))).map((item) => asRecord(item) as AdsRecord);
  }
  if (Array.isArray(record.content)) return record.content.filter((item): item is AdsRecord => Boolean(asRecord(item))).map((item) => asRecord(item) as AdsRecord);
  if (Array.isArray(record.items)) return record.items.filter((item): item is AdsRecord => Boolean(asRecord(item))).map((item) => asRecord(item) as AdsRecord);
  return [];
}

export function unwrapObject(value: unknown): AdsRecord {
  const source = asRecord(value);
  return asRecord(source?.data ?? value) ?? {};
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