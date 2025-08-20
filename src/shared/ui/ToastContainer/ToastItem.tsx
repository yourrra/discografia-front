import { useEffect, useState } from 'react'

import { toast as toastManager } from '@/shared/lib/toast'
import type { Toast } from '@/shared/lib/toast'

import styles from './ToastContainer.module.scss'

interface ToastItemProps {
  toast: Toast
}

export const ToastItem = ({ toast }: ToastItemProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Анимация появления
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Удаляем после анимации
    setTimeout(() => toastManager.dismiss(toast.id), 300)
  }

  return (
    <div className={`${styles.toast} ${styles[toast.type]} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.content}>
        <span className={styles.message}>{toast.message}</span>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Закрыть"
        >
          ×
        </button>
      </div>
    </div>
  )
}
