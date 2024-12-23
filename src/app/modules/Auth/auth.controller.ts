import express, { RequestHandler } from 'express'
import { z } from 'zod'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { AuthServices } from './auth.service'

const loginUser = catchAsync(async (req, res, next) => {

  const result = await AuthServices.loginUserIntoDB(req.body)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Login Successfully',
    data: result,
  })
})


export const UserController = {
    loginUser,
}
