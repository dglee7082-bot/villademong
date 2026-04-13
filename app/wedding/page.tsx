import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '웨딩홀 소개 | Villa de Mong 빌라드몽',
  description: '빌라드몽의 하우스웨딩홀과 야외가든웨딩 공간을 소개합니다. 소규모 프라이빗 웨딩부터 대규모 파티까지 모두 가능합니다.',
}

export default function WeddingPage() {
  return (
    <>
      <Header />

      {/* Page Top */}
      <div className={styles.pageTop}>
        <div className={styles.pageTopOverlay} />
        <Image src="/images/gallery-ceremony.jpg" alt="웨딩홀" fill priority style={{ objectFit: 'cover' }} />
        <div className={styles.pageTopContent}>
          <span className="section-label" style={{ color: 'var(--mint-light)' }}>WEDDING</span>
          <h1 className={styles.heroTitle}>웨딩홀 소개</h1>
        </div>
      </div>

      {/* House Wedding */}
      <section id="house" className={styles.venue}>
        <div className={styles.venueInner}>
          <div className={styles.venueImage}>
            <Image src="/images/hero-house.jpg" alt="하우스웨딩홀" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.venueText}>
            <span className="section-label">HOUSE WEDDING</span>
            <h2 className="section-title">하우스 <em>웨딩홀</em></h2>
            <div className="divider" />
            <p className="section-desc">
              빌라드몽 하우스웨딩홀은 따뜻하고 아늑한 분위기 속에서 소규모 프라이빗 웨딩을
              완성할 수 있는 특별한 공간입니다. 섬세한 플로럴 데코레이션과 자연 채광으로
              가득한 인테리어가 두 분의 웨딩을 더욱 아름답게 빛내줍니다.
            </p>
            <div className={styles.venueInfo}>
              <div className={styles.venueInfoItem}>
                <span>수용 인원</span><strong>최대 100명</strong>
              </div>
              <div className={styles.venueInfoItem}>
                <span>공간 구성</span><strong>메인홀 + 포토존 + 브라이덜룸</strong>
              </div>
              <div className={styles.venueInfoItem}>
                <span>예식 시간</span><strong>2~3시간</strong>
              </div>
            </div>
            <Link href="/reservation" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              하우스웨딩 상담하기 →
            </Link>
          </div>
        </div>
      </section>

      {/* Garden Wedding */}
      <section id="garden" className={`${styles.venue} ${styles.venueReverse}`}>
        <div className={styles.venueInner}>
          <div className={styles.venueText}>
            <span className="section-label">GARDEN WEDDING</span>
            <h2 className="section-title">야외 <em>가든 웨딩</em></h2>
            <div className="divider" />
            <p className="section-desc">
              사계절 아름다운 빌라드몽 정원에서 자연과 함께하는 감성적인 야외 웨딩을
              경험하세요. 봄꽃이 넘치는 봄부터 황금빛 단풍이 물드는 가을까지,
              계절마다 다른 매력으로 오직 하나뿐인 웨딩을 만들어드립니다.
            </p>
            <div className={styles.venueInfo}>
              <div className={styles.venueInfoItem}>
                <span>수용 인원</span><strong>최대 200명</strong>
              </div>
              <div className={styles.venueInfoItem}>
                <span>공간 구성</span><strong>야외정원 + 가든홀 + 포토존</strong>
              </div>
              <div className={styles.venueInfoItem}>
                <span>예식 시간</span><strong>2~4시간</strong>
              </div>
            </div>
            <Link href="/reservation" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              가든웨딩 상담하기 →
            </Link>
          </div>
          <div className={styles.venueImage}>
            <Image src="/images/hero-outdoor.jpg" alt="야외가든웨딩" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className={styles.galleryTeaser}>
        <div className={styles.galleryTeaserInner}>
          <span className="section-label">GALLERY</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>웨딩 갤러리</h2>
          <div className="divider divider-center" style={{ background: 'var(--mint-light)' }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', fontSize: '0.9rem' }}>
            빌라드몽에서 진행된 아름다운 웨딩들을 만나보세요
          </p>
          <Link href="/gallery" className="btn-white">갤러리 보기 →</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
