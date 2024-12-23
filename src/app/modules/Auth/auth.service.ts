
import config from '../../config'
import AppError from '../../errors/AppError'
import { Admin } from '../admin/admin.model'
import { TStudent } from '../students/student.interface'
import { User } from '../users/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload?.id)

  if (!user) {
    throw new AppError(
      400,
      'User does not exists                                                                                                                                                                   ',
    )
  }

    if (user?.status == 'blocked') {
      throw new AppError(400, 'The user is blocked')
    }

    const isAdminDeleted = await Admin.findOne({
      id: payload?.id,
    })

    if (isAdminDeleted?.isDeleted) {
      throw new AppError(400, 'The User is Deleted')
    }


  const isPasswordExists = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  )

  if (!isPasswordExists) {
    throw new AppError(404, 'Password does not match')
  }

  const jsonPayload = {
    userId:user?.id,
    role:user?.role
  }

 const asscessToken = Jwt.sign(jsonPayload, config.jwt_access_secret as string, { expiresIn: 60 * 60 });

  return {
    asscessToken,
    needPasswordCheange:user?.needsPasswordChange
  }
}

export const AuthServices = {
  loginUserIntoDB,
}
