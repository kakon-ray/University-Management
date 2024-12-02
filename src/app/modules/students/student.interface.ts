import { Schema, model, connect, Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  password: string
  user: Types.ObjectId
  name: TUserName
  gender: 'male' | 'female' | 'Other'
  email: string
  dateOfBirth?: string
  contactNo: string
  emerganceyContactNo: string
  bloodGroop?: 'A+' | 'B+' | 'O+' | 'A-' | 'B-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  avatar?: string
  localGuardian: LocalGuardian
  profileImage?: string
  isDeleted?: boolean
}

// For creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

// For Creating instance
// export type StudentMethod = {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, {}, StudentMethod>
