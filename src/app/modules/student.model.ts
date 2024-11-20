import { Schema, model, connect } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './students/student.interface'

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'Firstname is required'],
    maxlength: [20, 'First Name can not be more then 20'],
    validate: {
      validator: function (value: string) {
        const firstName =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        return firstName === value
      },
      message: '{VALUE} is not in Capitalize formate',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
})

const localGuardian = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'Other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  dateOfBirth: String,
  contactNo: {
    type: String,
    required: [true, 'Contact No is required'],
  },
  emerganceyContactNo: {
    type: String,
    required: true,
  },
  bloodGroop: {
    type: String,
    enum: ['A+', 'B+', 'O+', 'A-', 'B-'],
    required: [true, 'Blood Groop is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },

  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },

  localGuardian: {
    type: localGuardian,
    required: true,
  },

  profileImage: { type: String },
  isActice: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
})

// 3. Create a Model.
export const StudentModel = model<Student>('Student', studentSchema)
