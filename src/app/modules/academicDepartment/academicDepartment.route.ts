import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlware/validateRequest'
import {
  createAcademicDepartmentSchema,
  updateAcademicDepartmentSchema,
} from './academicDepartment.validation'
import { AcademicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create',
  // validateRequest(createAcademicDepartmentSchema),
  AcademicDepartmentController.createAcademicDepartment,
)

router.get('/get', AcademicDepartmentController.getAcademicDepartment)
router.get('/get/:id', AcademicDepartmentController.getSingleAcademicDepartment)
router.patch(
  '/update/:id',
  validateRequest(updateAcademicDepartmentSchema),
  AcademicDepartmentController.updateAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
