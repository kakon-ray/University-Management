import express, { Request, Response } from 'express'
import { studentController } from './student.controller'
import validateRequest from '../../middlware/validateRequest'
import { updateStudentValidationSchema } from './students.validation'
import { USER_ROLE } from '../users/user.constant'
import auth from '../../middlware/auth'

const router = express.Router()

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.student),
  studentController.getAllStudents,
)
router.get(
  '/:studentId',
  auth(USER_ROLE.admin, USER_ROLE.student),
  studentController.getSingleStudents,
)
router.delete(
  '/:studentId',
  auth(USER_ROLE.admin, USER_ROLE.student),
  studentController.deleteStudents,
)
router.patch(
  '/:studentId',
  auth(USER_ROLE.admin, USER_ROLE.student),
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudents,
)

export const StudentRoutes = router
