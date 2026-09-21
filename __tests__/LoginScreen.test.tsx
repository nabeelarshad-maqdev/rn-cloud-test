import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react-native';
import {LoginScreen} from '../src/screens/LoginScreen';
import * as authApi from '../src/api/auth';

jest.mock('../src/api/auth');

const mockLogin = authApi.login as jest.MockedFunction<typeof authApi.login>;

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email, password, and sign-in controls', () => {
    render(<LoginScreen />);

    expect(screen.getByTestId('login-screen')).toBeTruthy();
    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeTruthy();
  });

  it('shows validation errors when submitting empty fields', () => {
    render(<LoginScreen />);

    fireEvent.press(screen.getByRole('button', {name: 'Sign in'}));

    expect(screen.getByTestId('email-error')).toHaveTextContent(
      'Email is required',
    );
    expect(screen.getByTestId('password-error')).toHaveTextContent(
      'Password is required',
    );
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows validation errors for invalid email and short password', () => {
    render(<LoginScreen />);

    fireEvent.changeText(screen.getByTestId('email-input'), 'bad-email');
    fireEvent.changeText(screen.getByTestId('password-input'), 'short');
    fireEvent.press(screen.getByRole('button', {name: 'Sign in'}));

    expect(screen.getByTestId('email-error')).toHaveTextContent(
      'Enter a valid email address',
    );
    expect(screen.getByTestId('password-error')).toHaveTextContent(
      'Password must be at least 8 characters',
    );
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login and shows success on valid credentials', async () => {
    mockLogin.mockResolvedValue({
      token: 'mock-token',
      user: {id: '1', email: 'user@example.com'},
    });
    const onLoginSuccess = jest.fn();

    render(<LoginScreen onLoginSuccess={onLoginSuccess} />);

    fireEvent.changeText(
      screen.getByTestId('email-input'),
      'user@example.com',
    );
    fireEvent.changeText(screen.getByTestId('password-input'), 'password123');
    fireEvent.press(screen.getByRole('button', {name: 'Sign in'}));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      });
    });

    expect(await screen.findByTestId('success-message')).toHaveTextContent(
      'Welcome, user@example.com',
    );
    expect(onLoginSuccess).toHaveBeenCalledWith('user@example.com');
  });

  it('shows an API error when login fails', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid email or password'));

    render(<LoginScreen />);

    fireEvent.changeText(
      screen.getByTestId('email-input'),
      'fail@example.com',
    );
    fireEvent.changeText(screen.getByTestId('password-input'), 'password123');
    fireEvent.press(screen.getByRole('button', {name: 'Sign in'}));

    expect(await screen.findByTestId('form-error')).toHaveTextContent(
      'Invalid email or password',
    );
  });
});
