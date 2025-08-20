export class ApiError extends Error {
  public readonly status: number
  public readonly errors?: Record<string, string[]> // Для валидации
  public readonly endpoint?: string

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string[]>,
    endpoint?: string,
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
    this.endpoint = endpoint
  }

  // Проверки типов ошибок
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500
  }

  isServerError(): boolean {
    return this.status >= 500
  }

  isAuthError(): boolean {
    return this.status === 401 || this.status === 403
  }

  isValidationError(): boolean {
    return this.status === 422 && this.errors !== undefined
  }

  isNotFound(): boolean {
    return this.status === 404
  }

  // Получение понятного сообщения для пользователя
  getUserMessage(): string {
    // Если есть ошибки валидации, возвращаем первую
    if (this.isValidationError() && this.errors) {
      const firstError = Object.values(this.errors)[0]
      return firstError?.[0] || this.message
    }

    // Дружелюбные сообщения для разных типов ошибок
    if (this.isAuthError()) {
      return 'Нет доступа к этому разделу'
    }

    if (this.isNotFound()) {
      return 'Запрашиваемый ресурс не найден'
    }

    if (this.isServerError()) {
      return 'Ошибка сервера. Попробуйте позже'
    }

    return this.message
  }

  // Получение ошибок валидации для форм
  getFieldErrors(): Record<string, string[]> {
    return this.errors || {}
  }

  // Статические методы для быстрого создания
  static fromResponse(response: Response, data: any, endpoint?: string): ApiError {
    return new ApiError(
      data?.message || response.statusText || 'Неизвестная ошибка',
      response.status,
      data?.errors,
      endpoint,
    )
  }

  static networkError(endpoint?: string): ApiError {
    return new ApiError('Проблемы с подключением к серверу', 0, undefined, endpoint)
  }

  static validationError(errors: Record<string, string[]>): ApiError {
    return new ApiError('Ошибка валидации', 422, errors)
  }
}
