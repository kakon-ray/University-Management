import express, {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express'
import catchAsync from '../../utils/catchAsync'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../utils/sendResponse'
import { FacultyServices } from './faculty.service'

const getAllFaculty = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.getAllFacultyFromDB(req.query)
  console.log(req.cookies);
  res.status(200).json({
    success: true,
    message: 'Faculty are Get Successfully!',
    data: result,
  })
})

const getSingleFaculty = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId
  const result = await FacultyServices.getSingleFacultyFromDB(studentId)
  res.status(200).json({
    success: true,
    message: 'Faculty is Get Successfully!',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId
  const result = await FacultyServices.deleteFacultyFromDB(studentId)
  res.status(200).json({
    success: true,
    message: 'Faculty Delete Successfully!',
    data: result,
  })
})

const updateFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId
  const { faculty } = req.body

  const result = await FacultyServices.updatedFacultyFromDB(studentId, faculty)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty Update Successfully!',
    data: result,
  })
})

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
}
