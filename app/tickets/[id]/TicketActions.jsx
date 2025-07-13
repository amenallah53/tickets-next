'use client'
import Link from "next/link"
import { Trash2, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import DeleteButton from "./DeleteButton"


export default function TicketActions({ id }) {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tickets/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
        router.push('/tickets')
        console.log(`Ticket with ID ${id} deleted successfully`)
      } else {
        console.error(`Failed to delete ticket with ID ${id}`)
      }
    } catch (error) {
      console.error('Error deleting ticket:', error)
    }
  }

  return (
    <div className="flex space-x-4">
      {/*<Trash2
        className="cursor-pointer transition ease-in-out duration-500 hover:text-red-500"
        onClick={handleDelete}
      />*/}
      <DeleteButton onClick={handleDelete}/>
      <Link href={`/tickets/${id}/modify`}>
        <Pencil className="cursor-pointer transition ease-in-out duration-500 hover:text-blue-500" />
      </Link>
    </div>
  )
}
