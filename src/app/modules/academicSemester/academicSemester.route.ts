import express, { NextFunction, Request, Response } from 'express'
import { AnyZodObject, Schema } from 'zod'
import validateRequest from '../../middlware/validateRequest'
import { AcademicSemeterController } from './academicSemeter.controller'
import { createAcademicSemesterValidationSchema } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create',
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemeterController.createAcademicSemester,
)

export const AcademicSemesterRoutes = router
