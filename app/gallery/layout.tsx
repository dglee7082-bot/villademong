import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '갤러리 | Villa de Mong 빌라드몽',
  description: '빌라드몽에서 진행된 아름다운 웨딩과 연회 사진들을 감상하세요.',
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
