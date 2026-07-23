"use client"

import { useEffect, useState } from "react"

import CreateNoticeModal from "@/components/CreateNoticeModal"
import { DeleteNoticeDialog } from "@/components/notice/DeleteNoticeDialog"
import { EmptyState } from "@/components/notice/EmptyState"
import { LoadingState } from "@/components/notice/LoadingState"
import { NoticeGrid } from "@/components/notice/NoticeGrid"
import { PageHeader } from "@/components/notice/PageHeader"
import { RouteFlow } from "@/components/notice/RouteFlow"
import { ToastViewport } from "@/components/notice/ToastViewport"
import type { Notice, Toast } from "@/components/notice/types"
import { apiFetch } from "@/lib/api"

export default function Page() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  function showToast(title: string, tone: Toast["tone"] = "success") {
    const id = Date.now()
    setToasts((current) => [...current, { id, title, tone }])

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3200)
  }

  function openCreateModal() {
    setEditingNotice(null)
    setModalOpen(true)
  }

  function openUpdateModal(notice: Notice) {
    setEditingNotice(notice)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingNotice(null)
  }

  function openDeleteDialog(notice: Notice) {
    setNoticeToDelete(notice)
  }

  function closeDeleteDialog() {
    if (deleteLoading) return
    setNoticeToDelete(null)
  }

  async function refreshNotices() {
    try {
      setLoading(true)
      const data = await apiFetch<{ data: Notice[] }>("/notices")
      setNotices(data.data || [])
    } catch (error) {
      console.error(error)
      showToast("Failed to load notices", "error")
    } finally {
      setLoading(false)
    }
  }

  async function confirmDeleteNotice() {
    if (!noticeToDelete) return

    try {
      setDeleteLoading(true)
      await apiFetch(`/notices/${noticeToDelete.id}`, {
        method: "DELETE",
      })

      setNotices((prev) =>
        prev.filter((notice) => notice.id !== noticeToDelete.id)
      )
      setNoticeToDelete(null)
      showToast("Notice deleted")
    } catch (error) {
      console.error(error)
      showToast("Failed to delete notice", "error")
    } finally {
      setDeleteLoading(false)
    }
  }

  useEffect(() => {
    let active = true

    async function loadInitialNotices() {
      try {
        const data = await apiFetch<{ data: Notice[] }>("/notices")

        if (active) {
          setNotices(data.data || [])
        }
      } catch (error) {
        console.error(error)
        showToast("Failed to load notices", "error")
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
      <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f4f8f7_38%,#f7f7f4_100%)] px-4 py-6 text-black sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-6">
            <PageHeader onCreate={openCreateModal} />

            {loading ? (
              <LoadingState />
            ) : notices.length === 0 ? (
              <EmptyState onCreate={openCreateModal} />
            ) : (
              <NoticeGrid
                notices={notices}
                onDelete={openDeleteDialog}
                onEdit={openUpdateModal}
              />
            )}
          </section>

          <RouteFlow />
        </div>
      </main>

      {modalOpen && (
        <CreateNoticeModal
          key={editingNotice ? `edit-${editingNotice.id}` : "create"}
          open={modalOpen}
          notice={editingNotice}
          onClose={closeModal}
          onSaved={refreshNotices}
          onNotify={showToast}
        />
      )}

      <DeleteNoticeDialog
        notice={noticeToDelete}
        loading={deleteLoading}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDeleteNotice}
      />

      <ToastViewport toasts={toasts} />
    </>
  )
}
