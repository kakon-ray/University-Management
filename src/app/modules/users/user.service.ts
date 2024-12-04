import mongoose from 'mongoose'
import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { NewUser, TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

const createStudentIntoDB = async (studentData: TStudent) => {
  const session = await mongoose.startSession()
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

  const [newUser] = await User.create([userData], { session })
  if (!newUser) {
    throw new Error('User creation failed')
  }

  studentData.id = newUser.id
  studentData.user = newUser._id

  const [newStudent] = await Student.create([studentData], { session })

  if (!newStudent) {
    throw new Error('Student creation failed')
  }

  return newStudent
}

export const UserServices = {
  createStudentIntoDB,
}
