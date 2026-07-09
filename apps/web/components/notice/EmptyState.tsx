"use client"

import { Inbox, Plus } from "lucide-react"

type EmptyStateProps = {
  onCreate: () => void
}

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-teal-200 bg-white/90 p-8 text-center shadow-sm shadow-zinc-200/70">
      <div className="flex size-14 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
        <Inbox className="size-6" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-zinc-950">
        No notices found
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600">
        Start with a clean announcement and it will appear here as a polished
        notice card.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm shadow-teal-900/20 transition hover:bg-teal-800"
      >
        <Plus className="size-4" aria-hidden="true" />
        Create Notice
      </button>
    </div>
  )
}
