import { z } from 'zod'
import { AcamedicSemesterCode, AcamedicSemesterName, Months } from './academicSemester.constant'

// User Validation Schema
export const createAcademicSemesterValidationSchema = z.object({
   body: z.object({
     name: z.enum([...AcamedicSemesterName] as [string, ...string[]]),
     year:z.string(),
     code:z.enum([...AcamedicSemesterCode] as [string, ...string[]]),
     startMonth:z.enum([...Months] as [string, ...string[]]),
     endMonth:z.enum([...Months] as [string, ...string[]])
   })
})

export const academicSemesterValidation = {
    createAcademicSemesterValidationSchema,
}
