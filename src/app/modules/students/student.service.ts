import path from 'path'
import { Student } from '../students/student.model'
import { TStudent } from './student.interface'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { User } from '../users/user.model'
import { object } from 'zod'

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = ''
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }
  const result = await Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })
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

  const result = await Student.findOne({ id: studentId })
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

const updatedStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  if (!payload) {
    throw new AppError(400, 'Payload is undefined or null')
  }

  const { name, guardian, localGuardian, ...remaingStudentData } = payload

  const modifyedUpdatedData: Record<string, unknown> = { ...remaingStudentData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyedUpdatedData[`name.${key}`] = value // name.firstName = 'Kakon'
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyedUpdatedData[`guardian.${key}`] = value // name.firstName = 'Kakon'
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyedUpdatedData[`localGuardian.${key}`] = value // name.firstName = 'Kakon'
    }
  }

  console.log(modifyedUpdatedData)

  const result = await Student.findOneAndUpdate(
    { id: id },
    modifyedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )

  return result
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
      throw new AppError(400, 'Faild to deleted Student')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, 'Faild Deleted Student')
  }
}

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updatedStudentFromDB,
}
