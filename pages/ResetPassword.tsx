import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import AppAlert from "@/components/AppAlert";
import { IResetPasswordRequest } from '@/types';
import { resetPassword } from '@/services/auth.service';
import { AlertType } from '@/helper/appAlert.helper';

const ResetPassword = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('success');

  const submit = async (payload: IResetPasswordRequest): Promise<void> => {
    setShow(false);
    const resetRes = await resetPassword(payload);
    setMsg(resetRes.message)
    if (resetRes.status === 'FAILURE') {
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
          <div className="px-10 py-10 pb-6">
            <div className="relative w-full h-24 mb-14">
              <Image
                src="/ih-logo2.png"
                fill={true}
                alt="logo"
              />
            </div>
            <div className="mb-1 border-b border-gray-600 py-1">
              <span className="text-blue-600 text-xl tracking-tighter">Retrieve Password</span>
            </div>
            {show && <AppAlert message={msg} type={alertType} />}
            <ResetPasswordForm submit={submit} />
          </div>
          <div className="flex justify-between items-center bg-gray-600 h-10 px-10 py-2">
            <Link href="/" passHref>
              <span className="font-normal text-sm text-white">{'< Back to login'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;
