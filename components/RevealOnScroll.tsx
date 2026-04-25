'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function RevealOnScroll({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            obs.disconnect()
            break
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${visible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
