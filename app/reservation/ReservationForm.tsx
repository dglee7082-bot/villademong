'use client'
import { useState } from 'react'
import styles from './ReservationForm.module.css'

type FormData = {
  name:      string
  phone:     string
  email:     string
  weddingType: string
  date:      string
  guests:    string
  budget:    string
  message:   string
}

const initForm: FormData = {
  name: '', phone: '', email: '',
  weddingType: '', date: '', guests: '', budget: '', message: '',
}

export default function ReservationForm() {
  const [form, setForm] = useState<FormData>(initForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('서버 오류가 발생했습니다.')
      setStatus('success')
      setForm(initForm)
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : '오류가 발생했습니다.')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3>상담 신청이 완료되었습니다!</h3>
        <p>입력하신 연락처로 1~2 영업일 내에 담당 플래너가 연락드릴 예정입니다.</p>
        <button className="btn-primary" onClick={() => setStatus('idle')}>
          다시 신청하기
        </button>
      </div>
    )
  }

  return (
    <form id="reservation-form" className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="name">이름 *</label>
          <input id="name" name="name" type="text" value={form.name}
            onChange={handleChange} placeholder="홍길동" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">연락처 *</label>
          <input id="phone" name="phone" type="tel" value={form.phone}
            onChange={handleChange} placeholder="010-0000-0000" required />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" value={form.email}
          onChange={handleChange} placeholder="example@email.com" />
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="weddingType">예식 유형 *</label>
          <select id="weddingType" name="weddingType" value={form.weddingType}
            onChange={handleChange} required>
            <option value="">선택해주세요</option>
            <option value="house">하우스 웨딩</option>
            <option value="garden">야외 가든 웨딩</option>
            <option value="banquet">연회 / 돌잔치</option>
            <option value="other">기타</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">희망 예식일</label>
          <input id="date" name="date" type="date" value={form.date}
            onChange={handleChange} />
        </div>
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="guests">예상 인원</label>
          <select id="guests" name="guests" value={form.guests} onChange={handleChange}>
            <option value="">선택해주세요</option>
            <option value="~50">50명 이하</option>
            <option value="50~100">50 – 100명</option>
            <option value="100~200">100 – 200명</option>
            <option value="200~">200명 이상</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="budget">예산 범위</label>
          <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
            <option value="">선택해주세요</option>
            <option value="~500">500만원 미만</option>
            <option value="500~1000">500 – 1,000만원</option>
            <option value="1000~2000">1,000 – 2,000만원</option>
            <option value="2000~">2,000만원 이상</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">문의 내용</label>
        <textarea id="message" name="message" value={form.message}
          onChange={handleChange} placeholder="궁금하신 점을 자유롭게 적어주세요." />
      </div>

      {status === 'error' && (
        <p className={styles.errorMsg}>⚠ {errorMsg}</p>
      )}

      <button
        id="reservation-submit-btn"
        type="submit"
        className="btn-primary"
        disabled={status === 'loading'}
        style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
      >
        {status === 'loading' ? '접수 중...' : '상담 신청하기'}
      </button>

      <p className={styles.note}>
        * 개인정보는 상담 목적으로만 사용되며 완료 후 즉시 파기됩니다.
      </p>
    </form>
  )
}
