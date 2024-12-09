import path from 'path'
import { Student } from '../students/student.model'
import { TStudent } from './student.interface'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { User } from '../users/user.model'
import { object } from 'zod'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentSerachableFields } from './students.constant'

// this is row query
// const getAllStudentFromDB = async (query: Record<string, unknown>) => {
//   const queryObj = { ...query }
//   const studentSerachableFields = ['email', 'name.firstName', 'presentAddress']
//   let searchTerm = ''

//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string
//   }

//   const searchQuery = Student.find({
//     $or: studentSerachableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   })

//   // Filtering

//   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
//   excludeFields.forEach((el) => delete queryObj[el])

//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicfaculty',
//       },
//     })

//   let sort = '-createdAt'

//   if (query.sort) {
//     sort = query.sort as string
//   }

//   const sortedQuery = filterQuery.sort(sort)

//   let limit = 1
//   let page = 1
//   let skip = 0

//   if (query.limit) {
//     limit = Number(query.limit)
//   }

//   if (query.page) {
//     page = Number(query.page)
//     skip = (page - 1) * limit
//   }

//   const paginateQuery = sortedQuery.skip(skip)

//   const limitQuery = paginateQuery.limit(limit)

//   // fields: 'name,email'
//   // fields:'name email' // we need

//   let fields = '-__v'
//   if (query.fields) {
//     fields = (query.fields as string).split(',').join(' ')
//     console.log({ fields })
//   }

//   const fieldsQuery = await limitQuery.select(fields)

//   return fieldsQuery
// }

// this is professional query builder
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicfaculty',
        },
      }),
    query,
  )
    .search(studentSerachableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  // const result = await Student.find({})
  return result
}

const getSingleStudentFromDB = async (studentId: string) => {
  // const result = await Student.findOne({ id: studentId })

  const result = await Student.findOne({ id: studentId })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    })
  if (result) {
    return result
  } else {
    console.log('Student not found')
  }
}

const updatedStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  if (!payload) {
    throw new AppError(400, 'Payload is undefined or null')
  }

  const { name, guardian, localGuardian, ...remaingStudentData } = payload

  const modifyedUpdatedData: Record<string, unknown> = { ...remaingStudentData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyedUpdatedData[`name.${key}`] = value // name.firstName = 'Kakon'
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyedUpdatedData[`guardian.${key}`] = value // name.firstName = 'Kakon'
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyedUpdatedData[`localGuardian.${key}`] = value // name.firstName = 'Kakon'
    }
  }

  console.log(modifyedUpdatedData)

  const result = await Student.findOneAndUpdate(
    { id: id },
    modifyedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )

  return result
}

const deleteStudentFromDB = async (studentId: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(400, 'Faild to deleted student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(400, 'Faild to deleted Student')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, 'Faild Deleted Student')
  }
}

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updatedStudentFromDB,
}
