import { z } from 'zod'
import { UserStatus } from './user.constant'

// User Validation Schema
const userValidationSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(10, 'Password must be at least 10 characters')
    .max(20, 'Password must not exceed 20 characters')
    .optional(),
})
const chnageStatusValidationSchema = z.object({
  body: z.object({ status: z.enum([...UserStatus] as [string, ...string[]]) }),
})

export const UserValidation = {
  userValidationSchema,
  chnageStatusValidationSchema,
}
