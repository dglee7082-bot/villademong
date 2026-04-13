'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from './Header.module.css'

const navItems = [
  { href: '/about',       label: 'ABOUT' },
  { href: '/wedding',     label: 'WEDDING' },
  { href: '/banquet',     label: 'BANQUET' },
  { href: '/gallery',     label: 'GALLERY' },
  { href: '/location',    label: 'LOCATION' },
  { href: '/reservation', label: 'RESERVATION', highlight: true },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isHome = pathname === '/'

  return (
    <>
      <header
        className={[
          styles.header,
          scrolled    ? styles.scrolled : '',
          isHome      ? styles.transparent : styles.solid,
        ].join(' ')}
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoEn}>Villa de Mong</span>
            <span className={styles.logoKr}>빌라드몽</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="주 메뉴">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  styles.navLink,
                  pathname.startsWith(item.href) ? styles.active : '',
                  item.highlight ? styles.highlight : '',
                ].join(' ')}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            id="menu-toggle"
            className={`${styles.hamburger} ${open ? styles.open : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label="메뉴 열기"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} aria-hidden={!open}>
        <nav className={styles.drawerNav}>
          <p className={styles.drawerBrand}>Villa de Mong</p>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.drawerLink} ${pathname.startsWith(item.href) ? styles.drawerActive : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden />
      )}
    </>
  )
}
