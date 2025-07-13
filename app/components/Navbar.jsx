"use client"
import Link from 'next/link'
import Image from 'next/image'
import Logo from './dojo-logo.png'
import { Moon,Sun } from "lucide-react"
import { useTheme } from '../context/ThemeContext'
import { useEffect } from 'react'

export default function Navbar() {
  const {theme,toggleTheme} = useTheme();
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);
  return (
    <nav className="flex flex-row justify-between items-center">
      <div className='flex flex-row items-center gap-10'>
        <Image
          src={Logo}
          alt='Dojo Helpdesk logo'
          width={70}
          placeholder='blur'
          quality={100}
        />
        <h1>Dojo Helpdesk</h1>
      </div>
      <div className='flex flex-row items-center gap-5 md:gap-10'>
        <Link href="/" className={theme === 'dark' ? 'hover:text-white' : ''}>Dashboard</Link>
        <Link href="/tickets" className={theme === 'dark' ? 'hover:text-white' : ''}>Tickets</Link>
        {
          theme === 'light' ? 
            (<Moon className='hover:text-black hover:cursor-pointer' onClick={toggleTheme} />) :
            (<Sun className='hover:text-white hover:cursor-pointer' onClick={toggleTheme} />)
        }
        
      </div>
    </nav>
  )
}