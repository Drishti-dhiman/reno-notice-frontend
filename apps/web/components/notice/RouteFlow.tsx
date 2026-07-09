import { ArrowDown, GitBranch } from "lucide-react"

const routeFlow = [
  {
    method: "GET",
    path: "/",
    label: "List notices",
    handler: "getNotices",
    tone: "bg-sky-50 text-sky-700 ring-sky-200 border-sky-100",
  },
  {
    method: "GET",
    path: "/:id",
    label: "Read one notice",
    handler: "getNoticeById",
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-200 border-emerald-100",
  },
  {
    method: "POST",
    path: "/",
    label: "Create notice",
    handler: "createNotice",
    tone: "bg-violet-50 text-violet-700 ring-violet-200 border-violet-100",
  },
  {
    method: "PUT",
    path: "/:id",
    label: "Update notice",
    handler: "updateNotice",
    tone: "bg-amber-50 text-amber-700 ring-amber-200 border-amber-100",
  },
  {
    method: "DELETE",
    path: "/:id",
    label: "Delete notice",
    handler: "deleteNotice",
    tone: "bg-rose-50 text-rose-700 ring-rose-200 border-rose-100",
  },
]

export function RouteFlow() {
  return (
    <aside className="h-fit rounded-xl border border-zinc-200 bg-white/90 p-4 shadow-sm shadow-zinc-200/70 backdrop-blur lg:sticky lg:top-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-950 text-white">
          <GitBranch className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-950">Route Flow</h2>
          <p className="text-xs font-medium text-zinc-500">
            noticeRouter CRUD order
          </p>
        </div>
      </div>

      <ol className="space-y-2">
        {routeFlow.map((route, index) => (
          <li key={`${route.method}-${route.path}-${route.handler}`}>
            <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm transition hover:border-zinc-300">
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`rounded-md border px-2 py-1 text-xs font-bold ring-1 ${route.tone}`}
                >
                  {route.method}
                </span>
                <code className="text-xs font-semibold text-zinc-700">
                  {route.path}
                </code>
              </div>
              <p className="mt-3 text-sm font-semibold text-zinc-950">
                {route.label}
              </p>
              <p className="mt-1 font-mono text-xs text-zinc-500">
                {route.handler}
              </p>
            </div>

            {index < routeFlow.length - 1 && (
              <div className="flex h-5 items-center justify-center text-teal-600">
                <ArrowDown className="size-4" aria-hidden="true" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </aside>
  )
}
