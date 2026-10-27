import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'
import { MAIN_PAGE_ONLY } from '@/lib/site-config'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            src="/logo-light.png"
            alt="VILLA de MONG"
            width={220}
            height={35}
            className={styles.brandLogo}
          />
          <p className={styles.brandKr}>빌라드몽</p>
          <p className={styles.tagline}>The place you&apos;ve dreamded of, VILLA de MONG</p>
        </div>

        <div className={styles.cols}>
          {!MAIN_PAGE_ONLY && <div className={styles.col}>
            <p className={styles.colTitle}>MENU</p>
            <Link href="/about">About</Link>
            <Link href="/wedding">Wedding</Link>
            <Link href="/banquet">Banquet</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/location">Location</Link>
            <Link href="/reservation">Reservation</Link>
          </div>}

          <div className={styles.col}>
            <p className={styles.colTitle}>CONTACT</p>
            <p>Tel. 031-708-0181</p>
            <p>Email. wedding@villademong.com</p>
            <p>영업시간 10:00 – 19:00</p>
            <p>주말·공휴일 상담 가능</p>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>ADDRESS</p>
            <p>경기도 성남시 분당구 석운로 181</p>
            <p>빌라드몽 웨딩홀</p>
            {!MAIN_PAGE_ONLY && <Link href="/location" className={styles.mapLink}>오시는 길 →</Link>}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Villa de Mong (주)빌라드몽. All Rights Reserved.</p>
        {!MAIN_PAGE_ONLY && <Link href="/admin">관리자</Link>}
      </div>
    </footer>
  )
}
