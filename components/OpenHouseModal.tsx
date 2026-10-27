'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { OPEN_HOUSE_FORM_URL } from '@/lib/site-config'
import styles from './OpenHouseModal.module.css'

export default function OpenHouseModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('open-house-modal-dismissed') !== 'true') {
      setOpen(true)
    }
  }, [])

  const close = () => {
    sessionStorage.setItem('open-house-modal-dismissed', 'true')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="오픈하우스 안내">
      <div className={styles.modal}>
        <button type="button" className={styles.close} onClick={close} aria-label="닫기">×</button>
        <a href={OPEN_HOUSE_FORM_URL} target="_blank" rel="noopener noreferrer" onClick={close}>
          <Image
            src="/images/open-house.png"
            alt="빌라드몽 오픈하우스 안내 및 신청하기"
            width={886}
            height={1772}
            priority
            className={styles.image}
          />
        </a>
        <a
          href={OPEN_HOUSE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.action}
          onClick={close}
        >
          오픈하우스 신청하기 →
        </a>
      </div>
    </div>
  )
}
