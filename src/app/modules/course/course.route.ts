import express, { Request, Response } from 'express'

import validateRequest from '../../middlware/validateRequest'
import { CourseController } from './course.contaroller'
import { createCourseSchema } from './course.validation'

const router = express.Router()

router.post('/create',validateRequest(createCourseSchema), CourseController.createCourse)
router.get('/', CourseController.getAllCourse)
router.get('/:id', CourseController.getSingleCourse)
router.delete('/:id', CourseController.deleteCourse)
router.patch('/:id', CourseController.updateCourse)

export const CourseRoutes = router
