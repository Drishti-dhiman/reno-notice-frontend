"use client"

import { Bell, Plus, Sparkles } from "lucide-react"

type PageHeaderProps = {
  onCreate: () => void
}

export function PageHeader({ onCreate }: PageHeaderProps) {
  return (
    <header className="overflow-hidden rounded-xl border border-zinc-200 bg-white/90 p-5 shadow-sm shadow-zinc-200/70 backdrop-blur">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
            <Sparkles className="size-4" aria-hidden="true" />
            Smart Notice Board
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-zinc-950">
            Notices
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Publish, update, and track important announcements from a focused
            admin workspace.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-600">
            <Bell className="size-4 text-teal-700" aria-hidden="true" />
            CRUD routes active
          </div>

          <button
            type="button"
            onClick={onCreate}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm shadow-teal-900/20 transition hover:bg-teal-800"
          >
            <Plus className="size-4" aria-hidden="true" />
            Create Notice
          </button>
        </div>
      </div>
    </header>
  )
}
