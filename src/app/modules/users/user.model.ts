import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config/index'

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select:0
    },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChnageAt:{
      type:Date
    },
    role: { type: String, enum: ['student', 'user', 'faculty', 'admin'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
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

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
}

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashPassword)
}

export const User = model<TUser, UserModel>('User', userSchema)
