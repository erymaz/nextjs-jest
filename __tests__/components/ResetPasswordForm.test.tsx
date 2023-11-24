import { render, screen } from '@testing-library/react';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import userEvent from '@testing-library/user-event';

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe('ResetPasswordForm', () => {
  it('should have some text', () => {
    const submit = jest.fn();
    setup(<ResetPasswordForm submit={submit} />);
    expect(screen.getByText('Please enter your username and client key.')).toBeInTheDocument();
  });

  it('email input validation', async () => {
    const submit = jest.fn();
    const { user } = setup(<ResetPasswordForm submit={submit} />);

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

  it('shouldn\'t submit with invalid payload', async () => {
    const submit = jest.fn();
    const { user } = setup(<ResetPasswordForm submit={submit} />);
    const button = screen.getByTestId('button');

    const email = screen.getByTestId('email');
    // @ts-ignore
    expect(email.value).toBe('');
    await user.click(button);
    expect(email).toHaveClass('is-error');
    expect(submit).toHaveBeenCalledTimes(0)     // no submitted
  })

  it('shouldn submit with valid payload', async () => {
    const submit = jest.fn();
    const { user } = setup(<ResetPasswordForm submit={submit} />);
    const button = screen.getByTestId('button');
    const email = screen.getByTestId('email');

    await user.type(email, 'anson');
    // @ts-ignore
    expect(email.value).toBe('anson')

    // Form submition
    await user.click(button);
    expect(submit).toHaveBeenCalledTimes(1)
    expect(submit).toHaveBeenCalledWith({
      email: "anson"
    });
  })
});
