import { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/shared/config/i18n/i18n'

import type { ReactNode } from 'react'

interface I18nProviderProps {
  children: ReactNode
}

export const I18nProvider = ({ children }: I18nProviderProps) => (
  <I18nextProvider i18n={i18n}>
    <Suspense
      fallback={
        <div>
          {/* Spinner */}
          <p>Loading translation</p>
        </div>
      }
    >
      {children}
    </Suspense>
  </I18nextProvider>
)
