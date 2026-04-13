'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './HeroSlider.module.css'

const slides = [
  {
    src:     '/images/hero-house.jpg',
    label:   'House Wedding',
    title:   '당신만의\n하우스 웨딩',
    sub:     '특별한 공간에서 완성되는 오직 하나의 이야기',
    cta:     { href: '/wedding', text: 'WEDDING HALL' },
  },
  {
    src:     '/images/hero-outdoor.jpg',
    label:   'Garden Wedding',
    title:   '자연 속\n야외 웨딩',
    sub:     '싱그러운 자연과 함께하는 로맨틱한 순간',
    cta:     { href: '/wedding', text: 'GARDEN STORY' },
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 600)
  }, [animating])

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [current, goTo])

  const slide = slides[current]

  return (
    <section id="hero" className={styles.hero}>
      {slides.map((s, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
        >
          <Image
            src={s.src}
            alt={s.label}
            fill
            priority={i === 0}
            quality={90}
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.overlay} />
        </div>
      ))}

      <div className={`${styles.content} ${animating ? styles.hidden : styles.visible}`}>
        <span className={styles.label}>{slide.label}</span>
        <h1 className={styles.title}>{slide.title}</h1>
        <p className={styles.sub}>{slide.sub}</p>
        <div className={styles.actions}>
          <Link href={slide.cta.href} className="btn-white">{slide.cta.text}</Link>
          <Link href="/reservation" className="btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.7)' }}>
            상담 신청 →
          </Link>
        </div>
      </div>

      {/* Indicators */}
      <div className={styles.indicators} aria-label="슬라이드 선택">
        {slides.map((_, i) => (
          <button
            key={i}
            id={`slide-dot-${i}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`슬라이드 ${i+1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <span>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
