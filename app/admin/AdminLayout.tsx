'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './AdminLayout.module.css'

const navItems = [
  { href: '/admin/dashboard',    label: '대시보드',   icon: '📊' },
  { href: '/admin/reservations', label: '상담 관리',  icon: '📋' },
  { href: '/admin/gallery',      label: '갤러리 관리', icon: '🖼️' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <p className={styles.sidebarBrand}>Villa de Mong</p>
          <p className={styles.sidebarSub}>관리자 시스템</p>
        </div>
        <nav className={styles.sidebarNav}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.sidebarLink} ${pathname === item.href ? styles.sidebarActive : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarBottom}>
          <Link href="/" className={styles.sidebarLink} target="_blank">
            <span>🌐</span> 홈페이지 보기
          </Link>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span>🚪</span> 로그아웃
          </button>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
