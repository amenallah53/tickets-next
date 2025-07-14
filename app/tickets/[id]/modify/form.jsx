'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// shadcn components
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useTheme } from '@/app/context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { modifyTicketAsync } from '@/app/store/slices/ticketsSlice'

export default function ModifyTicket({ id }) {
  const router = useRouter()
  const {theme} = useTheme()
  const dispatch = useDispatch()
  const ticket = useSelector((state) => state.tickets.ticketsList).find((t) => t.id === id)
  console.log('ticket to modify : ',ticket)
  const [title, setTitle] = useState(ticket.title)
  const [body, setBody] = useState(ticket.body)
  const [priority, setPriority] = useState(ticket.priority)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const modifiedTicket = {
      id,
      title,
      body,
      priority,
      user_email: 'user@gmail.com' /*temporary*/
    }
    console.log("modified to put ticket : ",modifiedTicket)
    const resultAction = await dispatch(modifyTicketAsync(modifiedTicket))
    // to inspect if the action was fulfied 
    if (modifyTicketAsync.fulfilled.match(resultAction)) {
      //without refresh the browser gonna give us the cashed page  
      router.refresh()
      router.push(`/tickets/${id}`)
    } else {
      console.error('Failed to modify ticket:', resultAction)
    }
    
    setIsLoading(false)
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className={theme === 'dark' ? "bg-gray-600 w-1/2 space-y-4" : "w-1/2 space-y-4"}>
        <div>
          <span>Title:</span>
          <Input
            className="bg-white text-gray-700"
            required
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div>
          <span>Body:</span>
          <Textarea
            className="bg-white text-gray-700"
            required
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </div>

        <div>
          <span>Priority:</span>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="bg-white text-gray-700">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="btn-primary transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-md"
          disabled={isLoading}
        >
          {isLoading ? <span>modifying...</span> : <span>modify ticket</span>}
        </Button>
      </form>
    </main>
  )
}
