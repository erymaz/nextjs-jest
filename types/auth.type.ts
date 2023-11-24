export interface BrowserResponse<T> {
  success: boolean;
  message: T;
  data?: T;
  error?: {
    message: string;
  };
}

export interface IServiceResponse {
  status: 'SUCCESS' | 'FAILURE';
  message: string;
  hostname: string;
  payload: any;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  secureToken: {
      clientId: string;
      expirationDate: number;
      id: string;
      rolesBitMask: number;
      userName: string;
      disabledAt: null | string;
  },
  username: string;
}

export interface IResetPasswordRequest {
  email: string;
}
