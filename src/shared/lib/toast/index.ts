import { logger } from '../logger'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration: number
  createdAt: number
}

class ToastManager {
  private toasts = new Map<string, Toast>()
  private listeners = new Set<(toasts: Toast[]) => void>()
  private idCounter = 0

  private generateId(): string {
    return `toast-${++this.idCounter}`
  }

  private notifyListeners() {
    const toastArray = Array.from(this.toasts.values()).sort((a, b) => b.createdAt - a.createdAt)

    this.listeners.forEach(listener => listener(toastArray))
  }

  private scheduleRemoval(id: string, duration: number) {
    setTimeout(() => {
      this.dismiss(id)
    }, duration)
  }

  show(type: ToastType, message: string, duration = 5000): string {
    const id = this.generateId()

    const toast: Toast = {
      id,
      type,
      message,
      duration,
      createdAt: Date.now(),
    }

    this.toasts.set(id, toast)
    this.scheduleRemoval(id, duration)
    this.notifyListeners()

    logger.debug('Toast shown', { type, message })

    return id
  }

  dismiss(id: string) {
    if (this.toasts.delete(id)) {
      this.notifyListeners()
      logger.debug('Toast dismissed', { id })
    }
  }

  dismissAll() {
    this.toasts.clear()
    this.notifyListeners()
  }

  subscribe(listener: (toasts: Toast[]) => void): () => void {
    this.listeners.add(listener)

    // Сразу вызываем с текущим состоянием
    const current = Array.from(this.toasts.values()).sort((a, b) => b.createdAt - a.createdAt)
    listener(current)

    // Возвращаем функцию отписки
    return () => this.listeners.delete(listener)
  }

  // Удобные методы
  success(message: string, duration?: number) {
    return this.show('success', message, duration)
  }

  error(message: string, duration = 8000) {
    return this.show('error', message, duration)
  }

  warning(message: string, duration = 6000) {
    return this.show('warning', message, duration)
  }

  info(message: string, duration?: number) {
    return this.show('info', message, duration)
  }

  // Метод для промисов
  async promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    },
  ): Promise<T> {
    const loadingId = this.show('info', messages.loading, 0) // Бесконечный тост

    try {
      const result = await promise
      this.dismiss(loadingId)
      this.success(messages.success)
      return result
    } catch (error) {
      this.dismiss(loadingId)
      this.error(messages.error)
      throw error
    }
  }
}

export const toast = new ToastManager()
