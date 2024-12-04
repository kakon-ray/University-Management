import mongoose from 'mongoose'
import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { NewUser, TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../errors/AppError'

const createStudentIntoDB = async (studentData: TStudent) => {
  // find academic semester info
  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  )

  if (!academicSemester) {
    throw new Error(`Academic Semester not found`)
  }
  const userData: Partial<TUser> = {
    password: studentData.password || (config.default_password as string),
    role: 'student',
    id: await generateStudentId(academicSemester),
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const [newUser] = await User.create([userData], { session })
    if (!newUser) {
      throw new AppError(400, 'User creation failed')
    }

    studentData.id = newUser.id
    studentData.user = newUser._id

    const [newStudent] = await Student.create([studentData], { session })

    if (!newStudent) {
      throw new AppError(400, 'Student creation failed')
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession
  }
}

export const UserServices = {
  createStudentIntoDB,
}
