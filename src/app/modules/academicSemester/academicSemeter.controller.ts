
import express, { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { AcademicSemesterService } from './academicService.service'

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const student = req.body
  const result = await AcademicSemesterService.createAcademicSemesterFromDB(student)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  })
})

export const AcademicSemeterController = {
    createAcademicSemester,
}
