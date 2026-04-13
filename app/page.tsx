import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSlider from '@/components/HeroSlider'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <>
      <Header />

      {/* ── Hero ─────────────────────────────── */}
      <HeroSlider />

      {/* ── Brand Intro ──────────────────────── */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.introText}>
            <span className="section-label">OUR STORY</span>
            <h2 className="section-title">
              빌라드몽에서<br /><em>새로운 시작</em>을
            </h2>
            <div className="divider" />
            <p className="section-desc">
              빌라드몽(Villa de Mong)은 당신의 꿈꾸던 웨딩을 현실로 만들어드립니다.
              하우스웨딩의 아늑함과 야외웨딩의 아름다움을 동시에 경험하실 수 있으며,
              섬세한 서비스와 아름다운 공간으로 평생 기억에 남을 하루를 선사합니다.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link href="/about" className="btn-outline">브랜드 스토리 →</Link>
            </div>
          </div>
          <div className={styles.introImage}>
            <Image
              src="/images/about-venue.jpg"
              alt="빌라드몽 전경"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ── Venue Cards ──────────────────────── */}
      <section className={styles.venues}>
        <div className={styles.venuesHeader}>
          <span className="section-label">OUR SPACES</span>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            공간 소개
          </h2>
          <div className="divider divider-center" />
        </div>
        <div className={styles.venueGrid}>
          {[
            {
              img: '/images/hero-house.jpg',
              tag: 'House Wedding',
              title: '하우스 웨딩',
              desc: '로맨틱한 인테리어와 아늑한 분위기의 하우스웨딩홀로 소규모 프라이빗 웨딩에 최적화된 공간입니다.',
              href: '/wedding#house',
            },
            {
              img: '/images/hero-outdoor.jpg',
              tag: 'Garden Wedding',
              title: '야외 가든 웨딩',
              desc: '사계절 아름다운 정원에서 자연과 함께하는 감성적인 야외웨딩을 경험해보세요.',
              href: '/wedding#garden',
            },
            {
              img: '/images/gallery-banquet.jpg',
              tag: 'Banquet Hall',
              title: '연회 & 돌잔치',
              desc: '기업 행사, 돌잔치, 생일파티 등 다양한 행사를 품격 있게 진행할 수 있는 연회 공간입니다.',
              href: '/banquet',
            },
          ].map((v) => (
            <Link key={v.tag} href={v.href} className={styles.venueCard}>
              <div className={styles.venueCardImg}>
                <Image src={v.img} alt={v.title} fill style={{ objectFit: 'cover' }} />
                <div className={styles.venueCardOverlay} />
                <span className={styles.venueTag}>{v.tag}</span>
              </div>
              <div className={styles.venueCardBody}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <span className={styles.venueMore}>자세히 보기 →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Gallery Preview ───────────────────── */}
      <section className={styles.galleryPreview}>
        <div className={styles.galleryHeader}>
          <span className="section-label">GALLERY</span>
          <h2 className="section-title" style={{ textAlign: 'center' }}>웨딩 갤러리</h2>
          <div className="divider divider-center" />
        </div>
        <div className={styles.galleryGrid}>
          {[
            { src: '/images/gallery-ceremony.jpg', alt: '식장', span: 'double' },
            { src: '/images/hero-house.jpg',      alt: '하우스웨딩' },
            { src: '/images/gallery-banquet.jpg', alt: '연회장' },
            { src: '/images/hero-outdoor.jpg',    alt: '야외웨딩' },
            { src: '/images/about-venue.jpg',     alt: '전경' },
          ].map((g, i) => (
            <div key={i} className={`${styles.galleryItem} ${g.span === 'double' ? styles.galleryDouble : ''}`}>
              <Image src={g.src} alt={g.alt} fill style={{ objectFit: 'cover' }} />
              <div className={styles.galleryItemOverlay}>
                <span>{g.alt}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/gallery" className="btn-primary">갤러리 전체 보기</Link>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <span className="section-label" style={{ color: 'var(--mint-light)' }}>RESERVATION</span>
          <h2 className={styles.ctaTitle}>
            특별한 날을<br />지금 예약하세요
          </h2>
          <p className={styles.ctaSub}>
            빌라드몽 전담 플래너가 처음부터 끝까지 함께합니다
          </p>
          <div className={styles.ctaActions}>
            <Link href="/reservation" className="btn-white">상담 신청하기</Link>
            <a href="tel:010-0000-0000" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>
              전화 문의 →
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── KakaoTalk Float ──────────────────── */}
      <a
        href="https://pf.kakao.com/_yourChannelId"
        target="_blank"
        rel="noopener noreferrer"
        className="kakao-float"
        aria-label="카카오톡 상담"
        id="kakao-float-btn"
      >
        <svg viewBox="0 0 24 24" fill="#3C1E1E">
          <path d="M12 3C6.48 3 2 6.69 2 11.25c0 2.88 1.74 5.42 4.38 6.96L5.5 21l3.67-1.93A11.3 11.3 0 0012 19.5c5.52 0 10-3.69 10-8.25S17.52 3 12 3z"/>
        </svg>
      </a>
    </>
  )
}
