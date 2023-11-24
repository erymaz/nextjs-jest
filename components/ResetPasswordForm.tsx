import { useState, type FormEvent } from 'react';
import { IResetPasswordRequest } from '@/types';

interface Props {
  submit: (payload: IResetPasswordRequest) => void
}

const ResetPasswordForm = (props: Props): JSX.Element => {
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState({
    email: true
  });

  const handleEmailChange = (value: string): void => {
    setValidation({
      email: true
    });
    setEmail(value);
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!email) {
      setValidation({
        ...validation,
        email: false,
      });
      return;
    }

    props.submit({
      email
    });
  }

  return (
    <form className="space-y-3 form" onSubmit={handleSubmit}>
      <div className="mt-3">
        <p className="text-sm text-gray-700">
          Please enter your username and client key.
        </p>
        <p className="text-sm text-gray-700">
          Instructions on how to reset your password will be sent on email.
        </p>
      </div>
      <input
        id="email"
        name="email"
        className={`${validation.email? "is-normal" : "is-error"} w-full h-8 px-2 text-sm border border-gray-300 focus:outline-none focus:ring-none focus:border-none`}
        placeholder="email"
        onChange={(e) => handleEmailChange(e.target.value)}
        data-testid="email"
      />
      <input
        id="demo"
        className="w-full h-8 px-2 text-sm border border-gray-300 disabled:bg-gray-200"
        placeholder="DEMO"
        disabled
      />
      <div className="flex items-center justify-between py-8">
        <div />
        <button className="w-28 h-8 text-white bg-blue-600" data-testid="button">
          Submit
        </button>
      </div>
    </form>
  )
}

export default ResetPasswordForm;
