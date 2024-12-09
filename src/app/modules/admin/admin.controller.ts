import express, { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../utils/sendResponse'
import { AdminServices } from './admin.service'

const getAllAdmin = catchAsync(async (req, res, next) => {
  const result = await AdminServices.getAllAdminFromDB(req.query)
  res.status(200).json({
    success: true,
    message: 'Admin are Get Successfully!',
    data: result,
  })
})

const getSingleAdmin = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId
  const result = await AdminServices.getSingleAdminFromDB(studentId)
  res.status(200).json({
    success: true,
    message: 'Admin is Get Successfully!',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId
  const result = await AdminServices.deleteAdminFromDB(studentId)
  res.status(200).json({
    success: true,
    message: 'Admin Delete Successfully!',
    data: result,
  })
})

const updateAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId
  const { admin } = req.body

  const result = await AdminServices.updatedAdminFromDB(studentId, admin)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin Update Successfully!',
    data: result,
  })
})

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
}
