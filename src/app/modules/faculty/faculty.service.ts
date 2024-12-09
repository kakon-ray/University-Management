import path from 'path'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { User } from '../users/user.model'
import { object } from 'zod'
import QueryBuilder from '../../builder/QueryBuilder'
import { TFaculty } from './faculty.interface'
import { FacultySearchableFields } from './faculty.constant'
import { Faculty } from './faculty.model'

// this is professional query builder
const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const FacultyQuery = new QueryBuilder(Faculty.find().populate('user'), query)
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await FacultyQuery.modelQuery
  // const result = await Faculty.find({})
  return result
}

const getSingleFacultyFromDB = async (FacultyId: string) => {
  // const result = await Faculty.findOne({ id: FacultyId })

  const result = await Faculty.findOne({ id: FacultyId }).populate('user')
  if (result) {
    return result
  } else {
    console.log('Faculty not found')
  }
}

const updatedFacultyFromDB = async (id: string, payload: Partial<TFaculty>) => {
  if (!payload) {
    throw new AppError(400, 'Payload is undefined or null')
  }

  const { name, ...remaingFacultyData } = payload

  const modifyedUpdatedData: Record<string, unknown> = { ...remaingFacultyData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyedUpdatedData[`name.${key}`] = value // name.firstName = 'Kakon'
    }
  }

  const result = await Faculty.findOneAndUpdate(
    { id: id },
    modifyedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )

  return result
}

const deleteFacultyFromDB = async (FacultyId: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id: FacultyId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedFaculty) {
      throw new AppError(400, 'Faild to deleted Faculty')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id: FacultyId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(400, 'Faild to deleted Faculty')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedFaculty
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, 'Faild Deleted Faculty')
  }
}

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB,
  updatedFacultyFromDB,
}
