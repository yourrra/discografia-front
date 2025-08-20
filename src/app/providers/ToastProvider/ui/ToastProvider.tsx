import { ToastContainer } from '@/shared/ui/ToastContainer/ToastContainer'

import type { ReactNode } from 'react'

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => (
  <>
    {children}
    <ToastContainer />
  </>
)
