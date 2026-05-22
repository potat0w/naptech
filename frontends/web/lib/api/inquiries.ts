import { API_URL } from "./config";
import { ApiError } from "./client";

export async function submitInquiry(data: {
  fullName: string;
  phone: string;
  email: string;
  message?: string;
  privacyConsent: boolean;
  marketingConsent?: boolean;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const res = await fetch(`${API_URL}/inquiries`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    if (!res.ok) {
      try {
        const payload = await res.json();
        const err = payload?.error;
        if (err?.message) {
          throw new ApiError(err.message, err.code, err.fields);
        }
      } catch (e) {
        if (e instanceof ApiError) throw e;
      }
      throw new ApiError(res.statusText || "Request failed.");
    }

    return res.json() as Promise<{ inquiry: { id: string; subject: string; createdAt: string } }>;
  } catch (e) {
    if (e instanceof ApiError) throw e;
    if (e instanceof Error && e.name === "AbortError") {
      throw new ApiError("The server took too long to respond. Please try again in a moment.");
    }
    throw new ApiError("Something went wrong. Please try again.");
  } finally {
    clearTimeout(timeout);
  }
}
