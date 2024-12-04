
import express, { RequestHandler } from 'express'
import { z } from 'zod'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { AcademicFacultyService } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.createAcademicFacultyFromDB(req.body)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  })
})

const getAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.getAcademicFacultyFromDB()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty is Get Successfully!',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Academic Faculty is Get Successfully!',
    data: result,
  })
})

const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.updateAcademicFacultyFromDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Academic Faculty is Get Successfully!',
    data: result,
  })
})

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}
