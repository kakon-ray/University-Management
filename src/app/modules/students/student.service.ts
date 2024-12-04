import path from 'path'
import { Student } from '../students/student.model'
import { TStudent } from './student.interface'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { User } from '../users/user.model'

const getAllStudentFromDB = async () => {
  const result = await Student.find({})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    })

  return result
}

const getSingleStudentFromDB = async (studentId: string) => {
  // const result = await Student.findOne({ id: studentId })

  const result = await Student.findById(studentId)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    })
  if (result) {
    return result
  } else {
    console.log('Student not found')
  }
}

const deleteStudentFromDB = async (studentId: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(400, 'Faild to deleted student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(400, 'Faild to deleted user')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
