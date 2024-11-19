import { Schema, model, connect } from 'mongoose'

export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type Student = {
  id: string
  name: UserName
  gender: 'male | female'
  email: string
  dateOfBirth: string
  contactNo: string
  emerganceyContactNo: string
  bloodGroop?: 'A+' | 'B+' | 'O+' | 'A-' | 'B-'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  avatar?: string
  localGuardian: LocalGuardian
  profileImage: string
  isActice: 'active' | 'inActive'
}
