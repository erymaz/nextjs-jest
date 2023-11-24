import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export const errorInterceptor = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    // To do
  }

  // global error handler
  return Promise.reject(error)
}
