import express, { Request, Response } from 'express'
import { StudentServices } from './student.service'
import Join from 'Joi'
import studentValidationSchema from './students.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    // cerating a schema validation

    const { student } = req.body

    const { error, value } = studentValidationSchema.validate(student)

    const result = await StudentServices.createStudentIntoDB(value)

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Student is Creation Faild!',
        error: error.details,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Student is Created Successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: error,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'Student is Get Successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student is Get Successfully!',
      data: result,
    })
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'Student not found',
      data: error,
    })
  }
}

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
}
