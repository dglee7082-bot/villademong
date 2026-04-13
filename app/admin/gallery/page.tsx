'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import AdminLayout from '../AdminLayout'
import styles from './page.module.css'

type Category = '전체' | '웨딩' | '연회' | '공간'

const sampleGallery = [
  { id: 1, src: '/images/gallery-ceremony.jpg', alt: '웨딩 식장', category: '웨딩' as Category },
  { id: 2, src: '/images/hero-house.jpg',       alt: '하우스 웨딩', category: '웨딩' as Category },
  { id: 3, src: '/images/hero-outdoor.jpg',     alt: '야외 가든',   category: '웨딩' as Category },
  { id: 4, src: '/images/gallery-banquet.jpg',  alt: '연회장',      category: '연회' as Category },
  { id: 5, src: '/images/about-venue.jpg',      alt: '빌라드몽 전경', category: '공간' as Category },
]

export default function GalleryAdminPage() {
  const [images, setImages] = useState(sampleGallery)
  const [filter, setFilter] = useState<Category | '전체'>('전체')
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const filtered = filter === '전체' ? images : images.filter(i => i.category === filter)

  const handleDelete = (id: number) => {
    if (confirm('이 사진을 삭제하시겠습니까?')) {
      setImages(prev => prev.filter(i => i.id !== id))
    }
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setUploading(true)
    // TODO: 실제 업로드 로직 (Supabase Storage)
    setTimeout(() => {
      alert(`${files.length}개 파일이 업로드되었습니다. (현재는 미리보기 전용, DB 연동 후 활성화)')`)
      setUploading(false)
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>갤러리 관리</h1>
          <div className={styles.headerActions}>
            <span className={styles.count}>총 {images.length}장</span>
            <button
              id="gallery-upload-btn"
              className="btn-primary"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? '업로드 중...' : '+ 사진 추가'}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleUpload}
              id="gallery-file-input"
            />
          </div>
        </div>

        {/* Filter */}
        <div className={styles.filters}>
          {(['전체', '웨딩', '연회', '공간'] as const).map(cat => (
            <button
              key={cat}
              id={`gallery-cat-${cat}`}
              className={`${styles.filterBtn} ${filter === cat ? styles.filterActive : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Upload Drop Zone */}
        <div
          className={styles.dropZone}
          onClick={() => fileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
        >
          <span className={styles.dropIcon}>📸</span>
          <p className={styles.dropText}>클릭하거나 사진을 여기에 드래그하세요</p>
          <p className={styles.dropSub}>JPG, PNG, WEBP 지원 · 최대 10MB</p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map(img => (
            <div key={img.id} className={styles.card}>
              <div className={styles.cardImg}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.cardOverlay}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(img.id)}
                    id={`delete-img-${img.id}`}
                    aria-label="삭제"
                  >
                    🗑 삭제
                  </button>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardAlt}>{img.alt}</span>
                <span className={styles.cardCat}>{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
