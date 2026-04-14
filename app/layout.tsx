import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Villa de Mong | 빌라드몽 웨딩홀',
  description: '빌라드몽에서 당신만의 특별한 웨딩을 완성하세요. 하우스웨딩, 야외웨딩, 연회 공간을 갖춘 프리미엄 웨딩홀입니다.',
  keywords: '빌라드몽, Villa de Mong, 웨딩홀, 하우스웨딩, 야외웨딩, 웨딩, 연회장',
  openGraph: {
    title: 'Villa de Mong | 빌라드몽 웨딩홀',
    description: '당신만의 특별한 웨딩을 빌라드몽에서',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  )
}
