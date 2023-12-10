export class UnauthorizedError extends Error {
  status: number = 401;
  constructor(message: string = 'Invalid credentials. Please try again.') {
    super(message);
  }
}
