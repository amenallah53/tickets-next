'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTicketsAsync } from '../store/slices/ticketsSlice'

export default function TicketsList({ filter }) {
  console.log('Component mounted');
  const {theme} = useTheme()
  const [filteredTickets, setFilteredTickets] = useState([])
  //redux dispatch & selector
  const dispatch = useDispatch(); //calling the dispatch (to dispach actions)
  const {ticketsList,hasFetched} = useSelector((state) => state.tickets); //getting the state
  console.log('tickets out of useEffect',ticketsList)

  useEffect(() => {
    //call to dispatch an async thunk
    if (!hasFetched){ //tickets still not fetched from api server
      dispatch(fetchTicketsAsync())
      console.log('tickets in useEffect',ticketsList)
    }
  }, [dispatch,hasFetched]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTickets(ticketsList)
    } else {
      const filtered = ticketsList.filter((ticket) => ticket.priority === filter)
      setFilteredTickets(filtered)
    }
  }, [filter, ticketsList])

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
