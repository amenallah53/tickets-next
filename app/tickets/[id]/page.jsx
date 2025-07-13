'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TicketActions from './TicketActions'
import { useTheme } from '@/app/context/ThemeContext'

export default function TicketDetails({ params }) {
  const [ticket, setTicket] = useState(null)
  const router = useRouter()
  const {theme} = useTheme()

  const getTicket = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tickets/${params.id}`)

      if (!response.ok) {
        router.push('/not-found') // or your own fallback
        return
      }

      const data = await response.json()
      setTicket(data)
    } catch (err) {
      console.error(err)
      router.push('/not-found')
    }
  }

  useEffect(() => {
    getTicket()
  }, [])

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>

      <div className={theme === 'dark' ? "card bg-gray-700 " : "card bg-white"}>
        {!ticket ? (
          <p className="text-center">Loading ticket details...</p>
        ) : (
          <>
            <div className="flex flex-row justify-between align-center">
              <div>
                <h2>{ticket.title}</h2>
                <small>Created by: {ticket.user_email}</small>
              </div>
              <TicketActions id={params.id} onDelete={() => router.push('/tickets')} />
            </div>

            <p>{ticket.body}</p>

            <div
              className={`${
                ticket.priority === 'low'
                  ? 'bg-red-500'
                  : ticket.priority === 'medium'
                  ? 'bg-blue-500'
                  : 'bg-green-500'
              } mw-25 absolute bottom-0 right-0 rounded-br-lg rounded-tl-lg inline-block text-white text-center py-1.5 px-3`}
            >
              {ticket.priority} priority
            </div>
          </>
        )}
      </div>
    </main>
  )
}
