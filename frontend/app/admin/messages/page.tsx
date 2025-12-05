"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/services/api"

interface Message {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await apiClient.getContactMessages()
      setMessages(response.data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiClient.markMessageAsRead(id)
      await fetchMessages()
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    try {
      await apiClient.deleteContactMessage(id)
      setMessages((prev) => prev.filter((m) => m._id !== id))
      setSelectedMessage(null)
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl font-bold text-[var(--foreground)] mb-2">Contact Messages</h1>
      <p className="text-[var(--color-neutral-600)] mb-8">View and manage incoming messages</p>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-4 text-center text-[var(--color-neutral-600)]">No messages</div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    onClick={() => {
                      setSelectedMessage(msg)
                      if (!msg.isRead) handleMarkAsRead(msg._id)
                    }}
                    className={`p-4 border-b cursor-pointer hover:bg-[var(--color-neutral-50)] transition-colors ${
                      selectedMessage?._id === msg._id ? "bg-[var(--color-primary)] bg-opacity-10" : ""
                    } ${!msg.isRead ? "bg-blue-50" : ""}`}
                  >
                    <p className="font-semibold text-sm">
                      {msg.firstName} {msg.lastName}
                    </p>
                    <p className="text-xs text-[var(--color-neutral-600)] truncate">{msg.subject}</p>
                    <p className="text-xs text-[var(--color-neutral-500)] mt-1">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <h2 className="font-serif text-2xl font-bold mb-4">{selectedMessage.subject}</h2>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>From:</strong> {selectedMessage.firstName} {selectedMessage.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${selectedMessage.email}`} className="text-[var(--color-primary)]">
                        {selectedMessage.email}
                      </a>
                    </p>
                    {selectedMessage.phone && (
                      <p>
                        <strong>Phone:</strong>{" "}
                        <a href={`tel:${selectedMessage.phone}`} className="text-[var(--color-primary)]">
                          {selectedMessage.phone}
                        </a>
                      </p>
                    )}
                    <p>
                      <strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--color-neutral-50)] rounded p-4 mb-6">
                  <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center text-[var(--color-neutral-600)]">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
