import { logger } from '../lib/logger'

import { ApiError } from './ApiError'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    // Логируем запрос
    logger.apiRequest(
      options.method || 'GET',
      endpoint,
      options.body ? JSON.parse(options.body as string) : undefined,
    )

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        const apiError = ApiError.fromResponse(response, data, endpoint)
        logger.apiResponse(endpoint, response.status, data)
        throw apiError
      }

      logger.apiResponse(endpoint, response.status)
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }

      // Сетевая ошибка
      const networkError = ApiError.networkError(endpoint)
      logger.error('Network error', { endpoint, error: error.message })
      throw networkError
    }
  }

  // Удобные методы
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint)
  }

  post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }
}

export const apiClient = new ApiClient(
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
)
