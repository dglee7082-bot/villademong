import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
            <iframe
              src={`https://maps.google.com/maps?q=${mapQuery}&output=embed&hl=ko&z=16`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="빌라드몽 위치"
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
                <div className={styles.transportIcon} style={{ background: '#FF6B35' }}>🚇</div>
                <div>
                  <p className={styles.transportTitle}>지하철</p>
                  <p className={styles.transportDesc}>
                    신분당선 <strong>판교역</strong> 1번 출구 → 마을버스 이용 약 10분<br/>
                    분당선 <strong>서현역</strong> 2번 출구 → 택시 약 15분
                  </p>
                </div>
              </div>

              <div className={styles.transportItem}>
                <div className={styles.transportIcon} style={{ background: '#4CAF82' }}>🚌</div>
                <div>
                  <p className={styles.transportTitle}>버스</p>
                  <p className={styles.transportDesc}>
                    분당구청 방면 버스 이용 후 석운로 하차<br/>
                    51, 500, M4108번 등 이용 가능
                  </p>
                </div>
              </div>

              <div className={styles.transportItem}>
                <div className={styles.transportIcon} style={{ background: '#7BBFB0' }}>🚗</div>
                <div>
                  <p className={styles.transportTitle}>자가용</p>
                  <p className={styles.transportDesc}>
                    판교IC 또는 분당IC 이용<br/>
                    건물 내 주차장 무료 이용 가능 (100대)
                  </p>
                </div>
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
