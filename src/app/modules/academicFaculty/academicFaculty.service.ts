
import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'


const createAcademicFacultyFromDB = async (
    academicFacultyData: TAcademicFaculty,
  ) => {
    const academicFaculty = await AcademicFaculty.create(academicFacultyData)
    return academicFaculty
  }


  const getAcademicFacultyFromDB = async () => {
    const academicFaculty = await AcademicFaculty.find({})
    return academicFaculty
  }


  const getSingleAcademicFacultyFromDB = async (id: string) => {
    const academicFaculty = await AcademicFaculty.findOne({ _id: id })
    return academicFaculty
  }
  
  
  const updateAcademicFacultyFromDB = async (
    id: string,
    payload: TAcademicFaculty,
  ) => {
 
    const academicFaculty = await AcademicFaculty.findById({ _id: id })
  
    if (!academicFaculty) {
      throw new Error(`Academic Faculty with id ${id} not found`)
    }
  
    academicFaculty.name = payload.name
    await academicFaculty.save()
  
    return academicFaculty
  }
  

export const AcademicFacultyService = {
    createAcademicFacultyFromDB,
    getAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyFromDB
}
