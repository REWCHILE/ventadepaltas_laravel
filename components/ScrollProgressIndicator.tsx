'use client'

import React, { useState, useEffect } from 'react'

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) {
        setScrollProgress(0)
        return
      }
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(Math.max(Math.round(progress), 0), 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on load
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center gap-2 select-none"
      aria-hidden="true"
    >
      {/* Scroll track indicator */}
      <div className="h-20 w-[2.5px] bg-zinc-200 dark:bg-zinc-800 rounded-full relative overflow-hidden mb-1">
        <div 
          className="w-full bg-gradient-to-b from-emerald-500 to-green-500 rounded-full transition-all duration-75"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Avocado Shape with Seed (Cuesco) Loading Progress */}
      <div className="relative hover:scale-105 transition-transform duration-300">
        <svg viewBox="0 0 70 90" className="w-12 h-16 drop-shadow-lg" aria-hidden="true">
          {/* Avocado Skin (Dark Green) */}
          <path 
            d="M 35 6 C 47 6, 52 26, 56 46 C 63 68, 59 84, 35 84 C 11 84, 7 68, 14 46 C 18 26, 23 6, 35 6 Z" 
            fill="#14532d" 
            stroke="#166534" 
            strokeWidth="1.5" 
          />
          {/* Avocado Flesh (Pale Light Green) */}
          <path 
            d="M 35 11 C 44 11, 48 28, 51 46 C 57 66, 53 79, 35 79 C 17 79, 13 66, 19 46 C 22 28, 26 11, 35 11 Z" 
            fill="#dcfce7" 
          />
          {/* The Cuesco (Avocado Seed/Pit Background) */}
          <circle 
            cx="35" 
            cy="56" 
            r="16" 
            fill="#7c2d12" 
            stroke="#431407" 
            strokeWidth="1" 
          />
          {/* The Cuesco Loading Progress Border */}
          <circle 
            cx="35" 
            cy="56" 
            r="13" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            strokeDasharray="81.68" 
            strokeDashoffset={81.68 - (81.68 * scrollProgress) / 100} 
            transform="rotate(-90 35 56)" 
          />
          {/* Percentage Text inside Cuesco */}
          <text 
            x="35" 
            y="59" 
            textAnchor="middle" 
            fill="#ffffff" 
            fontSize="8" 
            fontWeight="900" 
            fontFamily="monospace"
          >
            {scrollProgress}%
          </text>
        </svg>
      </div>
    </div>
  )
}
