'use client'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import TicketActions from './TicketActions'
import { useTheme } from '@/app/context/ThemeContext'
import { useSelector } from 'react-redux'

export default function TicketDetails({ params: paramsPromise }) {
  const router = useRouter()
  const { theme } = useTheme()
  const params = use(paramsPromise) //because in client components params becomes a promise
  const id = params.id 
  const ticketsList = useSelector((state) => state.tickets.ticketsList)

  const ticket = ticketsList.find((t) => t.id === id)

  if (!ticket) {
    router.push('/not-found')
    return null
  }

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>

      <div className={theme === 'dark' ? "card bg-gray-700 " : "card bg-white"}>
        <div className="flex flex-row justify-between align-center">
          <div>
            <h2>{ticket.title}</h2>
            <small>Created by: {ticket.user_email}</small>
          </div>
          <TicketActions id={id} />
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
      </div>
    </main>
  )
}
