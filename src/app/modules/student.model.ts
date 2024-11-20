import { Schema, model, connect } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import {
  TGuardian,
  LocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from './students/student.interface'
import config from '../config'

const userNameSchema = new Schema<TUserName>({
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
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
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
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Please Enter a Valid Email',
      },
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// ================== pre save middleware =============

studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data')
  // hashing password and save into db
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_solt))
  next()
})

// =================== poast middleware ====================
studentSchema.post('save', function (doccument, next) {
  doccument.password = ''
  next()
})

// =================== query middleware ====================

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// creating a custome instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

// creating a custome static
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// 3. Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
