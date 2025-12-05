"use client"

import { useAuthStore } from "@/stores/useAuthStore"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { admin, clearAuth } = useAuthStore()

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/admin/pages", label: "Pages", icon: "📄" },
    { href: "/admin/hotels", label: "Hotels", icon: "🏨" },
    { href: "/admin/tours", label: "Tours", icon: "✈️" },
    { href: "/admin/gallery", label: "Gallery", icon: "🖼️" },
    { href: "/admin/translations", label: "Translations", icon: "🌐" },
    { href: "/admin/messages", label: "Messages", icon: "💬" },
  ]

  const handleLogout = () => {
    clearAuth()
    router.push("/admin/login")
  }

  return (
    <aside className="w-64 bg-[#1a1a1a] text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h2 className="font-serif text-xl font-light tracking-tight">HARO DANDI</h2>
        <p className="text-xs opacity-75 tracking-wider uppercase mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 transition-colors ${
              pathname.startsWith(item.href)
                ? "bg-[#c9a961] text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-3">
        <div className="px-4">
          <p className="text-xs opacity-75 tracking-wider uppercase mb-1">Logged in as:</p>
          <p className="text-sm font-medium">{admin?.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-[#c9a961] text-white text-sm font-medium hover:bg-[#b8954d] transition-colors tracking-wide"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
