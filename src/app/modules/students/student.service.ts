import { Student } from '../student.model'
import { TStudent } from './student.interface'

const createStudentIntoDB = async (student: TStudent) => {
  // built in static method

  if (await Student.isUserExists(student.id)) {
    throw new Error('User already Exists')
  }

  const result = await Student.create(student)

  // built in instant method
  // const studentResult = new Student(student)
  // if (await studentResult.isUserExists(student.id)) {
  //   throw new Error('User already Exists')
  // }
  // const result = await studentResult.save()

  return result
}

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
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
