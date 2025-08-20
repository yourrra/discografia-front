import { useEffect, useState } from 'react'

import { toast } from '@/shared/lib/toast'
import type { Toast } from '@/shared/lib/toast'

import styles from './ToastContainer.module.scss'
import { ToastItem } from './ToastItem'

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const unsubscribe = toast.subscribe(setToasts)
    return unsubscribe
  }, [])

  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
