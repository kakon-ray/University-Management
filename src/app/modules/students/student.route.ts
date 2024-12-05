import express, { Request, Response } from 'express'
import { studentController } from './student.controller'
import validateRequest from '../../middlware/validateRequest'
import { updateStudentValidationSchema } from './students.validation'

const router = express.Router()

router.get('/', studentController.getAllStudents)
router.get('/:studentId', studentController.getSingleStudents)
router.delete('/:studentId', studentController.deleteStudents)
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudents,
)

export const StudentRoutes = router
