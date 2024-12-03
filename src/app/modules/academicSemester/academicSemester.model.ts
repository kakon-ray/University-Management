import { model, Schema } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import { AcamedicSemesterCode, AcamedicSemesterName, Months } from './academicSemester.constant'


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


// Pre hook validation (database same year er ekoi name duita semester create hote dibe na)
academicSemesterSchema.pre('save', async function(next){
  const isSemesterExists = await AcademicSemester.findOne({
    year:this.year,
    name: this.name,
  })

  if(isSemesterExists){
    throw new Error('Semester is already exists')
  }

  next()
})


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)