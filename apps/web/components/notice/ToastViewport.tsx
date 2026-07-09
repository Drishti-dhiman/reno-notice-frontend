import { CheckCircle2, XCircle } from "lucide-react"

import type { Toast } from "./types"

type ToastViewportProps = {
  toasts: Toast[]
}

export function ToastViewport({ toasts }: ToastViewportProps) {
  return (
    <div className="fixed top-4 right-4 z-[60] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((toast) => {
        const isSuccess = toast.tone === "success"

        return (
          <div
            key={toast.id}
            className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-800 shadow-lg"
            role="status"
          >
            {isSuccess ? (
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-emerald-600"
                aria-hidden="true"
              />
            ) : (
              <XCircle
                className="mt-0.5 size-5 shrink-0 text-rose-600"
                aria-hidden="true"
              />
            )}
            <span className="font-medium">{toast.title}</span>
          </div>
        )
      })}
    </div>
  )
}
