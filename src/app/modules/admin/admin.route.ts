import express, { Request, Response } from 'express'

import validateRequest from '../../middlware/validateRequest'
import { AdminController } from './admin.controller'

const router = express.Router()

router.get('/', AdminController.getAllAdmin)
router.get('/:studentId', AdminController.getSingleAdmin)
router.delete('/:studentId', AdminController.deleteAdmin)
router.patch('/:studentId', AdminController.updateAdmin)

export const AdminRoutes = router
