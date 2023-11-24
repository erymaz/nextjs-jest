import { http } from './http'
import type { AxiosRequestConfig } from 'axios'
import type { IServiceResponse, ILoginRequest, IResetPasswordRequest } from '@/types'

export const login = async (payload: ILoginRequest): Promise<IServiceResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'text/plain',
    }
  }
  return http.post(`/login/demo/${payload.email}/86400000`, payload.password, config)
}

export const resetPassword = async (payload: IResetPasswordRequest): Promise<IServiceResponse> => {
  return http.get(`/users/reset/demo/${payload.email}`)
}
