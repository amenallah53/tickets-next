"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

// shadcn components
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/app/context/ThemeContext"

export default function CreateForm() {
  const router = useRouter()
  const {theme} = useTheme()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [priority, setPriority] = useState('low')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const response = await fetch("http://localhost:4000/tickets", {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        priority,
        user_email: 'amenkalai53@gmail.com'
      })
    })

    if (response.status === 201) {
      //without refresh the browser gonna give us the cashed page  
      router.refresh()
      router.push('/tickets')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={theme === 'dark' ? "bg-gray-600 w-1/2 space-y-4" : "w-1/2 space-y-4"}>
      <div>
        <span>Title:</span>
        <Input
          className='bg-white text-gray-700'
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div>
        <span>Body:</span>
        <Textarea
          className='bg-white text-gray-700'
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </div>

      <div>
        <span>Priority:</span>
        <Select value={priority} onValueChange={setPriority} className='bg-white'>
          <SelectTrigger className='bg-white text-gray-700'>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
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
        {isLoading ? <span>adding...</span> : <span>add ticket</span>}
      </Button>
    </form>
  )
}
