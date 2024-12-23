import express, { NextFunction, Request, Response } from 'express'
import { createStudentValidationSchema } from '../students/students.validation'
import validateRequest from '../../middlware/validateRequest'
import { AuthValidation } from './auth.validation'
import { UserController } from './auth.controller'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  UserController.loginUser,
)

export const AuthRoutes = router

