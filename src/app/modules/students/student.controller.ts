import express, {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express'
import { StudentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB()
  res.status(200).json({
    success: true,
    message: 'Student is Get Successfully!',
    data: result,
  })
})

const getSingleStudents = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId
  const result = await StudentServices.getSingleStudentFromDB(studentId)
  res.status(200).json({
    success: true,
    message: 'Student is Get Successfully!',
    data: result,
  })
})

const deleteStudents = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId
  const result = await StudentServices.deleteStudentFromDB(studentId)
  res.status(200).json({
    success: true,
    message: 'Student Delete Successfully!',
    data: result,
  })
})

export const studentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
}
