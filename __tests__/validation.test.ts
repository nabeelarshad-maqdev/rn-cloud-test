import {
  validateEmail,
  validateLoginCredentials,
  validatePassword,
} from '../src/utils/validation';

describe('validateEmail', () => {
  it('requires an email', () => {
    expect(validateEmail('')).toBe('Email is required');
    expect(validateEmail('   ')).toBe('Email is required');
  });

  it('rejects invalid email formats', () => {
    expect(validateEmail('not-an-email')).toBe('Enter a valid email address');
    expect(validateEmail('missing@domain')).toBe('Enter a valid email address');
    expect(validateEmail('@example.com')).toBe('Enter a valid email address');
  });

  it('accepts valid emails', () => {
    expect(validateEmail('user@example.com')).toBeUndefined();
    expect(validateEmail('  user.name+tag@example.co.uk  ')).toBeUndefined();
  });
});

describe('validatePassword', () => {
  it('requires a password', () => {
    expect(validatePassword('')).toBe('Password is required');
  });

  it('requires at least 8 characters', () => {
    expect(validatePassword('short')).toBe(
      'Password must be at least 8 characters',
    );
  });

  it('accepts passwords with 8 or more characters', () => {
    expect(validatePassword('password')).toBeUndefined();
    expect(validatePassword('long-enough-secret')).toBeUndefined();
  });
});

describe('validateLoginCredentials', () => {
  it('returns field errors when both are invalid', () => {
    const result = validateLoginCredentials('', 'abc');
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('Email is required');
    expect(result.errors.password).toBe(
      'Password must be at least 8 characters',
    );
  });

  it('returns valid when both fields pass', () => {
    const result = validateLoginCredentials(
      'user@example.com',
      'password123',
    );
    expect(result.valid).toBe(true);
    expect(result.errors.email).toBeUndefined();
    expect(result.errors.password).toBeUndefined();
  });
});
