import express, { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body

    const result = await StudentServices.createStudentIntoDB(student)

    res.status(200).json({
      success: true,
      message: 'Student is Created Successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
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
