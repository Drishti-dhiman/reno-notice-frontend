const API_PREFIX = "/api"
export async function apiFetch<T = unknown>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_PREFIX}/${path.replace(/^\/+/, "")}`
  const token = typeof window !== "undefined" ? localStorage.getItem("gym_access_token") : null
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options?.headers },
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new Error(data?.error || data?.message || "API request failed")
  return data
}