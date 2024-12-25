import config from '../../config'
import AppError from '../../errors/AppError'
import { Admin } from '../admin/admin.model'
import { TStudent } from '../students/student.interface'
import { User } from '../users/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import Jwt, { JwtPayload } from 'jsonwebtoken'
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


  const isPasswordMatchd = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  )

  if (!isPasswordMatchd) {
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

const changePasswordIntoDB = async (userData: JwtPayload, payload:{oldPassword:string,password:string}) => {

  const user = await User.isUserExistsByCustomId(userData?.userId)

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
      id: userData?.id,
    })

    if (isAdminDeleted?.isDeleted) {
      throw new AppError(400, 'The User is Deleted')
    }


  const isPasswordMatchd = await User.isPasswordMatched(
    payload?.oldPassword,
    user?.password,
  )

  if (!isPasswordMatchd) {
    throw new AppError(404, 'Password does not match')
  }


  // hash new password

  const newHashPassword = await bcrypt.hash(payload?.password, Number(config.bcrypt_solt))

   const result = await User.findOneAndUpdate({
    id:userData.userId,
    role:userData.role
   },{
    password:newHashPassword,
    needsPasswordChange:false,
    passwordChnageAt:new Date()
   })

   return newHashPassword;
}

export const AuthServices = {
  loginUserIntoDB,
  changePasswordIntoDB
}
