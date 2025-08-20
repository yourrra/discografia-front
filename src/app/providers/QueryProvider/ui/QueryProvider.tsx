import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, type ReactNode } from 'react'

import { ApiError } from '@/shared/api/ApiError'
import { logger } from '@/shared/lib/logger'
import { toast } from '@/shared/lib/toast'

interface QueryProviderProps {
  children: ReactNode
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          // Не ретраим 4xx ошибки
          if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
            return false
          }
          return failureCount < 3
        },
        staleTime: 5 * 60 * 1000, // 5 минут
        gcTime: 10 * 60 * 1000, // 10 минут (заменяет cacheTime)
        refetchOnWindowFocus: false,
        refetchOnReconnect: 'always',
        networkMode: 'offlineFirst', // Поддержка offline режима
      },
      mutations: {
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
            return false
          }
          return failureCount < 1
        },
        networkMode: 'offlineFirst',
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        logger.error('Query Error:', {
          error: error.message,
          queryKey: query.queryKey,
          queryHash: query.queryHash,
        })

        // Показываем ошибку пользователю только для важных запросов
        if (query.meta?.showErrorToast) {
          toast.error(error.message || 'Произошла ошибка при загрузке данных')
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, variables, context, mutation) => {
        logger.error('Mutation Error:', {
          error: error.message,
          mutationKey: mutation.options.mutationKey,
          variables,
        })

        // Для мутаций всегда показываем ошибку
        toast.error(error.message || 'Произошла ошибка при выполнении операции')
      },
      onSuccess: (data, variables, context, mutation) => {
        // Показываем успешное уведомление если указано в meta
        if (mutation.meta?.showSuccessToast && typeof mutation.meta.showSuccessToast === 'string') {
          toast.success(mutation.meta.showSuccessToast)
        }
      },
    }),
  })

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />
    </QueryClientProvider>
  )
}
