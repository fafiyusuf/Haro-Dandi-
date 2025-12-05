"use client"

import type React from "react"

import { useState } from "react"

interface ContentFormProps {
  title: string
  onSubmit: (data: any) => void
  isLoading: boolean
  defaultValues?: any
  fields: Array<{
    name: string
    label: string
    type: "text" | "textarea" | "number" | "email" | "url" | "select" | "multi-lang"
    placeholder?: string
    required?: boolean
    options?: Array<{ label: string; value: string }>
  }>
}

export default function ContentForm({ title, onSubmit, isLoading, defaultValues = {}, fields }: ContentFormProps) {
  const [formData, setFormData] = useState(defaultValues)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await onSubmit(formData)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    }
  }

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-semibold text-lg mb-6">{title}</h2>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                rows={4}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            ) : field.type === "select" ? (
              <select
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="">Select an option</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            )}
          </div>
        ))}

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 font-medium"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="px-6 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:bg-[var(--color-neutral-50)] transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
