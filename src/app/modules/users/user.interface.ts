import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'
import { date } from 'zod';

export interface TUser {
  id: string;
  email:string;
  password: string;
  needsPasswordChange: boolean;
  passwordChnageAt?: Date;
  role: 'student' | 'user' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export type NewUser = {
  password: string
  role: string
  id: string
}

export interface UserModel extends Model<TUser> {
  // interface method checking if the user is exists
  isUserExistsByCustomId(id: string): Promise<TUser>
  // interface method checking if the password is changed
  isPasswordMatched(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>

  isJwtIssuedBeforePasswordChanged(passwrodChangedTimesStamp:Date,jwtIssudeTimeStamp:number):boolean
}

export type TuserRole = keyof typeof USER_ROLE
