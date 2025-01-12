import mongoose from 'mongoose'
import config from '../../config'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { NewUser, TUser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'
import AppError from '../../errors/AppError'
import { Faculty } from '../faculty/faculty.model'
import { TFaculty } from '../faculty/faculty.interface'
import { Admin } from '../admin/admin.model'
import { TAdmin } from '../admin/admin.interface'
import { verifyToken } from '../Auth/auth.utils'
import { USER_ROLE } from './user.constant'

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
    email:studentData.email,
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
    await session.endSession()
    throw new AppError(400, err as string)
  }
}

const createFacultyFromDB = async (password: string, facultyData: TFaculty) => {
  const userData: Partial<TUser> = {
    password: password || (config.default_password as string),
    email:facultyData.email,
    role: 'faculty',
    id: await generateFacultyId(),
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const [newUser] = await User.create([userData], { session })
    if (!newUser) {
      throw new AppError(400, 'Faculty creation failed')
    }

    facultyData.id = newUser.id
    facultyData.user = newUser._id

    const [newFaculty] = await Faculty.create([facultyData], {
      session,
    })

    if (!newFaculty) {
      throw new AppError(400, 'Faculty creation failed')
    }
    await session.commitTransaction()
    await session.endSession()
    return newFaculty
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, 'Faild to create user')
  }
}

const createAdminFromDB = async (password: string, adminData: TAdmin) => {
  const userData: Partial<TUser> = {
    password: password || (config.default_password as string),
    email:adminData.email,
    role: 'admin',
    id: await generateAdminId(),
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const [newUser] = await User.create([userData], { session })
    if (!newUser) {
      throw new AppError(400, 'Admin creation failed')
    }

    adminData.id = newUser.id
    adminData.user = newUser._id

    const [newAdmin] = await Admin.create([adminData], {
      session,
    })

    if (!newAdmin) {
      throw new AppError(400, 'Admin creation failed')
    }
    await session.commitTransaction()
    await session.endSession()
    return newAdmin
  } catch (err) {
    if (err instanceof Error) {
      await session.abortTransaction()
      await session.endSession()
      throw new AppError(400, `Failed to create admin: ${err.message}`)
    }
  }
}

const getMeFromDB = async (userId:string, role:string) => {

    let result = null;
    if(role === USER_ROLE.admin){
      result = await Admin.findOne({id:userId});
    }

    if(role === USER_ROLE.faculty){
      result = await Faculty.findOne({id:userId});
    }

    if(role === USER_ROLE.student){
      result = await Student.findOne({id:userId});
    }

    return result


}

export const UserServices = {
  createStudentIntoDB,
  createFacultyFromDB,
  createAdminFromDB,
  getMeFromDB
}
