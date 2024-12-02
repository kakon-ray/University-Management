import { UserValidation } from './user.validation'
import express, { Request, Response } from 'express'
import { z } from 'zod'
import { UserServices } from './user.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    // cerating a schema validation

    const student = req.body

    const result = await UserServices.createStudentIntoDB(student)
    res.status(200).json({
      success: true,
      message: 'Student is Created Successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    })
  }
}

export const UserController = {
  createStudent,
}
