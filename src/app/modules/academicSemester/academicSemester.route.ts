import express, { NextFunction, Request, Response } from 'express'
import { AnyZodObject, Schema } from 'zod'
import validateRequest from '../../middlware/validateRequest'
import { AcademicSemeterController } from './academicSemeter.controller'
import {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create',
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemeterController.createAcademicSemester,
)

router.get('/get', AcademicSemeterController.getAcademicSemester)
router.get('/get/:id', AcademicSemeterController.getSingleAcademicSemester)
router.patch(
  '/update/:id',
  validateRequest(updateAcademicSemesterValidationSchema),
  AcademicSemeterController.updateAcademicSemester,
)

export const AcademicSemesterRoutes = router
