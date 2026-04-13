'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import styles from './page.module.css'

const images = [
  { src: '/images/gallery-ceremony.jpg', alt: '웨딩 식장',     category: '웨딩' },
  { src: '/images/hero-house.jpg',       alt: '하우스 웨딩',   category: '웨딩' },
  { src: '/images/hero-outdoor.jpg',     alt: '야외 가든',     category: '웨딩' },
  { src: '/images/gallery-banquet.jpg',  alt: '연회장',        category: '연회' },
  { src: '/images/about-venue.jpg',      alt: '빌라드몽 전경', category: '공간' },
  { src: '/images/gallery-ceremony.jpg', alt: '플로럴 데코',   category: '데코' },
  { src: '/images/hero-house.jpg',       alt: '브라이덜 룸',   category: '공간' },
  { src: '/images/hero-outdoor.jpg',     alt: '정원 뷰',       category: '공간' },
  { src: '/images/gallery-banquet.jpg',  alt: '돌잔치',        category: '연회' },
]

const categories = ['전체', '웨딩', '연회', '공간', '데코']

export default function GalleryPage() {
  const [active, setActive] = useState('전체')

  const filtered = active === '전체' ? images : images.filter(img => img.category === active)

  return (
    <>
      <Header />

      {/* Page Top */}
      <div className={styles.pageTop}>
        <span className="section-label" style={{ color: 'var(--mint-light)' }}>GALLERY</span>
        <h1 className={styles.pageTitle}>갤러리</h1>
        <p className={styles.pageSub}>빌라드몽의 아름다운 순간들</p>
      </div>

      {/* Filter + Grid */}
      <section className={styles.gallerySection}>
        {/* Filter Tabs */}
        <div className={styles.filters}>
          {categories.map((c) => (
            <button
              key={c}
              id={`gallery-filter-${c}`}
              className={`${styles.filterBtn} ${active === c ? styles.filterActive : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className={styles.grid}>
          {filtered.map((img, i) => (
            <div key={`${img.alt}-${i}`} className={`${styles.gridItem} ${i % 5 === 0 ? styles.gridItemLarge : ''}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.gridOverlay}>
                <span className={styles.gridTag}>{img.category}</span>
                <p className={styles.gridAlt}>{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <p className={styles.ctaText}>
          빌라드몽에서 당신만의 아름다운 순간을 만들어보세요
        </p>
        <a href="/reservation" className="btn-primary">상담 신청하기 →</a>
      </section>

      <Footer />
    </>
  )
}
