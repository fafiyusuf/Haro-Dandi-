"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { apiClient } from "@/services/api"
import type { Page } from "@/types/index"

export default function EditPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [page, setPage] = useState<Page | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (id !== "new") {
      const fetchPage = async () => {
        try {
          const response = await apiClient.getPages()
          const found = response.data.find((p: any) => p._id === id)
          setPage(found)
        } catch (error) {
          console.error("Error fetching page:", error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchPage()
    } else {
      setIsLoading(false)
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      if (id === "new") {
        await apiClient.createPage(page)
      } else {
        await apiClient.updatePage(id, page)
      }
      router.push("/admin/pages")
    } catch (error) {
      console.error("Error saving page:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold mb-8">{id === "new" ? "Create New Page" : "Edit Page"}</h1>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Page Title</label>
            <input
              type="text"
              value={page?.title || ""}
              onChange={(e) => setPage(page ? { ...page, title: e.target.value } : null)}
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug (URL)</label>
            <input
              type="text"
              value={page?.slug || ""}
              onChange={(e) => setPage(page ? { ...page, slug: e.target.value } : null)}
              className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          <div className="bg-white rounded-lg p-6 border border-[var(--border)]">
            <h3 className="font-semibold mb-4">Multi-Language Content</h3>
            {["en", "am", "om"].map((lang) => {
              const content = page?.contents?.find((c: any) => c.language === lang) || {
                language: lang,
                title: "",
                content: "",
              }
              return (
                <div key={lang} className="mb-6">
                  <p className="text-sm font-medium mb-2">{lang.toUpperCase()}</p>
                  <textarea
                    value={content.content || ""}
                    onChange={(e) => {
                      if (page) {
                        const updated = {
                          ...page,
                          contents: page.contents.some((c: any) => c.language === lang)
                            ? page.contents.map((c: any) =>
                                c.language === lang ? { ...c, content: e.target.value } : c,
                              )
                            : [...page.contents, { language: lang, content: e.target.value, title: page.title }],
                        }
                        setPage(updated)
                      }
                    }}
                    rows={5}
                    className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              )
            })}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Published</label>
            <input
              type="checkbox"
              checked={page?.isPublished || false}
              onChange={(e) => setPage(page ? { ...page, isPublished: e.target.checked } : null)}
              className="w-4 h-4"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 font-medium"
            >
              {isSaving ? "Saving..." : "Save Page"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--color-neutral-50)] font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
