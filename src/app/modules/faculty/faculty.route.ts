import express, { Request, Response } from 'express'

import validateRequest from '../../middlware/validateRequest'
import { FacultyController } from './faculty.controller'
import auth from '../../middlware/auth'
import { USER_ROLE } from '../users/user.constant'

const router = express.Router()

router.get('/', auth(USER_ROLE.faculty), FacultyController.getAllFaculty)
router.get('/:studentId', FacultyController.getSingleFaculty)
router.delete('/:studentId', FacultyController.deleteFaculty)
router.patch('/:studentId', FacultyController.updateFaculty)

export const FacultyRoutes = router
