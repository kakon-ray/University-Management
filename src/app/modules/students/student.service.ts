import { Student } from '../students/student.model'
import { TStudent } from './student.interface'

const getAllStudentFromDB = async () => {
  const result = await Student.find({})

  return result
}

const getSingleStudentFromDB = async (studentId: string) => {
  // const result = await Student.findOne({ id: studentId })

  const result = await Student.aggregate([{ $match: { id: studentId } }])
  if (result) {
    return result
  } else {
    console.log('Student not found')
  }
}

const deleteStudentFromDB = async (studentId: string) => {
  const result = await Student.updateOne({ id: studentId }, { isDeleted: true })
  if (result) {
    return result
  } else {
    console.log('Student not found')
  }
}

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
