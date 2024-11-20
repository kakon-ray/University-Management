import { z } from 'zod'

// UserName Schema
const userNameValidationSchema = z.object({
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

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required'),
  fatherOccupation: z.string().min(1, 'Father Occupation is required'),
  fatherContactNo: z.string().min(1, 'Father Contact No is required'),
  motherName: z.string().min(1, 'Mother Name is required'),
  motherOccupation: z.string().min(1, 'Mother Occupation is required'),
  motherContactNo: z.string().min(1, 'Mother Contact No is required'),
})

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required'),
  occupation: z.string().min(1, 'Local Guardian Occupation is required'),
  contactNo: z.string().min(1, 'Local Guardian Contact No is required'),
  address: z.string().min(1, 'Local Guardian Address is required'),
})

// Main Student Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  password: z
    .string()
    .min(10, 'Password does not less 20 Character')
    .max(20, 'Password does not more 20 Character'),
  name: userNameValidationSchema,
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
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActice: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
})

export default studentValidationSchema
