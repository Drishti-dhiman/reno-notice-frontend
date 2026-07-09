import { ArrowDown, GitBranch } from "lucide-react"

const routeFlow = [
  {
    method: "GET",
    path: "/",
    label: "List notices",
    handler: "getNotices",
    tone: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  {
    method: "GET",
    path: "/:id",
    label: "Read one notice",
    handler: "getNoticeById",
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  {
    method: "POST",
    path: "/",
    label: "Create notice",
    handler: "createNotice",
    tone: "bg-violet-50 text-violet-700 ring-violet-200",
  },
  {
    method: "PUT",
    path: "/:id",
    label: "Update notice",
    handler: "updateNotice",
    tone: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  {
    method: "DELETE",
    path: "/:id",
    label: "Delete notice",
    handler: "deleteNotice",
    tone: "bg-rose-50 text-rose-700 ring-rose-200",
  },
]

export function RouteFlow() {
  return (
    <aside className="h-fit rounded-lg border border-zinc-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          <GitBranch className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">Route Flow</h2>
          <p className="text-xs text-zinc-500">noticeRouter CRUD order</p>
        </div>
      </div>

      <ol className="space-y-2">
        {routeFlow.map((route, index) => (
          <li key={`${route.method}-${route.path}-${route.handler}`}>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`rounded-md px-2 py-1 text-xs font-bold ring-1 ${route.tone}`}
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
              <div className="flex h-5 items-center justify-center text-zinc-400">
                <ArrowDown className="size-4" aria-hidden="true" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </aside>
  )
}
