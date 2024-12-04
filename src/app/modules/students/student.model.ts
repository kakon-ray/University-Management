import { Schema, model, connect } from 'mongoose'
import validator from 'validator'
import {
  TGuardian,
  LocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from './student.interface'

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
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Id is required'],
      unique: true,
      ref: 'User',
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
    },
    dateOfBirth: { type: Date },
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
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
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

// creating a custome static
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// 3. Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
