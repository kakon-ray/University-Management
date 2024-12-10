import express, { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../utils/sendResponse'
import { CourseServices } from './course.service'

const createCourse = catchAsync(async (req, res, next) => {
  const { course: courseData } = req.body
  const result = await CourseServices.createCourseFromDB(courseData)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course Created Successfully',
    data: result,
  })
})

const getAllCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getAllCourseFromDB(req.query)
  res.status(200).json({
    success: true,
    message: 'Course are Get Successfully!',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const result = await CourseServices.getSingleCourseFromDB(id)
  res.status(200).json({
    success: true,
    message: 'Course is Get Successfully!',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const result = await CourseServices.deleteCourseFromDB(id)
  res.status(200).json({
    success: true,
    message: 'Course Delete Successfully!',
    data: result,
  })
})

const updateCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const { course } = req.body

  const result = await CourseServices.updatedCourseFromDB(id, course)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course Update Successfully!',
    data: result,
  })
})

const assignFaculties: RequestHandler = catchAsync(async (req, res, next) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await CourseServices.assignFacultiesIntoDB(courseId, faculties)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course Faculty assign Successfully!',
    data: result,
  })
})

const removeFaculties: RequestHandler = catchAsync(async (req, res, next) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await CourseServices.removeFacultiesIntoDB(courseId, faculties)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course Faculty Delete Successfully!',
    data: result,
  })
})

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFaculties,
  removeFaculties,
}
