"use client"

import {
  ArrowDown,
  Bell,
  CalendarDays,
  GitBranch,
  Inbox,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { apiFetch } from "@/lib/api"
import CreateNoticeModal from "@/components/CreateNoticeModal"

type Notice = {
  id: number
  title: string
  body: string
  category: "EXAM" | "EVENT" | "GENERAL"
  priority: "NORMAL" | "URGENT"
  publishDate: string
  imageUrl?: string | null
}

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

export default function Page() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  async function refreshNotices() {
    try {
      setLoading(true)
      const data = await apiFetch("/")
      setNotices(data.data || [])
    } catch (error) {
      console.error(error)
      alert("Failed to load notices")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    )

    if (!confirmed) return

    try {
      await apiFetch(`/${id}`, {
        method: "DELETE",
      })

      setNotices((prev) => prev.filter((notice) => notice.id !== id))
    } catch (error) {
      console.error(error)
      alert("Failed to delete notice")
    }
  }

  useEffect(() => {
    let active = true

    async function loadInitialNotices() {
      try {
        const data = await apiFetch("/")

        if (active) {
          setNotices(data.data || [])
        }
      } catch (error) {
        console.error(error)
        alert("Failed to load notices")
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadInitialNotices()

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <main className="min-h-screen bg-zinc-50 px-4 py-6 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-6">
            <PageHeader onCreate={() => setCreateModalOpen(true)} />

            {loading ? (
              <LoadingState />
            ) : notices.length === 0 ? (
              <EmptyState onCreate={() => setCreateModalOpen(true)} />
            ) : (
              <NoticeGrid notices={notices} onDelete={handleDelete} />
            )}
          </section>

          <RouteFlow />
        </div>
      </main>

      <CreateNoticeModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={refreshNotices}
      />
    </>
  )
}

function PageHeader({ onCreate }: { onCreate: () => void }) {
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

function RouteFlow() {
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

function LoadingState() {
  return (
    <div className="flex min-h-52 items-center justify-center rounded-lg border border-zinc-200 bg-white p-8 text-sm font-medium text-zinc-600 shadow-sm">
      <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
      Loading notices
    </div>
  )
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
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

function NoticeGrid({
  notices,
  onDelete,
}: {
  notices: Notice[]
  onDelete: (id: number) => void
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} onDelete={onDelete} />
      ))}
    </div>
  )
}

function NoticeCard({
  notice,
  onDelete,
}: {
  notice: Notice
  onDelete: (id: number) => void
}) {
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
        <Link
          href={`/notices/${notice.id}/edit`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-300 px-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
        >
          <Pencil className="size-4" aria-hidden="true" />
          Edit
        </Link>

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
