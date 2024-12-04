
import express, { RequestHandler } from 'express'
import { z } from 'zod'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { AcademicDepartmentService } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentFromDB(req.body)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department Created Successfully',
    data: result,
  })
})

const getAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentService.getAcademicDepartmentFromDB()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Departments are Get Successfully!',
    data: result,
  })
})

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Academic Department is Get Successfully!',
    data: result,
  })
})

const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentService.updateAcademicDepartmentFromDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Academic Department is Get Successfully!',
    data: result,
  })
})

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}
