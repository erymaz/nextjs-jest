import { render, screen } from '@testing-library/react';
import LoginForm from '@/components/LoginForm';
import userEvent from '@testing-library/user-event';

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe('LoginForm', () => {
  it('should have Login text', () => {
    const submit = jest.fn();
    setup(<LoginForm submit={submit} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  })

  it('email input validation', async () => {
    const submit = jest.fn();
    const { user } = setup(<LoginForm submit={submit} />);

    const email = screen.getByTestId('email');
    expect(email).toHaveClass('is-normal');

    const button = screen.getByTestId('button');
    await user.click(button);
    // @ts-ignore
    expect(email.value).toBe('');
    expect(email).toHaveClass('is-error');

    await user.type(email, 'anson');
    // @ts-ignore
    expect(email.value).toBe('anson')
    expect(email).toHaveClass('is-normal');
  })

  it('password input validation', async () => {
    const submit = jest.fn();
    const { user } = setup(<LoginForm submit={submit} />);
    const email = screen.getByTestId('email');
    await user.type(email, 'anson');

    const password = screen.getByTestId('password');
    expect(password).toHaveClass('is-normal');

    const button = screen.getByTestId('button');
    await user.click(button);
    // @ts-ignore
    expect(password.value).toBe('');
    expect(password).toHaveClass('is-error');

    await user.type(password, 'password');
    // @ts-ignore
    expect(password.value).toBe('password')
    expect(password).toHaveClass('is-normal');
  })

  it('shouldn\'t submit with invalid payload', async () => {
    const submit = jest.fn();
    const { user } = setup(<LoginForm submit={submit} />);
    const button = screen.getByTestId('button');

    const email = screen.getByTestId('email');
    // @ts-ignore
    expect(email.value).toBe('');
    await user.click(button);
    expect(email).toHaveClass('is-error');
    expect(submit).toHaveBeenCalledTimes(0)     // no submitted
    // enter email
    await user.type(email, 'anson');
    // @ts-ignore
    expect(email.value).toBe('anson');
    expect(email).toHaveClass('is-normal');

    const password = screen.getByTestId('password');
    // @ts-ignore    
    expect(password.value).toBe('');
    await user.click(button);
    expect(password).toHaveClass('is-error');
    expect(submit).toHaveBeenCalledTimes(0)     // no submitted
  })

  it('shouldn submit with valid payload', async () => {
    const submit = jest.fn();
    const { user } = setup(<LoginForm submit={submit} />);
    const button = screen.getByTestId('button');
    const email = screen.getByTestId('email');
    const password = screen.getByTestId('password');

    await user.type(email, 'anson');
    // @ts-ignore
    expect(email.value).toBe('anson')

    await user.type(password, 'password');
    // @ts-ignore
    expect(password.value).toBe('password')

    // Form submition
    await user.click(button);
    expect(submit).toHaveBeenCalledTimes(1)
    expect(submit).toHaveBeenCalledWith({
      email: "anson",
      password: "password"
    });
  })
});
