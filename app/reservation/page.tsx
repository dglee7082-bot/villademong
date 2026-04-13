import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReservationForm from './ReservationForm'
import styles from './page.module.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '상담 신청 | Villa de Mong 빌라드몽',
  description: '빌라드몽 웨딩홀 상담을 신청하세요. 전담 플래너가 빠르게 연락드립니다.',
}

export default function ReservationPage() {
  return (
    <>
      <Header />
      <div className={styles.pageTop}>
        <div className={styles.pageTopInner}>
          <span className="section-label">RESERVATION</span>
          <h1 className={styles.pageTitle}>상담 신청</h1>
          <p className={styles.pageSub}>
            아래 양식을 작성해 주시면 담당 플래너가 1~2 영업일 내 연락드립니다
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.infoPanel}>
            <h2 className={styles.infoTitle}>빌라드몽 안내</h2>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <p className={styles.infoLabel}>전화 문의</p>
                <a href="tel:010-0000-0000" className={styles.infoValue}>010-0000-0000</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>⏰</span>
              <div>
                <p className={styles.infoLabel}>상담 시간</p>
                <p className={styles.infoValue}>평일 09:00 – 18:00</p>
                <p className={styles.infoValueSub}>주말·공휴일 상담 가능</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <p className={styles.infoLabel}>위치</p>
                <p className={styles.infoValue}>서울특별시 OO구 OO로 000</p>
                <Link href="/location" className={styles.infoLink}>오시는 길 →</Link>
              </div>
            </div>
            <div className={styles.kakaoBtn}>
              <a
                href="https://pf.kakao.com/_yourChannelId"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.kakaoBtnInner}
                id="reservation-kakao-btn"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#3C1E1E">
                  <path d="M12 3C6.48 3 2 6.69 2 11.25c0 2.88 1.74 5.42 4.38 6.96L5.5 21l3.67-1.93A11.3 11.3 0 0012 19.5c5.52 0 10-3.69 10-8.25S17.52 3 12 3z"/>
                </svg>
                카카오톡으로 상담하기
              </a>
            </div>
          </div>

          <div className={styles.formPanel}>
            <ReservationForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
