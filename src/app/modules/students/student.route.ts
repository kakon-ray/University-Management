import express, { Request, Response } from 'express'
import { studentController } from './student.controller'

const router = express.Router()

router.get('/student-get', studentController.getAllStudents)
router.get('/:studentId', studentController.getSingleStudents)
router.delete('/:studentId', studentController.deleteStudents)

export const StudentRoutes = router
