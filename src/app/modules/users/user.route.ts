import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller'
import { AnyZodObject, Schema } from 'zod'
import { createStudentValidationSchema } from '../students/students.validation'
import validateRequest from '../../middlware/validateRequest'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
)

export const UserRoutes = router
