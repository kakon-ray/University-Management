import { UserValidation } from './user.validation'
import express, { RequestHandler } from 'express'
import { z } from 'zod'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/AppError'

const createStudent = catchAsync(async (req, res, next) => {
  const student = req.body
  const result = await UserServices.createStudentIntoDB(student)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body
  const result = await UserServices.createFacultyFromDB(password, facultyData)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty Created Successfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body
  const result = await UserServices.createAdminFromDB(password, adminData)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin Created Successfully',
    data: result,
  })
})

const getMe = catchAsync(async (req, res, next) => {
  const {userId,role} = req.user;

  const result = await UserServices.getMeFromDB(userId,role)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get Your Information Successfully',
    data: result,
  })
})

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe
}
