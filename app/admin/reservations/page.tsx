'use client'
import { useState } from 'react'
import AdminLayout from '../AdminLayout'
import styles from './page.module.css'

type Status = '전체' | '대기' | '상담중' | '완료'

// 임시 데이터 (추후 DB 연동)
const sampleData = [
  { id: 1, name: '김지은', phone: '010-1234-5678', email: 'jieun@email.com', type: '하우스 웨딩', date: '2025-06-15', guests: '50~100명', budget: '1000~2000만원', message: '소규모 프라이빗 웨딩을 원합니다.', status: '대기', createdAt: '2025-04-10' },
  { id: 2, name: '박민준', phone: '010-2345-6789', email: 'minjun@email.com', type: '야외 가든', date: '2025-08-20', guests: '100~200명', budget: '2000만원 이상', message: '야외 가든에서 여름 웨딩을 계획 중입니다.', status: '상담중', createdAt: '2025-04-09' },
  { id: 3, name: '이수현', phone: '010-3456-7890', email: '', type: '돌잔치', date: '2025-05-03', guests: '50명 이하', budget: '500만원 미만', message: '첫 돌잔치 준비 중입니다.', status: '완료', createdAt: '2025-04-08' },
  { id: 4, name: '최예린', phone: '010-4567-8901', email: 'yerin@email.com', type: '하우스 웨딩', date: '2025-07-12', guests: '50~100명', budget: '1000~2000만원', message: '하우스웨딩 패키지 문의드립니다.', status: '대기', createdAt: '2025-04-07' },
]

const statusColor: Record<string, string> = { '대기': '#F6AD55', '상담중': '#7BBFB0', '완료': '#68D391' }

export default function ReservationsAdminPage() {
  const [filter, setFilter] = useState<Status>('전체')
  const [selected, setSelected] = useState<typeof sampleData[0] | null>(null)

  const filtered = filter === '전체' ? sampleData : sampleData.filter(r => r.status === filter)

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>상담 관리</h1>
          <div className={styles.filters}>
            {(['전체', '대기', '상담중', '완료'] as Status[]).map(s => (
              <button
                key={s}
                id={`filter-${s}`}
                className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ''}`}
                onClick={() => setFilter(s)}
              >{s} {s !== '전체' && `(${sampleData.filter(r => r.status === s).length})`}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>접수일</th><th>이름</th><th>연락처</th><th>예식 유형</th>
                <th>희망일</th><th>인원</th><th>상태</th><th>상세</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className={styles.row}>
                  <td>{r.createdAt}</td>
                  <td><strong>{r.name}</strong></td>
                  <td><a href={`tel:${r.phone}`} className={styles.phone}>{r.phone}</a></td>
                  <td>{r.type}</td>
                  <td>{r.date}</td>
                  <td>{r.guests}</td>
                  <td>
                    <span className={styles.badge} style={{ background: statusColor[r.status] + '22', color: statusColor[r.status] }}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.detailBtn} onClick={() => setSelected(r)} id={`detail-${r.id}`}>
                      상세 보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Modal */}
        {selected && (
          <div className={styles.modalBackdrop} onClick={() => setSelected(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{selected.name} 님 상담 내용</h2>
                <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.modalGrid}>
                  <div><span>연락처</span><strong>{selected.phone}</strong></div>
                  <div><span>이메일</span><strong>{selected.email || '미입력'}</strong></div>
                  <div><span>예식 유형</span><strong>{selected.type}</strong></div>
                  <div><span>희망 예식일</span><strong>{selected.date}</strong></div>
                  <div><span>예상 인원</span><strong>{selected.guests}</strong></div>
                  <div><span>예산</span><strong>{selected.budget}</strong></div>
                </div>
                <div className={styles.modalMsg}>
                  <span>문의 내용</span>
                  <p>{selected.message || '없음'}</p>
                </div>
                <div className={styles.modalActions}>
                  <a href={`tel:${selected.phone}`} className="btn-primary">📞 전화하기</a>
                  {selected.email && (
                    <a href={`mailto:${selected.email}`} className="btn-outline">✉ 이메일</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
