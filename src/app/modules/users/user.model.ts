import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config/index'
import { UserStatus } from './user.constant'

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChnageAt: {
      type: Date,
    },
    role: { type: String, enum: ['student', 'user', 'faculty', 'admin'] },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

// ================== pre save middleware hashing password =============

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data')
  // hashing password and save into db
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_solt))
  next()
})

// =================== poast middleware hashing password ====================
userSchema.post('save', function (doccument, next) {
  doccument.password = ''
  next()
})

// =================== is user exists by custome id ====================
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password')
}

// =================== is password matched ====================
userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashPassword)
}

// =================== is password matched ====================

userSchema.statics.isJwtIssuedBeforePasswordChanged = async function (
  passwrodChangedTimesStamp: Date,
  jwtIssudeTimeStamp: number,
) {
  //  return passwrodChangedTimesStamp > jwtIssudeTimeStamp;
  const passwordChangedTime =
    new Date(passwrodChangedTimesStamp).getTime() / 1000

  return passwordChangedTime > jwtIssudeTimeStamp
}

export const User = model<TUser, UserModel>('User', userSchema)
