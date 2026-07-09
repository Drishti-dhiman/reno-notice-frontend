"use client"

import { X } from "lucide-react"
import { useState } from "react"

import type { Notice } from "@/components/notice/types"
import { apiFetch } from "@/lib/api"

type CreateNoticeModalProps = {
  open: boolean
  onClose: () => void
  onSaved: () => void
  onNotify: (message: string, tone?: "success" | "error") => void
  notice?: Notice | null
}

type NoticeFormData = {
  title: string
  body: string
  category: "EXAM" | "EVENT" | "GENERAL"
  priority: "NORMAL" | "URGENT"
  publishDate: string
  imageUrl: string
}

const initialFormData: NoticeFormData = {
  title: "",
  body: "",
  category: "GENERAL",
  priority: "NORMAL",
  publishDate: "",
  imageUrl: "",
}

function getInitialFormData(notice?: Notice | null): NoticeFormData {
  if (!notice) return initialFormData

  return {
    title: notice.title,
    body: notice.body,
    category: notice.category,
    priority: notice.priority,
    publishDate: notice.publishDate.slice(0, 10),
    imageUrl: notice.imageUrl || "",
  }
}

export default function CreateNoticeModal({
  open,
  onClose,
  onSaved,
  onNotify,
  notice,
}: CreateNoticeModalProps) {
  const [formData, setFormData] = useState<NoticeFormData>(() =>
    getInitialFormData(notice)
  )
  const [loading, setLoading] = useState(false)

  const isEditing = Boolean(notice)

  if (!open) return null

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formData.title.trim()) {
      onNotify("Title is required", "error")
      return
    }

    if (!formData.body.trim()) {
      onNotify("Body is required", "error")
      return
    }

    if (!formData.publishDate) {
      onNotify("Publish date is required", "error")
      return
    }

    try {
      setLoading(true)

      await apiFetch(isEditing ? `/${notice?.id}` : "/", {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          category: formData.category,
          priority: formData.priority,
          publishDate: formData.publishDate,
          imageUrl: formData.imageUrl || null,
        }),
      })

      setFormData(initialFormData)
      onNotify(isEditing ? "Notice updated" : "Notice created")
      onSaved()
      onClose()
    } catch (error) {
      console.error(error)
      onNotify(`Failed to ${isEditing ? "update" : "create"} notice`, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/55 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-hidden rounded-xl border border-white/80 bg-white shadow-2xl shadow-zinc-950/20">
        <div className="flex items-center justify-between border-b border-slate-200 bg-zinc-50 px-4 py-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditing ? "Update Notice" : "Create Notice"}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {isEditing ? "Edit notice details." : "Add a new notice."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close create notice modal"
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white hover:text-slate-900"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(100vh-8rem)] space-y-3 overflow-y-auto px-4 py-4"
        >
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Body
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Enter notice details"
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              >
                <option value="GENERAL">General</option>
                <option value="EXAM">Exam</option>
                <option value="EVENT">Event</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              >
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Publish Date
              </label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Image URL Optional
            </label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-900/20 transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Notice"
                  : "Create Notice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
