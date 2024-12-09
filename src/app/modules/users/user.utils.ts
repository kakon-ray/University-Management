import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { Admin } from '../admin/admin.model'
import { Faculty } from '../faculty/faculty.model'
import { User } from './user.model'

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ _id: -1 })
    .lean()

  // 202401 0001
  return lastStudent?.id ? lastStudent?.id : undefined
}

// getnerate student id
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentID = (0).toString() // by default
  const lastStudentId = await findLastStudent()
  //2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
  const lastStudentYear = lastStudentId?.substring(0, 4)

  const currentSemesterCode = payload.code
  const currentYear = payload.year

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentID = lastStudentId.substring(6)
  }

  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0')
  incrementID = `${payload.year}${payload.code}${incrementID}`
  return incrementID
}

export const generateFacultyId = async () => {
  let result: string
  const academicFaculty = await User.findOne().sort({
    createdAt: -1,
  })

  if (academicFaculty) {
    const [prefix, facultyId] = academicFaculty.id.split('-')
    const incrementedNumber = String(parseInt(facultyId) + 1).padStart(
      facultyId.length,
      '0',
    )

    result = `${prefix}-${incrementedNumber}`
  } else {
    result = 'F-0001'
  }

  return result
}
export const generateAdminId = async () => {
  let result: string
  const academicFaculty = await User.findOne().sort({
    createdAt: -1,
  })

  if (academicFaculty) {
    const [prefix, facultyId] = academicFaculty.id.split('-')
    const incrementedNumber = String(parseInt(facultyId) + 1).padStart(
      facultyId.length,
      '0',
    )

    result = `${prefix}-${incrementedNumber}`
  } else {
    result = 'A-0001'
  }

  return result
}
