"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/services/api"
import type { Page } from "@/types/index"
import Link from "next/link"

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await apiClient.getPages()
        setPages(response.data)
      } catch (error) {
        console.error("Error fetching pages:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPages()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return

    try {
      await apiClient.deletePage(id)
      setPages((prev) => prev.filter((p) => p._id !== id))
    } catch (error) {
      console.error("Error deleting page:", error)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[var(--foreground)]">Pages</h1>
          <p className="text-[var(--color-neutral-600)]">Manage website pages and content</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium"
        >
          ➕ New Page
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center">
          <p className="text-[var(--color-neutral-600)]">No pages yet. Create your first page!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[var(--color-neutral-50)] border-b border-[var(--border)]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--foreground)]">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--foreground)]">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--foreground)]">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-[var(--foreground)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page._id} className="border-b border-[var(--border)] hover:bg-[var(--color-neutral-50)]">
                  <td className="px-6 py-4 text-sm">{page.title}</td>
                  <td className="px-6 py-4 text-sm text-[var(--color-neutral-600)]">{page.slug}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        page.isPublished ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {page.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right space-x-2">
                    <Link href={`/admin/pages/${page._id}`} className="text-[var(--color-primary)] hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(page._id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
