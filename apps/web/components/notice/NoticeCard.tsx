"use client"

import { CalendarDays, Pencil, Trash2 } from "lucide-react"

import type { Notice } from "./types"

type NoticeCardProps = {
  notice: Notice
  onDelete: (id: number) => void
  onEdit: (notice: Notice) => void
}

export function NoticeCard({ notice, onDelete, onEdit }: NoticeCardProps) {
  const publishDate = new Date(notice.publishDate).toLocaleDateString("en-IN")

  return (
    <article className="flex min-h-64 flex-col rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-100">
          {notice.category}
        </span>

        {notice.priority === "URGENT" && (
          <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 ring-1 ring-rose-100">
            Urgent
          </span>
        )}
      </div>

      <h2 className="mt-4 line-clamp-2 text-lg font-semibold tracking-normal text-zinc-950">
        {notice.title}
      </h2>

      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-zinc-600">
        {notice.body}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-500">
        <CalendarDays className="size-4" aria-hidden="true" />
        <span>Publish Date: {publishDate}</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-4">
        <button
          type="button"
          onClick={() => onEdit(notice)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-300 px-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
        >
          <Pencil className="size-4" aria-hidden="true" />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(notice.id)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          <Trash2 className="size-4" aria-hidden="true" />
          Delete
        </button>
      </div>
    </article>
  )
}
