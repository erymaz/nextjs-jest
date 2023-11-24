import { render, screen } from '@testing-library/react';
import ResetPassword from '@/pages/ResetPassword';
import userEvent from '@testing-library/user-event';
import { resetPassword } from '@/services/auth.service';

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

jest.mock('../../services/auth.service')

describe('Reset Password Page', () => {
  it('should have some text', async () => {
    setup(<ResetPassword />);
    expect(screen.getByText('Retrieve Password')).toBeInTheDocument();
  });

  it('should reset and display error alert with FAILURE status', async () => {
    // @ts-ignore
    resetPassword.mockResolvedValue({
      status: 'FAILURE',
      message: 'Invalid username or client key',
      hostname: '',
      payload: null
    });

    const { user } = setup(<ResetPassword />);
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    
    await user.type(screen.getByTestId('email'), 'test@test.com');
    const button = screen.getByTestId('button');
    await user.click(button);

    // // Alert (error message)
    expect(screen.queryByTestId('alert')).toBeInTheDocument();
    expect(screen.queryByTestId('alert')).toHaveClass('bg-red-100 text-red-500') // Error class
    expect(screen.getByText('Invalid username or client key')).toBeInTheDocument();
  });

  it('should reset and display success alert with SUCCESS status', async () => {
    // @ts-ignore
    resetPassword.mockResolvedValue({
      status: 'SUCCESS',
      message: 'Reset successfully',
      hostname: '',
      payload: null
    });

    const { user } = setup(<ResetPassword />);
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
    
    await user.type(screen.getByTestId('email'), 'test@test.com');
    const button = screen.getByTestId('button');
    await user.click(button);

    // // Alert (error message)
    expect(screen.queryByTestId('alert')).toBeInTheDocument();
    expect(screen.queryByTestId('alert')).toHaveClass('bg-green-100 text-green-500') // Error class
    expect(screen.getByText('Reset successfully')).toBeInTheDocument();
  });
});
