"use client"

import { Inbox, Plus } from "lucide-react"

type EmptyStateProps = {
  onCreate: () => void
}

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
      <div className="flex size-12 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
        <Inbox className="size-6" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-zinc-950">
        No notices found
      </h2>
      <p className="mt-2 text-sm text-zinc-600">Create your first notice.</p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        <Plus className="size-4" aria-hidden="true" />
        Create Notice
      </button>
    </div>
  )
}
