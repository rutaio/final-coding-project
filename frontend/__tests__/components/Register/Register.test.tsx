// Testing if Register passes form data correctly to the register() function, which is inside AuthContext
jest.mock('../../../src/constants/global');

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Register } from '../../../src/components/Register/Register';
import { AuthContext } from '../../../src/contexts/AuthContext';

const mockRegister = jest.fn();
// Here is the full context object, even if some values are unused in this test:
const mockContext = {
  register: mockRegister,
  error: null,
  login: jest.fn(),
  logout: jest.fn(),
  user: null,
  access_token: null,
  isAuthenticated: false,
  isLoading: false,
};

describe('Register component', () => {
  it('calls register from context on form submit', async () => {
    render(
      <AuthContext.Provider value={mockContext}>
        <Register />
      </AuthContext.Provider>
    );

    const nameInput = screen.getByLabelText('Your Full Name');
    const emailInput = screen.getByLabelText('Your Email');
    const passwordInput = screen.getByLabelText('Your Password');
    const confirmPasswordInput = screen.getByLabelText('Repeat Your Password');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'Test User');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'test1234');
    await userEvent.type(confirmPasswordInput, 'test1234');
    await userEvent.click(submitButton);

    expect(mockRegister).toHaveBeenCalledWith(
      'Test User',
      'test@example.com',
      'test1234'
    );
  });
});
