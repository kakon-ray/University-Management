import express, { RequestHandler } from 'express'
import { z } from 'zod'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { AuthServices } from './auth.service'
import config from '../../config'

const loginUser = catchAsync(async (req, res, next) => {
  const result = await AuthServices.loginUserIntoDB(req.body)
  const { refreshToken, accessToken, needPasswordCheange } = result
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Login Successfully',
    data: { accessToken, refreshToken, needPasswordCheange },
  })
})

const changePassword = catchAsync(async (req, res, next) => {
  const passwordData = req.body
  const result = await AuthServices.changePasswordIntoDB(req.user, passwordData)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Password Chnage Successfully',
    data: null,
  })
})

const refrechToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthServices.reqTokenIntoDB(refreshToken)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Refresh Token Generate Successfully',
    data: result,
  })
})
const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id
  const result = await AuthServices.forgetPasswordIntoDB(userId)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reset Link is Generated Successfully',
    data: result,
  })
})

export const UserController = {
  loginUser,
  changePassword,
  refrechToken,
  forgetPassword,
}
