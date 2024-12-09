import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller'
import { AnyZodObject, Schema } from 'zod'
import { createStudentValidationSchema } from '../students/students.validation'
import validateRequest from '../../middlware/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
)

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
)

export const UserRoutes = router
