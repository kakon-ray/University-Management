import { UserValidation } from './user.validation'
import express, { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // cerating a schema validation

    const student = req.body

    const result = await UserServices.createStudentIntoDB(student)
    // utility response function
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student Created Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createStudent,
}
