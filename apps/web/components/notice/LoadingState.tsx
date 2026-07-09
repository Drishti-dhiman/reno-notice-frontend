import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="flex min-h-52 items-center justify-center rounded-xl border border-zinc-200 bg-white/90 p-8 text-sm font-medium text-zinc-600 shadow-sm shadow-zinc-200/70">
      <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3">
        <Loader2
          className="size-5 animate-spin text-teal-700"
          aria-hidden="true"
        />
        Loading notices
      </div>
    </div>
  )
}
