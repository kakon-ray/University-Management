import { z } from 'zod'

// UserName Schema
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name can not be more than 20 characters')
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      { message: 'First Name must be in Capitalize format' },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last Name must contain only alphabets',
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name can not be more than 20 characters')
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      { message: 'First Name must be in Capitalize format' },
    )
    .optional(),
  middleName: z.string().optional().optional(),
  lastName: z
    .string()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must contain only alphabets',
    })
    .optional(),
})

// Guardian Schema
const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required'),
  fatherOccupation: z.string().min(1, 'Father Occupation is required'),
  fatherContactNo: z.string().min(1, 'Father Contact No is required'),
  motherName: z.string().min(1, 'Mother Name is required'),
  motherOccupation: z.string().min(1, 'Mother Occupation is required'),
  motherContactNo: z.string().min(1, 'Mother Contact No is required'),
})

const upateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required').optional(),
  fatherOccupation: z
    .string()
    .min(1, 'Father Occupation is required')
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, 'Father Contact No is required')
    .optional(),
  motherName: z.string().min(1, 'Mother Name is required').optional(),
  motherOccupation: z
    .string()
    .min(1, 'Mother Occupation is required')
    .optional(),
  motherContactNo: z
    .string()
    .min(1, 'Mother Contact No is required')
    .optional(),
})

// Local Guardian Schema
const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required'),
  occupation: z.string().min(1, 'Local Guardian Occupation is required'),
  contactNo: z.string().min(1, 'Local Guardian Contact No is required'),
  address: z.string().min(1, 'Local Guardian Address is required'),
})
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required').optional(),
  occupation: z
    .string()
    .min(1, 'Local Guardian Occupation is required')
    .optional(),
  contactNo: z
    .string()
    .min(1, 'Local Guardian Contact No is required')
    .optional(),
  address: z.string().min(1, 'Local Guardian Address is required').optional(),
})

// Main Student Schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(10, 'Password does not less 20 Character')
      .max(20, 'Password does not more 20 Character'),
    name: createUserNameValidationSchema,
    gender: z.enum(['male', 'female', 'Other'], {
      errorMap: () => ({
        message: 'Gender must be either male, female, or Other',
      }),
    }),
    email: z
      .string()
      .email('Please enter a valid email')
      .min(1, 'Email is required'),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().min(1, 'Contact No is required'),
    emerganceyContactNo: z.string().min(1, 'Emergency Contact No is required'),
    bloodGroop: z.enum(['A+', 'B+', 'O+', 'A-', 'B-'], {
      errorMap: () => ({ message: 'Invalid Blood Group' }),
    }),
    presentAddress: z.string().min(1, 'Present Address is required'),
    permanentAddress: z.string().min(1, 'Permanent Address is required'),
    guardian: createGuardianValidationSchema,
    localGuardian: createLocalGuardianValidationSchema,
    admissionSemester: z.string(),
    profileImage: z.string().optional(),
  }),
})

export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(10, 'Password does not less 20 Character')
      .max(20, 'Password does not more 20 Character')
      .optional(),
    name: updateUserNameValidationSchema.optional(),
    gender: z
      .enum(['male', 'female', 'Other'], {
        errorMap: () => ({
          message: 'Gender must be either male, female, or Other',
        }),
      })
      .optional(),
    email: z
      .string()
      .email('Please enter a valid email')
      .min(1, 'Email is required')
      .optional(),
    dateOfBirth: z.string().optional().optional(),
    contactNo: z.string().min(1, 'Contact No is required').optional(),
    emerganceyContactNo: z
      .string()
      .min(1, 'Emergency Contact No is required')
      .optional(),
    bloodGroop: z
      .enum(['A+', 'B+', 'O+', 'A-', 'B-'], {
        errorMap: () => ({ message: 'Invalid Blood Group' }),
      })
      .optional(),
    presentAddress: z.string().min(1, 'Present Address is required').optional(),
    permanentAddress: z
      .string()
      .min(1, 'Permanent Address is required')
      .optional(),
    guardian: upateGuardianValidationSchema.optional(),
    localGuardian: updateLocalGuardianValidationSchema.optional(),
    admissionSemester: z.string().optional(),
    profileImage: z.string().optional().optional(),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
