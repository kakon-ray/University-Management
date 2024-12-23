import AppError from '../../errors/AppError'
import { Admin } from '../admin/admin.model'
import { TStudent } from '../students/student.interface'
import { User } from '../users/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload?.id)

  if (!user) {
    throw new AppError(
      400,
      'User does not exists                                                                                                                                                                   ',
    )
  }

  //   if (isUserExists?.status == 'blocked') {
  //     throw new AppError(400, 'The user is blocked')
  //   }

  //   const isAdminDeleted = await Admin.findOne({
  //     id: payload?.id,
  //   })

  //   if (isAdminDeleted?.isDeleted) {
  //     throw new AppError(400, 'The User is Deleted')
  //   }

  //   const isPasswordExists = await bcrypt.compare(
  //     payload?.password,
  //     isUserExists?.password,
  //   )

  const isPasswordExists = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  )

  if (!isPasswordExists) {
    throw new AppError(404, 'Password does not match')
  }

  //   console.log(isPasswordExists)
}

export const AuthServices = {
  loginUserIntoDB,
}
