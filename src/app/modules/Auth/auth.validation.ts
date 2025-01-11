import { z } from 'zod'

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Password is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

const refrechTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is Required !',
    }),
  }),
})

const forgetPasswrodValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User Id is required !',
    }),
  }),
})

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User Id is required !' }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
})

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refrechTokenValidation,
  forgetPasswrodValidationSchema,
  resetPasswordValidationSchema,
}
