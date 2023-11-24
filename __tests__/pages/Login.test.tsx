import { render, screen } from '@testing-library/react';
import Login from '@/pages/index';
import userEvent from '@testing-library/user-event';
import { login } from '@/services/auth.service';

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

jest.mock('../../services/auth.service')

describe('Login Page', () => {
  it('should have some text', async () => {
    setup(<Login />);
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  it('should login user and display error alert with FAILURE status', async () => {
    // @ts-ignore
    login.mockResolvedValue({
      status: 'FAILURE',
      message: 'Invalid login. Please check and try again.',
      hostname: '',
      payload: null
    });

    const { user } = setup(<Login />);
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    
    await user.type(screen.getByTestId('email'), 'test@test.com');
    await user.type(screen.getByTestId('password'), 'password');
    const button = screen.getByTestId('button');
    await user.click(button);

    // Alert (error message)
    expect(screen.queryByTestId('alert')).toBeInTheDocument();
    expect(screen.queryByTestId('alert')).toHaveClass('bg-red-100 text-red-500') // Error class
    expect(screen.getByText('Invalid login. Please check and try again.')).toBeInTheDocument();
  });

  it('should login user and display success alert with SUCCESS status', async () => {
    // @ts-ignore
    login.mockResolvedValue({
      status: 'SUCCESS',
      message: 'Logged in successfully',
      hostname: '',
      payload: null
    });

    const { user } = setup(<Login />);
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    
    await user.type(screen.getByTestId('email'), 'test@test.com');
    await user.type(screen.getByTestId('password'), 'password');
    const button = screen.getByTestId('button');
    await user.click(button);

    // Alert (error message)
    expect(screen.queryByTestId('alert')).toBeInTheDocument();
    expect(screen.queryByTestId('alert')).toHaveClass('bg-green-100 text-green-500') // Error class
    expect(screen.getByText('Logged in successfully')).toBeInTheDocument();
  });
});
