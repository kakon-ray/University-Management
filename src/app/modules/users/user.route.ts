import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller'
import { AnyZodObject, Schema } from 'zod'
import { createStudentValidationSchema } from '../students/students.validation'
import validateRequest from '../../middlware/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { USER_ROLE } from './user.constant'
import auth from '../../middlware/auth'
import { UserValidation } from './user.validation'
import { upload } from '../../utils/sendImageCloudinary'

const router = express.Router()

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
)

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
)

router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
)

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe,
)

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.chnageStatusValidationSchema),
  UserController.changeStatus,
)

export const UserRoutes = router
