import config from '../../config'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterFromDB = async (academicSemesterData: TAcademicSemester) => {

    try {
        const academicSemester = await AcademicSemester.create(academicSemesterData)
        return academicSemester;

    } catch (error) {
        console.error(error)
        throw new Error('An error occurred while creating the student.')
    }
}

export const AcademicSemesterService = {
    createAcademicSemesterFromDB,
}
