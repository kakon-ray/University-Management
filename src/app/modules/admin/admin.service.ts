import path from 'path'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { User } from '../users/user.model'
import { object } from 'zod'
import QueryBuilder from '../../builder/QueryBuilder'
import { Admin } from './admin.model'
import { AdminSearchableFields } from './admin.constant'
import { TAdmin } from './admin.interface'

// this is professional query builder
const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const AdminQuery = new QueryBuilder(Admin.find().populate('user'), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await AdminQuery.modelQuery
  // const result = await Admin.find({})
  return result
}

const getSingleAdminFromDB = async (AdminId: string) => {
  // const result = await Admin.findOne({ id: AdminId })

  const result = await Admin.findOne({ id: AdminId }).populate('user')
  if (result) {
    return result
  } else {
    console.log('Admin not found')
  }
}

const updatedAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
  if (!payload) {
    throw new AppError(400, 'Payload is undefined or null')
  }

  const { name, ...remaingAdminData } = payload

  const modifyedUpdatedData: Record<string, unknown> = { ...remaingAdminData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyedUpdatedData[`name.${key}`] = value // name.firstName = 'Kakon'
    }
  }

  const result = await Admin.findOneAndUpdate({ id: id }, modifyedUpdatedData, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteAdminFromDB = async (AdminId: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deletedAdmin = await Admin.findOneAndUpdate(
      { id: AdminId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedAdmin) {
      throw new AppError(400, 'Faild to deleted Admin')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id: AdminId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(400, 'Faild to deleted Admin')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedAdmin
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, 'Faild Deleted Admin')
  }
}

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
  updatedAdminFromDB,
}
