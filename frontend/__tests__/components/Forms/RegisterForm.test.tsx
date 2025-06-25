import { render, screen } from '@testing-library/react';
// userEvent is better for forms vs fireEvent, because userEvent simulates more realistic user behaviour
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '../../../src/components/Forms/RegisterForm';

describe('Test Registration Form', () => {
  it('shows all form fields and submit button', () => {
    render(<RegisterForm onSubmit={jest.fn()} />);

    const nameInput = screen.getByLabelText('Your Full Name');
    const emailInput = screen.getByLabelText('Your Email');
    const passwordInput = screen.getByLabelText('Your Password');
    const confirmPasswordInput = screen.getByLabelText('Repeat Your Password');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('allows user to fill out the form and submit', async () => {
    const mockSubmit = jest.fn();
    render(<RegisterForm onSubmit={mockSubmit} />);

    const nameInput = screen.getByLabelText('Your Full Name');
    const emailInput = screen.getByLabelText('Your Email');
    const passwordInput = screen.getByLabelText('Your Password');
    const confirmPasswordInput = screen.getByLabelText('Repeat Your Password');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'name');
    await userEvent.type(emailInput, 'user@email.com');
    await userEvent.type(passwordInput, 'qwert1234');
    await userEvent.type(confirmPasswordInput, 'qwert1234');
    await userEvent.click(submitButton);

    expect(nameInput).toHaveValue('name');
    expect(emailInput).toHaveValue('user@email.com');
    expect(passwordInput).toHaveValue('qwert1234');
    expect(mockSubmit).toHaveBeenCalledWith(
      'name',
      'user@email.com',
      'qwert1234'
    );
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('shows error if passwords do not match', async () => {
    const mockSubmit = jest.fn();
    render(<RegisterForm onSubmit={mockSubmit} />);

    const nameInput = screen.getByLabelText('Your Full Name');
    const emailInput = screen.getByLabelText('Your Email');
    const passwordInput = screen.getByLabelText('Your Password');
    const confirmPasswordInput = screen.getByLabelText('Repeat Your Password');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'name');
    await userEvent.type(emailInput, 'user@email.com');
    await userEvent.type(passwordInput, 'password1');
    await userEvent.type(confirmPasswordInput, 'password2');
    await userEvent.click(submitButton);

    // findByText is great when testing for elements that appear after user interaction
    const errorMessage = await screen.findByText('Passwords are not same');
    expect(errorMessage).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
