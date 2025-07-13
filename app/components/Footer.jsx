"use client"
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
    const {theme} = useTheme()
  return (
    <footer >
      <div className="flex space-x-6 mb-4">
        <a href="#" className={theme === 'light' ? 
        "hover:text-gray-900 transition" : "hover:text-white transition"}>Home</a>
        <a href="#" className={theme === 'light' ? 
        "hover:text-gray-900 transition" : "hover:text-white transition"}>About</a>
        <a href="#" className={theme === 'light' ? 
        "hover:text-gray-900 transition" : "hover:text-white transition"}>Contact</a>
        <a href="#" className={theme === 'light' ? 
        "hover:text-gray-900 transition" : "hover:text-white transition"}>Privacy</a>
      </div>
      <div className="text-sm">
        &copy; {new Date().getFullYear()} YourSiteName. All rights reserved.
      </div>
    </footer>
  )
}
