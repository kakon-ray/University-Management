import express, {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express'
import { StudentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../utils/sendResponse'

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB()
  res.status(200).json({
    success: true,
    message: 'Students are Get Successfully!',
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

const updateStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId
  const { student } = req.body

  const result = await StudentServices.updatedStudentFromDB(studentId, student)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Update Successfully!',
    data: result,
  })
})

export const studentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
  updateStudents,
}
