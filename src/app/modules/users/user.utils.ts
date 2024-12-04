import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
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
  return lastStudent?.id ? lastStudent?.id.substring(6) : undefined
}

// getnerate student id
export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentID = (await findLastStudent()) || (0).toString()
  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0')
  incrementID = `${payload.year}${payload.code}${incrementID}`
  return incrementID
}
