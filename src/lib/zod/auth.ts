import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  password: z.string({ required_error: 'Password is required' }).min(6, {
    message: 'Password must be at least 6 characters',
  }),
})

export const RepeatSchema = z.object({
  repeat: z.string({ required_error: 'Password repeat is required' }).min(6, {
    message: 'Repeat must be at least 6 characters',
  }),
})

export const RegisterSchema = LoginSchema.and(RepeatSchema).refine(
  (data) => data.repeat === data.password,
  {
    message: 'Passwords do not match',
    path: ['repeat'],
  },
)

export type LoginSchemaType = z.infer<typeof LoginSchema>

export type RepeatType = z.infer<typeof RepeatSchema>

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
