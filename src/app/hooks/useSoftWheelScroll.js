import Lenis from 'lenis'
import { useEffect } from 'react'

export function useSoftWheelScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 1.28,
      touchMultiplier: 1.05,
      duration: 1.05,
      lerp: 0.11,
      easing: (t) => 1 - Math.pow(1 - t, 2.6),
      syncTouch: false,
    })

    let rafId = 0

    const raf = (time) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}
