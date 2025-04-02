'use client'

import { useEffect, useState } from 'react'
import { printLicenseInfo } from '@/lib/license-info'

interface StarStyle {
  delay: number;
  angle: number;
  top: number;
  left: number;
  size: number;
  distance: number;
}

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [stars, setStars] = useState<StarStyle[]>([])

  useEffect(() => {
    // Generate random values for stars on client-side only
    const newStars = Array.from({ length: 20 }).map(() => ({
      delay: Math.random() * 3,
      angle: Math.random() * 80 - 40,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 40 + Math.random() * 100,
      distance: 300 + Math.random() * 700
    }))
    setStars(newStars)
    
    // Print license info
    printLicenseInfo()
  }, [])

  return (
    <>
      {/* Background Effects */}
      <div className="nebula-overlay"></div>
      <div className="space-dust"></div>
      <div className="shooting-stars">
        {stars.map((star, i) => (
          <div 
            key={i}
            className="shooting-star"
            style={{
              '--delay': star.delay,
              '--angle': star.angle,
              '--top': star.top,
              '--left': star.left,
              '--size': star.size,
              '--distance': star.distance,
            } as React.CSSProperties}
          ></div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="dark-container">
        {children}
      </div>
    </>
  )
} 