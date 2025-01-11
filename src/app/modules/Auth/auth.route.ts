import express, { NextFunction, Request, Response } from 'express'
import { createStudentValidationSchema } from '../students/students.validation'
import validateRequest from '../../middlware/validateRequest'
import { AuthValidation } from './auth.validation'
import { UserController } from './auth.controller'
import auth from '../../middlware/auth'
import { USER_ROLE } from '../users/user.constant'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  UserController.loginUser,
)

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  UserController.changePassword,
)

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refrechTokenValidation),
  UserController.refrechToken,
)

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswrodValidationSchema),
  UserController.forgetPassword,
)

router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  UserController.resetPassword,
)

export const AuthRoutes = router
