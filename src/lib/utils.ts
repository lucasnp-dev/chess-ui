import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api = process.env.NEXT_PUBLIC_API

export const messages = {
  internal_error: 'Internal error. Please try again, or request support.',
  login_successful: 'Login successful.',
  invalid_credentials: 'Invalid credentials.',
  some_error: 'There was an error.',
  ops: 'Ooooops!',
  success: 'Success!',
}
