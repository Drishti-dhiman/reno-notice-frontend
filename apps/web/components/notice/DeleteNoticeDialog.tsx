"use client"

import { AlertTriangle, Trash2, X } from "lucide-react"

import type { Notice } from "./types"

type DeleteNoticeDialogProps = {
  notice: Notice | null
  loading: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteNoticeDialog({
  notice,
  loading,
  onCancel,
  onConfirm,
}: DeleteNoticeDialogProps) {
  if (!notice) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/55 px-4 py-6 backdrop-blur-sm">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-notice-title"
        aria-describedby="delete-notice-description"
        className="w-full max-w-md overflow-hidden rounded-xl border border-white/80 bg-white shadow-2xl shadow-zinc-950/20"
      >
        <div className="flex items-center justify-between border-b border-rose-100 bg-rose-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white text-rose-600 shadow-sm">
              <AlertTriangle className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="delete-notice-title"
                className="text-base font-semibold text-zinc-950"
              >
                Delete notice
              </h2>
              <p className="text-xs font-medium text-rose-700">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Close delete confirmation"
            className="flex size-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-4 py-4">
          <p
            id="delete-notice-description"
            className="text-sm leading-6 text-zinc-600"
          >
            Are you sure you want to delete{" "}
            <span className="font-semibold text-zinc-950">{notice.title}</span>?
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-zinc-100 px-4 py-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-rose-900/20 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            {loading ? "Deleting..." : "Delete Notice"}
          </button>
        </div>
      </div>
    </div>
  )
}
