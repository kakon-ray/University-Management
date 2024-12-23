import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'student' | 'user' | 'faculty' | 'admin'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export type NewUser = {
  password: string
  role: string
  id: string
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>
  isPasswordMatched(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>
}

export type TuserRole = keyof typeof USER_ROLE
