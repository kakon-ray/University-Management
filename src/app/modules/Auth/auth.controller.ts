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

const changePassword = catchAsync(async (req, res, next) => {

  const passwordData = req.body;
  const result = await AuthServices.changePasswordIntoDB(req.user, passwordData)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Password Chnage Successfully',
    data: null,
  })
})


export const UserController = {
    loginUser,
    changePassword
}
