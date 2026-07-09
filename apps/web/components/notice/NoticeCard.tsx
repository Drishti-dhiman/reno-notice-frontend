"use client"

import { CalendarDays, Pencil, Trash2 } from "lucide-react"

import type { Notice } from "./types"

type NoticeCardProps = {
  notice: Notice
  onDelete: (notice: Notice) => void
  onEdit: (notice: Notice) => void
}

export function NoticeCard({ notice, onDelete, onEdit }: NoticeCardProps) {
  const publishDate = new Date(notice.publishDate).toLocaleDateString("en-IN")
  const categoryTone = {
    EXAM: "bg-sky-50 text-sky-700 ring-sky-100",
    EVENT: "bg-violet-50 text-violet-700 ring-violet-100",
    GENERAL: "bg-teal-50 text-teal-700 ring-teal-100",
  }[notice.category]

  return (
    <article className="group flex min-h-64 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm shadow-zinc-200/70 transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/10">
      <div className="h-1.5 bg-[linear-gradient(90deg,#0f766e,#2563eb,#7c3aed)]" />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ${categoryTone}`}
          >
            {notice.category}
          </span>

          {notice.priority === "URGENT" && (
            <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 ring-1 ring-rose-100">
              Urgent
            </span>
          )}
        </div>

        <h2 className="mt-4 line-clamp-2 text-lg font-semibold tracking-normal text-zinc-950 group-hover:text-teal-800">
          {notice.title}
        </h2>

        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-zinc-600">
          {notice.body}
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-500">
          <CalendarDays className="size-4" aria-hidden="true" />
          <span>Publish Date: {publishDate}</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-4">
          <button
            type="button"
            onClick={() => onEdit(notice)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
          >
            <Pencil className="size-4" aria-hidden="true" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(notice)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 text-sm font-semibold text-white shadow-sm shadow-rose-900/20 transition hover:bg-rose-700"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
