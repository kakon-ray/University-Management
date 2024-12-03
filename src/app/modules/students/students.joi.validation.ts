import Joi from 'Joi'

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .custom((value, helpers) => {
      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      if (formatted !== value) {
        return helpers.error('any.invalid', {
          value: 'First Name must be in Capitalize format',
        })
      }
      return value
    })
    .messages({
      'string.empty': 'Firstname is required',
      'string.max': 'First Name can not be more than 20 characters',
    }),
  middleName: Joi.string().optional().trim(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.empty': 'Last Name is required',
      'string.pattern.base': 'Last Name must contain only alphabets',
    }),
})

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': 'Father Contact Number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': 'Mother Contact Number is required',
  }),
})

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local Guardian Address is required',
  }),
})

// Main Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'Other').required().messages({
    'string.empty': 'Gender is required',
    'any.only': 'Gender must be one of [male, female, Other]',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  dateOfBirth: Joi.string().optional(),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact Number is required',
  }),
  emerganceyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency Contact Number is required',
  }),
  bloodGroop: Joi.string()
    .valid('A+', 'B+', 'O+', 'A-', 'B-')
    .required()
    .messages({
      'string.empty': 'Blood Group is required',
      'any.only': 'Blood Group must be one of [A+, B+, O+, A-, B-]',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian is required',
  }),
  profileImage: Joi.string().optional(),
  isActice: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'Status must be either active or blocked',
  }),
})

// export default studentValidationSchema
