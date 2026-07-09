"use client"

import { NoticeCard } from "./NoticeCard"
import type { Notice } from "./types"

type NoticeGridProps = {
  notices: Notice[]
  onDelete: (notice: Notice) => void
  onEdit: (notice: Notice) => void
}

export function NoticeGrid({ notices, onDelete, onEdit }: NoticeGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {notices.map((notice) => (
        <NoticeCard
          key={notice.id}
          notice={notice}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
