const API_PREFIX = "/api"

export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
 const url = `${API_PREFIX}/${path.replace(/^\/+/, "")}`;

console.log("Request URL:", url);

const response = await fetch(url, {
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options?.headers,
  },
});

console.log("Status:", response.status);

const data = await response.json().catch(() => null);

console.log("Response:", data);

if (!response.ok) {
  throw new Error(data?.message || "API request failed");
}

  return data
}