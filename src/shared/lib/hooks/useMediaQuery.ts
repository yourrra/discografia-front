import { useEffect, useState } from 'react'

/**
 * Хук для отслеживания медиа запросов
 * @param query - CSS медиа запрос
 * @returns boolean - соответствует ли текущее состояние запросу
 */

export const useMediaQuery = (query: string): boolean => {
  // Инициализируем состояние
  const [matches, setMatches] = useState(() => {
    // Проверяем поддержку matchMedia (для SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    // Создаем MediaQueryList объект
    const mediaQueryList = window.matchMedia(query)

    // Функция обновления состояния
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Устанавливаем начальное значение
    setMatches(mediaQueryList.matches)

    // Подписываемся на изменения
    mediaQueryList.addEventListener('change', handleChange)

    // Очищаем подписку при размонтировании
    return () => {
      mediaQueryList.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

// Дополнительные хуки для популярных медиа запросов
export const useIsDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')
export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
