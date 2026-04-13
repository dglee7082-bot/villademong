import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, weddingType, date, guests, budget, message } = body

    // 필수 필드 검증
    if (!name || !phone || !weddingType) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
    }

    const weddingTypeMap: Record<string, string> = {
      house:   '하우스 웨딩',
      garden:  '야외 가든 웨딩',
      banquet: '연회 / 돌잔치',
      other:   '기타',
    }

    // Nodemailer 트랜스포터 설정 (Gmail 기준)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // Gmail 앱 비밀번호 사용
      },
    })

    // ── 관리자에게 발송 ──────────────────────────
    const adminHtml = `
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>새 상담신청</title></head>
<body style="font-family:'Noto Sans KR',sans-serif;background:#FAF8F5;margin:0;padding:0;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-top:4px solid #7BBFB0;">
    <div style="padding:32px 40px;background:#7BBFB0;">
      <h1 style="font-size:22px;color:#fff;margin:0;">새 상담 신청이 접수되었습니다</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:13px;">Villa de Mong 빌라드몽</p>
    </div>
    <div style="padding:40px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr style="border-bottom:1px solid #F0EDE8;">
          <td style="padding:14px 0;color:#7BBFB0;font-weight:500;width:120px;">이름</td>
          <td style="padding:14px 0;color:#2C3531;font-weight:600;">${name}</td>
        </tr>
        <tr style="border-bottom:1px solid #F0EDE8;">
          <td style="padding:14px 0;color:#7BBFB0;font-weight:500;">연락처</td>
          <td style="padding:14px 0;color:#2C3531;">${phone}</td>
        </tr>
        <tr style="border-bottom:1px solid #F0EDE8;">
          <td style="padding:14px 0;color:#7BBFB0;font-weight:500;">이메일</td>
          <td style="padding:14px 0;color:#2C3531;">${email || '미입력'}</td>
        </tr>
        <tr style="border-bottom:1px solid #F0EDE8;">
          <td style="padding:14px 0;color:#7BBFB0;font-weight:500;">예식 유형</td>
          <td style="padding:14px 0;color:#2C3531;">${weddingTypeMap[weddingType] || weddingType}</td>
        </tr>
        <tr style="border-bottom:1px solid #F0EDE8;">
          <td style="padding:14px 0;color:#7BBFB0;font-weight:500;">희망 예식일</td>
          <td style="padding:14px 0;color:#2C3531;">${date || '미정'}</td>
        </tr>
        <tr style="border-bottom:1px solid #F0EDE8;">
          <td style="padding:14px 0;color:#7BBFB0;font-weight:500;">예상 인원</td>
          <td style="padding:14px 0;color:#2C3531;">${guests || '미정'}</td>
        </tr>
        <tr style="border-bottom:1px solid #F0EDE8;">
          <td style="padding:14px 0;color:#7BBFB0;font-weight:500;">예산 범위</td>
          <td style="padding:14px 0;color:#2C3531;">${budget || '미정'}</td>
        </tr>
        <tr>
          <td style="padding:14px 0;color:#7BBFB0;font-weight:500;vertical-align:top;">문의 내용</td>
          <td style="padding:14px 0;color:#2C3531;line-height:1.7;">${message || '없음'}</td>
        </tr>
      </table>
    </div>
    <div style="padding:24px 40px;background:#F0EDE8;font-size:12px;color:#8A9BA8;">
      <p>접수 시각: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
      <p>빌라드몽 관리자 시스템 자동 발송</p>
    </div>
  </div>
</body>
</html>`

    await transporter.sendMail({
      from:    `"빌라드몽 홈페이지" <${process.env.GMAIL_USER}>`,
      to:      process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      subject: `[빌라드몽] 새 상담신청 - ${name} (${phone})`,
      html:    adminHtml,
    })

    // ── 고객에게 자동회신 ─────────────────────
    if (email) {
      const customerHtml = `
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"></head>
<body style="font-family:'Noto Sans KR',sans-serif;background:#FAF8F5;margin:0;padding:0;">
  <div style="max-width:600px;margin:40px auto;background:#fff;">
    <div style="padding:40px;background:#7BBFB0;text-align:center;">
      <h1 style="font-size:26px;color:#fff;font-family:Georgia,serif;margin:0;">Villa de Mong</h1>
      <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:12px;letter-spacing:0.2em;">빌라드몽</p>
    </div>
    <div style="padding:40px;text-align:center;">
      <p style="font-size:20px;color:#2C3531;font-family:Georgia,serif;margin-bottom:16px;">
        상담 신청 감사합니다, ${name}님 💚
      </p>
      <p style="font-size:14px;color:#4A5568;line-height:1.8;">
        빌라드몽에 상담을 신청해 주셔서 감사합니다.<br>
        담당 플래너가 <strong>1~2 영업일 내</strong>에 입력하신 연락처로 연락드릴 예정입니다.
      </p>
      <div style="margin:32px 0;padding:24px;background:#E8F5F2;border-radius:4px;text-align:left;">
        <p style="font-size:12px;color:#7BBFB0;font-weight:600;margin-bottom:8px;">신청 내용 요약</p>
        <p style="font-size:13px;color:#2C3531;margin:4px 0;">• 예식 유형: ${weddingTypeMap[weddingType] || weddingType}</p>
        <p style="font-size:13px;color:#2C3531;margin:4px 0;">• 희망 예식일: ${date || '미정'}</p>
        <p style="font-size:13px;color:#2C3531;margin:4px 0;">• 예상 인원: ${guests || '미정'}</p>
      </div>
      <p style="font-size:13px;color:#8A9BA8;">
        빠른 문의는 전화 <strong>010-0000-0000</strong>으로 연락주세요.<br>
        영업시간: 평일 09:00 – 18:00
      </p>
    </div>
    <div style="padding:20px 40px;background:#2C3531;text-align:center;font-size:11px;color:rgba(255,255,255,0.4);">
      <p>© 2025 Villa de Mong (주)빌라드몽. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`

      await transporter.sendMail({
        from:    `"Villa de Mong 빌라드몽" <${process.env.GMAIL_USER}>`,
        to:      email,
        subject: '[빌라드몽] 상담 신청이 접수되었습니다 💚',
        html:    customerHtml,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('이메일 발송 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
