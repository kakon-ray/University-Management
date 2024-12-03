import config from '../../config'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterFromDB = async (academicSemesterData: TAcademicSemester) => {

    const academicSemester = await AcademicSemester.create(academicSemesterData)
    return academicSemester;
    
}

export const AcademicSemesterService = {
    createAcademicSemesterFromDB,
}
