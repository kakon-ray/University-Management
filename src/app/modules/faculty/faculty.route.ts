import express, { Request, Response } from 'express'

import validateRequest from '../../middlware/validateRequest'
import { FacultyController } from './faculty.controller'

const router = express.Router()

router.get('/', FacultyController.getAllFaculty)
router.get('/:studentId', FacultyController.getSingleFaculty)
router.delete('/:studentId', FacultyController.deleteFaculty)
router.patch('/:studentId', FacultyController.updateFaculty)

export const FacultyRoutes = router
