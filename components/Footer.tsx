import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.brandName}>Villa de Mong</p>
          <p className={styles.brandKr}>빌라드몽</p>
          <p className={styles.tagline}>당신의 가장 특별한 날을 함께합니다</p>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <p className={styles.colTitle}>MENU</p>
            <Link href="/about">About</Link>
            <Link href="/wedding">Wedding</Link>
            <Link href="/banquet">Banquet</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/location">Location</Link>
            <Link href="/reservation">Reservation</Link>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>CONTACT</p>
            <p>Tel. 010-0000-0000</p>
            <p>Email. info@villademong.com</p>
            <p>영업시간 09:00 – 18:00</p>
            <p>주말·공휴일 상담 가능</p>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>ADDRESS</p>
            <p>경기도 성남시 분당구 석운로 181</p>
            <p>빌라드몽 웨딩홀</p>
            <Link href="/location" className={styles.mapLink}>오시는 길 →</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Villa de Mong (주)빌라드몽. All Rights Reserved.</p>
        <Link href="/admin">관리자</Link>
      </div>
    </footer>
  )
}
