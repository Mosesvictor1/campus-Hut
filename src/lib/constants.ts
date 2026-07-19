// export const BLOG_BASE_URL =
//   "https://script.google.com/macros/s/AKfycbyIacZQ_isTXk1188uRT9Ci8IJyM3IqaO45ZZgsZYsj2WJVHriTb1QRySDndYZyzig8/exec";
// export const NEWS_BASE_URL = "/news-api";
// export const CLOUD_NAME = "dkerrqvao";
// export const UPLOAD_PRESET = "ml_default";
// src/lib/constants.ts
export const BLOG_BASE_URL =
  "https://script.google.com/macros/s/AKfycbyIacZQ_isTXk1188uRT9Ci8IJyM3IqaO45ZZgsZYsj2WJVHriTb1QRySDndYZyzig8/exec";

export const NEWS_BASE_URL = import.meta.env.DEV
  ? "/news-proxy"
  : "http://178.128.36.105:8080/campusHutNews";

export const CLOUD_NAME = "dkerrqvao";
export const UPLOAD_PRESET = "ml_default";