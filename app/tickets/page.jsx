'use client'

import { Suspense, useState } from "react"
import TicketsList from "./TicketsList"
import Loading from "../loading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useTheme } from "../context/ThemeContext"

export default function Tickets() {
  const [filter,setFilter] = useState('all')
  const {theme} = useTheme()
  return (
    <main>
        <nav className="flex items-center justify-between mb-6">
        <div>
          <h2>Tickets</h2>
          <p><small>Currently open tickets.</small></p>
        </div>

        <div className="flex gap-4 items-center">
          <Link href="/tickets/create">
            <Button 
              className="bg-primary text-white text-center transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-md"
            >
              Add Ticket
            </Button>
          </Link>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className={theme === 'dark' ? "border-none text-white bg-gray-700 w-[150px]" : "bg-white w-[150px]"}>
              <SelectValue placeholder="All priorities" />
            </SelectTrigger>
            <SelectContent className={theme === 'dark' ? "bg-gray-700" : "bg-white"}>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low Priorities</SelectItem>
              <SelectItem value="medium">Medium Priorities</SelectItem>
              <SelectItem value="high">High Priorities</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </nav>

      <Suspense fallback={<Loading />}>
        <TicketsList filter={filter}/>
      </Suspense>
    </main>
  )
}