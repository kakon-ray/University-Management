import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentFromDB = async (
  academicDepartmentData: TAcademicDepartment,
) => {
  const academicDepartment = await AcademicDepartment.create(
    academicDepartmentData,
  )
  return academicDepartment
}

const getAcademicDepartmentFromDB = async () => {
  const academicDepartment =
    await AcademicDepartment.find().populate('academicfaculty')
  return academicDepartment
}

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const academicDepartment = await AcademicDepartment.findById({ _id: id })
  return academicDepartment
}

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )

  return result
}

export const AcademicDepartmentService = {
  createAcademicDepartmentFromDB,
  getAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
}
