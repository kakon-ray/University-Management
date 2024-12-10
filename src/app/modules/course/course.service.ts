import path from 'path'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { User } from '../users/user.model'
import { object } from 'zod'
import QueryBuilder from '../../builder/QueryBuilder'
import { Course } from './course.model'
import { CoruseSearchableFields } from './course.constant'
import { TCourse } from './course.interface'
import { TUser } from '../users/user.interface'
import config from '../../config'


const createCourseFromDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}

// this is professional query builder
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    const CourseQuery = new QueryBuilder(Course.find().populate({
        path: 'preRequisiteCourses.course',
        populate: {
            path: 'preRequisiteCourses.course',
        },
    }), query)
        .search(CoruseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await CourseQuery.modelQuery
    // const result = await Course.find({});
    return result
}

const getSingleCourseFromDB = async (id: string) => {
    // const result = await Course.findOne({ id: id })

    const result = await Course.findById(id).populate({
        path: 'preRequisiteCourses.course',
        populate: {
            path: 'preRequisiteCourses.course',
        },
    })
    if (result) {
        return result
    } else {
        console.log('Course not found')
    }
}

const updatedCourseFromDB = async (id: string, payload: Partial<TCourse>) => {
    if (!payload) {
        throw new AppError(400, 'Payload is undefined or null')
    }

    const { preRequisiteCourses, ...remaingCourseData } = payload

    const basicCourseInfo = await Course.findByIdAndUpdate(id, remaingCourseData, {
        new: true,
        runValidators: true
    })

    if (preRequisiteCourses && preRequisiteCourses.length) {
        // filter out the delete fields
        const deletePreRequisiteCourses = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course)

        const deletePreRequisiteCoursesSubmit = await Course.findByIdAndUpdate(id, { $pull: { preRequisiteCourses: { course: { $in: deletePreRequisiteCourses } } } })


        // filter out new course fields
        const newPreRequisiteCourses = preRequisiteCourses.filter(el => el.course && !el.isDeleted);

        const newPreRequisiteCoursesSubmit = await Course.findByIdAndUpdate(id, {
            $addToSet: { preRequisiteCourses: { $each: newPreRequisiteCourses } }
        })

    }

    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result

}

const deleteCourseFromDB = async (id: string) => {

    try {
        const deletedCourse = await Course.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true },
        )

        if (!deletedCourse) {
            throw new AppError(400, 'Faild to deleted Course')
        }

        return deletedCourse
    } catch (err) {
        if (err instanceof Error) {
            throw new AppError(400, `Failed to create Course: ${err.message}`)
        }
    }
}

export const CourseServices = {
    createCourseFromDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updatedCourseFromDB,
}
