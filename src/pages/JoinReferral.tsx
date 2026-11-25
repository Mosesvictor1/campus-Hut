import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Check, Copy } from "lucide-react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.campushut.app";
const APP_STORE_URL =
  "https://apps.apple.com/ng/app/campushut-student-app/id6755047066";

const getPlatform = () => {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  // iPadOS reports itself as a Mac, so check for touch as well.
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  return "other";
};

// The fallback covers in-app browsers that block the Clipboard API.
const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    const copied = document.execCommand("copy");
    document.body.removeChild(area);
    return copied;
  }
};

const JoinReferral = () => {
  const { code: rawCode = "" } = useParams();
  const upper = rawCode.trim().toUpperCase();
  const code = /^[A-Z0-9]{4,32}$/.test(upper) ? upper : "";
  const platform = getPlatform();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Join CampusHut";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => {
      document.head.removeChild(robots);
    };
  }, []);

  // Android: Play passes this to the app on first launch.
  const playUrl = code
    ? `${PLAY_STORE_URL}&referrer=${encodeURIComponent(`referral_code=${code}`)}`
    : PLAY_STORE_URL;

  const handleCopy = async () => {
    setCopied(await copyText(code));
  };

  // iPhone: the App Store carries no data, so copy the code for pasting at signup.
  const handleAppStore = async () => {
    if (code) await copyText(code);
    window.location.href = APP_STORE_URL;
  };

  const primary =
    "block w-full rounded-xl bg-[#1F641A] py-4 text-center font-semibold text-white";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EAF3EA] px-4 py-10">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-lg">
        <img src="/icon.png" alt="CampusHut" className="mx-auto h-16 w-16 rounded-2xl" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          You're invited to CampusHut
        </h1>

        {code ? (
          <>
            <p className="mt-2 text-sm text-gray-600">Your referral code</p>
            <div className="mt-3 rounded-2xl border-2 border-dashed border-[#1F641A] bg-green-50 p-4">
              <p className="select-all break-all font-mono text-2xl font-bold tracking-wider text-[#1F641A]">
                {code}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#1F641A] shadow"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy code"}
              </button>
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm text-gray-600">
            This invite link has no valid referral code. You can still download the app.
          </p>
        )}

        <div className="mt-6 space-y-3">
          {platform !== "ios" && (
            <a href={playUrl} className={primary}>
              Get it on Google Play
            </a>
          )}
          {platform !== "android" && (
            <button type="button" onClick={handleAppStore} className={primary}>
              Download on the App Store
            </button>
          )}
          {code && platform !== "other" && (
            <a
              href={`campushut://join/${code}`}
              className="block py-2 text-sm font-semibold text-[#1F641A] underline"
            >
              I already have the app
            </a>
          )}
        </div>

        {code && platform === "ios" && (
          <p className="mt-3 text-xs text-gray-500">
            Downloading copies your code. When you sign up, tap Paste under the
            referral code field.
          </p>
        )}
      </div>
    </div>
  );
};

export default JoinReferral;
