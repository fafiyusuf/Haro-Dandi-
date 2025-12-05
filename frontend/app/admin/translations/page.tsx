"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { apiClient } from "@/services/api"

interface TranslationItem {
  _id: string
  key: string
  language: "en" | "am" | "om"
  value: string
  category: string
}

export default function AdminTranslations() {
  const [translations, setTranslations] = useState<TranslationItem[]>([])
  const [language, setLanguage] = useState<"en" | "am" | "om">("en")
  const [isLoading, setIsLoading] = useState(true)
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")

  useEffect(() => {
    fetchTranslations()
  }, [language])

  const fetchTranslations = async () => {
    try {
      const response = await apiClient.getTranslations(language)
      // Convert response object to array
      const items: TranslationItem[] = Object.entries(response.data).map(([k, v]: any) => ({
        _id: k,
        key: k,
        language,
        value: v,
        category: "common",
      }))
      setTranslations(items)
    } catch (error) {
      console.error("Error fetching translations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTranslation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!key || !value) return

    try {
      await apiClient.createTranslation({
        key,
        language,
        value,
        category: "common",
      })
      await fetchTranslations()
      setKey("")
      setValue("")
    } catch (error) {
      console.error("Error adding translation:", error)
    }
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold text-[var(--foreground)] mb-2">Translations</h1>
      <p className="text-[var(--color-neutral-600)] mb-8">Manage multi-language content</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-lg mb-4">Add Translation</h2>
          <form onSubmit={handleAddTranslation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="en">English</option>
                <option value="am">Amharic</option>
                <option value="om">Afaan Oromo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Key</label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="translation.key"
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Value</label>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Translation text"
                rows={3}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium"
            >
              Add Translation
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="font-semibold text-lg">Current Translations ({language.toUpperCase()})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-neutral-50)] border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Key</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {translations.map((t) => (
                  <tr key={t.key} className="border-b hover:bg-[var(--color-neutral-50)]">
                    <td className="px-6 py-3 text-sm font-mono text-[var(--color-neutral-600)]">{t.key}</td>
                    <td className="px-6 py-3 text-sm">{t.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
