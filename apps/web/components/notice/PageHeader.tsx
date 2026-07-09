"use client"

import { Bell, Plus } from "lucide-react"

type PageHeaderProps = {
  onCreate: () => void
}

export function PageHeader({ onCreate }: PageHeaderProps) {
  return (
    <header className="border-b border-zinc-200 pb-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
            <Bell className="size-4" aria-hidden="true" />
            Notice Board
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950">
            Notices
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Manage the notice CRUD flow from one clean workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          <Plus className="size-4" aria-hidden="true" />
          Create Notice
        </button>
      </div>
    </header>
  )
}
