"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useTheme } from './context/ThemeContext'

export default function Home() {
  const {theme} = useTheme()
  return (
    <main>
      <h2>Dashboard</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero repellendus tempore, exercitationem odit, quasi doloremque possimus recusandae alias sequi totam soluta natus iure eius, obcaecati sint dolores blanditiis aspernatur quo officia iusto ut. Et, aliquid sed voluptates iste cum totam, facere explicabo, fugit suscipit ratione aspernatur consequuntur ex mollitia quaerat?</p>

      <div className="flex justify-center my-8">
        <Link href="/tickets">
          <Button
            className="btn-primary transition duration-500 ease-in-out
            hover:-translate-y-1 hover:shadow-md"
          >
            View Tickets
          </Button>
        </Link>
      </div>

      <h2>Company Updates</h2>

      <div className={theme === 'dark' ? 'card bg-gray-700 text-white' : 'card bg-white text-gray-700'}>
        <h3>New member of the web dev team...</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam. Dolores omnis possimus quam soluta rerum illo laborum ullam pariatur molestiae, modi beatae corrupti.</p>
      </div>
      <div className={theme === 'dark' ? 'card bg-gray-700 text-white' : 'card bg-white text-gray-700'}>
        <h3>New website live!</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, at quam. Dolores omnis possimus quam soluta rerum illo laborum ullam pariatur molestiae, modi beatae corrupti, assumenda distinctio adipisci, cupiditate minima eum vitae? Similique dicta est facilis debitis, autem temporibus quo repellat illum unde id iste veritatis eveniet, aspernatur enim quas.</p>
      </div>
    </main>
  )
}