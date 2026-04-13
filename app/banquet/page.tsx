import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '연회 | Villa de Mong 빌라드몽',
  description: '빌라드몽에서 돌잔치, 칠순·팔순잔치, 기업행사, 생일파티 등 특별한 연회를 경험하세요. 전담 플래너의 맞춤 서비스로 완벽한 하루를 선물합니다.',
}

const events = [
  {
    id: 'doljanchi',
    icon: '🎉',
    tag: 'DOLJANCHI',
    title: '돌잔치',
    desc: '아이의 첫 번째 생일을 빌라드몽에서 더욱 특별하게 기념하세요. 아기자기한 테마 데코레이션부터 포토존, 케이터링까지 모든 것을 원스톱으로 준비해드립니다.',
    img: '/images/gallery-banquet.jpg',
    imgAlt: '돌잔치 연회장',
    info: [
      { label: '수용 인원', value: '최대 150명' },
      { label: '소요 시간', value: '3~4시간' },
      { label: '포함 서비스', value: '케이터링·데코·촬영 패키지' },
    ],
  },
  {
    id: 'birthday',
    icon: '🎂',
    tag: 'BIRTHDAY',
    title: '칠순·팔순 잔치',
    desc: '소중한 어른의 특별한 날을 품격 있게 준비해드립니다. 한식 상차림부터 양식 뷔페까지 다양한 메뉴 구성과 함께 아름다운 공간에서 감사의 마음을 전하세요.',
    img: '/images/gallery-banquet.jpg',
    imgAlt: '칠순잔치 연회',
    info: [
      { label: '수용 인원', value: '최대 200명' },
      { label: '소요 시간', value: '3~5시간' },
      { label: '포함 서비스', value: '맞춤 메뉴·생화 장식·영상 제작' },
    ],
  },
  {
    id: 'corporate',
    icon: '🏢',
    tag: 'CORPORATE',
    title: '기업 행사',
    desc: '창립기념일, 임직원 워크샵, 시상식 등 기업 이벤트를 격조 있게 진행하세요. 프로젝터·음향 시스템·케이터링 등 비즈니스에 필요한 모든 인프라를 갖추고 있습니다.',
    img: '/images/gallery-banquet.jpg',
    imgAlt: '기업 행사장',
    info: [
      { label: '수용 인원', value: '최대 300명' },
      { label: '소요 시간', value: '협의 가능' },
      { label: '포함 서비스', value: 'AV 장비·케이터링·전담 스태프' },
    ],
  },
  {
    id: 'party',
    icon: '🥂',
    tag: 'PRIVATE PARTY',
    title: '프라이빗 파티',
    desc: '생일파티, 연인의 기념일, 가족 모임 등 소중한 사람들과의 특별한 자리를 만들어드립니다. 프라이빗 공간에서 오직 여러분만을 위한 감성적인 시간을 경험하세요.',
    img: '/images/gallery-banquet.jpg',
    imgAlt: '프라이빗 파티장',
    info: [
      { label: '수용 인원', value: '최소 20명~' },
      { label: '소요 시간', value: '2~4시간' },
      { label: '포함 서비스', value: '플라워 데코·케이터링·포토존' },
    ],
  },
]

const includes = [
  { icon: '🌸', title: '플로럴 데코레이션', desc: '행사 컨셉에 맞는 생화 장식과 테이블 세팅' },
  { icon: '🍽️', title: '케이터링 서비스', desc: '한식·양식·뷔페 등 다양한 메뉴 구성' },
  { icon: '📸', title: '사진·영상 촬영', desc: '전문 스튜디오와 연계한 촬영 패키지 제공' },
  { icon: '🎵', title: '음향·조명 시스템', desc: '고품질 PA 시스템과 무대 조명 완비' },
  { icon: '🅿️', title: '전용 주차장', desc: '건물 내 무료 주차 100대 가능' },
  { icon: '👩‍💼', title: '전담 이벤트 플래너', desc: '처음부터 끝까지 1:1 맞춤 기획 서비스' },
]

export default function BanquetPage() {
  return (
    <>
      <Header />

      {/* Page Hero */}
      <div className={styles.pageHero}>
        <Image
          src="/images/gallery-banquet.jpg"
          alt="빌라드몽 연회장"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.pageHeroOverlay} />
        <div className={styles.pageHeroContent}>
          <span className="section-label" style={{ color: 'var(--mint-light)' }}>BANQUET</span>
          <h1 className={styles.pageHeroTitle}>연회</h1>
          <p className={styles.pageHeroSub}>특별한 날을 더욱 빛나게</p>
        </div>
      </div>

      {/* Intro */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <span className="section-label">OUR BANQUET</span>
          <h2 className="section-title">빌라드몽의 <em>연회 서비스</em></h2>
          <div className="divider divider-center" />
          <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto' }}>
            돌잔치부터 기업행사까지, 빌라드몽은 모든 종류의 연회를 품격 있게 준비합니다.<br />
            전담 이벤트 플래너와 함께 처음부터 끝까지 완벽한 하루를 만들어드립니다.
          </p>
        </div>
      </section>

      {/* Event Types */}
      {events.map((event, idx) => (
        <section
          key={event.id}
          id={event.id}
          className={`${styles.eventSection} ${idx % 2 === 1 ? styles.eventReverse : ''}`}
        >
          <div className={styles.eventInner}>
            <div className={styles.eventImage}>
              <Image src={event.img} alt={event.imgAlt} fill style={{ objectFit: 'cover' }} />
              <div className={styles.eventImageBadge}>
                <span className={styles.eventIcon}>{event.icon}</span>
              </div>
            </div>
            <div className={styles.eventText}>
              <span className="section-label">{event.tag}</span>
              <h2 className="section-title">{event.title}</h2>
              <div className="divider" />
              <p className="section-desc">{event.desc}</p>
              <div className={styles.eventInfo}>
                {event.info.map(item => (
                  <div key={item.label} className={styles.eventInfoItem}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <Link href="/reservation" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
                {event.title} 상담하기 →
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Includes */}
      <section className={styles.includesSection}>
        <div className={styles.includesInner}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">WHAT WE OFFER</span>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>
              모든 연회에 <em style={{ color: 'var(--mint-light)' }}>포함</em>되는 것들
            </h2>
            <div className="divider divider-center" style={{ background: 'var(--mint-light)' }} />
          </div>
          <div className={styles.includesGrid}>
            {includes.map(item => (
              <div key={item.title} className={styles.includeCard}>
                <span className={styles.includeIcon}>{item.icon}</span>
                <h3 className={styles.includeTitle}>{item.title}</h3>
                <p className={styles.includeDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <span className="section-label">CONTACT US</span>
          <h2 className="section-title">연회 <em>문의하기</em></h2>
          <div className="divider divider-center" />
          <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto 2.5rem' }}>
            행사 날짜, 인원, 종류를 알려주시면 최적의 플랜을 제안해드립니다.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/reservation" className="btn-primary">온라인 상담 신청 →</Link>
            <a href="tel:010-0000-0000" className="btn-outline">전화 문의</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
