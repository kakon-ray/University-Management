import express, { Request, Response } from 'express'
import { StudentServices } from './student.service'
import { z } from 'zod'
import studentValidationSchema from './students.validation'

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

const deleteStudents = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId
    const result = await StudentServices.deleteStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student Delete Successfully!',
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
  getAllStudents,
  getSingleStudents,
  deleteStudents,
}
