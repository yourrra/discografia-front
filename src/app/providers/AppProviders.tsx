import { ErrorBoundaryProvider } from './ErrorBoundary'
import { I18nProvider } from './I18nProvider'
import { QueryProvider } from './QueryProvider'
import { ThemeProvider } from './ThemeProvider'
import { ToastProvider } from './ToastProvider'

import type { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ErrorBoundaryProvider>
    <I18nProvider>
      <ThemeProvider>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </ThemeProvider>
    </I18nProvider>
  </ErrorBoundaryProvider>
)
