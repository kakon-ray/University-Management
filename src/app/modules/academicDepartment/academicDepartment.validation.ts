import { z } from 'zod'

// User Validation Schema
export const createAcademicDepartmentSchema = z.object({
    body: z.object({
        name: z
            .string({
                invalid_type_error: 'Academic Department be a string',
                required_error: 'Name is Required'
            }),
        academicfaculty: z
            .string({
                invalid_type_error: 'Academic Department be a string',
                required_error: 'Academic Faculty is Required'
            })
    })
})


export const updateAcademicDepartmentSchema = z.object({
    body: z.object({
        name: z
            .string({
                invalid_type_error: 'Academic Department be a string',
                required_error: 'Name is Required'
            }).optional(),
        academicfaculty: z
            .string({
                invalid_type_error: 'Academic Department be a string',
                required_error: 'Academic Faculty is Required'
            }).optional(),
    })
})


export const AcademicDepartmentValidation = {
    createAcademicDepartmentSchema,
    updateAcademicDepartmentSchema
}
