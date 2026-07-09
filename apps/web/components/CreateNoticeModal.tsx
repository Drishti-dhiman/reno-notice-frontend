"use client"

import { X } from "lucide-react"
import { useState } from "react"

import { apiFetch } from "@/lib/api"

type CreateNoticeModalProps = {
  open: boolean
  onClose: () => void
  onCreated: () => void
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

export default function CreateNoticeModal({
  open,
  onClose,
  onCreated,
}: CreateNoticeModalProps) {
  const [formData, setFormData] = useState<NoticeFormData>(initialFormData)
  const [loading, setLoading] = useState(false)

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
      alert("Title is required")
      return
    }

    if (!formData.body.trim()) {
      alert("Body is required")
      return
    }

    if (!formData.publishDate) {
      alert("Publish date is required")
      return
    }

    try {
      setLoading(true)

      await apiFetch("/", {
        method: "POST",
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
      onCreated()
      onClose()
    } catch (error) {
      console.error(error)
      alert("Failed to create notice")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Create Notice</h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a new notice to the board.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close create notice modal"
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Body
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Enter notice details"
              rows={5}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
              >
                <option value="GENERAL">General</option>
                <option value="EXAM">Exam</option>
                <option value="EVENT">Event</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
              >
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Publish Date
              </label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Image URL Optional
            </label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Notice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
