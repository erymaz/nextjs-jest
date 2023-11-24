import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import AppAlert from "@/components/AppAlert";
import { ILoginRequest } from '@/types';
import LoginForm from '@/components/LoginForm';
import { login } from '@/services/auth.service';
import { AlertType } from '@/helper/appAlert.helper';

const Login = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('success');

  const submit = async (payload: ILoginRequest): Promise<void> => {
    setShow(false);
    const loginRes = await login(payload);
    setMsg(loginRes.message)
    if (loginRes.status === 'FAILURE') {
      setAlertType('error')
    } else {
      setAlertType('success')
    }
    setShow(true);
  }

  return (
    <div className="w-full h-full p-6 bg-gray-200">
      <div className="card-flip">
        <div className="mx-auto w-full max-w-sm bg-white border border-gray-300">
          <div className="p-10">
            <div className="relative w-full h-24 mb-16">
              <Image
                src="/ih-logo2.png"
                fill={true}
                alt="logo"
              />
            </div>
            <div className="mb-1 border-b border-gray-600 py-1">
              <span className="text-blue-600 text-xl tracking-tighter">Login</span>
            </div>
            {show && <AppAlert message={msg} type={alertType} />}
            <LoginForm
              submit={submit}
            />
          </div>
          <div className="flex justify-between items-center mt-2 bg-gray-600 h-10 px-10 py-2">
            <span className="text-white text-xs">
              © 2023 Reqo, Inc.
            </span>
            <Link href="/reset-password" passHref>
              <span className="font-normal text-sm text-white">Forgot password?</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
