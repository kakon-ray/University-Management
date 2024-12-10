import express, { Request, Response } from 'express'

import validateRequest from '../../middlware/validateRequest'
import { CourseController } from './course.contaroller'
import {
  courseFacultyValidationSchema,
  createCourseValidationSchema,
  updataeCourseValidationSchema,
} from './course.validation'

const router = express.Router()

router.post(
  '/create',
  validateRequest(createCourseValidationSchema),
  CourseController.createCourse,
)
router.get('/', CourseController.getAllCourse)

router.get('/:id', CourseController.getSingleCourse)
router.delete('/:id', CourseController.deleteCourse)
router.patch(
  '/:id',
  validateRequest(updataeCourseValidationSchema),
  CourseController.updateCourse,
)

// course faculty

router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseFacultyValidationSchema),
  CourseController.assignFaculties,
)

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(courseFacultyValidationSchema),
  CourseController.removeFaculties,
)

export const CourseRoutes = router
