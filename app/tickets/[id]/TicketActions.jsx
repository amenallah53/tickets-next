'use client'
import Link from "next/link"
import { Trash2, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import DeleteButton from "./DeleteButton"
import { useDispatch } from "react-redux"
import { deleteTicketAsync } from "@/app/store/slices/ticketsSlice"


export default function TicketActions({ id }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleDelete = async (e) => {
    e.preventDefault()
    const dispatchStatus = await dispatch(deleteTicketAsync(id))
    if (deleteTicketAsync.fulfilled.match(dispatchStatus)){
      router.refresh()
      router.push('/tickets')
      console.log(`Ticket with ID ${id} deleted successfully`)
    }
  }
  

  return (
    <div className="flex space-x-4">
      <DeleteButton onClick={handleDelete}/>
      <Link href={`/tickets/${id}/modify`}>
        <Pencil className="cursor-pointer transition ease-in-out duration-500 hover:text-blue-500" />
      </Link>
    </div>
  )
}
