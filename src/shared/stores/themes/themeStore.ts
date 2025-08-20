import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { defaultTheme, themes, availableThemes } from '@/shared/config/themes/themes'
import type { Theme } from '@/shared/config/themes/themes'

interface ThemeStore {
  currentTheme: Theme
  availableThemes: Theme[]
  autoTheme: boolean

  changeTheme: (themeId: string) => void
  toggleAutoTheme: () => void
  setSystemTheme: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: defaultTheme,
      availableThemes: availableThemes,
      autoTheme: true,

      changeTheme: (themeId: string) => {
        const theme = themes[themeId]
        if (theme) {
          set({
            currentTheme: theme,
            autoTheme: false,
          })
        }
      },

      toggleAutoTheme: () => {
        set(state => ({ autoTheme: !state.autoTheme }))
      },

      setSystemTheme: (isDark: boolean) => {
        const { autoTheme } = get()
        if (autoTheme) {
          const themeId = isDark ? 'dark' : 'light'
          const theme = themes[themeId]
          if (theme) {
            set({ currentTheme: theme })
          }
        }
      },
    }),
    {
      name: 'theme-store',
      partialize: state => ({
        currentTheme: state.currentTheme,
        autoTheme: state.autoTheme,
      }),
    },
  ),
)
