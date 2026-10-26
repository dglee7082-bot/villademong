import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: '오시는 길 | Villa de Mong 빌라드몽',
  description: '빌라드몽은 경기도 성남시 분당구 석운로 181에 위치해 있습니다. 지하철, 버스, 자가용 이용 안내.',
}

export default function LocationPage() {
  const address = '경기도 성남시 분당구 석운로 181'
  const mapQuery = encodeURIComponent(address)

  return (
    <>
      <Header />

      {/* Page Top */}
      <div className={styles.pageTop}>
        <span className="section-label">LOCATION</span>
        <h1 className={styles.pageTitle}>오시는 길</h1>
        <p className={styles.pageSub}>경기도 성남시 분당구 석운로 181</p>
      </div>

      <section className={styles.section}>
        <div className={styles.inner}>

          {/* Map */}
          <div className={styles.mapWrap}>
            <Image
              src="/images/location-map.jpg"
              alt="빌라드몽 약도"
              width={1800}
              height={1690}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Villa de Mong</h2>
              <p className={styles.infoAddress}>경기도 성남시 분당구 석운로 181</p>

              <div className={styles.mapBtns}>
                <a
                  href={`https://map.kakao.com/?q=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapBtn}
                  id="kakao-map-btn"
                >
                  <span>🗺️</span> 카카오맵으로 보기
                </a>
                <a
                  href={`https://naver.me/map?query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.mapBtn} ${styles.mapBtnNaver}`}
                  id="naver-map-btn"
                >
                  <span>📍</span> 네이버지도로 보기
                </a>
              </div>
            </div>

            <div className={styles.dividerLine} />

            {/* Transport */}
            <div className={styles.transport}>
              <div className={styles.transportItem}>
                <p className={styles.transportTitle}>대중교통</p>
                <p className={styles.transportDesc}>
                  판교역(신분당선) 1번 출구 건너편 판교역 북편 정류장(07075)에서<br/>
                  누리3번 버스 → 석운동 정류장(07452) 하차
                </p>
              </div>

              <div className={styles.transportItem}>
                <p className={styles.transportTitle}>셔틀버스</p>
                <p className={styles.transportDesc}>
                  판교역(신분당선) 1번 출구 건너편 버스 정류장 인근에서 탑승<br/>
                  예식 1시간 전부터 15~20분 간격으로 운행
                </p>
              </div>

              <div className={styles.transportItem}>
                <p className={styles.transportTitle}>자동차</p>
                <p className={styles.transportDesc}>
                  내비게이션 &apos;빌라드몽&apos; 또는 &apos;석운로 181&apos; 검색<br/>
                  용인서울고속도로 서판교IC → 운중터널 → 고기리·대장동 방면
                </p>
              </div>

              <div className={styles.transportItem}>
                <p className={styles.transportTitle}>주차 안내</p>
                <p className={styles.transportDesc}>
                  빌라드몽 전용 주차장 이용<br/>
                  도착 후 현장 주차요원의 안내를 받아주세요
                </p>
              </div>
            </div>

            <div className={styles.dividerLine} />

            <div className={styles.contactInfo}>
              <p className={styles.contactLabel}>문의 &amp; 예약</p>
              <a href="tel:010-0000-0000" className={styles.contactPhone}>010-0000-0000</a>
              <p className={styles.contactHours}>평일 09:00 – 18:00 · 주말·공휴일 상담 가능</p>
              <Link href="/reservation" className="btn-primary" style={{ marginTop: '1.25rem', display: 'inline-flex' }}>
                온라인 상담 신청 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
