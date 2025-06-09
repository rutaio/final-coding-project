import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../../../src/components/Forms/LoginForm';

describe('Test Login Form', () => {
  it('1. shows correct email and password inputs, and a submit button', () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    const emailInput = screen.getByLabelText('Your Email');
    const passwordInput = screen.getByLabelText('Your Password');
    const button = screen.getByText('Login');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('2. allows user to type into email and password inputs', () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText('Your Email');
    const passwordInput = screen.getByLabelText('Your Password');
    const button = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'user@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'qwert1234' } });
    fireEvent.click(button);

    expect(emailInput).toHaveValue('user@email.com');
    expect(passwordInput).toHaveValue('qwert1234');
    expect(mockSubmit).toHaveBeenCalledWith('user@email.com', 'qwert1234');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
