export interface Theme {
  id: string
  name: string
  colors: {
    // Основные цвета
    primary: string
    secondary: string

    // Фоны
    background: string
    surface: string

    // Текст
    text: string
    textSecondary: string

    // Состояния
    success: string
    error: string
    warning: string

    // UI элементы
    border: string
    hover: string
    active: string
  }

  typography: {
    fontFamily: string
    sizes: Record<string, string>
  }

  // Дополнительные свойства для расширения
  shadows?: {
    small: string
    medium: string
    large: string
  }
  borderRadius?: {
    small: string
    medium: string
    large: string
  }
}

// Светлая тема
export const lightTheme: Theme = {
  id: 'light',
  name: 'Светлая',
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',

    background: '#F2F2F7',
    surface: '#FFFFFF',

    text: '#1C1C1E',
    textSecondary: '#8E8E93',

    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',

    border: '#D1D1D6',
    hover: '#E5E5EA',
    active: '#D1D1D6',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  borderRadius: {
    small: '6px',
    medium: '12px',
    large: '20px',
  },
}

// Темная тема
export const darkTheme: Theme = {
  id: 'dark',
  name: 'Темная',
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',

    background: '#000000',
    surface: '#1C1C1E',

    text: '#FFFFFF',
    textSecondary: '#8E8E93',

    success: '#30D158',
    error: '#FF453A',
    warning: '#FF9F0A',

    border: '#38383A',
    hover: '#2C2C2E',
    active: '#3A3A3C',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.4)',
    large: '0 8px 32px rgba(0, 0, 0, 0.6)',
  },
  borderRadius: {
    small: '6px',
    medium: '12px',
    large: '20px',
  },
}

export const themes: Record<string, Theme> = {
  light: lightTheme,
  dark: darkTheme,
}

export const availableThemes = Object.values(themes)

export const defaultTheme = lightTheme
