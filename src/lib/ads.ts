export type AdsRecord = Record<string, any>;

export function unwrapList(value: any, keys: string[] = []): AdsRecord[] {
  const root = value?.data ?? value;
  if (Array.isArray(root)) return root;
  for (const key of keys) {
    if (Array.isArray(root?.[key])) return root[key];
  }
  if (Array.isArray(root?.content)) return root.content;
  if (Array.isArray(root?.items)) return root.items;
  return [];
}

export function unwrapObject(value: any): AdsRecord {
  const root = value?.data ?? value;
  if (root && typeof root === "object" && !Array.isArray(root)) {
    return root;
  }
  return {};
}

export function firstValue(item: AdsRecord, ...keys: string[]) {
  return keys.map((key) => item[key]).find((value) => value !== undefined && value !== null && value !== "") ?? "";
}

export function formatMetric(value: any) {
  const number = Number(value);
  return Number.isFinite(number) ? new Intl.NumberFormat().format(number) : "0";
}

export function formatDate(value: any) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}