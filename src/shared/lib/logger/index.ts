type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  data?: any
}

class Logger {
  private isDev = import.meta.env.DEV

  private log(level: LogLevel, message: string, data?: any) {
    if (!this.isDev && (level === 'debug' || level === 'info')) {
      return
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toLocaleTimeString(),
      data,
    }

    // Вывод в консоль
    const style = this.getStyle(level)
    const prefix = `%c[${level.toUpperCase()}] ${entry.timestamp}`

    if (data) {
      console.group(prefix, style, message)
      console.log('Data:', data)
      console.groupEnd()
    } else {
      console.log(prefix, style, message)
    }
  }

  private getStyle(level: LogLevel): string {
    const styles = {
      debug: 'color: #6B7280; background: #F3F4F6; padding: 2px 6px; border-radius: 3px;',
      info: 'color: #1D4ED8; background: #DBEAFE; padding: 2px 6px; border-radius: 3px;',
      warn: 'color: #D97706; background: #FEF3C7; padding: 2px 6px; border-radius: 3px;',
      error: 'color: #DC2626; background: #FEE2E2; padding: 2px 6px; border-radius: 3px;',
    }
    return styles[level]
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data)
  }

  info(message: string, data?: any) {
    this.log('info', message, data)
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data)
  }

  error(message: string, data?: any) {
    this.log('error', message, data)
  }

  // Удобные методы для частых сценариев
  apiRequest(method: string, url: string, data?: any) {
    this.debug(`API ${method.toUpperCase()}: ${url}`, data)
  }

  apiResponse(url: string, status: number, data?: any) {
    if (status >= 400) {
      this.error(`API Error: ${url} (${status})`, data)
    } else {
      this.debug(`API Success: ${url} (${status})`, data)
    }
  }

  userAction(action: string, data?: any) {
    this.info(`User: ${action}`, data)
  }
}

export const logger = new Logger()
