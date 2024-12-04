import config from '../../config'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterFromDB = async (
  academicSemesterData: TAcademicSemester,
) => {
  if (
    academicSemesterNameCodeMapper[academicSemesterData.name] !==
    academicSemesterData.code
  ) {
    throw new Error('Invalid Semester Code')
  }
  const academicSemester = await AcademicSemester.create(academicSemesterData)
  return academicSemester
}

const getAcademicSemesterFromDB = async () => {
  const academicSemester = await AcademicSemester.find({})
  return academicSemester
}
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const academicSemester = await AcademicSemester.findOne({ _id: id })
  return academicSemester
}

const updateAcademicSemesterFromDB = async (
  id: string,
  academicSemesterData: TAcademicSemester,
) => {
  if (
    academicSemesterNameCodeMapper[academicSemesterData.name] !==
    academicSemesterData.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const academicSemester = await AcademicSemester.findById({ _id: id })

  if (!academicSemester) {
    throw new Error(`Academic Semester with id ${id} not found`)
  }

  academicSemester.name = academicSemesterData.name
  academicSemester.year = academicSemesterData.year
  academicSemester.code = academicSemesterData.code
  academicSemester.startMonth = academicSemesterData.startMonth
  academicSemester.endMonth = academicSemesterData.endMonth
  await academicSemester.save()

  return academicSemester
}

export const AcademicSemesterService = {
  createAcademicSemesterFromDB,
  getAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
}
