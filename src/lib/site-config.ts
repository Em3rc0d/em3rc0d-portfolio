const SITE_URL_ENV = "NEXT_PUBLIC_SITE_URL";

export function getSiteOrigin(): URL | null {
  const raw = process.env[SITE_URL_ENV]?.trim();
  if (!raw) return null;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(`${SITE_URL_ENV} must be an absolute URL.`);
  }

  if (parsed.protocol !== "https:") {
    throw new Error(`${SITE_URL_ENV} must use https:// for the public production origin.`);
  }

  if (parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error(`${SITE_URL_ENV} must be a clean origin without credentials, query, or hash.`);
  }

  if (parsed.pathname !== "/") {
    throw new Error(`${SITE_URL_ENV} must be an origin without a path.`);
  }

  return new URL(parsed.origin);
}

export function absoluteSiteUrl(pathname = "/"): string | null {
  const origin = getSiteOrigin();
  if (!origin) return null;
  return new URL(pathname, origin).toString();
}
