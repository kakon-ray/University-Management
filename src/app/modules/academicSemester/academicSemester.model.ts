import { model, Schema } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import { AcamedicSemesterCode, AcamedicSemesterName, Months } from './academicSemester.constant'
import { string } from 'zod'



const academicSemesterSchema = new Schema<TAcademicSemester>(
  {

    name: {
        type: String,
        required: true,
        enum:AcamedicSemesterName
      },

      year: {
        type: String,
        required: true,
      },

      code: {
        type: String,
        required: true,
        enum:AcamedicSemesterCode
      },

      startMonth:{
        type: String,
        required: true,
        enum: Months
      },

      endMonth:{
        type: String,
        required: true,
        enum: Months
      },
 
  },
  {
    timestamps: true,
  },
)


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)