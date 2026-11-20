const API_URL = import.meta.env.VITE_API_URL ?? "https://herds-api.metalogrom.com";

export const WS_URL = API_URL.replace(/^http/, "ws");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API_URL + path, init);
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? res.statusText);
  return res.json();
}

export const get = <T,>(path: string, signal?: AbortSignal) => request<T>(path, { signal });

export const post = <T,>(path: string, body: unknown) =>
  request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });