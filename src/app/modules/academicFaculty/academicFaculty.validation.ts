import { z } from 'zod'

// User Validation Schema
export const createAcademicFacultySchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Faculty be a string',
      })
  })
})

export const updateAcademicFacultySchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Faculty be a string',
      })
  })
})

export const AcademicFacultyValidation = {
  createAcademicFacultySchema,
  updateAcademicFacultySchema
}
