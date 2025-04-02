"use client"

import MacBook from "@/components/macbook"
import { useEffect, useState } from "react"

export default function Home() {
  const [autoCloseLid, setAutoCloseLid] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Wait for component to mount before showing content
  useEffect(() => {
    // Set a small timeout to ensure all CSS is applied
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-transparent">
      <div 
        className="w-full max-w-6xl transition-opacity duration-300"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <MacBook autoCloseLid={autoCloseLid} />
      </div>
    </main>
  )
}

