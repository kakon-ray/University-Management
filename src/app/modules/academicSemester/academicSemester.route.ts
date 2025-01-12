import express, { NextFunction, Request, Response } from 'express'
import { AnyZodObject, Schema } from 'zod'
import validateRequest from '../../middlware/validateRequest'
import { AcademicSemeterController } from './academicSemeter.controller'
import {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation'
import { USER_ROLE } from '../users/user.constant'
import auth from '../../middlware/auth'

const router = express.Router()

router.post(
  '/create',
  auth(USER_ROLE.admin),
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemeterController.createAcademicSemester,
)

router.get(
  '/get',
  auth(USER_ROLE.admin),
  AcademicSemeterController.getAcademicSemester,
)
router.get(
  '/get/:id',
  auth(USER_ROLE.admin),
  AcademicSemeterController.getSingleAcademicSemester,
)
router.patch(
  '/update/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateAcademicSemesterValidationSchema),
  AcademicSemeterController.updateAcademicSemester,
)

export const AcademicSemesterRoutes = router
