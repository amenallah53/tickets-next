'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'

export default function TicketsList({ filter }) {
    const {theme} = useTheme()
  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:4000/tickets', {
          method: 'GET',
          cache: 'no-store'  // force no caching for latest data
        })
        if (response.status === 200) {
          const data = await response.json()
          setTickets(data)
        } else {
          throw new Error(`Failed to fetch data: ${response.status}`)
        }
      } catch (error) {
        console.error("Error:", error)
        setTickets([])
      }
    }

    fetchTickets()
  }, [])

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTickets(tickets)
    } else {
      const filtered = tickets.filter((ticket) => ticket.priority === filter)
      setFilteredTickets(filtered)
    }
  }, [filter, tickets])

  return (
    <div className='text-gray-700 flex flex-col gap-5'>
      {filteredTickets.map((ticket) => (
        <Link href={`tickets/${ticket.id}`} key={ticket.id}>
          <div className={`rounded-lg p-5 relative transition duration-500 ease-in-out hover:-translate-y-1 ${
    theme === 'dark' ? 'bg-gray-700 text-white shadow-white-sm hover:shadow-white-md' : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
  }`}>
            <h2>{ticket.title}</h2>
            <p className='my-4 text-sm leading-6'>{ticket.body.slice(0, 200)}...</p>
            <div className={`${ticket.priority === 'low' ? 'bg-red-500' : ticket.priority === 'medium' ? 'bg-blue-500' : 'bg-green-500'} mw-25 absolute bottom-0 right-0 rounded-br-lg rounded-tl-lg inline-block text-white text-center py-1.5 px-3`}>
              {ticket.priority} priority
            </div>
          </div>
        </Link>
      ))}
      {filteredTickets.length === 0 && (
        <p className='text-center'>There are no tickets. Yay!!</p>
      )}
    </div>
  )
}
