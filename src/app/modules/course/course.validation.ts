import { z } from 'zod';

// Validation schema for a single pre-requisite course
const preRequisiteCoursesSchema = z.object({
    course: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"), // Validate as MongoDB ObjectId
    isDeleted: z.boolean().optional(), // Defaults to false, optional for validation
});

// Validation schema for a course
export const createCourseValidationSchema = z.object({
    body: z.object({
        course: z.object({
            title: z
                .string()
                .trim()
                .min(1, "Title is required")
                .max(255, "Title must be less than 255 characters"),
            prefix: z
                .string()
                .trim()
                .min(1, "Prefix is required")
                .max(10, "Prefix must be less than 10 characters"),
            code: z
                .number()
                .min(0, "Code must be a positive number")
                .max(9999, "Code must be less than 9999"),
            credits: z
                .number()
                .min(0, "Credits must be a positive number")
                .max(10, "Credits must be less than or equal to 10"),
            preRequisiteCourses: z.array(preRequisiteCoursesSchema).optional(), // Can be empty
            isDeleted: z.boolean().optional(), // Defaults to false, optional for validation
        })

    })
});


// Validation schema for a single pre-requisite course
const updatePreRequisiteCoursesSchema = z.object({
    course: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"), // Validate as MongoDB ObjectId
    isDeleted: z.boolean().optional(), // Defaults to false, optional for validation
});

// Validation schema for a course
export const updataeCourseValidationSchema = z.object({
    body: z.object({
        course: z.object({
            title: z
                .string()
                .trim()
                .min(1, "Title is required")
                .max(255, "Title must be less than 255 characters").optional(),
            prefix: z
                .string()
                .trim()
                .min(1, "Prefix is required")
                .max(10, "Prefix must be less than 10 characters").optional(),
            code: z
                .number()
                .min(0, "Code must be a positive number")
                .max(9999, "Code must be less than 9999").optional(),
            credits: z
                .number()
                .min(0, "Credits must be a positive number")
                .max(10, "Credits must be less than or equal to 10").optional(),
            preRequisiteCourses: z.array(updatePreRequisiteCoursesSchema).optional(), // Can be empty
            isDeleted: z.boolean().optional(), // Defaults to false, optional for validation
        })

    })
});



export const CourseValidation = {
    createCourseValidationSchema,
    updataeCourseValidationSchema
}
