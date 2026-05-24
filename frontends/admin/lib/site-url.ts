const PRODUCTION_WEB = "https://www.naptechealthcareservices.co.uk";
const PRODUCTION_ADMIN = "https://admin.naptechealthcareservices.co.uk";
const PRODUCTION_CAREGIVER = "https://caregiver.naptechealthcareservices.co.uk";

function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

function isLocalhostUrl(url: string) {
  try {
    const { hostname } = new URL(url.startsWith("http") ? url : `https://${url}`);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function vercelHttpsUrl(host: string | undefined) {
  const trimmed = host?.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return stripTrailingSlash(trimmed);
  }
  return stripTrailingSlash(`https://${trimmed}`);
}

function resolvePublicBase(
  envValue: string | undefined,
  productionFallback: string,
  devFallback: string
) {
  const env = envValue?.trim();
  if (env && !isLocalhostUrl(env)) {
    return stripTrailingSlash(env);
  }

  const vercelProduction = vercelHttpsUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProduction && !isLocalhostUrl(vercelProduction)) {
    return vercelProduction;
  }

  if (process.env.NODE_ENV === "production") {
    const vercelDeploy = vercelHttpsUrl(process.env.VERCEL_URL);
    if (vercelDeploy && !isLocalhostUrl(vercelDeploy)) {
      return vercelDeploy;
    }
    return productionFallback;
  }

  return stripTrailingSlash(env || devFallback);
}

export function webAppBase() {
  return resolvePublicBase(
    process.env.NEXT_PUBLIC_WEB_APP_URL,
    PRODUCTION_WEB,
    "http://localhost:3000"
  );
}

export function adminAppBase() {
  return resolvePublicBase(
    process.env.NEXT_PUBLIC_ADMIN_APP_URL,
    PRODUCTION_ADMIN,
    "http://localhost:3001"
  );
}

export function caregiverAppBase() {
  return resolvePublicBase(
    process.env.NEXT_PUBLIC_CAREGIVER_APP_URL,
    PRODUCTION_CAREGIVER,
    "http://localhost:3002"
  );
}
