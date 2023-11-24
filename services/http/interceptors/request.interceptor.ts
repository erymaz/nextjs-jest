import type { AxiosRequestConfig } from 'axios'
// import { useAuthStore } from '@/stores/auth'

export const requestInterceptor = async (requestConfig: AxiosRequestConfig) => {
  // const authStore = useAuthStore()
  // requestConfig.headers!.Authorization = `Bearer ${authStore.token}`
  return requestConfig
}
