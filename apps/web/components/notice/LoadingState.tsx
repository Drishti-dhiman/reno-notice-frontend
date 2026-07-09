import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="flex min-h-52 items-center justify-center rounded-lg border border-zinc-200 bg-white p-8 text-sm font-medium text-zinc-600 shadow-sm">
      <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
      Loading notices
    </div>
  )
}
