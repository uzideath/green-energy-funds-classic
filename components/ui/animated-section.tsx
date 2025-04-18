"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-in" | "scale-in"
  delay?: number
  threshold?: number
}

export default function AnimatedSection({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.2,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  const animationClasses = {
    "fade-up": "opacity-0 translate-y-8 transition-all duration-700 ease-out",
    "fade-in": "opacity-0 transition-opacity duration-700 ease-out",
    "slide-in": "opacity-0 -translate-x-8 transition-all duration-700 ease-out",
    "scale-in": "opacity-0 scale-95 transition-all duration-700 ease-out",
  }

  const visibleClasses = {
    "fade-up": "opacity-100 translate-y-0",
    "fade-in": "opacity-100",
    "slide-in": "opacity-100 translate-x-0",
    "scale-in": "opacity-100 scale-100",
  }

  return (
    <div
      ref={ref}
      className={cn(animationClasses[animation], isVisible && visibleClasses[animation], className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

