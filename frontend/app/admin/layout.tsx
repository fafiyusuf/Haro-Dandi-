"use client"

import type React from "react"

import Sidebar from "@/components/admin/sidebar"
import { useAuthStore } from "@/stores/useAuthStore"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { token } = useAuthStore()

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (!token && !isLoginPage) {
      router.push("/admin/login")
    }
  }, [token, isLoginPage, router])

  // Allow login page to render without authentication
  if (isLoginPage) {
    return <>{children}</>
  }

  // For other admin pages, require authentication
  if (!token) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
