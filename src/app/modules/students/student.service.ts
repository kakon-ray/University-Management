import { StudentModel } from '../student.model'
import { Student } from './student.interface'

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student)

  return result
}

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find({})

  return result
}

const getSingleStudentFromDB = async (studentId: string) => {
  const result = await StudentModel.findOne({ _id: studentId })
  if (result) {
    return result
  } else {
    console.log('Student not found')
  }
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
}
