import AdminLayout from '../AdminLayout'
import styles from './page.module.css'
import AnalyticsCharts from './components/AnalyticsCharts'
import { getPageViews, getTrafficSources, getDeviceUsage, checkGAConnection } from '@/lib/ga'

// 기존 임시 데이터 (상담/갤러리 관련 등)
const stats = [
  { label: '이번 달 상담', value: '12건', icon: '📋', color: '#7BBFB0' },
  { label: '처리 대기',    value: '3건',  icon: '⏳', color: '#F6AD55' },
  { label: '완료',         value: '9건',  icon: '✅', color: '#68D391' },
  { label: '갤러리 사진',  value: '24장', icon: '🖼️', color: '#7BBFB0' },
]

const recentReservations = [
  { name: '김지은', phone: '010-1234-5678', type: '하우스 웨딩', date: '2025-06-15', status: '대기' },
  { name: '박민준', phone: '010-2345-6789', type: '야외 가든',   date: '2025-08-20', status: '상담중' },
  { name: '이수현', phone: '010-3456-7890', type: '돌잔치',      date: '2025-05-03', status: '완료' },
]

const statusColor: Record<string, string> = {
  '대기':  '#F6AD55',
  '상담중': '#7BBFB0',
  '완료':  '#68D391',
}

export const dynamic = 'force-dynamic'; // 항상 실시간(최신) 서버 데이터 호출 보장

export default async function DashboardPage() {
  // GA4 데이터 서버 연동 (환경 변수 없으면 Mock Data 반환)
  const connectionError = await checkGAConnection();
  const pageViews = await getPageViews(30);
  const trafficSources = await getTrafficSources();
  const deviceUsage = await getDeviceUsage();

  return (
    <AdminLayout>
      <div className={styles.page}>
        {connectionError && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '16px', borderRadius: '8px', marginBottom: '20px', fontWeight: 500 }}>
            🚨 Google Analytics 연동 오류 발생: {connectionError}
          </div>
        )}
        <div className={styles.headerArea}>
          <h1 className={styles.title}>대시보드</h1>
          <p className={styles.subtitle}>홈페이지 트래픽 및 운영 지표를 확인하세요.</p>
        </div>

        {/* 최상단 요약 위젯 */}
        <div className={styles.statsGrid}>
          {stats.map(s => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statIcon}>{s.icon}</span>
              <div>
                <p className={styles.statValue} style={{ color: s.color }}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 구글 애널리틱스 제공 영역 (트래픽 / 마케팅 데이터) */}
        <AnalyticsCharts 
          pageViews={pageViews} 
          trafficSources={trafficSources} 
          deviceUsage={deviceUsage} 
        />

        {/* 예약 정보 표 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>최근 상담 신청</h2>
            <a href="/admin/reservations" className={styles.seeAll}>전체 보기 →</a>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>예식 유형</th>
                  <th>희망일</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {recentReservations.map((r, i) => (
                  <tr key={i}>
                    <td>{r.name}</td>
                    <td>{r.phone}</td>
                    <td>{r.type}</td>
                    <td>{r.date}</td>
                    <td>
                      <span className={styles.badge} style={{ background: statusColor[r.status] + '20', color: statusColor[r.status] }}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
