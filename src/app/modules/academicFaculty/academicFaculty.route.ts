import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlware/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'
import { createAcademicFacultySchema, updateAcademicFacultySchema } from './academicFaculty.validation'

const router = express.Router()

router.post(
  '/create',
  validateRequest(createAcademicFacultySchema),
  AcademicFacultyController.createAcademicFaculty,
)

router.get('/get', AcademicFacultyController.getAcademicFaculty)
router.get('/get/:id', AcademicFacultyController.getSingleAcademicFaculty)
router.patch(
  '/update/:id',
  validateRequest(updateAcademicFacultySchema),
  AcademicFacultyController.updateAcademicFaculty,
)

export const AcademicFacultyRoutes = router
