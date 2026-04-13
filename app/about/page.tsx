import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '빌라드몽 소개 | Villa de Mong',
  description: '빌라드몽은 경기도 성남 분당에 위치한 프리미엄 웨딩홀입니다. 하우스웨딩과 야외가든웨딩을 동시에 경험할 수 있는 특별한 공간입니다.',
}

const values = [
  { icon: '🌿', title: '자연과 함께', desc: '사계절 아름다운 자연 속에서 특별한 웨딩을 경험하세요.' },
  { icon: '✨', title: '섬세한 서비스', desc: '전담 웨딩 플래너가 처음부터 끝까지 함께합니다.' },
  { icon: '🎊', title: '맞춤 웨딩', desc: '두 분만의 스타일에 맞는 완벽한 웨딩을 설계합니다.' },
  { icon: '🏛️', title: '프리미엄 공간', desc: '고급스럽고 아늑한 공간으로 최고의 하루를 선사합니다.' },
]

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Page Hero */}
      <div className={styles.pageHero}>
        <Image
          src="/images/about-venue.jpg"
          alt="빌라드몽 전경"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.pageHeroOverlay} />
        <div className={styles.pageHeroContent}>
          <span className="section-label" style={{ color: 'var(--mint-light)' }}>ABOUT US</span>
          <h1 className={styles.pageHeroTitle}>Villa de Mong</h1>
          <p className={styles.pageHeroSub}>꿈꾸던 웨딩을 현실로</p>
        </div>
      </div>

      {/* Brand Story */}
      <section className={styles.story}>
        <div className={styles.storyInner}>
          <div className={styles.storyText}>
            <span className="section-label">OUR STORY</span>
            <h2 className="section-title">빌라드몽 <em>이야기</em></h2>
            <div className="divider" />
            <p className="section-desc">
              빌라드몽(Villa de Mong)은 '꿈의 빌라'라는 뜻을 담아, 두 사람의 소중한 시작을
              아름답게 담아내고자 탄생했습니다.
            </p>
            <p className="section-desc" style={{ marginTop: '1rem' }}>
              경기도 성남 분당의 조용한 자연 속에 자리한 빌라드몽은 하우스웨딩의 아늑한
              감성과 야외가든웨딩의 개방감을 동시에 제공합니다. 세심하게 설계된 인테리어와
              숙련된 플래너의 1:1 밀착 서비스로, 평생 기억에 남는 하루를 완성해드립니다.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <Link href="/reservation" className="btn-primary">상담 신청하기 →</Link>
            </div>
          </div>
          <div className={styles.storyImageGrid}>
            <div className={styles.storyImg1}>
              <Image src="/images/hero-house.jpg" alt="하우스웨딩" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.storyImg2}>
              <Image src="/images/hero-outdoor.jpg" alt="야외웨딩" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.values}>
        <div className={styles.valuesInner}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">OUR VALUES</span>
            <h2 className="section-title">빌라드몽이 <em>약속</em>드립니다</h2>
            <div className="divider divider-center" />
          </div>
          <div className={styles.valuesGrid}>
            {values.map(v => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {[
            { num: '500+', label: '누적 웨딩 진행' },
            { num: '98%', label: '고객 만족도' },
            { num: '10+', label: '운영 연수' },
            { num: '1:1', label: '전담 플래너 서비스' },
          ].map(s => (
            <div key={s.label} className={styles.statItem}>
              <p className={styles.statNum}>{s.num}</p>
              <p className={styles.statLabel}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
