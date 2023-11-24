import { useState, type FormEvent } from 'react';
import { ILoginRequest } from '@/types';

interface Props {
  submit: (payload: ILoginRequest) => void
}

const LoginForm = (props: Props): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [validation, setValidation] = useState({
    email: true,
    password: true
  });

  const handleEmailChange = (value: string): void => {
    setValidation({
      ...validation,
      email: true
    });
    setEmail(value);
  }

  const handlePasswordChange = (value: string): void => {
    setValidation({
      ...validation,
      password: true
    });
    setPassword(value);
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
    if (!password) {
      setValidation({
        ...validation,
        password: false,
      })
      return;
    }

    props.submit({
      email,
      password
    });
  }

  return (
    <form className="space-y-3 form" onSubmit={handleSubmit}>
      <input
        id="email"
        name="email"
        className={`${validation.email? "is-normal" : "is-error"} w-full h-8 px-2 text-sm border border-gray-300 focus:outline-none focus:ring-none focus:border-none`}
        placeholder="email"
        onChange={(e) => handleEmailChange(e.target.value)}
        data-testid="email"
      />
      <input
        id="password"
        name="password"
        type='password'
        className={`${validation.password? "is-normal" : "is-error"} w-full h-8 px-2 text-sm border border-gray-300 focus:outline-none focus:ring-none focus:border-none`}
        placeholder="password"
        onChange={(e) => handlePasswordChange(e.target.value)}
        data-testid="password"
      />
      <input
        id="demo"
        className="w-full h-8 px-2 text-sm border border-gray-300 disabled:bg-gray-200"
        placeholder="DEMO"
        disabled
      />
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-5 w-5 mr-2 rounded-none border-blue-600 text-blue-600 focus:ring-blue-600"
          />
          <label htmlFor="remember-me" className="text-gray-600">
            Remember Me
          </label>
        </div>
        <button type="submit" className="w-28 h-8 text-white bg-blue-600" data-testid="button">
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm;
