import config from '../../config'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { NewUser, TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  // if password is not given, use default password

  const userData: Partial<TUser> = {
    password: studentData.password || (config.default_password as string),
    role: 'student',
    id: '202301111',
  }

  try {
    const newUser = await User.create(userData)

    if (newUser) {
      studentData.id = newUser.id
      studentData.user = newUser._id

      const newStudent = await Student.create(studentData)
      return newStudent
    } else {
      throw new Error('User creation failed')
    }
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while creating the student.')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
