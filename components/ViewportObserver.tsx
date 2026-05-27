'use client'

import React, { useEffect } from 'react'

export default function ViewportObserver() {
  useEffect(() => {
    // Check if browser supports IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: immediately reveal all elements if not supported
      const elements = document.querySelectorAll('[data-reveal]')
      elements.forEach((el) => el.classList.add('reveal-active'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active')
            // Once element is revealed, stop observing it
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px' // Trigger slightly before element enters view
      }
    )

    const elements = document.querySelectorAll('[data-reveal]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
