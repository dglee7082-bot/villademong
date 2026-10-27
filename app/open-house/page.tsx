import Image from 'next/image'
import Link from 'next/link'
import { OPEN_HOUSE_FORM_URL } from '@/lib/site-config'
import styles from './page.module.css'

export const metadata = {
  title: '오픈하우스 | VILLA de MONG',
  description: '빌라드몽 11월 오픈하우스 사전 예약 안내',
}

export default function OpenHousePage() {
  return (
    <main className={styles.page}>
      <Image
        src="/images/open-house.png"
        alt="빌라드몽 오픈하우스 안내"
        width={886}
        height={1772}
        priority
        className={styles.image}
      />
      <a className={styles.formButton} href={OPEN_HOUSE_FORM_URL} target="_blank" rel="noopener noreferrer">
        Google Form으로 사전 예약하기 →
      </a>
      <Link href="/" className={styles.homeLink}>홈페이지로 돌아가기</Link>
    </main>
  )
}
