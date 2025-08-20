import { createContext, use, useEffect } from 'react'

import type { Theme } from '@/shared/config/themes/themes'
import { useIsDarkMode } from '@/shared/lib/hooks/useMediaQuery'
import { useThemeStore } from '@/shared/stores/themes/themeStore'

import type { ReactNode } from 'react'

interface ThemeContextValue {
  currentTheme: Theme
  availableThemes: Theme[]
  autoTheme: boolean
  changeTheme: (themeId: string) => void
  toggleAutoTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeStore = useThemeStore()
  const systemIsDark = useIsDarkMode()

  // TODO доработаь автообновление
  useEffect(() => {
    themeStore.setSystemTheme(systemIsDark)
  }, [])

  useEffect(() => {
    const { currentTheme } = themeStore
    const root = document.documentElement

    // Применяем цвета
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // Применяем тени (если есть)
    if (currentTheme.shadows) {
      Object.entries(currentTheme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--shadow-${key}`, value)
      })
    }

    // Применяем радиусы (если есть)
    if (currentTheme.borderRadius) {
      Object.entries(currentTheme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--radius-${key}`, value)
      })
    }

    // Обновляем data атрибут для CSS селекторов
    root.setAttribute('data-theme', currentTheme.id)

    // Обновляем meta тег для мобильных браузеров
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', currentTheme.colors.primary)
    }
  }, [themeStore.currentTheme])

  return <ThemeContext value={themeStore}>{children}</ThemeContext>
}

export const useTheme = () => {
  const context = use(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
