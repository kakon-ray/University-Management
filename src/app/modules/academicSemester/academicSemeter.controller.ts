import express, { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { AcademicSemesterService } from './academicService.service'

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const student = req.body
  const result =
    await AcademicSemesterService.createAcademicSemesterFromDB(student)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  })
})

const getAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterService.getAcademicSemesterFromDB()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester is Get Successfully!',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterService.getSingleAcademicSemesterFromDB(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Academic Semester is Get Successfully!',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterService.updateAcademicSemesterFromDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Academic Semester is Get Successfully!',
    data: result,
  })
})

export const AcademicSemeterController = {
  createAcademicSemester,
  getAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
