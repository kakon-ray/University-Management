import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppError'

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Academic Department is required'],
      unique: true,
    },
    academicfaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  {
    timestamps: true,
  },
)

AcademicDepartmentSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicDepartment.findOne({
    name: this.name,
  })

  if (isSemesterExists) {
    throw new AppError(409, 'Name is already exists')
  }

  next()
})

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()

  const isSemesterExists = await AcademicDepartment.findOne(query)

  if (!isSemesterExists) {
    throw new AppError(404, 'The Department Does not exist')
  }

  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
)
