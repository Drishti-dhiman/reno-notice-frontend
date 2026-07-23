const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "https://reno-notice-backend.onrender.com"

type RouteContext = {
  params: Promise<{ path?: string[] }>
}

async function handler(request: Request, { params }: RouteContext) {
  const { path = [] } = await params
  const url = new URL(path.join("/"), `${BACKEND_API_URL.replace(/\/$/, "")}/`)
  url.search = new URL(request.url).search

  try {
    const contentType = request.headers.get("content-type")
    const response = await fetch(url, {
      method: request.method,
      headers: {
        Accept: "application/json",
        ...(contentType && { "Content-Type": contentType }),
      },
      body: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : await request.arrayBuffer(),
      cache: "no-store",
    })

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
      },
    })
  } catch (error) {
    console.error("Backend API request failed", error)
    return Response.json({ message: "API service unavailable" }, { status: 502 })
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE }