import { ErrorBoundary } from 'react-error-boundary'

import { logger } from '@/shared/lib/logger'
import { toast } from '@/shared/lib/toast'
import { ErrorFallback } from '@/shared/ui/ErrorFallback'

import type { ReactNode } from 'react'

interface ErrorBoundaryProviderProps {
  children: ReactNode
}

interface ErrorInfo {
  componentStack: string
  errorBoundary?: string
  errorBoundaryStack?: string
}

const handleError = (error: Error, errorInfo: ErrorInfo) => {
  logger.error('Application Error Boundary:', {
    error: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  })

  toast.error('Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.')
}

const handleReset = () => {
  window.location.reload()
}

export const ErrorBoundaryProvider = ({ children }: ErrorBoundaryProviderProps) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={handleError}
    onReset={handleReset}
    resetKeys={[window.location.pathname]}
  >
    {children}
  </ErrorBoundary>
)
