export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

/** Mock login API — no network calls. */
export async function login(request: LoginRequest): Promise<LoginResponse> {
  await new Promise<void>(resolve => {
    setTimeout(resolve, 50);
  });

  if (request.email.trim().toLowerCase() === 'fail@example.com') {
    throw new Error('Invalid email or password');
  }

  return {
    token: 'mock-jwt-token',
    user: {
      id: 'user-1',
      email: request.email.trim(),
    },
  };
}
