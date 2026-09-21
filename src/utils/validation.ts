export type ValidationResult = {
  valid: boolean;
  errors: {
    email?: string;
    password?: string;
  };
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Enter a valid email address';
  }
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  return undefined;
}

export function validateLoginCredentials(
  email: string,
  password: string,
): ValidationResult {
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  return {
    valid: !errors.email && !errors.password,
    errors,
  };
}
